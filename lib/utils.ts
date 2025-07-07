import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts text content from Sanity block content
 */
function extractTextFromBlocks(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";

  return blocks
    .map((block) => {
      if (block._type === "block" && block.children) {
        return block.children.map((child: any) => child.text || "").join("");
      }
      return "";
    })
    .join(" ");
}

/**
 * Calculates reading time based on word count
 * @param content - The content to analyze (can be string or Sanity blocks)
 * @param wordsPerMinute - Average reading speed (default: 200 words per minute)
 * @returns Reading time in minutes (rounded up)
 */
export function calculateReadTime(
  content: string | any[],
  wordsPerMinute: number = 200
): number {
  let text: string;

  if (typeof content === "string") {
    text = content;
  } else if (Array.isArray(content)) {
    text = extractTextFromBlocks(content);
  } else {
    return 1; // Default minimum read time
  }

  // Remove extra whitespace and count words
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const wordCount = words.length;

  // Calculate read time and round up to nearest minute (minimum 1 minute)
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readTime);
}
