import Image from "next/image";
import type { CSSProperties } from "react";
import { QuizCard } from "@/components/QuizCard";
import { quizSections, quizzes } from "@/data/quizzes";

type CSSVariableProperties = CSSProperties & Record<`--${string}`, string>;

export default function Home() {
  const featuredQuiz = quizzes[0];

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
            Una plataforma visual de tests por categorias: mente, relaciones, deportes, vida diaria y retos rapidos.
          </p>
          <div className="hero-metrics" aria-label="Detalles de ViralQuiz">
            <span>40 tests</span>
            <span>15 preguntas</span>
            <span>Sin registro</span>
            <span>Resultado instantaneo</span>
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
          <p className="section-kicker">Secciones</p>
          <h2>Tests organizados por categoria</h2>
          <p>Los tests personales viven en mente y relaciones. Deportes se centra en trivia, reglas y conocimiento.</p>
        </div>

        <div className="section-grid">
          {quizSections.map((section) => (
            <section className="quiz-section" id={section.id} key={section.id}>
              <div className="quiz-section-heading">
                <span style={{ "--section-accent": section.accent } as CSSVariableProperties} />
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                </div>
              </div>
              <div className="quiz-grid">
                {section.quizzes.map((quiz, index) => (
                  <QuizCard key={quiz.slug} quiz={quiz} featured={quiz.slug === featuredQuiz.slug || index === 0} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
