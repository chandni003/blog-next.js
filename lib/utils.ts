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
    .replace(/<[^>]*>/g, "")     // Remove all HTML tags
    .replace(/&nbsp;/g, " ")     // Decode &nbsp;
    .replace(/&lt;/g, "<")       // Decode &lt;
    .replace(/&gt;/g, ">")       // Decode &gt;
    .replace(/&amp;/g, "&")      // Decode &amp;
    .replace(/&quot;/g, '"')     // Decode &quot;
    .replace(/&#39;/g, "'")      // Decode &#39;
    .trim();
}
