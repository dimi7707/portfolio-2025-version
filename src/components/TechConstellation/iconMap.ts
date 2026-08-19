import type { IconType } from "react-icons";
import {
  SiAstro,
  SiDocker,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTypescript,
  SiVuedotjs,
  SiAmazonwebservices,
} from "react-icons/si";
import { TbBrandCSharp, TbTestPipe } from "react-icons/tb";

// Generic fallback used both for the combined "Testing" node and for any
// technology name that has no mapped brand icon.
const FALLBACK_ICON: IconType = TbTestPipe;

const TECH_ICON_MAP: Record<string, IconType> = {
  Python: SiPython,
  PHP: SiPhp,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "C#": TbBrandCSharp,
  Docker: SiDocker,
  AWS: SiAmazonwebservices,
  React: SiReact,
  "Vue.js": SiVuedotjs,
  Astro: SiAstro,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Redis: SiRedis,
  MongoDB: SiMongodb,
  Testing: TbTestPipe,
};

export const getIconForTech = (name: string): IconType =>
  TECH_ICON_MAP[name] ?? FALLBACK_ICON;
