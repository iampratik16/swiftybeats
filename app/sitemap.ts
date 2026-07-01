import type { MetadataRoute } from "next";
import { site } from "@/lib/links";
import { footerNav } from "@/lib/nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...footerNav.map((n) => n.href)];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
