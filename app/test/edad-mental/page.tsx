import Link from "next/link";
import { MentalAgeQuiz } from "@/components/MentalAgeQuiz";

export const metadata = {
  title: "Test de edad mental | ViralQuiz"
};

export default function MentalAgePage() {
  return (
    <main className="test-page">
      <nav className="test-nav" aria-label="Navegacion principal">
        <Link href="/">ViralQuiz</Link>
      </nav>
      <MentalAgeQuiz />
    </main>
  );
}
