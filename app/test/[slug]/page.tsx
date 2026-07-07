import Link from "next/link";
import { notFound } from "next/navigation";
import { QuizRunner } from "@/components/QuizRunner";
import { getQuizBySlug } from "@/data/quizzes";

type TestPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: TestPageProps) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);

  return {
    title: quiz ? `${quiz.title} | ViralQuiz` : "Test | ViralQuiz"
  };
}

export default async function TestPage({ params }: TestPageProps) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);

  if (!quiz) {
    notFound();
  }

  return (
    <main className="test-page">
      <nav className="test-nav" aria-label="Navegacion principal">
        <Link className="wordmark wordmark-dark" href="/">
          ViralQuiz
        </Link>
        <Link className="nav-cta nav-cta-dark" href="/#tests">
          Secciones
        </Link>
      </nav>
      <QuizRunner quiz={quiz} />
    </main>
  );
}
