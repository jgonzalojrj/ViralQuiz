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
        <header className="hero-nav page-shell">
          <a className="wordmark" href="/">
            ViralQuiz
          </a>
          <a className="nav-cta" href="#tests">
            Tests
          </a>
        </header>
        <div className="page-shell hero-content">
          <p className="brand-chip">Mini-app viral</p>
          <h1>Tests rapidos con resultados que apetece compartir</h1>
          <p>
            Una experiencia visual, ligera y directa para descubrir tu vibe en menos de un minuto.
          </p>
          <div className="hero-metrics" aria-label="Detalles de ViralQuiz">
            <span>1 min</span>
            <span>Vibe test</span>
            <span>Resultado</span>
          </div>
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
          <h2>Elige tu proximo resultado</h2>
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
