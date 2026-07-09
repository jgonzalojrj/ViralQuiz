import type { Quiz, QuizSection } from "./quizzes";

export const siteName = "ViralQuiz";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://viral-quiz.vercel.app";

export const siteUrl = (configuredSiteUrl.startsWith("http") ? configuredSiteUrl : `https://${configuredSiteUrl}`).replace(/\/$/, "");

export const defaultSeoTitle = "ViralQuiz | Mini tests virales, rapidos y gratis";
export const defaultSeoDescription =
  "Haz mini tests virales de cultura general, futbol, personalidad, IQ y mas. Reta a tus amigos y descubre cuantas aciertas.";
export const defaultOgImage = "/images/viralquiz-hero.png";

const quizTitleOverrides: Record<string, string> = {
  "cultura-general": "Test de Cultura General: cuantas aciertas? | ViralQuiz",
  "conocimientos-futbol": "Test de Futbol: solo los que saben aciertan todas | ViralQuiz",
  "iq-rapido": "Test de IQ rapido: pon a prueba tu logica | ViralQuiz",
  "cine-series": "Test de Cine y Series: demuestra tu memoria pop | ViralQuiz",
  "cultura-musical": "Test de Musica: cuanto sabes de artistas y canciones | ViralQuiz",
  "geografia-express": "Test de Geografia: mapas, paises y pistas | ViralQuiz"
};

const quizDescriptionOverrides: Record<string, string> = {
  "cultura-general": "Haz este test rapido de cultura general y descubre si puedes acertarlas todas. Gratis, visual y perfecto para retar a tus amigos.",
  "conocimientos-futbol": "Pon a prueba tus conocimientos de futbol con este mini quiz rapido. Seras capaz de acertarlas todas?",
  "iq-rapido": "Resuelve matrices, patrones, series y deducciones en un test de IQ rapido, visual y orientativo. No es una prueba oficial.",
  "cine-series": "Juega un test rapido de cine y series con preguntas de peliculas, personajes y cultura pop. Ideal para compartir.",
  "cultura-musical": "Haz un test de musica con artistas, grupos, canciones y cultura musical. Rapido, gratis y con resultado instantaneo.",
  "geografia-express": "Prueba este test de geografia con paises, capitales, mapas y pistas. Un reto rapido para jugar y compartir."
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getQuizSeoTitle(quiz: Quiz) {
  return quizTitleOverrides[quiz.slug] ?? `${quiz.title}: test rapido gratis | ViralQuiz`;
}

export function getQuizSeoDescription(quiz: Quiz) {
  return (
    quizDescriptionOverrides[quiz.slug] ??
    `${quiz.tagline} Haz este test de ${quiz.questions.length} preguntas en ViralQuiz: rapido, gratis y con resultado instantaneo.`
  );
}

export function getCategorySeoTitle(section: QuizSection) {
  return `${section.title}: tests rapidos y gratis | ViralQuiz`;
}

export function getCategorySeoDescription(section: QuizSection) {
  return `${section.description} Explora ${section.quizzes.length} tests de ViralQuiz con resultados instantaneos y enlaces para compartir.`;
}

export function getQuizKeywords(quiz: Quiz, categoryTitle?: string) {
  return [
    quiz.title,
    quiz.tagline,
    categoryTitle,
    "test rapido",
    "quiz online",
    "mini test",
    "ViralQuiz"
  ].filter(Boolean) as string[];
}
