export type QuizOption = {
  id: string;
  label: string;
  value: number;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

export type QuizResult = {
  id: string;
  title: string;
  age: string;
  summary: string;
  accent: string;
};

export type Quiz = {
  slug: string;
  title: string;
  tagline: string;
  duration: string;
  status: "available" | "soon";
  href: string;
};

export const quizzes: Quiz[] = [
  {
    slug: "edad-mental",
    title: "Test de edad mental",
    tagline: "Descubre que energia llevas por dentro.",
    duration: "1 min",
    status: "available",
    href: "/test/edad-mental"
  },
  {
    slug: "aura-digital",
    title: "Que aura digital tienes",
    tagline: "Tu vibe online en cinco decisiones.",
    duration: "Pronto",
    status: "soon",
    href: "#tests"
  },
  {
    slug: "modo-caos",
    title: "Nivel de caos diario",
    tagline: "Mide tu intensidad antes de abrir otra app.",
    duration: "Pronto",
    status: "soon",
    href: "#tests"
  }
];

export const mentalAgeQuestions: QuizQuestion[] = [
  {
    id: "plans",
    prompt: "Tu plan perfecto de sabado seria...",
    options: [
      { id: "plans-a", label: "Improvisar y ver donde acaba la noche", value: 18 },
      { id: "plans-b", label: "Algo divertido, pero con hora de vuelta", value: 27 },
      { id: "plans-c", label: "Cena tranquila y conversacion larga", value: 39 },
      { id: "plans-d", label: "Casa, calma y cero notificaciones", value: 52 }
    ]
  },
  {
    id: "money",
    prompt: "Cuando recibes dinero inesperado...",
    options: [
      { id: "money-a", label: "Lo gasto en algo que me suba el animo", value: 20 },
      { id: "money-b", label: "Mitad capricho, mitad ahorro", value: 29 },
      { id: "money-c", label: "Pienso en prioridades antes de tocarlo", value: 42 },
      { id: "money-d", label: "Ya tiene destino en mi hoja mental", value: 55 }
    ]
  },
  {
    id: "conflict",
    prompt: "Si hay drama en el grupo...",
    options: [
      { id: "conflict-a", label: "Entro a mirar porque necesito contexto", value: 19 },
      { id: "conflict-b", label: "Intento bajar el volumen sin desaparecer", value: 31 },
      { id: "conflict-c", label: "Hablo claro y cierro el tema", value: 44 },
      { id: "conflict-d", label: "Me retiro antes de que me quite energia", value: 57 }
    ]
  },
  {
    id: "phone",
    prompt: "Tu relacion con el movil es...",
    options: [
      { id: "phone-a", label: "Si vibra, miro. Si no vibra, tambien", value: 18 },
      { id: "phone-b", label: "Lo uso mucho, pero se cuando parar", value: 28 },
      { id: "phone-c", label: "Silenciado casi siempre", value: 43 },
      { id: "phone-d", label: "Modo avion emocional", value: 60 }
    ]
  },
  {
    id: "change",
    prompt: "Cuando algo cambia de golpe...",
    options: [
      { id: "change-a", label: "Me lanzo y luego entiendo el mapa", value: 21 },
      { id: "change-b", label: "Me adapto rapido si tiene sentido", value: 30 },
      { id: "change-c", label: "Necesito ordenar las piezas primero", value: 46 },
      { id: "change-d", label: "Prefiero estabilidad con margen", value: 58 }
    ]
  }
];

export const mentalAgeResults: QuizResult[] = [
  {
    id: "spark",
    title: "Alma impulsiva",
    age: "19",
    summary: "Tu edad mental vive en modo estreno: curiosa, rapida y con ganas de probar antes de analizar demasiado.",
    accent: "#ff5b6e"
  },
  {
    id: "pulse",
    title: "Mente flexible",
    age: "29",
    summary: "Tienes energia joven con bastante criterio. Te gusta pasarlo bien, pero sabes poner limites cuando toca.",
    accent: "#18b7a0"
  },
  {
    id: "focus",
    title: "Cabeza serena",
    age: "43",
    summary: "Tu radar detecta el ruido rapido. Prefieres decisiones con calma, relaciones claras y planes que no te roben paz.",
    accent: "#f4b63f"
  },
  {
    id: "sage",
    title: "Sabiduria tranquila",
    age: "57",
    summary: "Tu energia es selectiva y muy tuya. No todo merece respuesta, no todo merece prisa, y eso te queda bien.",
    accent: "#3568ff"
  }
];

export function getMentalAgeResult(score: number) {
  if (score < 25) return mentalAgeResults[0];
  if (score < 37) return mentalAgeResults[1];
  if (score < 50) return mentalAgeResults[2];
  return mentalAgeResults[3];
}
