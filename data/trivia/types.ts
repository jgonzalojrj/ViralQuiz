export type TriviaSeed = {
  prompt: string;
  correct: string;
  wrong: [string, string, string];
  image?: string;
  imageAlt?: string;
};

export function q(
  prompt: string,
  correct: string,
  wrong1: string,
  wrong2: string,
  wrong3: string,
  media?: Pick<TriviaSeed, "image" | "imageAlt">
): TriviaSeed {
  return { prompt, correct, wrong: [wrong1, wrong2, wrong3], ...media };
}
