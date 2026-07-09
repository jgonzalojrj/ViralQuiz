import Link from "next/link";
import type { Quiz } from "@/data/quizzes";

type QuizCardProps = {
  quiz: Quiz;
  featured?: boolean;
};

const difficultyLabels: Record<Quiz["difficulty"], string> = {
  facil: "Facil",
  medio: "Medio",
  dificil: "Complicado",
  extremo: "Complicado"
};

function getQuizEmoji(quiz: Quiz) {
  const text = `${quiz.slug} ${quiz.title} ${quiz.tagline}`.toLowerCase();

  if (text.includes("formula")) return "🏎️";
  if (text.includes("baloncesto") || text.includes("nba")) return "🏀";
  if (text.includes("futbol") || text.includes("champions") || text.includes("tenis") || text.includes("deporte")) return "⚽";
  if (text.includes("cine") || text.includes("series") || text.includes("oscar")) return "🍿";
  if (text.includes("musica") || text.includes("reggaeton") || text.includes("cancion") || text.includes("album")) return "🎧";
  if (text.includes("geografia") || text.includes("capitales") || text.includes("banderas") || text.includes("paises") || text.includes("rios")) return "🌍";
  if (text.includes("historia") || text.includes("guerra") || text.includes("edad media") || text.includes("civilizaciones") || text.includes("imperios")) return "🏛️";
  if (text.includes("ciencia") || text.includes("biologia") || text.includes("fisica") || text.includes("quimica") || text.includes("astronomia") || text.includes("cuerpo")) return "🧪";
  if (text.includes("tecnologia") || text.includes("internet") || text.includes("hardware") || text.includes("software") || text.includes("ciberseguridad")) return "💻";
  if (text.includes("gaming") || text.includes("videojuegos") || text.includes("pokemon") || text.includes("minecraft") || text.includes("gta")) return "🎮";
  if (text.includes("naturaleza") || text.includes("animales") || text.includes("dinosaurios") || text.includes("oceanos")) return "🌿";
  if (text.includes("comida") || text.includes("gastronomia") || text.includes("postres") || text.includes("ingredientes")) return "🍔";
  if (text.includes("idiomas") || text.includes("ortografia") || text.includes("traducciones") || text.includes("etimologia")) return "🗣️";
  if (text.includes("iq") || text.includes("inteligencia") || text.includes("logica")) return "🧩";
  if (quiz.kind === "personal") return "✨";
  if (quiz.kind === "challenge") return "🧩";

  return "🧠";
}

export function QuizCard({ quiz, featured = false }: QuizCardProps) {
  const difficultyLabel = difficultyLabels[quiz.difficulty];

  return (
    <article className={`quiz-card ${featured ? "quiz-card-featured" : ""}`}>
      <span className={`difficulty-badge difficulty-${quiz.difficulty}`} aria-label={`Dificultad: ${difficultyLabel}`}>
        {difficultyLabel}
      </span>
      <div className="quiz-card-art" aria-hidden="true">
        <span>{getQuizEmoji(quiz)}</span>
      </div>
      <div>
        <p className="quiz-card-kicker">{quiz.kind === "trivia" ? "Trivia" : quiz.kind === "challenge" ? "Reto" : "Personal"}</p>
        <h3>{quiz.title}</h3>
        <p>{quiz.tagline}</p>
      </div>
      <div className="quiz-card-footer">
        <span className="quiz-duration">{quiz.duration}</span>
        <Link className="button button-small" href={quiz.href}>
          Empezar
        </Link>
      </div>
    </article>
  );
}
