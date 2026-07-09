import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizCard } from "@/components/QuizCard";
import { getSectionById, quizSections } from "@/data/quizzes";
import {
  absoluteUrl,
  defaultOgImage,
  getCategorySeoDescription,
  getCategorySeoTitle,
  siteName
} from "@/data/seo";

type CategoryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return quizSections.map((section) => ({
    id: section.id
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { id } = await params;
  const section = getSectionById(id);

  if (!section) {
    return {
      title: "Categoria | ViralQuiz",
      description: "Explora categorias de tests rapidos en ViralQuiz."
    };
  }

  const title = getCategorySeoTitle(section);
  const description = getCategorySeoDescription(section);

  return {
    title,
    description,
    alternates: {
      canonical: `/categoria/${section.id}`
    },
    openGraph: {
      type: "website",
      url: `/categoria/${section.id}`,
      siteName,
      title,
      description,
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${section.title} en ViralQuiz`
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const section = getSectionById(id);

  if (!section) {
    notFound();
  }

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
        name: section.title,
        item: absoluteUrl(`/categoria/${section.id}`)
      }
    ]
  };

  return (
    <main className="category-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav className="test-nav" aria-label="Navegacion principal">
        <Link className="wordmark wordmark-dark" href="/">
          ViralQuiz
        </Link>
        <Link className="nav-cta nav-cta-dark" href="/#tests">
          Categorias
        </Link>
      </nav>

      <section className="page-shell category-detail">
        <div className="section-heading">
          <p className="section-kicker">Categoria</p>
          <h1>{section.title}</h1>
          <p>{section.description}</p>
        </div>

        <div className="quiz-grid">
          {section.quizzes.map((quiz, index) => (
            <QuizCard key={quiz.slug} quiz={quiz} featured={index === 0} />
          ))}
        </div>
      </section>
    </main>
  );
}
