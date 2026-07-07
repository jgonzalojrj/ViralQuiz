import Link from "next/link";
import type { Quiz } from "@/data/quizzes";

type QuizCardProps = {
  quiz: Quiz;
  featured?: boolean;
};

const difficultyLabels: Record<Quiz["difficulty"], string> = {
  facil: "Facil",
  medio: "Medio",
  dificil: "Dificil",
  extremo: "Extremo"
};

export function QuizCard({ quiz, featured = false }: QuizCardProps) {
  const difficultyLabel = difficultyLabels[quiz.difficulty];

  return (
    <article className={`quiz-card ${featured ? "quiz-card-featured" : ""}`}>
      <span className={`difficulty-badge difficulty-${quiz.difficulty}`} aria-label={`Dificultad: ${difficultyLabel}`}>
        {difficultyLabel}
      </span>
      <div className="quiz-card-art" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div>
        <p className="quiz-card-kicker">{quiz.kind === "trivia" ? "Trivia" : quiz.kind === "challenge" ? "Reto" : "Personal"}</p>
        <h3>{quiz.title}</h3>
        <p>{quiz.tagline}</p>
      </div>
      <div className="quiz-card-footer">
        <span className="quiz-duration">{quiz.duration}</span>
        <Link className="button button-small" href={quiz.href}>
          Empezar
        </Link>
      </div>
    </article>
  );
}
