import type { AnalyzeLesionRequest, AnalyzeLesionResult } from "@/lib/ai-analysis";

export class AnalyzeLesionError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "AnalyzeLesionError";
    this.status = status;
  }
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
      throw new AnalyzeLesionError(
        payload.error ?? "AI analysis failed. Please try again.",
        response.status
      );
    }

    return payload;
  } catch (error) {
    if (error instanceof AnalyzeLesionError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new AnalyzeLesionError("AI analysis timed out. Please try again.", 504);
    }
    throw new AnalyzeLesionError("Network error while running AI review.", 500);
  } finally {
    clearTimeout(timeout);
  }
}
