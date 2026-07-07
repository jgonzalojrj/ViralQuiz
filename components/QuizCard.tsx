import Link from "next/link";
import type { Quiz } from "@/data/quizzes";

type QuizCardProps = {
  quiz: Quiz;
  featured?: boolean;
};

export function QuizCard({ quiz, featured = false }: QuizCardProps) {
  const isAvailable = quiz.status === "available";

  return (
    <article className={`quiz-card ${featured ? "quiz-card-featured" : ""}`}>
      <div>
        <p className="quiz-card-kicker">{isAvailable ? "Disponible" : "Proximamente"}</p>
        <h3>{quiz.title}</h3>
        <p>{quiz.tagline}</p>
      </div>
      <div className="quiz-card-footer">
        <span>{quiz.duration}</span>
        {isAvailable ? (
          <Link className="button button-small" href={quiz.href}>
            Empezar
          </Link>
        ) : (
          <span className="pill">En cola</span>
        )}
      </div>
    </article>
  );
}
