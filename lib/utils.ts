import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Robust utility to strip HTML tags and decode common entities
 * for clean text previews and summaries.
 */
export function stripHtml(html: string | undefined): string {
  if (!html) return "";

  return html
    .replace(/<[^>]*>/g, " ")    // Replace HTML tags with a space (not empty, preserves word boundaries)
    .replace(/&nbsp;/g, " ")     // Decode &nbsp;
    .replace(/&lt;/g, "<")       // Decode &lt;
    .replace(/&gt;/g, ">")       // Decode &gt;
    .replace(/&amp;/g, "&")      // Decode &amp;
    .replace(/&quot;/g, '"')     // Decode &quot;
    .replace(/&#39;/g, "'")      // Decode &#39;
    .replace(/\s+/g, " ")        // Collapse all whitespace (newlines, tabs, extra spaces)
    .trim();
}

/**
 * Calculates estimated reading time in minutes based on text length.
 * Assumes an average reading speed of 238 words per minute (industry standard).
 */
export function calculateReadingTime(html: string | undefined): number {
  if (!html) return 1;
  const text = stripHtml(html);
  const wordCount = text.split(" ").filter(word => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / 238);
  return readingTime > 0 ? readingTime : 1;
}
