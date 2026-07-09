import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { quizSections, quizzes } from "@/data/quizzes";
import { defaultOgImage, defaultSeoDescription, defaultSeoTitle, siteName } from "@/data/seo";

type CSSVariableProperties = CSSProperties & Record<`--${string}`, string>;

export const metadata: Metadata = {
  title: defaultSeoTitle,
  description: defaultSeoDescription,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: defaultSeoTitle,
    description: defaultSeoDescription,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "ViralQuiz, mini tests virales rapidos y gratis"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSeoTitle,
    description: defaultSeoDescription,
    images: [defaultOgImage]
  }
};

const popularSlugs = [
  "cultura-general",
  "conocimientos-futbol",
  "iq-rapido",
  "geografia-express",
  "cine-series",
  "cultura-musical",
  "vibe-transmites",
  "verdadero-pais"
];

const categoryEmojis: Record<string, string> = {
  "inteligencia-mente": "🧩",
  personalidad: "✨",
  deportes: "⚽",
  "cultura-general": "🧠",
  geografia: "🌍",
  historia: "🏛️",
  ciencia: "🧪",
  tecnologia: "💻",
  musica: "🎧",
  "cine-series": "🍿",
  gaming: "🎮",
  "naturaleza-animales": "🌿",
  comida: "🍔",
  idiomas: "🗣️"
};

function getCategoryEmoji(categoryId: string) {
  return categoryEmojis[categoryId] ?? "✨";
}

export default function Home() {
  const featuredQuiz = quizzes[0];
  const popularQuizzes = popularSlugs
    .map((slug) => quizzes.find((quiz) => quiz.slug === slug))
    .filter(Boolean);

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
            Una plataforma visual de tests por categorias: inteligencia, personalidad, cultura, deportes y entretenimiento.
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
                <span>{getCategoryEmoji(section.id)}</span>
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

      <section className="page-shell seo-content-section" aria-labelledby="tests-virales">
        <div className="section-heading">
          <p className="section-kicker">Tests virales rapidos</p>
          <h2 id="tests-virales">Tests para jugar, comparar y retar a tus amigos</h2>
          <p>
            ViralQuiz junta mini tests visuales de cultura general, futbol, geografia, musica, cine, IQ y personalidad.
            Cada test tiene preguntas rapidas, resultado instantaneo y una pantalla final pensada para compartir.
          </p>
        </div>

        <div className="seo-link-grid">
          {popularQuizzes.map((quiz) =>
            quiz ? (
              <Link className="seo-link-card" href={quiz.href} key={quiz.slug}>
                <span>{quiz.kind === "trivia" ? "Quiz" : quiz.kind === "challenge" ? "Reto" : "Personal"}</span>
                <h3>{quiz.title}</h3>
                <p>{quiz.tagline}</p>
              </Link>
            ) : null
          )}
        </div>
      </section>

      <section className="page-shell seo-content-section seo-benefits-section" aria-labelledby="por-que-viralquiz">
        <div className="section-heading">
          <p className="section-kicker">Por que usar ViralQuiz</p>
          <h2 id="por-que-viralquiz">Una mini-app de tests sencilla, visual y sin registro</h2>
          <p>
            Puedes entrar, elegir una categoria y jugar en pocos segundos. Los tests estan organizados para que encuentres
            retos de conocimiento, personalidad o razonamiento sin mezclarlo todo.
          </p>
        </div>

        <div className="seo-benefit-grid">
          <article>
            <h3>Contenido claro para Google</h3>
            <p>Cada categoria y cada test tienen su propia URL, titulo, descripcion y enlaces internos rastreables.</p>
          </article>
          <article>
            <h3>Resultados instantaneos</h3>
            <p>Al terminar ves una tarjeta visual con tu marcador o resultado, lista para repetir el test o compartirlo.</p>
          </article>
          <article>
            <h3>Categorias populares</h3>
            <p>Encuentra tests de cultura general, deportes, musica, cine, gaming, ciencia, idiomas y personalidad.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
