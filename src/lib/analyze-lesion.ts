import type { AnalyzeLesionRequest, AnalyzeLesionResult } from "@/lib/ai-analysis";

export class AnalyzeLesionError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "AnalyzeLesionError";
    this.status = status;
  }
}

/** Maps API / network failures to clinician-friendly copy (no env keys or stack traces). */
export function getAnalyzeErrorMessage(status: number, rawMessage?: string): string {
  const normalized = rawMessage?.toLowerCase() ?? "";

  if (status === 503 || normalized.includes("openai_api_key") || normalized.includes("not configured")) {
    return "AI review is temporarily unavailable. Please try again in a few minutes.";
  }

  if (
    status === 504 ||
    normalized.includes("timed out") ||
    normalized.includes("timeout") ||
    normalized.includes("abort")
  ) {
    return "This review is taking longer than expected. Check your connection and try again.";
  }

  if (status === 413 || normalized.includes("too large")) {
    return "This image is too large to analyze. Please use a photo under 4 MB.";
  }

  if (
    status === 502 ||
    normalized.includes("service returned an error") ||
    normalized.includes("empty response")
  ) {
    return "The AI service couldn't complete this review right now. Please try again shortly.";
  }

  if (status === 400) {
    if (normalized.includes("image") || normalized.includes("prepare lesion")) {
      return "We couldn't load this lesion image for analysis. Try a different photo or upload again.";
    }
    return "This case couldn't be sent for AI review. Refresh the page and try again.";
  }

  if (normalized.includes("network")) {
    return "We couldn't reach the analysis service. Check your internet connection and try again.";
  }

  if (normalized.includes("did not start")) {
    return "AI review didn't start correctly. Tap Run AI Review to try again.";
  }

  if (normalized.includes("no lesion image")) {
    return "No lesion image is available for AI review. Add a scan image first.";
  }

  return "Something went wrong during AI review. Please try again.";
}

export async function analyzeLesion(
  input: AnalyzeLesionRequest
): Promise<AnalyzeLesionResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45_000);

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      signal: controller.signal,
    });

    const payload = (await response.json()) as AnalyzeLesionResult & { error?: string };

    if (!response.ok) {
      const raw = payload.error ?? "AI analysis failed. Please try again.";
      throw new AnalyzeLesionError(getAnalyzeErrorMessage(response.status, raw), response.status);
    }

    return payload;
  } catch (error) {
    if (error instanceof AnalyzeLesionError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new AnalyzeLesionError(getAnalyzeErrorMessage(504, "timed out"), 504);
    }
    throw new AnalyzeLesionError(getAnalyzeErrorMessage(500, "network error"), 500);
  } finally {
    clearTimeout(timeout);
  }
}
