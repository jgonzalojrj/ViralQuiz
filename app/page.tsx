import Image from "next/image";
import { QuizCard } from "@/components/QuizCard";
import { quizzes } from "@/data/quizzes";

export default function Home() {
  const featuredQuiz = quizzes[0];
  const upcomingQuizzes = quizzes.slice(1);

  return (
    <main>
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <Image
            src="/images/viralquiz-hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-image"
          />
        </div>
        <div className="hero-overlay" />
        <div className="page-shell hero-content">
          <p className="brand-chip">ViralQuiz</p>
          <h1>Mini-tests visuales para compartir al instante</h1>
          <p>
            Resultados rapidos, tarjetas grandes y una experiencia pensada para el scroll.
          </p>
          <div className="hero-actions">
            <a className="button" href={featuredQuiz.href}>
              Probar ahora
            </a>
            <a className="button button-ghost" href="#tests">
              Ver tests
            </a>
          </div>
        </div>
      </section>

      <section className="page-shell test-list-section" id="tests">
        <div className="section-heading">
          <p className="section-kicker">Tests disponibles</p>
          <h2>Elige una mini experiencia</h2>
        </div>

        <div className="quiz-grid">
          <QuizCard quiz={featuredQuiz} featured />
          {upcomingQuizzes.map((quiz) => (
            <QuizCard key={quiz.slug} quiz={quiz} />
          ))}
        </div>
      </section>
    </main>
  );
}
