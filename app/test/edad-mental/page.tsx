import Link from "next/link";
import { MentalAgeQuiz } from "@/components/MentalAgeQuiz";

export const metadata = {
  title: "Test de edad mental | ViralQuiz"
};

export default function MentalAgePage() {
  return (
    <main className="test-page">
      <nav className="test-nav" aria-label="Navegacion principal">
        <Link className="wordmark wordmark-dark" href="/">
          ViralQuiz
        </Link>
        <Link className="nav-cta nav-cta-dark" href="/">
          Inicio
        </Link>
      </nav>
      <MentalAgeQuiz />
    </main>
  );
}
