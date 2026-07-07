export type TriviaSeed = {
  prompt: string;
  correct: string;
  wrong: [string, string, string];
};

export function q(prompt: string, correct: string, wrong1: string, wrong2: string, wrong3: string): TriviaSeed {
  return { prompt, correct, wrong: [wrong1, wrong2, wrong3] };
}
