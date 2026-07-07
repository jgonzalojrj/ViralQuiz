import Link from "next/link";
import type { Quiz } from "@/data/quizzes";

type QuizCardProps = {
  quiz: Quiz;
  featured?: boolean;
};

export function QuizCard({ quiz, featured = false }: QuizCardProps) {
  const isAvailable = quiz.status === "available";

  return (
    <article className={`quiz-card quiz-card-${quiz.slug} ${featured ? "quiz-card-featured" : ""}`}>
      <div className="quiz-card-art" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div>
        <p className="quiz-card-kicker">{isAvailable ? "Disponible" : "Proximamente"}</p>
        <h3>{quiz.title}</h3>
        <p>{quiz.tagline}</p>
      </div>
      <div className="quiz-details" aria-label="Detalles del test">
        {quiz.details.map((detail) => (
          <span key={detail}>{detail}</span>
        ))}
      </div>
      <div className="quiz-card-footer">
        <span className="quiz-duration">{quiz.duration}</span>
        {isAvailable ? (
          <Link className="button button-small" href={quiz.href}>
            Entrar
          </Link>
        ) : (
          <span className="pill">En cola</span>
        )}
      </div>
    </article>
  );
}
