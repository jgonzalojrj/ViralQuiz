import type { MetadataRoute } from "next";
import { quizSections, quizzes } from "@/data/quizzes";
import { absoluteUrl } from "@/data/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    ...quizSections.map((section) => ({
      url: absoluteUrl(`/categoria/${section.id}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.82
    })),
    ...quizzes.map((quiz) => ({
      url: absoluteUrl(quiz.href),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: quiz.kind === "trivia" ? 0.74 : 0.7
    }))
  ];
}
