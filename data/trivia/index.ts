import { cultureTriviaSeeds } from "./culture";
import { geographyTriviaSeeds } from "./geography";
import { historyTriviaSeeds } from "./history";
import { scienceTriviaSeeds } from "./science";
import type { TriviaSeed } from "./types";

export type { TriviaSeed } from "./types";

export const expandedKnowledgeTriviaSeeds = {
  ...cultureTriviaSeeds,
  ...geographyTriviaSeeds,
  ...historyTriviaSeeds,
  ...scienceTriviaSeeds
} satisfies Record<string, TriviaSeed[]>;
