export type Language = "en" | "es";

export interface Section {
  name: string;
  type: "section" | "page";
  path?: string;
}

export const getLocalizedPath = (path: string, language: Language) => {
  const basePath = path === "/" ? "" : path;
  return `/${language}${basePath}`;
};
