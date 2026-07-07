import { QuizRunner } from "@/components/QuizRunner";
import { getQuizBySlug } from "@/data/quizzes";

export function MentalAgeQuiz() {
  const quiz = getQuizBySlug("edad-mental");

  if (!quiz) {
    return null;
  }

  return <QuizRunner quiz={quiz} />;
}
