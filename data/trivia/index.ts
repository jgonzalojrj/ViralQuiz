import { advancedKnowledgeTriviaSeeds } from "./advanced";
import { cultureTriviaSeeds } from "./culture";
import { geographyTriviaSeeds } from "./geography";
import { historyTriviaSeeds } from "./history";
import { nicheTriviaSeeds } from "./niches";
import { scienceTriviaSeeds } from "./science";
import type { TriviaSeed } from "./types";

export type { TriviaSeed } from "./types";
export { advancedQuizDraftsBySection } from "./advanced";

export const expandedKnowledgeTriviaSeeds = {
  ...advancedKnowledgeTriviaSeeds,
  ...cultureTriviaSeeds,
  ...geographyTriviaSeeds,
  ...historyTriviaSeeds,
  ...nicheTriviaSeeds,
  ...scienceTriviaSeeds
} satisfies Record<string, TriviaSeed[]>;
