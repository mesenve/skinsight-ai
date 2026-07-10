import { NextResponse } from "next/server";
import {
  AI_ANALYSIS_SYSTEM_PROMPT,
  buildAnalysisUserPrompt,
  mapOpenAIAnalysis,
  type AnalyzeLesionRequest,
} from "@/lib/ai-analysis";
import { resolveLesionImageUrl } from "@/lib/resolve-lesion-image";
import { resolveOpenAIAnalysisModel } from "@/lib/openai-config";

const MAX_IMAGE_CHARS = 6_000_000;

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured on the server." },
      { status: 503 }
    );
  }

  let body: AnalyzeLesionRequest;
  try {
    body = (await request.json()) as AnalyzeLesionRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.caseId?.trim() || !body.imageUrl?.trim()) {
    return NextResponse.json(
      { error: "caseId and imageUrl are required." },
      { status: 400 }
    );
  }

  if (body.imageUrl.length > MAX_IMAGE_CHARS) {
    return NextResponse.json(
      { error: "Image payload is too large. Use an image under 4 MB." },
      { status: 413 }
    );
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  let visionImageUrl: string;
  try {
    visionImageUrl = await resolveLesionImageUrl(body.imageUrl, origin);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not prepare lesion image.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const model = resolveOpenAIAnalysisModel();

  try {
    const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: AI_ANALYSIS_SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              { type: "text", text: buildAnalysisUserPrompt(body.patientContext) },
              { type: "image_url", image_url: { url: visionImageUrl } },
            ],
          },
        ],
        max_completion_tokens: 1200,
      }),
    });

    if (!openAiResponse.ok) {
      const errorPayload = await openAiResponse.text();
      console.error("OpenAI analyze error:", openAiResponse.status, errorPayload);
      return NextResponse.json(
        { error: "AI analysis service returned an error. Try again shortly." },
        { status: 502 }
      );
    }

    const payload = (await openAiResponse.json()) as {
      model?: string;
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = payload.choices?.[0]?.message?.content;
    const modelUsed = payload.model ?? model;

    if (!content) {
      return NextResponse.json(
        { error: "AI analysis returned an empty response." },
        { status: 502 }
      );
    }

    const parsed = JSON.parse(content) as Parameters<typeof mapOpenAIAnalysis>[0];
    const result = mapOpenAIAnalysis(parsed);

    console.info(`[analyze] OpenAI model: ${modelUsed} (requested: ${model})`);

    return NextResponse.json(result, {
      headers: {
        "X-AI-Model-Requested": model,
        "X-AI-Model-Used": modelUsed,
      },
    });
  } catch (error) {
    console.error("Analyze route failed:", error);
    return NextResponse.json(
      { error: "AI analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
