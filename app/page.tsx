import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
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
            <span>{quizzes.length} tests</span>
            <span>15 preguntas</span>
            <span>Sin registro</span>
            <span>Resultado instantaneo</span>
          </div>
          <div className="hero-actions">
            <a className="button" href={featuredQuiz.href}>
              Probar ahora
            </a>
            <a className="button button-ghost" href="#tests">
              Ver categorias
            </a>
          </div>
        </div>
      </section>

      <section className="page-shell test-list-section" id="tests">
        <div className="section-heading">
          <p className="section-kicker">Categorias</p>
          <h2>Elige una seccion para empezar</h2>
          <p>Primero eliges categoria, despues el test. Asi cada tipo de reto tiene su sitio.</p>
        </div>

        <div className="category-grid">
          {quizSections.map((section) => (
            <Link
              className="category-card"
              href={`/categoria/${section.id}`}
              key={section.id}
              style={{ "--section-accent": section.accent } as CSSVariableProperties}
            >
              <div className="category-card-mark" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div>
                <p className="quiz-card-kicker">{section.quizzes.length} tests</p>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>
              <span className="category-card-action">Ver tests</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
