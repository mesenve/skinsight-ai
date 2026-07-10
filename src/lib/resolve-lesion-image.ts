import { readFile } from "fs/promises";
import path from "path";

function mimeFromExtension(filePath: string): string {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  if (ext === "svg") return "image/svg+xml";
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "gif") return "image/gif";
  return "image/jpeg";
}

export async function resolveLesionImageUrl(
  imageUrl: string,
  origin?: string
): Promise<string> {
  if (imageUrl.startsWith("data:")) return imageUrl;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/")) {
    const relativePath = imageUrl.replace(/^\//, "");
    const filePath = path.join(process.cwd(), "public", relativePath);

    try {
      const buffer = await readFile(filePath);
      const mime = mimeFromExtension(filePath);
      return `data:${mime};base64,${buffer.toString("base64")}`;
    } catch {
      if (origin) {
        return `${origin}${imageUrl}`;
      }
      throw new Error("Lesion image could not be loaded for analysis.");
    }
  }

  throw new Error("Unsupported lesion image URL.");
}
