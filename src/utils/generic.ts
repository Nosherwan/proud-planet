import type { FieldErrors } from "react-hook-form";
import type { TagCategory } from "../types/tag";
import type { ColourOption } from "../types/colourOption";

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// // Get all unique error messages for the error summary
export const errorMessages = (errors: FieldErrors) =>
  Object.values(errors)
    .map((err) => err?.message as string | undefined)
    .filter((message): message is string => Boolean(message));

export function getCookie(name: string) {
  const cookieString = document.cookie;
  if (!cookieString) return null;

  const cookies = cookieString.split(";");

  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.startsWith(name + "=")) {
      const value = decodeURIComponent(
        trimmedCookie.substring(name.length + 1),
      );
      try {
        return JSON.parse(value);
      } catch (error) {
        console.error("Error parsing JSON from cookie:", error);
        return value; // Return unparsed value as fallback
      }
    }
  }
  return null;
}

export function getDateFromUnixTime(stamp: number) {
  return new Date(stamp * 1000);
}

export const colorOptions = [
  { bg: "bg-red-100", text: "text-red-700", colour: "#b91c1c" },
  { bg: "bg-blue-100", text: "text-blue-700", colour: "#1d4ed8" },
  { bg: "bg-green-100", text: "text-green-700", colour: "#15803d" },
  { bg: "bg-yellow-100", text: "text-yellow-700", colour: "#d97706" },
  { bg: "bg-purple-100", text: "text-purple-700", colour: "#8b5cf6" },
  { bg: "bg-pink-100", text: "text-pink-700", colour: "#db2777" },
  { bg: "bg-indigo-100", text: "text-indigo-700", colour: "#4f46e5" },
  { bg: "bg-teal-100", text: "text-teal-700", colour: "#0f766e" },
  { bg: "bg-orange-100", text: "text-orange-700", colour: "#ea580c" },
  { bg: "bg-cyan-100", text: "text-cyan-700", colour: "#0e7490" },
  { bg: "bg-lime-100", text: "text-lime-700", colour: "#65a30d" },
  { bg: "bg-emerald-100", text: "text-emerald-700", colour: "#10b981" },
  { bg: "bg-sky-100", text: "text-sky-700", colour: "#0284c7" },
  { bg: "bg-violet-100", text: "text-violet-700", colour: "#7c3aed" },
  { bg: "bg-fuchsia-100", text: "text-fuchsia-700", colour: "#c026d3" },
  { bg: "bg-rose-100", text: "text-rose-700", colour: "#e11d48" },
  { bg: "bg-amber-100", text: "text-amber-700", colour: "#d97706" },
  { bg: "bg-slate-100", text: "text-slate-700", colour: "#475569" },
  { bg: "bg-stone-100", text: "text-stone-700", colour: "#4b5563" },
  { bg: "bg-neutral-100", text: "text-neutral-700", colour: "#4d4d4d" },
];
// Simple string hash function - always returns the same number for the same string
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function toColourOptions(items: TagCategory): ColourOption[] {
  const options = items?.tags?.map((item) => {
    const colorIndex = hashString(item?.tag || "") % colorOptions.length;
    const { colour } = colorOptions[colorIndex];
    return { value: item.tag || "", label: item.tag || "", color: colour };
  });
  console.log("🔖 toColourOptions", options);
  return options ?? [];
}

export function getQuestionText(keyword: string): string {
  switch (keyword.toLowerCase()) {
    case "activity":
      return "Activities?";
    case "feeling":
      return "Mental State?";
    case "interest":
      return "Interests?";
    case "other":
      return "Any other?";
    default:
      return "Please tell us more";
  }
}
