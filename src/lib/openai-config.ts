/** Vision model used for Run AI Review (ABCDE triage). */
export const OPENAI_ANALYSIS_MODEL = "gpt-5.5";

export function resolveOpenAIAnalysisModel(): string {
  const configured = process.env.OPENAI_MODEL?.trim();
  return configured || OPENAI_ANALYSIS_MODEL;
}
