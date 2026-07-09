import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizRunner } from "@/components/QuizRunner";
import { getQuizBySlug, quizSections, quizzes } from "@/data/quizzes";
import {
  absoluteUrl,
  defaultOgImage,
  getQuizKeywords,
  getQuizSeoDescription,
  getQuizSeoTitle,
  siteName
} from "@/data/seo";

type TestPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const difficultyLabels = {
  facil: "Facil",
  medio: "Medio",
  dificil: "Complicado",
  extremo: "Complicado"
};

function getQuizSection(slug: string) {
  return quizSections.find((section) => section.quizzes.some((quiz) => quiz.slug === slug));
}

export function generateStaticParams() {
  return quizzes.map((quiz) => ({
    slug: quiz.slug
  }));
}

export async function generateMetadata({ params }: TestPageProps): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  const section = getQuizSection(slug);

  if (!quiz) {
    return {
      title: "Test | ViralQuiz",
      description: "Elige un test rapido en ViralQuiz y descubre tu resultado al instante."
    };
  }

  const title = getQuizSeoTitle(quiz);
  const description = getQuizSeoDescription(quiz);

  return {
    title,
    description,
    keywords: getQuizKeywords(quiz, section?.title),
    alternates: {
      canonical: quiz.href
    },
    openGraph: {
      type: "article",
      url: quiz.href,
      siteName,
      title,
      description,
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${quiz.title} en ViralQuiz`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage]
    }
  };
}

export default async function TestPage({ params }: TestPageProps) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);

  if (!quiz) {
    notFound();
  }

  const section = getQuizSection(slug);
  const title = getQuizSeoTitle(quiz);
  const description = getQuizSeoDescription(quiz);
  const previewQuestions = quiz.questions.slice(0, 3);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: absoluteUrl("/")
      },
      {
        "@type": "ListItem",
        position: 2,
        name: section?.title ?? "Tests",
        item: absoluteUrl(section ? `/categoria/${section.id}` : "/#tests")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: quiz.title,
        item: absoluteUrl(quiz.href)
      }
    ]
  };

  return (
    <main className="test-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav className="test-nav" aria-label="Navegacion principal">
        <Link className="wordmark wordmark-dark" href="/">
          ViralQuiz
        </Link>
        <Link className="nav-cta nav-cta-dark" href="/#tests">
          Secciones
        </Link>
      </nav>

      <section className="page-shell seo-test-hero">
        <nav className="seo-breadcrumbs" aria-label="Migas de pan">
          <Link href="/">Inicio</Link>
          <span>/</span>
          {section ? <Link href={`/categoria/${section.id}`}>{section.title}</Link> : <span>Tests</span>}
          <span>/</span>
          <span>{quiz.title}</span>
        </nav>

        <div className="seo-test-layout">
          <div className="seo-test-copy">
            <p className="section-kicker">{section?.title ?? "Test ViralQuiz"}</p>
            <h1>{title.replace(" | ViralQuiz", "")}</h1>
            <p>{description}</p>
            <div className="seo-meta-list" aria-label="Detalles del test">
              <span>{quiz.questions.length} preguntas</span>
              <span>{difficultyLabels[quiz.difficulty]}</span>
              <span>{quiz.duration}</span>
              <span>{quiz.kind === "trivia" ? "Resultado por aciertos" : "Resultado personalizado"}</span>
            </div>
            <div className="seo-test-actions">
              <a className="button" href="#empezar">
                Empezar test
              </a>
              {section ? (
                <Link className="button button-light" href={`/categoria/${section.id}`}>
                  Ver categoria
                </Link>
              ) : null}
            </div>
          </div>

          <aside className="seo-preview-panel" aria-label="Vista previa del test">
            <p className="quiz-card-kicker">Vista previa</p>
            <h2>Algunas preguntas que veras</h2>
            <ol className="question-preview-list">
              {previewQuestions.map((question) => (
                <li key={question.id}>{question.prompt}</li>
              ))}
            </ol>
            <p className="test-note">La vista previa no muestra respuestas correctas ni resultado final.</p>
          </aside>
        </div>
      </section>

      <div id="empezar" className="test-runner-anchor" />
      <QuizRunner quiz={quiz} />
    </main>
  );
}
