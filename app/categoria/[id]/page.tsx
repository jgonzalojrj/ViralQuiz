import Link from "next/link";
import { notFound } from "next/navigation";
import { QuizCard } from "@/components/QuizCard";
import { getSectionById, quizSections } from "@/data/quizzes";

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

export async function generateMetadata({ params }: CategoryPageProps) {
  const { id } = await params;
  const section = getSectionById(id);

  return {
    title: section ? `${section.title} | ViralQuiz` : "Categoria | ViralQuiz"
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const section = getSectionById(id);

  if (!section) {
    notFound();
  }

  return (
    <main className="category-page">
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
