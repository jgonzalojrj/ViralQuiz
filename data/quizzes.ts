import { advancedQuizDraftsBySection, expandedKnowledgeTriviaSeeds, type TriviaSeed } from "./trivia";

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
  scoreLabel: string;
  subtitle: string;
  summary: string;
  reason: string;
  accent: string;
};

export type QuizKind = "personal" | "trivia" | "challenge";
export type QuizDifficulty = "facil" | "medio" | "dificil" | "extremo";

export type Quiz = {
  slug: string;
  title: string;
  tagline: string;
  duration: string;
  kind: QuizKind;
  difficulty: QuizDifficulty;
  note: string;
  href: string;
  questions: QuizQuestion[];
  results: QuizResult[];
};

export type QuizSection = {
  id: string;
  title: string;
  description: string;
  accent: string;
  quizzes: Quiz[];
};

type QuizDraft = {
  slug: string;
  title: string;
  tagline: string;
  duration?: string;
  kind: QuizKind;
  subject: string;
  difficulty?: QuizDifficulty;
};

type AdvancedSectionId = keyof typeof advancedQuizDraftsBySection;

const personalPrompts = [
  "Cuando algo cambia de golpe, tu primera reaccion suele ser...",
  "En un grupo con muchas opiniones, normalmente...",
  "Si tienes una tarde libre, prefieres...",
  "Cuando te equivocas, lo mas probable es que...",
  "Ante una decision rapida, tiras mas de...",
  "Tu energia social despues de un plan largo queda...",
  "Cuando alguien te pide ayuda, sueles...",
  "Si una tarea se complica, tu impulso es...",
  "Tu relacion con las rutinas es...",
  "Cuando recibes una critica, normalmente...",
  "En una conversacion intensa, tiendes a...",
  "Si tienes que aprender algo nuevo, empiezas por...",
  "Cuando hay demasiado ruido alrededor, necesitas...",
  "Tu forma de celebrar algo bueno es...",
  "Cuando un plan sale diferente, sueles..."
];

const personalOptions = [
  ["Improvisar y ver que pasa", "Pedir contexto antes de moverte", "Ordenar prioridades", "Parar y elegir con calma"],
  ["Hablar primero", "Escuchar y entrar despues", "Buscar el punto medio", "Cerrar el tema con claridad"],
  ["Un plan espontaneo", "Algo divertido pero sencillo", "Descansar con buena compania", "Tiempo tranquilo para ti"],
  ["Reirte y seguir", "Aprender la leccion", "Revisar que fallo", "Darte espacio para pensar"],
  ["Instinto", "Experiencia", "Datos", "Calma"],
  ["Alta, si hubo buena vibra", "Bien, si no se alargo demasiado", "Justa, pero satisfecha", "Necesitando silencio"],
  ["Resolver rapido", "Acompanarle", "Hacer preguntas utiles", "Marcar limites si hace falta"],
  ["Probar otro camino", "Pedir una segunda mirada", "Dividirla en partes", "Soltarla un rato"],
  ["Flexible", "Con margen", "Bastante estable", "Muy importante"],
  ["Responder en caliente", "Pensarlo un poco", "Quedarte con lo util", "Tomar distancia"],
  ["Subir la energia", "Cuidar el tono", "Ir al punto", "Bajar el ritmo"],
  ["Tocando botones", "Mirando ejemplos", "Haciendo esquema", "Leyendo bien la base"],
  ["Cambiar de ambiente", "Musica o foco", "Lista clara", "Pausa total"],
  ["Contarlo al momento", "Compartirlo con alguien cercano", "Hacer algo especial", "Guardarlo con calma"],
  ["Adaptarte rapido", "Negociar una opcion", "Reorganizar", "Preferir otro dia"]
];

const mentalAgeQuestions: QuizQuestion[] = [
  {
    id: "edad-mental-1",
    prompt: "Tu sabado ideal empieza con...",
    options: makeOptions(["Plan sin mirar la hora", "Algo divertido pero facil", "Recados hechos y cena tranquila", "Casa, silencio y cero prisas"], "edad-mental-1", [16, 27, 42, 58])
  },
  {
    id: "edad-mental-2",
    prompt: "Si el grupo cambia el plan a ultima hora, tu reaccion es...",
    options: makeOptions(["Me apunto igual", "Pregunto dos detalles y voy", "Reorganizo antes de decir que si", "Prefiero dejarlo para otro dia"], "edad-mental-2", [18, 29, 45, 60])
  },
  {
    id: "edad-mental-3",
    prompt: "Cuando te llega dinero inesperado...",
    options: makeOptions(["Capricho inmediato", "Mitad gusto, mitad cabeza", "Lo guardo para algo util", "Ya se exactamente donde va"], "edad-mental-3", [17, 30, 44, 57])
  },
  {
    id: "edad-mental-4",
    prompt: "Con las notificaciones del movil eres...",
    options: makeOptions(["Las miro al momento", "Las reviso por tandas", "Muchas estan silenciadas", "Modo no molestar casi siempre"], "edad-mental-4", [16, 28, 43, 59])
  },
  {
    id: "edad-mental-5",
    prompt: "Si hay drama cerca, normalmente...",
    options: makeOptions(["Entro por contexto", "Escucho sin meter mucho ruido", "Intento cerrar el tema", "Me aparto antes de cargarme"], "edad-mental-5", [19, 31, 46, 60])
  },
  {
    id: "edad-mental-6",
    prompt: "Tu forma de comprar algo caro es...",
    options: makeOptions(["Si me encanta, adelante", "Comparo un poco y decido", "Espero y reviso presupuesto", "Solo si encaja perfecto"], "edad-mental-6", [18, 32, 47, 59])
  },
  {
    id: "edad-mental-7",
    prompt: "Cuando aprendes algo nuevo, prefieres...",
    options: makeOptions(["Probar y equivocarme", "Ver ejemplos rapidos", "Entender el sistema", "Leer bien antes de tocar"], "edad-mental-7", [17, 29, 41, 55])
  },
  {
    id: "edad-mental-8",
    prompt: "Tu energia social despues de un dia largo es...",
    options: makeOptions(["Todavia me apunto a algo", "Depende del plan", "Solo con gente de confianza", "Necesito desaparecer un rato"], "edad-mental-8", [16, 30, 44, 58])
  },
  {
    id: "edad-mental-9",
    prompt: "Ante una decision importante tiras mas de...",
    options: makeOptions(["Instinto rapido", "Lo que me pide el cuerpo", "Pros, contras y contexto", "Tiempo, calma y datos"], "edad-mental-9", [18, 27, 43, 60])
  },
  {
    id: "edad-mental-10",
    prompt: "Si alguien te critica, sueles...",
    options: makeOptions(["Responder al momento", "Darle una vuelta despues", "Quedarme con lo util", "Tomar distancia antes de hablar"], "edad-mental-10", [19, 31, 45, 57])
  },
  {
    id: "edad-mental-11",
    prompt: "Tu relacion con la rutina es...",
    options: makeOptions(["Me aburre rapido", "Me ayuda si es flexible", "La necesito para funcionar", "Es mi paz mental"], "edad-mental-11", [16, 28, 42, 56])
  },
  {
    id: "edad-mental-12",
    prompt: "Cuando un viaje se acerca, tu maleta...",
    options: makeOptions(["Se hace a ultima hora", "Tiene lo basico y ya", "Lleva lista mental", "Esta pensada por escenarios"], "edad-mental-12", [17, 30, 46, 59])
  },
  {
    id: "edad-mental-13",
    prompt: "Si tienes una tarde libre inesperada...",
    options: makeOptions(["Busco plan", "Improviso algo pequeno", "Aprovecho para ordenar cosas", "Descanso sin culpa"], "edad-mental-13", [18, 29, 44, 55])
  },
  {
    id: "edad-mental-14",
    prompt: "En una conversacion intensa, tiendes a...",
    options: makeOptions(["Subir la energia", "Intentar explicarte rapido", "Elegir bien las palabras", "Bajar el ritmo"], "edad-mental-14", [19, 32, 47, 60])
  },
  {
    id: "edad-mental-15",
    prompt: "Cuando algo no sale como querias...",
    options: makeOptions(["Cambio de plan sobre la marcha", "Me frustro un poco y sigo", "Analizo que fallo", "Acepto y recalculo con calma"], "edad-mental-15", [17, 30, 45, 58])
  }
];

const mentalAgeResults: QuizResult[] = [
  {
    id: "teen",
    title: "Chispa adolescente",
    scoreLabel: "16",
    subtitle: "Vas con ganas, curiosidad y cero necesidad de pedir permiso.",
    summary: "Tu edad mental va ligera, impulsiva y muy viva. Te mueve mas la energia del momento que el manual de instrucciones, y eso te da un punto fresco.",
    reason: "Tus respuestas tiran hacia planes espontaneos, decisiones rapidas y poca paciencia para darle veinte vueltas a todo.",
    accent: "#ff5b6e"
  },
  {
    id: "young",
    title: "Mente joven",
    scoreLabel: "24",
    subtitle: "Espontaneidad, pero con un poco mas de filtro.",
    summary: "Tienes ganas de moverte y probar cosas, pero ya empiezas a elegir mejor tus batallas. Sigues teniendo chispa, solo que ahora la usas con mas criterio.",
    reason: "Has mezclado respuestas impulsivas con otras mas pensadas: te apuntas al plan, pero ya miras si encaja contigo.",
    accent: "#18b7a0"
  },
  {
    id: "adult",
    title: "Equilibrio adulto",
    scoreLabel: "36",
    subtitle: "Sabes pasarlo bien sin perder del todo el volante.",
    summary: "Tu resultado mezcla energia y criterio. Puedes improvisar, pero tambien detectas cuando toca poner orden, cuidar el tiempo o bajar un poco el ruido.",
    reason: "Tus elecciones suelen quedarse en el punto medio: ni todo impulso ni todo control. Te adaptas, pero con cabeza.",
    accent: "#f4b63f"
  },
  {
    id: "calm",
    title: "Cabeza serena",
    scoreLabel: "48",
    subtitle: "Tu paz pesa mas que el drama del momento.",
    summary: "Lees bastante bien las situaciones y no todo te arrastra. Prefieres calma, claridad y decisiones con sentido, incluso si eso te hace ir a otro ritmo.",
    reason: "Tus respuestas muestran preferencia por planificar, filtrar energia y evitar entrar en cosas que no te compensan.",
    accent: "#3568ff"
  },
  {
    id: "wise",
    title: "Sabiduria tranquila",
    scoreLabel: "60",
    subtitle: "Observas mucho, eliges mejor y no corres por cualquiera.",
    summary: "Tu energia es selectiva y muy tuya. No todo merece prisa, respuesta o explicacion, y esa forma de proteger tu calma te queda bastante bien.",
    reason: "Has elegido opciones muy orientadas a pausa, distancia y control. Para ti, responder bien suele importar mas que responder rapido.",
    accent: "#9b5cff"
  }
];

const iqQuickQuestions: QuizQuestion[] = [
  {
    id: "iq-rapido-1",
    prompt: "Completa la serie: 2, 4, 8, 16...",
    options: makeOptions(["24", "30", "32", "36"], "iq-rapido-1", [1, 1, 4, 1])
  },
  {
    id: "iq-rapido-2",
    prompt: "Si MAR es a AGUA como DESIERTO es a...",
    options: makeOptions(["Arena", "Sol", "Sequedad", "Oasis"], "iq-rapido-2", [4, 1, 1, 1])
  },
  {
    id: "iq-rapido-3",
    prompt: "Que numero falta: 3, 6, 12, 24...",
    options: makeOptions(["36", "42", "48", "54"], "iq-rapido-3", [1, 1, 4, 1])
  },
  {
    id: "iq-rapido-4",
    prompt: "Cual sobra en este grupo?",
    options: makeOptions(["Triangulo", "Cuadrado", "Circulo", "Mesa"], "iq-rapido-4", [2, 2, 2, 4])
  },
  {
    id: "iq-rapido-5",
    prompt: "Si A=1, B=2 y C=3, cuanto vale CAB?",
    options: makeOptions(["312", "321", "123", "213"], "iq-rapido-5", [4, 1, 1, 1])
  },
  {
    id: "iq-rapido-6",
    prompt: "Todos los lunes son dias. Algunos dias son lluviosos. Entonces...",
    options: makeOptions(["Todos los lunes son lluviosos", "Algunos dias pueden ser lunes", "Ningun lunes es dia", "Todos los dias son lunes"], "iq-rapido-6", [1, 4, 1, 1])
  },
  {
    id: "iq-rapido-7",
    prompt: "Que figura tiene mas lados?",
    options: makeOptions(["Pentagono", "Hexagono", "Triangulo", "Cuadrado"], "iq-rapido-7", [2, 4, 1, 1])
  },
  {
    id: "iq-rapido-8",
    prompt: "Completa: 1, 1, 2, 3, 5...",
    options: makeOptions(["6", "7", "8", "10"], "iq-rapido-8", [1, 1, 4, 1])
  },
  {
    id: "iq-rapido-9",
    prompt: "Si cambias el orden de las letras de ROMA puedes formar...",
    options: makeOptions(["AMOR", "RAMO", "MORA", "Todas valen"], "iq-rapido-9", [2, 2, 2, 4])
  },
  {
    id: "iq-rapido-10",
    prompt: "Que numero es la mitad de la mitad de 40?",
    options: makeOptions(["5", "10", "15", "20"], "iq-rapido-10", [1, 4, 1, 2])
  },
  {
    id: "iq-rapido-11",
    prompt: "Si hoy es martes, que dia sera dentro de 10 dias?",
    options: makeOptions(["Jueves", "Viernes", "Sabado", "Domingo"], "iq-rapido-11", [1, 4, 1, 1])
  },
  {
    id: "iq-rapido-12",
    prompt: "Cual es la relacion: libro es a leer como pelicula es a...",
    options: makeOptions(["Mirar", "Ver", "Escribir", "Pintar"], "iq-rapido-12", [2, 4, 1, 1])
  },
  {
    id: "iq-rapido-13",
    prompt: "Que numero falta: 100, 90, 80, 70...",
    options: makeOptions(["65", "60", "50", "40"], "iq-rapido-13", [1, 4, 2, 1])
  },
  {
    id: "iq-rapido-14",
    prompt: "Si tres cajas pesan igual y juntas pesan 18 kg, cuanto pesa una?",
    options: makeOptions(["3 kg", "6 kg", "9 kg", "12 kg"], "iq-rapido-14", [1, 4, 1, 1])
  },
  {
    id: "iq-rapido-15",
    prompt: "Cual completa mejor la secuencia: rojo, azul, rojo, azul...",
    options: makeOptions(["Rojo", "Verde", "Azul", "Amarillo"], "iq-rapido-15", [4, 1, 1, 1])
  }
];

const knowledgeTriviaSeeds: Record<string, TriviaSeed[]> = {
  ...expandedKnowledgeTriviaSeeds,
  "conocimientos-futbol": [
    { prompt: "Cuantos jugadores tiene un equipo de futbol en el campo al empezar?", correct: "11", wrong: ["9", "10", "12"] },
    { prompt: "Que sancion muestra el arbitro para expulsar a un jugador?", correct: "Tarjeta roja", wrong: ["Tarjeta azul", "Tarjeta verde", "Tarjeta blanca"] },
    { prompt: "Cuanto dura normalmente un partido oficial sin descuento?", correct: "90 minutos", wrong: ["60 minutos", "80 minutos", "100 minutos"] },
    { prompt: "Que competicion de selecciones se juega cada cuatro anos?", correct: "Mundial", wrong: ["Copa local", "Liga regular", "Supercopa"] },
    { prompt: "Que parte del cuerpo no puede usar un jugador de campo de forma voluntaria?", correct: "La mano", wrong: ["La cabeza", "El pecho", "La rodilla"] },
    { prompt: "Que posicion defiende la porteria con las manos dentro del area?", correct: "Portero", wrong: ["Lateral", "Pivote", "Extremo"] },
    { prompt: "Como se llama el lanzamiento desde los once metros?", correct: "Penalti", wrong: ["Corner", "Saque de banda", "Libre indirecto"] },
    { prompt: "Que pasa si el balon cruza totalmente la linea de gol?", correct: "Es gol", wrong: ["Es saque de banda", "Es bote neutral", "Se repite la jugada"] },
    { prompt: "Como se llama el saque desde la esquina del campo?", correct: "Corner", wrong: ["Penalti", "Saque inicial", "Fuera de juego"] },
    { prompt: "Que torneo europeo juegan clubes de elite?", correct: "Champions League", wrong: ["NBA", "Davis Cup", "Six Nations"] },
    { prompt: "Que significa estar en fuera de juego?", correct: "Recibir en posicion adelantada ilegal", wrong: ["Salir del campo", "Tocar con la cabeza", "Pedir cambio"] },
    { prompt: "Que equipo gana un partido?", correct: "El que marca mas goles", wrong: ["El que tira mas corners", "El que tiene mas posesion", "El que comete menos faltas"] },
    { prompt: "Que hace el VAR?", correct: "Revisa jugadas concretas", wrong: ["Sustituye al arbitro", "Decide todos los pases", "Cuenta espectadores"] },
    { prompt: "Que jugador suele organizar desde el centro?", correct: "Centrocampista", wrong: ["Portero", "Aficionado", "Recogepelotas"] },
    { prompt: "Que se concede si el balon sale por linea de fondo tocado por defensa?", correct: "Corner", wrong: ["Penalti", "Saque de centro", "Final del partido"] }
  ],
  "conocimientos-baloncesto": [
    { prompt: "Cuantos jugadores por equipo hay en pista en baloncesto?", correct: "5", wrong: ["4", "6", "7"] },
    { prompt: "Cuantos puntos vale un tiro libre anotado?", correct: "1", wrong: ["2", "3", "4"] },
    { prompt: "Cuantos puntos vale un triple?", correct: "3", wrong: ["1", "2", "5"] },
    { prompt: "Que liga estadounidense es la mas conocida del baloncesto profesional?", correct: "NBA", wrong: ["NFL", "MLB", "NHL"] },
    { prompt: "Que accion consiste en botar el balon mientras avanzas?", correct: "Driblar", wrong: ["Rematar", "Sacar", "Blocaje"] },
    { prompt: "Que pasa si das demasiados pasos sin botar?", correct: "Pasos", wrong: ["Triple", "Mate", "Tiempo muerto"] },
    { prompt: "Que jugador suele dirigir el ataque?", correct: "Base", wrong: ["Portero", "Piloto", "Delantero"] },
    { prompt: "Como se llama anotar hundiendo el balon en el aro?", correct: "Mate", wrong: ["Ace", "Gol", "Touchdown"] },
    { prompt: "Que elemento debe tocar el balon para encestar?", correct: "El aro o la red", wrong: ["La linea lateral", "El banquillo", "El reloj"] },
    { prompt: "Que es un rebote?", correct: "Recuperar el balon tras un tiro fallado", wrong: ["Pedir cambio", "Hacer falta tecnica", "Sacar de banda"] },
    { prompt: "Que senala una falta personal?", correct: "Contacto ilegal", wrong: ["Canasta valida", "Final de cuarto", "Salto inicial"] },
    { prompt: "Que es una asistencia?", correct: "Pase que facilita una canasta", wrong: ["Un bloqueo ilegal", "Un tiro libre", "Una perdida"] },
    { prompt: "Que suele medir el reloj de posesion?", correct: "Tiempo para lanzar", wrong: ["Altura del aro", "Faltas del publico", "Descanso"] },
    { prompt: "Que competicion internacional organiza FIBA?", correct: "Mundial de baloncesto", wrong: ["Wimbledon", "Tour de Francia", "Copa Davis"] },
    { prompt: "Que ocurre si el balon sale por banda?", correct: "Saque para el rival", wrong: ["Penalti", "Triple automatico", "Salto siempre"] }
  ],
  "conocimientos-tenis": [
    { prompt: "Como se llama un saque directo que el rival no toca?", correct: "Ace", wrong: ["Mate", "Gol", "Sprint"] },
    { prompt: "Que puntuacion sigue a 30 en un juego?", correct: "40", wrong: ["35", "45", "50"] },
    { prompt: "Que torneo se juega sobre hierba en Londres?", correct: "Wimbledon", wrong: ["Roland Garros", "US Open", "Montecarlo"] },
    { prompt: "Que superficie caracteriza a Roland Garros?", correct: "Tierra batida", wrong: ["Hielo", "Cemento azul siempre", "Hierba artificial"] },
    { prompt: "Como se llama ganar un set 6-0?", correct: "Rosco", wrong: ["Hat-trick", "Tie-break", "Pole"] },
    { prompt: "Que golpe se realiza antes de que bote la pelota?", correct: "Volea", wrong: ["Reves liftado tras bote", "Servicio segundo", "Globo obligado"] },
    { prompt: "Que significa deuce?", correct: "Iguales", wrong: ["Ventaja", "Set ganado", "Partido terminado"] },
    { prompt: "Cuantos Grand Slam principales hay cada ano?", correct: "4", wrong: ["2", "3", "6"] },
    { prompt: "Que golpe se ejecuta con la mano dominante por el lado natural?", correct: "Derecha", wrong: ["Saque", "Reves", "Dejada"] },
    { prompt: "Que es un tie-break?", correct: "Desempate de un set", wrong: ["Cambio de raqueta", "Sancion", "Descanso medico"] },
    { prompt: "Que torneo se juega en Nueva York?", correct: "US Open", wrong: ["Australian Open", "Roland Garros", "Queen's"] },
    { prompt: "Que pasa si un saque toca la red y entra?", correct: "Let y se repite", wrong: ["Punto perdido siempre", "Punto ganado", "Cambio de lado"] },
    { prompt: "Que es una doble falta?", correct: "Fallar los dos saques", wrong: ["Ganar dos puntos", "Tocar dos raquetas", "Dos botes validos"] },
    { prompt: "Como se llama un golpe suave para dejar la pelota cerca de la red?", correct: "Dejada", wrong: ["Smash", "Ace", "Passing shot"] },
    { prompt: "Que se cambia en los juegos impares?", correct: "Lado de la pista", wrong: ["Pelota obligatoria", "Arbitro", "Sistema de puntos"] }
  ],
  "conocimientos-formula-1": [
    { prompt: "Que significa F1?", correct: "Formula 1", wrong: ["Fase 1", "Final 1", "Fuerza 1"] },
    { prompt: "Que determina la sesion de clasificacion?", correct: "La parrilla de salida", wrong: ["El campeon", "El clima", "El numero de vueltas"] },
    { prompt: "Como se llama cambiar neumaticos durante la carrera?", correct: "Pit stop", wrong: ["Ace", "Corner", "Time out"] },
    { prompt: "Que bandera indica peligro y prohibe adelantar?", correct: "Bandera amarilla", wrong: ["Bandera verde", "Bandera a cuadros", "Bandera azul"] },
    { prompt: "Que bandera marca el final de la carrera?", correct: "A cuadros", wrong: ["Roja", "Negra y blanca", "Amarilla"] },
    { prompt: "Que sistema ayuda a reducir resistencia en recta?", correct: "DRS", wrong: ["VAR", "ABS de calle", "GPS"] },
    { prompt: "Que significa pole position?", correct: "Salir primero", wrong: ["Entrar a boxes", "Ultima vuelta", "Vuelta lenta"] },
    { prompt: "Que compuesto suele agarrar mas pero durar menos?", correct: "Blando", wrong: ["Duro", "Intermedio siempre", "Lluvia extrema"] },
    { prompt: "Que pasa con bandera roja?", correct: "Se detiene la sesion", wrong: ["Se dobla la puntuacion", "Se abre DRS", "Se cambia de circuito"] },
    { prompt: "Que mide una vuelta rapida?", correct: "El menor tiempo por vuelta", wrong: ["El consumo total", "La edad del piloto", "La posicion final"] },
    { prompt: "Que equipo historico usa mucho el color rojo?", correct: "Ferrari", wrong: ["Williams", "Alpine", "Haas siempre azul"] },
    { prompt: "Que es el safety car?", correct: "Coche de seguridad", wrong: ["Coche reserva", "Coche medico siempre", "Coche de prensa"] },
    { prompt: "Que piloto gana una carrera?", correct: "El primero en completar la distancia", wrong: ["El que lidera la primera vuelta", "El mas rapido en libres", "El que cambia menos ruedas"] },
    { prompt: "Que son los libres?", correct: "Sesiones de practica", wrong: ["Carreras oficiales", "Sanciones", "Repostajes"] },
    { prompt: "Que indica una bandera azul?", correct: "Dejar pasar a un coche mas rapido que te dobla", wrong: ["Lluvia fuerte", "Final de carrera", "Salida abortada"] }
  ],
  "adivina-deporte-pista": [
    { prompt: "Se juega con raqueta, red y puntos como 15, 30 y 40.", correct: "Tenis", wrong: ["Balonmano", "Rugby", "Golf"] },
    { prompt: "Hay canastas, triples y cinco jugadores por equipo.", correct: "Baloncesto", wrong: ["Tenis", "Futbol", "Natacion"] },
    { prompt: "Los pilotos paran en boxes y buscan la pole.", correct: "Formula 1", wrong: ["Ciclismo", "Beisbol", "Judo"] },
    { prompt: "Se marca gol en una porteria y existe el fuera de juego.", correct: "Futbol", wrong: ["Tenis", "Golf", "Atletismo"] },
    { prompt: "Se usa un bate y se corre por bases.", correct: "Beisbol", wrong: ["Baloncesto", "Rugby", "Boxeo"] },
    { prompt: "El objetivo es meter la bola en hoyos con pocos golpes.", correct: "Golf", wrong: ["Hockey", "Tenis", "Voleibol"] },
    { prompt: "Se juega en una piscina con estilos como crol y braza.", correct: "Natacion", wrong: ["Padel", "Futbol sala", "Esgrima"] },
    { prompt: "Tiene meles, ensayos y un balon ovalado.", correct: "Rugby", wrong: ["Tenis", "Baloncesto", "Golf"] },
    { prompt: "Se golpea un volante por encima de una red.", correct: "Badminton", wrong: ["Waterpolo", "Beisbol", "Boxeo"] },
    { prompt: "Se compite en aparatos como anillas o barra.", correct: "Gimnasia", wrong: ["Formula 1", "Futbol", "Tenis"] },
    { prompt: "Hay ippon, tatami y agarres.", correct: "Judo", wrong: ["Baloncesto", "Golf", "Ciclismo"] },
    { prompt: "Se corre por carriles en pruebas de velocidad.", correct: "Atletismo", wrong: ["Ajedrez", "Tenis", "Rugby"] },
    { prompt: "Se juega con stick y puede ser sobre hielo o cesped.", correct: "Hockey", wrong: ["Boxeo", "Natacion", "Golf"] },
    { prompt: "Hay sets, remates y bloqueo junto a una red alta.", correct: "Voleibol", wrong: ["Formula 1", "Beisbol", "Rugby"] },
    { prompt: "Se lanzan flechas a una diana.", correct: "Tiro con arco", wrong: ["Tenis", "Futbol", "Baloncesto"] }
  ],
  "reglas-deportivas": [
    { prompt: "En futbol, tocar el balon con la mano voluntariamente suele ser...", correct: "Falta", wrong: ["Triple", "Ace", "Mate"] },
    { prompt: "En baloncesto, avanzar sin botar puede ser...", correct: "Pasos", wrong: ["Corner", "Let", "Pole"] },
    { prompt: "En tenis, fallar los dos saques es...", correct: "Doble falta", wrong: ["Penalti", "Rebote", "Ensayo"] },
    { prompt: "En F1, adelantar con bandera amarilla suele estar...", correct: "Prohibido", wrong: ["Obligado", "Premiado", "Sin regular"] },
    { prompt: "En voleibol, cada equipo suele tener como maximo...", correct: "Tres toques", wrong: ["Un toque", "Cinco toques", "Diez toques"] },
    { prompt: "En rugby, apoyar el balon en la zona de marca es...", correct: "Ensayo", wrong: ["Ace", "Triple", "Corner"] },
    { prompt: "En golf, gana quien completa el recorrido con...", correct: "Menos golpes", wrong: ["Mas golpes", "Mas tarjetas", "Mas saques"] },
    { prompt: "En natacion, salir antes de la senal puede ser...", correct: "Descalificacion", wrong: ["Punto extra", "Corner", "Let"] },
    { prompt: "En boxeo, caer y no levantarse a la cuenta puede ser...", correct: "KO", wrong: ["Tie-break", "Penalti", "Pole"] },
    { prompt: "En beisbol, tres strikes suelen provocar...", correct: "Eliminacion del bateador", wrong: ["Gol", "Triple automatico", "Saque de banda"] },
    { prompt: "En balonmano, pisar el area siendo jugador de campo suele ser...", correct: "Infraccion", wrong: ["Canasta", "Ace", "Touchdown"] },
    { prompt: "En tenis, la pelota debe botar dentro de las lineas para ser...", correct: "Buena", wrong: ["Roja", "Fuera siempre", "Neutral"] },
    { prompt: "En futbol, una falta dentro del area propia puede acabar en...", correct: "Penalti", wrong: ["Ace", "Pit stop", "Ensayo"] },
    { prompt: "En F1, entrar demasiado rapido al pit lane puede traer...", correct: "Sancion", wrong: ["Gol", "Triple", "Set"] },
    { prompt: "En judo, una puntuacion maxima tecnica se llama...", correct: "Ippon", wrong: ["Ace", "Mate", "Corner"] }
  ],
  "historia-futbol": [
    { prompt: "Que seleccion gano el Mundial masculino de 2010?", correct: "Espana", wrong: ["Brasil", "Italia", "Alemania"] },
    { prompt: "Donde se jugo la final del Mundial 2010?", correct: "Sudafrica", wrong: ["Francia", "Qatar", "Japon"] },
    { prompt: "Que pais ha ganado mas Mundiales masculinos?", correct: "Brasil", wrong: ["Espana", "Inglaterra", "Portugal"] },
    { prompt: "Que torneo europeo de clubes es el mas prestigioso?", correct: "Champions League", wrong: ["Copa Davis", "NBA", "Tour"] },
    { prompt: "Que jugador argentino gano el Mundial 2022 como capitan?", correct: "Lionel Messi", wrong: ["Diego Forlan", "Neymar", "Luka Modric"] },
    { prompt: "Que seleccion gano la Eurocopa 2008?", correct: "Espana", wrong: ["Francia", "Grecia", "Portugal"] },
    { prompt: "Que club es conocido por el lema 'Mes que un club'?", correct: "FC Barcelona", wrong: ["Liverpool", "Bayern", "Juventus"] },
    { prompt: "Que pais organizo el Mundial 1998?", correct: "Francia", wrong: ["Espana", "Mexico", "Italia"] },
    { prompt: "Que trofeo se entrega al ganador del Mundial?", correct: "Copa del Mundo", wrong: ["Balon de Oro", "Stanley Cup", "Davis Cup"] },
    { prompt: "Que seleccion gano el Mundial 2014?", correct: "Alemania", wrong: ["Argentina", "Holanda", "Chile"] },
    { prompt: "Que competicion enfrenta a selecciones europeas?", correct: "Eurocopa", wrong: ["Libertadores", "NBA Finals", "Wimbledon"] },
    { prompt: "Que club ingles juega en Anfield?", correct: "Liverpool", wrong: ["Chelsea", "Arsenal", "Everton siempre"] },
    { prompt: "Que pais gano el Mundial masculino 2006?", correct: "Italia", wrong: ["Francia", "Brasil", "Espana"] },
    { prompt: "Que premio reconoce a menudo al mejor futbolista del ano?", correct: "Balon de Oro", wrong: ["Oscar", "Grammy", "MVP de la NBA"] },
    { prompt: "Que torneo sudamericano juegan clubes?", correct: "Copa Libertadores", wrong: ["Eurocopa", "Six Nations", "Roland Garros"] }
  ],
  "jugadores-famosos": [
    { prompt: "Que jugador es conocido como CR7?", correct: "Cristiano Ronaldo", wrong: ["Kylian Mbappe", "Ronaldinho", "Sergio Ramos"] },
    { prompt: "Que argentino es famoso por el dorsal 10 y el Mundial 2022?", correct: "Lionel Messi", wrong: ["Neymar", "Iniesta", "Haaland"] },
    { prompt: "Que tenista espanol es icono de Roland Garros?", correct: "Rafael Nadal", wrong: ["Roger Federer", "Novak Djokovic", "Andy Murray"] },
    { prompt: "Que piloto britanico ha ganado multiples titulos de F1?", correct: "Lewis Hamilton", wrong: ["Fernando Alonso", "Carlos Sainz", "Max Verstappen"] },
    { prompt: "Que jugador de baloncesto fue icono de Chicago Bulls?", correct: "Michael Jordan", wrong: ["Tom Brady", "Rafael Nadal", "Leo Messi"] },
    { prompt: "Que jugador es conocido por el apodo 'King James'?", correct: "LeBron James", wrong: ["Stephen Curry", "Kobe Bryant", "Shaquille O'Neal"] },
    { prompt: "Que futbolista brasileno fue famoso por su sonrisa y magia?", correct: "Ronaldinho", wrong: ["Buffon", "Modric", "Kane"] },
    { prompt: "Que tenista suizo es conocido por su elegancia en pista?", correct: "Roger Federer", wrong: ["Rafa Benitez", "Pau Gasol", "Bolt"] },
    { prompt: "Que atleta jamaicano domino los 100 metros?", correct: "Usain Bolt", wrong: ["Mo Farah", "Carl Lewis", "Tyson Fury"] },
    { prompt: "Que jugador espanol marco el gol de la final del Mundial 2010?", correct: "Andres Iniesta", wrong: ["Xavi", "David Villa", "Iker Casillas"] },
    { prompt: "Que portero italiano es una leyenda llamado Buffon?", correct: "Gianluigi Buffon", wrong: ["Paolo Maldini", "Andrea Pirlo", "Francesco Totti"] },
    { prompt: "Que piloto espanol gano dos Mundiales de F1?", correct: "Fernando Alonso", wrong: ["Marc Marquez", "Carlos Sainz Jr.", "Pedro de la Rosa"] },
    { prompt: "Que jugador de baloncesto espanol triunfo en la NBA y la seleccion?", correct: "Pau Gasol", wrong: ["Ricky Rubio", "Marc Marquez", "Iker Casillas"] },
    { prompt: "Que futbolista frances es famoso por su velocidad y el PSG/Francia?", correct: "Kylian Mbappe", wrong: ["Antoine Griezmann", "Karim Benzema", "Olivier Giroud"] },
    { prompt: "Que piloto neerlandes es figura reciente de Red Bull?", correct: "Max Verstappen", wrong: ["Sebastian Vettel", "Lando Norris", "Charles Leclerc"] }
  ],
  "cultura-general": [
    { prompt: "Cual es la capital de Francia?", correct: "Paris", wrong: ["Roma", "Berlin", "Lisboa"] },
    { prompt: "Que planeta es conocido como el planeta rojo?", correct: "Marte", wrong: ["Venus", "Jupiter", "Saturno"] },
    { prompt: "Quien pinto La Gioconda?", correct: "Leonardo da Vinci", wrong: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet"] },
    { prompt: "Cual es el oceano mas grande del mundo?", correct: "Pacifico", wrong: ["Atlantico", "Indico", "Artico"] },
    { prompt: "Que sustancia tiene la formula H2O?", correct: "Agua", wrong: ["Oxigeno", "Sal", "Dioxido de carbono"] },
    { prompt: "En que continente esta Egipto?", correct: "Africa", wrong: ["Asia", "Europa", "Oceania"] },
    { prompt: "Cual es el idioma oficial principal de Brasil?", correct: "Portugues", wrong: ["Espanol", "Frances", "Italiano"] },
    { prompt: "Cual es el animal mas grande del mundo?", correct: "Ballena azul", wrong: ["Elefante africano", "Tiburon blanco", "Jirafa"] },
    { prompt: "En que pais esta la Torre Eiffel?", correct: "Francia", wrong: ["Italia", "Belgica", "Suiza"] },
    { prompt: "Cuantos lados tiene un hexagono?", correct: "6", wrong: ["5", "7", "8"] },
    { prompt: "Quien escribio Don Quijote de la Mancha?", correct: "Miguel de Cervantes", wrong: ["Federico Garcia Lorca", "Gabriel Garcia Marquez", "Lope de Vega"] },
    { prompt: "Que metal corresponde al simbolo quimico Au?", correct: "Oro", wrong: ["Plata", "Aluminio", "Cobre"] },
    { prompt: "Cual es el primer mes del ano?", correct: "Enero", wrong: ["Marzo", "Diciembre", "Septiembre"] },
    { prompt: "Cual es el rio mas largo de Sudamerica?", correct: "Amazonas", wrong: ["Nilo", "Danubio", "Rin"] },
    { prompt: "Que elemento quimico tiene el simbolo O?", correct: "Oxigeno", wrong: ["Oro", "Osmio", "Hidrogeno"] }
  ],
  "curiosidades-rapidas": [
    { prompt: "Que mamifero pone huevos?", correct: "Ornitorrinco", wrong: ["Delfin", "Koala", "Murcielago"] },
    { prompt: "Que producen las abejas a partir del nectar?", correct: "Miel", wrong: ["Leche", "Seda", "Aceite"] },
    { prompt: "Cual es el hueso mas largo del cuerpo humano?", correct: "Femur", wrong: ["Tibia", "Humero", "Radio"] },
    { prompt: "Que pais europeo suele asociarse con forma de bota?", correct: "Italia", wrong: ["Grecia", "Noruega", "Portugal"] },
    { prompt: "Cual es la estrella mas cercana a la Tierra?", correct: "El Sol", wrong: ["Sirio", "Vega", "Proxima Centauri"] },
    { prompt: "Que instrumento se usa para medir la temperatura?", correct: "Termometro", wrong: ["Barometro", "Cronometro", "Higrometro"] },
    { prompt: "Que gas es el mas abundante en el aire que respiramos?", correct: "Nitrogeno", wrong: ["Oxigeno", "Helio", "Dioxido de carbono"] },
    { prompt: "Que color se obtiene mezclando amarillo y azul?", correct: "Verde", wrong: ["Naranja", "Morado", "Rojo"] },
    { prompt: "Que numero representa la X en numeros romanos?", correct: "10", wrong: ["5", "50", "100"] },
    { prompt: "Cual es el satelite natural de la Tierra?", correct: "La Luna", wrong: ["Marte", "Europa", "Titan"] },
    { prompt: "Cual es el continente mas frio?", correct: "Antartida", wrong: ["Europa", "Asia", "America"] },
    { prompt: "Como se llama el proceso por el que las plantas fabrican alimento con luz?", correct: "Fotosintesis", wrong: ["Respiracion", "Evaporacion", "Fermentacion"] },
    { prompt: "Que animal aparece en el logotipo de WWF?", correct: "Panda", wrong: ["Tigre", "Oso polar", "Aguila"] },
    { prompt: "Que escala se asocia popularmente con la magnitud de los terremotos?", correct: "Richter", wrong: ["Beaufort", "Celsius", "Kelvin"] },
    { prompt: "De que pais es originario el sushi?", correct: "Japon", wrong: ["China", "Corea del Sur", "Tailandia"] }
  ],
  "geografia-express": [
    { prompt: "Cual es la capital de Italia?", correct: "Roma", wrong: ["Milan", "Venecia", "Florencia"] },
    { prompt: "En que pais esta Machu Picchu?", correct: "Peru", wrong: ["Mexico", "Chile", "Colombia"] },
    { prompt: "En que continente esta el rio Nilo?", correct: "Africa", wrong: ["Europa", "Asia", "America"] },
    { prompt: "En que continente se encuentra el desierto del Sahara?", correct: "Africa", wrong: ["Asia", "Oceania", "America"] },
    { prompt: "Cual es la capital de Japon?", correct: "Tokio", wrong: ["Kioto", "Osaka", "Seul"] },
    { prompt: "Que oceano separa America de Europa?", correct: "Atlantico", wrong: ["Pacifico", "Indico", "Artico"] },
    { prompt: "Que pais tiene una hoja de arce en su bandera?", correct: "Canada", wrong: ["Australia", "Irlanda", "Noruega"] },
    { prompt: "Cual es la capital de Argentina?", correct: "Buenos Aires", wrong: ["Montevideo", "Santiago", "Lima"] },
    { prompt: "Que cordillera separa Espana y Francia?", correct: "Pirineos", wrong: ["Alpes", "Andes", "Apeninos"] },
    { prompt: "En que pais estan Sydney y Melbourne?", correct: "Australia", wrong: ["Nueva Zelanda", "Canada", "Sudafrica"] },
    { prompt: "Que estrecho separa Espana y Marruecos?", correct: "Gibraltar", wrong: ["Bering", "Magallanes", "Bosforo"] },
    { prompt: "Cual es la capital de Portugal?", correct: "Lisboa", wrong: ["Oporto", "Braga", "Coimbra"] },
    { prompt: "Cual es el pais con mayor superficie del mundo?", correct: "Rusia", wrong: ["Canada", "China", "Estados Unidos"] },
    { prompt: "Cual es la montana mas alta del mundo?", correct: "Everest", wrong: ["K2", "Aconcagua", "Mont Blanc"] },
    { prompt: "Cual es la capital de Marruecos?", correct: "Rabat", wrong: ["Casablanca", "Marrakech", "Fez"] }
  ],
  "cultura-musical": [
    { prompt: "Que grupo canto Bohemian Rhapsody?", correct: "Queen", wrong: ["The Beatles", "ABBA", "Pink Floyd"] },
    { prompt: "Que artista canta Blinding Lights?", correct: "The Weeknd", wrong: ["Drake", "Bruno Mars", "Post Malone"] },
    { prompt: "De que pais es Shakira?", correct: "Colombia", wrong: ["Mexico", "Argentina", "Espana"] },
    { prompt: "Que instrumento tiene teclas blancas y negras?", correct: "Piano", wrong: ["Violin", "Bateria", "Trompeta"] },
    { prompt: "De donde es Bad Bunny?", correct: "Puerto Rico", wrong: ["Republica Dominicana", "Colombia", "Chile"] },
    { prompt: "Que artista lanzo el album Thriller?", correct: "Michael Jackson", wrong: ["Prince", "Stevie Wonder", "George Michael"] },
    { prompt: "Que banda tuvo como miembros a John Lennon y Paul McCartney?", correct: "The Beatles", wrong: ["The Rolling Stones", "Queen", "Oasis"] },
    { prompt: "Que instrumento clasico suele tener seis cuerdas?", correct: "Guitarra", wrong: ["Flauta", "Saxofon", "Timbal"] },
    { prompt: "Que cantante es conocida como la Reina del Pop?", correct: "Madonna", wrong: ["Adele", "Billie Eilish", "Dua Lipa"] },
    { prompt: "Que genero musical se asocia con improvisacion y swing?", correct: "Jazz", wrong: ["Reggaeton", "Punk", "Tecno"] },
    { prompt: "Que compositor escribio la Quinta Sinfonia?", correct: "Ludwig van Beethoven", wrong: ["Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Frederic Chopin"] },
    { prompt: "Que festival musical se celebra en Indio, California?", correct: "Coachella", wrong: ["Glastonbury", "Tomorrowland", "Lollapalooza Berlin"] },
    { prompt: "Que artista canta Shape of You?", correct: "Ed Sheeran", wrong: ["Sam Smith", "Harry Styles", "Justin Bieber"] },
    { prompt: "Que grupo publico Hotel California?", correct: "Eagles", wrong: ["Fleetwood Mac", "The Doors", "Bon Jovi"] },
    { prompt: "Que banda surcoreana popularizo Dynamite?", correct: "BTS", wrong: ["BLACKPINK", "EXO", "Stray Kids"] }
  ],
  "adivina-cancion-pista": [
    { prompt: "Hit de The Weeknd de 2019 con luces en el titulo.", correct: "Blinding Lights", wrong: ["Starboy", "Save Your Tears", "The Hills"] },
    { prompt: "Cancion de Queen famosa por su mezcla de rock y opera.", correct: "Bohemian Rhapsody", wrong: ["Don't Stop Me Now", "Radio Ga Ga", "Somebody to Love"] },
    { prompt: "Tema de Celine Dion asociado a la pelicula Titanic.", correct: "My Heart Will Go On", wrong: ["Because You Loved Me", "All by Myself", "The Power of Love"] },
    { prompt: "Cancion global de 2017 de Luis Fonsi y Daddy Yankee.", correct: "Despacito", wrong: ["Gasolina", "Danza Kuduro", "Bailando"] },
    { prompt: "Tema de Pharrell Williams incluido en Gru 2.", correct: "Happy", wrong: ["Get Lucky", "Freedom", "Blurred Lines"] },
    { prompt: "Himno de Journey con un titulo sobre no dejar de creer.", correct: "Don't Stop Believin'", wrong: ["Open Arms", "Separate Ways", "Faithfully"] },
    { prompt: "Cancion de Adele del album 25 que fue un gran regreso.", correct: "Hello", wrong: ["Rolling in the Deep", "Someone Like You", "Skyfall"] },
    { prompt: "Tema de Ed Sheeran del album Divide.", correct: "Shape of You", wrong: ["Perfect", "Photograph", "Thinking Out Loud"] },
    { prompt: "Cancion de Mark Ronson con Bruno Mars.", correct: "Uptown Funk", wrong: ["Locked Out of Heaven", "24K Magic", "Treasure"] },
    { prompt: "Cancion en ingles de BTS estrenada en 2020.", correct: "Dynamite", wrong: ["Butter", "Permission to Dance", "DNA"] },
    { prompt: "Tema de Lady Gaga y Bradley Cooper en A Star Is Born.", correct: "Shallow", wrong: ["Bad Romance", "Always Remember Us This Way", "Poker Face"] },
    { prompt: "Cancion de Nirvana incluida en Nevermind.", correct: "Smells Like Teen Spirit", wrong: ["Come As You Are", "Lithium", "Heart-Shaped Box"] },
    { prompt: "Tema de Michael Jackson famoso por su video de zombies.", correct: "Thriller", wrong: ["Beat It", "Billie Jean", "Bad"] },
    { prompt: "Cancion de Oasis del album Morning Glory.", correct: "Wonderwall", wrong: ["Live Forever", "Champagne Supernova", "Supersonic"] },
    { prompt: "Hit de Miley Cyrus publicado en 2023.", correct: "Flowers", wrong: ["Wrecking Ball", "Malibu", "Midnight Sky"] }
  ],
  "cine-series": [
    { prompt: "Que pelicula tiene como protagonistas a Jack y Rose?", correct: "Titanic", wrong: ["Avatar", "Pearl Harbor", "El diario de Noah"] },
    { prompt: "Que saga incluye al personaje Darth Vader?", correct: "Star Wars", wrong: ["Star Trek", "Matrix", "Dune"] },
    { prompt: "Quien dirigio Titanic?", correct: "James Cameron", wrong: ["Steven Spielberg", "Christopher Nolan", "Ridley Scott"] },
    { prompt: "Que actor interpreto a Iron Man en el MCU?", correct: "Robert Downey Jr.", wrong: ["Chris Evans", "Mark Ruffalo", "Tom Holland"] },
    { prompt: "Que saga gira alrededor de un anillo unico?", correct: "El senor de los anillos", wrong: ["Harry Potter", "Piratas del Caribe", "Los juegos del hambre"] },
    { prompt: "En que saga aparece la escuela Hogwarts?", correct: "Harry Potter", wrong: ["Crepusculo", "Narnia", "Percy Jackson"] },
    { prompt: "Que serie popular incluye el Trono de Hierro?", correct: "Game of Thrones", wrong: ["The Witcher", "Vikings", "The Crown"] },
    { prompt: "Que pelicula animada trata sobre juguetes que cobran vida?", correct: "Toy Story", wrong: ["Shrek", "Monstruos S.A.", "Cars"] },
    { prompt: "Quien dirigio Jurassic Park?", correct: "Steven Spielberg", wrong: ["George Lucas", "James Cameron", "Peter Jackson"] },
    { prompt: "Que pelicula gano el Oscar a mejor pelicula en 1998?", correct: "Titanic", wrong: ["Salvar al soldado Ryan", "La vida es bella", "Good Will Hunting"] },
    { prompt: "Que superheroe esta asociado con Wakanda?", correct: "Black Panther", wrong: ["Spider-Man", "Thor", "Doctor Strange"] },
    { prompt: "Que serie tiene como protagonista a Walter White?", correct: "Breaking Bad", wrong: ["The Sopranos", "Lost", "Mad Men"] },
    { prompt: "Que pelicula de Christopher Nolan trata sobre entrar en suenos?", correct: "Inception", wrong: ["Interstellar", "Tenet", "Memento"] },
    { prompt: "Que personaje verde de DreamWorks vive en un pantano?", correct: "Shrek", wrong: ["Mike Wazowski", "Sully", "Po"] },
    { prompt: "Que pelicula de ciencia ficcion presenta la nave Nostromo?", correct: "Alien", wrong: ["Blade Runner", "Terminator", "E.T."] }
  ],
  "personajes-pantalla": [
    { prompt: "A que saga pertenece Jack Sparrow?", correct: "Piratas del Caribe", wrong: ["Harry Potter", "Matrix", "Indiana Jones"] },
    { prompt: "En que serie aparece Eleven?", correct: "Stranger Things", wrong: ["Dark", "Wednesday", "The Last of Us"] },
    { prompt: "Que identidad de superheroe usa Tony Stark?", correct: "Iron Man", wrong: ["Doctor Strange", "Hawkeye", "Ant-Man"] },
    { prompt: "Que personaje de Breaking Bad es profesor de quimica?", correct: "Walter White", wrong: ["Jesse Pinkman", "Saul Goodman", "Gus Fring"] },
    { prompt: "Que personaje de Star Wars usa una armadura negra y sable rojo?", correct: "Darth Vader", wrong: ["Yoda", "Obi-Wan Kenobi", "Han Solo"] },
    { prompt: "En que saga aparece Hermione Granger?", correct: "Harry Potter", wrong: ["Crepusculo", "Divergente", "Narnia"] },
    { prompt: "Que personaje lleva el Anillo Unico hasta Mordor?", correct: "Frodo Bolson", wrong: ["Aragorn", "Legolas", "Gandalf"] },
    { prompt: "Que personaje de Game of Thrones es conocida como Madre de Dragones?", correct: "Daenerys Targaryen", wrong: ["Arya Stark", "Cersei Lannister", "Sansa Stark"] },
    { prompt: "Que personaje es el protagonista de Matrix?", correct: "Neo", wrong: ["Morpheus", "Trinity", "Smith"] },
    { prompt: "Que arqueologo de cine lleva sombrero y latigo?", correct: "Indiana Jones", wrong: ["Rick O'Connell", "Jack Ryan", "Ethan Hunt"] },
    { prompt: "Que personaje de Disney canta Let It Go?", correct: "Elsa", wrong: ["Ariel", "Moana", "Rapunzel"] },
    { prompt: "Que personaje de la familia Addams viste de negro y tiene humor seco?", correct: "Wednesday Addams", wrong: ["Morticia Addams", "Enid Sinclair", "Sabrina Spellman"] },
    { prompt: "Que personaje de The Big Bang Theory suele decir Bazinga?", correct: "Sheldon Cooper", wrong: ["Leonard Hofstadter", "Howard Wolowitz", "Raj Koothrappali"] },
    { prompt: "Que protagonista usa arco en Los juegos del hambre?", correct: "Katniss Everdeen", wrong: ["Tris Prior", "Lara Croft", "Rey"] },
    { prompt: "Que boxeador ficticio es protagonista de Rocky?", correct: "Rocky Balboa", wrong: ["Apollo Creed", "Jake LaMotta", "Adonis Johnson"] }
  ]
};

const challengePrompts = [
  "En una ronda rapida de {subject}, lo primero es...",
  "Si el tiempo aprieta durante {subject}, conviene...",
  "Cuando dos opciones se parecen mucho en {subject}, ayuda...",
  "Para mantener foco en {subject}, lo mejor es...",
  "Si fallas una pregunta de {subject}, deberias...",
  "Un buen resultado en {subject} depende sobre todo de...",
  "Cuando aparece una trampa visual en {subject}, lo clave es...",
  "En una secuencia corta de {subject}, tu estrategia seria...",
  "Si una respuesta parece demasiado obvia en {subject}, conviene...",
  "Para mejorar en {subject}, entrenarias...",
  "Cuando notas cansancio en {subject}, lo mas util es...",
  "Si tienes que recordar numeros en {subject}, prefieres...",
  "Ante un patron raro en {subject}, sueles...",
  "Una pregunta de concentracion en {subject} pide...",
  "Terminar fuerte en {subject} significa..."
];

const challengeOptions = [
  ["Leer la consigna", "Tocar lo primero", "Esperar demasiado", "Cambiar de pantalla"],
  ["Priorizar precision", "Acelerar sin mirar", "Rendirse", "Elegir siempre A"],
  ["Comparar detalle por detalle", "Mirar solo el color", "Responder por costumbre", "Ignorar una opcion"],
  ["Reducir distracciones", "Abrir otra app", "Cambiar de tema", "Mirar el reloj sin parar"],
  ["Seguir con ritmo", "Bloquearte", "Reiniciar todo", "Elegir sin leer"],
  ["Atencion sostenida", "Solo suerte", "Ruido alrededor", "No practicar nunca"],
  ["Parar medio segundo", "Pulsar rapido", "Mirar fuera", "Elegir la mas grande"],
  ["Agrupar informacion", "Memorizar sin orden", "Saltar pasos", "Cerrar los ojos"],
  ["Revisar la pista", "Picar seguro", "Cambiar por cambiar", "Ignorar la consigna"],
  ["Velocidad con calma", "Solo velocidad", "Solo ansiedad", "Solo memoria"],
  ["Respirar y continuar", "Apretar mas", "Abandonar al instante", "Responder todo igual"],
  ["Agrupar por bloques", "Leerlos una vez", "Decirlos sin orden", "No mirar"],
  ["Buscar repeticion", "Elegir al azar", "Cambiar de reto", "Mirar solo el final"],
  ["Foco y lectura limpia", "Impulso puro", "Adivinar", "No pensar"],
  ["Mantener precision", "Correr aunque falles", "Cambiar todas", "No acabar"]
];

function makeOptions(labels: string[], prefix: string, values?: number[]) {
  return labels.map((label, index) => ({
    id: `${prefix}-${index + 1}`,
    label,
    value: values?.[index] ?? index + 1
  }));
}

function makeTriviaSeedQuestions(slug: string, seeds: TriviaSeed[]) {
  const orders = [
    [0, 1, 2, 3],
    [1, 0, 3, 2],
    [2, 3, 0, 1],
    [3, 2, 1, 0]
  ];

  return seeds.map((seed, index) => {
    const labels = [seed.correct, ...seed.wrong];
    const order = orders[index % orders.length];

    return {
      id: `${slug}-${index + 1}`,
      prompt: seed.prompt,
      options: order.map((labelIndex, optionIndex) => ({
        id: `${slug}-${index + 1}-${optionIndex + 1}`,
        label: labels[labelIndex],
        value: labelIndex === 0 ? 1 : 0
      }))
    };
  });
}

function makeQuestions(kind: QuizKind, slug: string, subject: string) {
  if (slug === "edad-mental") {
    return mentalAgeQuestions;
  }

  if (slug === "iq-rapido") {
    return iqQuickQuestions;
  }

  if (kind === "trivia" && knowledgeTriviaSeeds[slug]) {
    return makeTriviaSeedQuestions(slug, knowledgeTriviaSeeds[slug]);
  }

  if (kind === "trivia") {
    throw new Error(`Missing knowledge question bank for trivia quiz: ${slug}`);
  }

  const prompts = kind === "challenge" ? challengePrompts : personalPrompts;
  const optionGroups = kind === "challenge" ? challengeOptions : personalOptions;

  return prompts.map((prompt, index) => ({
    id: `${slug}-${index + 1}`,
    prompt: prompt.replace("{subject}", subject),
    options: makeOptions(optionGroups[index], `${slug}-${index + 1}`)
  }));
}

function makeResults(kind: QuizKind, subject: string, accent: string, slug: string): QuizResult[] {
  if (slug === "edad-mental") {
    return mentalAgeResults;
  }

  if (kind === "trivia") {
    return [
      {
        id: "revancha",
        title: "Modo revancha",
        scoreLabel: "0-3",
        subtitle: "Hoy el test ha ganado la primera ronda.",
        summary: `En ${subject} no ha salido tu mejor marcador, pero tiene ese punto perfecto de revancha: lo miras, te picas y vuelves con mas punteria.`,
        reason: "Has acertado pocas preguntas, asi que el resultado cae en la zona de calentamiento. No parece azar: el test ha detectado que faltaban referencias basicas o que varias trampas han entrado limpias.",
        accent
      },
      {
        id: "warming",
        title: "Calentando mirada",
        scoreLabel: "4-6",
        subtitle: "Hay base, pero algunas trampas han mordido.",
        summary: `Has rascado varios aciertos de ${subject}. No vas perdido, solo te falta convertir lo que te suena en respuestas seguras.`,
        reason: "Tu marcador queda en una zona intermedia baja: reconoces parte del tema, aunque los detalles concretos todavia se escapan con facilidad.",
        accent
      },
      {
        id: "solid",
        title: "Base con orgullo",
        scoreLabel: "7-9",
        subtitle: "No es pleno, pero aqui hay conocimiento real.",
        summary: `En ${subject} te defiendes bastante bien. Has pasado la zona de intuicion y ya se nota que varias respuestas salieron por saber, no por suerte.`,
        reason: "Has acertado la mitad alta del test: controlas lo comun y alguna pregunta mas fina, aunque todavia hay margen para cerrar mejor los detalles.",
        accent
      },
      {
        id: "top",
        title: "Controlas fuerte",
        scoreLabel: "10-12",
        subtitle: "Este marcador ya pide captura.",
        summary: `Resultado muy serio en ${subject}. Has esquivado buena parte de las trampas y te has movido con seguridad incluso cuando la pregunta no venia regalada.`,
        reason: "Tu marcador entra en zona alta: has fallado poco y las dudas seguramente han estado en detalles concretos, no en lo principal del tema.",
        accent
      },
      {
        id: "near-perfect",
        title: "Casi intocable",
        scoreLabel: "13-14",
        subtitle: "Una o dos preguntas te han separado del pleno.",
        summary: `Lo tuyo con ${subject} va muy en serio. Has dejado poquisimo margen, de esos resultados que dan rabia buena porque casi rozan el 15/15.`,
        reason: "Has acertado practicamente todo. El test solo te ha quitado el pleno por una o dos preguntas finas, asi que tu lectura general ha sido muy precisa.",
        accent
      },
      {
        id: "legend",
        title: "Pleno legendario",
        scoreLabel: "15/15",
        subtitle: "Quince de quince. Sin tachones.",
        summary: `Has reventado el test de ${subject}. Esto no es buena racha: es marcador perfecto, lectura fina y cero preguntas regaladas por el camino.`,
        reason: "Has acertado todas las preguntas, asi que el resultado sube al nivel maximo. No hay patron de duda: cada respuesta correcta ha construido un pleno limpio.",
        accent
      }
    ];
  }

  if (personalResultThemes[slug]) {
    return personalResultThemes[slug].map((result) => ({
      ...result,
      accent
    }));
  }

  if (kind === "challenge") {
    return [
      {
        id: "warm",
        title: "Foco despertando",
        scoreLabel: "Foco",
        subtitle: "Tu ritmo aparece cuando baja el ruido.",
        summary: `En ${subject} no vas mal: simplemente necesitas un segundo para encontrar tu compas. Cuando entras en foco, el resultado puede subir bastante.`,
        reason: "Tus respuestas han tendido a opciones mas prudentes o lentas. El patron apunta a alguien que prefiere asegurar antes que lanzarse sin leer bien.",
        accent
      },
      {
        id: "sharp",
        title: "Reflejos con estilo",
        scoreLabel: "Rapido",
        subtitle: "Rapidez, intuicion y bastante control.",
        summary: `Tienes buena mezcla de velocidad y lectura. En ${subject} te favorece confiar en lo que ves, pero sin comprar la primera trampa que pasa cerca.`,
        reason: "Tus elecciones combinan intuicion y correccion. Has respondido con agilidad, pero manteniendo suficiente precision para que el resultado se note estable.",
        accent
      },
      {
        id: "locked",
        title: "Foco blindado",
        scoreLabel: "Pro",
        subtitle: "Lees, filtras y decides sin hacer ruido.",
        summary: `Tu resultado en ${subject} tiene pinta de mente entrenada: no solo reaccionas, tambien detectas donde esta la trampa antes de caer.`,
        reason: "Has elegido muchas respuestas de control, atencion y precision. El patron general apunta a buena lectura y pocos impulsos innecesarios.",
        accent
      }
    ];
  }

  return [
    {
      id: "spark",
      title: "Impulso con brillo",
      scoreLabel: "Activo",
      subtitle: "Vas con chispa y se nota cuando algo te importa.",
      summary: `En ${subject} apareces con energia directa, intuicion y ganas de mover algo. Tu resultado tiene esa vibra de entrar, probar y corregir sobre la marcha.`,
      reason: "Tus respuestas se inclinan hacia lo espontaneo: eliges movimiento, reaccion y contacto directo. Por eso el test te lee como alguien que se enciende antes de quedarse mirando.",
      accent
    },
    {
      id: "balance",
      title: "Equilibrio con pulso",
      scoreLabel: "Mix",
      subtitle: "Ni caos total ni manual de instrucciones.",
      summary: `Tu resultado en ${subject} mezcla espontaneidad con cabeza. Tienes una forma bastante tuya de adaptarte sin perder el centro ni volverte predecible.`,
      reason: "Has alternado respuestas impulsivas con opciones mas cuidadas. El patron habla de alguien que cambia de marcha segun el momento, no por quedar bien.",
      accent
    },
    {
      id: "calm",
      title: "Calma que pesa",
      scoreLabel: "Zen",
      subtitle: "No todo merece tu energia, y lo tienes claro.",
      summary: `En ${subject} prefieres elegir bien antes que correr. Tu resultado no es frio: es una forma de cuidar lo que das, cuando lo das y a quien.`,
      reason: "Tus respuestas apuntan a pausa, limites y seleccion. El test te coloca aqui porque tiendes a pensar antes de entrar, responder o comprometerte.",
      accent
    }
  ];
}

const personalResultThemes: Record<string, Omit<QuizResult, "accent">[]> = {
  "verdadero-pais": [
    {
      id: "brasil",
      title: "Brasil vivo",
      scoreLabel: "Sol",
      subtitle: "Tu energia pide calle, ritmo y planes con gente.",
      summary: "Tienes una forma de moverte muy expresiva: te activas con lo nuevo, con la mezcla y con los dias que no vienen demasiado cerrados.",
      reason: "Tus respuestas tiran hacia espontaneidad, impulso social y ganas de entrar en accion sin pensarlo todo veinte veces."
    },
    {
      id: "italia",
      title: "Italia luminosa",
      scoreLabel: "Arte",
      subtitle: "Calidez, gusto por los detalles y mucho caracter.",
      summary: "Tu pais interior tiene conversacion larga, mesa compartida y una mezcla bonita entre emocion y criterio. No eres plano: tienes textura.",
      reason: "Has combinado opciones de intuicion con otras mas cuidadas, como alguien que disfruta la vida pero tambien sabe elegir el momento."
    },
    {
      id: "japon",
      title: "Japon sereno",
      scoreLabel: "Zen",
      subtitle: "Orden, calma y una sensibilidad que no necesita gritar.",
      summary: "Tu energia encaja con un pais de detalles finos: observas, filtras y prefieres que las cosas tengan sentido antes que solo ruido.",
      reason: "Tus respuestas apuntan a pausa, foco y cuidado de tu espacio personal, especialmente cuando hay demasiada intensidad alrededor."
    }
  ],
  "estacion-eres": [
    {
      id: "verano",
      title: "Verano electrico",
      scoreLabel: "Calor",
      subtitle: "Llegas con luz alta y ganas de que pasen cosas.",
      summary: "Tu estacion vibra con planes espontaneos, conversaciones rapidas y esa sensacion de que cualquier tarde puede cambiar el dia.",
      reason: "Has elegido respuestas de impulso, energia social y movimiento: patrones muy de vivir hacia fuera."
    },
    {
      id: "primavera",
      title: "Primavera curiosa",
      scoreLabel: "Bloom",
      subtitle: "Ligera, adaptable y con ganas de empezar algo.",
      summary: "Tu resultado tiene frescura sin ser caos. Te gusta probar, conectar y cambiar de aire, pero no pierdes del todo el centro.",
      reason: "Tus respuestas mezclan espontaneidad con cierta cabeza, como alguien que se abre al plan sin dejarse arrastrar por todo."
    },
    {
      id: "otono",
      title: "Otono dorado",
      scoreLabel: "Calma",
      subtitle: "Tu encanto va mas por profundidad que por ruido.",
      summary: "Eres una estacion de planes cuidados, conversaciones con fondo y energia bien elegida. No necesitas correr para llegar fuerte.",
      reason: "Has tendido a respuestas de pausa, observacion y seleccion, senal de que prefieres calidad antes que cantidad."
    }
  ],
  "color-energia": [
    {
      id: "coral",
      title: "Coral intenso",
      scoreLabel: "Vivo",
      subtitle: "Tu energia se nota incluso cuando intentas disimular.",
      summary: "Tienes un color de accion: calido, rapido y bastante contagioso. Cuando algo te importa, no tardas mucho en moverte.",
      reason: "Tus respuestas se inclinan hacia reaccion, intuicion y expresividad, por eso el resultado sale con un tono tan encendido."
    },
    {
      id: "verde",
      title: "Verde menta",
      scoreLabel: "Fresh",
      subtitle: "Equilibrio, frescura y una vibra facil de tener cerca.",
      summary: "Tu energia no aplasta: acompana. Tienes una mezcla de calma y chispa que hace que los demas te lean como alguien adaptable.",
      reason: "Has alternado opciones activas con otras mas medidas, creando un patron flexible y bastante estable."
    },
    {
      id: "azul",
      title: "Azul noche",
      scoreLabel: "Deep",
      subtitle: "Reservada, elegante y con mas fondo del que ensenas.",
      summary: "Tu color habla de foco, sensibilidad y control. No eres frio: simplemente eliges muy bien donde pones tu energia.",
      reason: "Tus respuestas muestran preferencia por pensar, filtrar y proteger tu calma cuando el entorno se acelera."
    }
  ],
  "animal-personalidad": [
    {
      id: "colibri",
      title: "Colibri social",
      scoreLabel: "Veloz",
      subtitle: "Rapido, curioso y con una energia dificil de encerrar.",
      summary: "Te mueves mejor cuando puedes cambiar, probar y seguir el impulso. Tu personalidad tiene brillo y velocidad.",
      reason: "Tus respuestas apuntan a accion, improvisacion y busqueda de estimulos, como alguien que se activa con facilidad."
    },
    {
      id: "zorro",
      title: "Zorro intuitivo",
      scoreLabel: "Listo",
      subtitle: "Observas mas de lo que parece y te adaptas rapido.",
      summary: "Tu resultado mezcla picardia tranquila con lectura social. No necesitas imponerte para entender lo que esta pasando.",
      reason: "Has combinado instinto con estrategia, senal de que improvisas pero tambien sabes leer el contexto."
    },
    {
      id: "lobo",
      title: "Lobo sereno",
      scoreLabel: "Fiel",
      subtitle: "Selectivo, protector y con energia de circulo cerrado.",
      summary: "Tu personalidad no va de agradar a todo el mundo. Cuidas tu espacio, eliges bien y eres fuerte cuando algo importa.",
      reason: "Tus respuestas se han ido hacia limites, calma y lealtad selectiva, un patron de energia muy cuidada."
    }
  ],
  "ciudad-encaja": [
    {
      id: "barcelona",
      title: "Barcelona abierta",
      scoreLabel: "Flow",
      subtitle: "Creativa, social y con ganas de mezcla.",
      summary: "Encajas con una ciudad de planes que empiezan sin pedir permiso: energia visual, movimiento y mucha vida alrededor.",
      reason: "Tus respuestas muestran gusto por improvisar, conectar y moverte con cierta libertad."
    },
    {
      id: "lisboa",
      title: "Lisboa suave",
      scoreLabel: "Luz",
      subtitle: "Calida, sensible y con ritmo propio.",
      summary: "Tu ciudad no necesita correr para enganchar. Tiene encanto, detalle y una melancolia bonita sin ponerse dramatica.",
      reason: "Has elegido una mezcla de calma, cercania y espontaneidad moderada, muy de disfrutar sin quemarte."
    },
    {
      id: "tokio",
      title: "Tokio nocturna",
      scoreLabel: "Foco",
      subtitle: "Orden, intensidad interior y un mundo propio muy claro.",
      summary: "Tu resultado encaja con una ciudad de contrastes: por fuera control, por dentro muchisimas capas pasando a la vez.",
      reason: "Tus respuestas apuntan a foco, observacion y necesidad de espacio cuando el ruido sube."
    }
  ],
  "elemento-eres": [
    {
      id: "fuego",
      title: "Fuego rapido",
      scoreLabel: "Fuego",
      subtitle: "Cuando algo prende, vas de frente.",
      summary: "Tu elemento es energia directa: accion, impulso y esa forma de contagiar movimiento cuando el ambiente esta parado.",
      reason: "Tus elecciones han sido mas rapidas, sociales e intuitivas, con poca necesidad de esperar a tenerlo todo perfecto."
    },
    {
      id: "aire",
      title: "Aire libre",
      scoreLabel: "Aire",
      subtitle: "Ligero, mental y dificil de encasillar.",
      summary: "Te mueve la posibilidad: cambiar de idea, mirar desde otro angulo y no quedarte demasiado tiempo donde todo pesa.",
      reason: "Tus respuestas mezclan curiosidad, adaptacion y margen personal, un patron muy de moverte sin romperte."
    },
    {
      id: "agua",
      title: "Agua profunda",
      scoreLabel: "Agua",
      subtitle: "Sensible, intuitiva y mas fuerte en calma.",
      summary: "Tu elemento no empuja: rodea, entiende y sostiene. Tienes una energia que se nota mas cuanto menos intenta hacerse notar.",
      reason: "Has elegido opciones de pausa, cuidado y lectura emocional, senal de que procesas mucho antes de actuar."
    }
  ],
  "vibe-transmites": [
    {
      id: "spark",
      title: "Chispa cercana",
      scoreLabel: "Glow",
      subtitle: "La gente nota que contigo puede pasar algo divertido.",
      summary: "Transmites una energia abierta, rapida y bastante viva. No hace falta conocerte mucho para notar movimiento alrededor.",
      reason: "Tus respuestas se inclinan hacia accion, expresividad y reaccion natural ante lo que cambia."
    },
    {
      id: "soft",
      title: "Magnetismo suave",
      scoreLabel: "Soft",
      subtitle: "No invades, pero te quedas en la memoria.",
      summary: "Tu vibe funciona por equilibrio: sabes entrar, escuchar y soltar una presencia agradable sin convertirlo todo en show.",
      reason: "Has marcado un patron mixto de cercania y criterio, como alguien que se adapta sin perder su tono."
    },
    {
      id: "mystic",
      title: "Misterio tranquilo",
      scoreLabel: "Mood",
      subtitle: "Das la sensacion de tener mas capas de las que ensenas.",
      summary: "Transmites calma, distancia bonita y una energia algo dificil de leer. Eso no enfria: crea curiosidad.",
      reason: "Tus respuestas muestran seleccion, pausa y necesidad de espacio, por eso tu vibe sale mas reservada y magnetica."
    }
  ],
  "estetica-eres": [
    {
      id: "pop",
      title: "Pop urbano",
      scoreLabel: "Pop",
      subtitle: "Color, movimiento y cero miedo a llamar la atencion.",
      summary: "Tu estetica tiene energia de calle, planes rapidos y detalles que se notan. Lo tuyo no pasa completamente desapercibido.",
      reason: "Tus respuestas van hacia lo expresivo y espontaneo, un patron visual mas atrevido y directo."
    },
    {
      id: "indie",
      title: "Indie luminoso",
      scoreLabel: "Indie",
      subtitle: "Natural, cuidado y con personalidad sin forzarlo.",
      summary: "Tu estilo encaja con lo autentico: algo creativo, algo suave y con esa sensacion de que eliges por gusto, no por copia.",
      reason: "Has mezclado opciones sociales con otras mas reflexivas, creando un resultado estetico equilibrado."
    },
    {
      id: "minimal",
      title: "Minimal nocturno",
      scoreLabel: "Clean",
      subtitle: "Pocas cosas, bien elegidas y con mucho control.",
      summary: "Tu estetica no necesita exceso. Funciona por lineas limpias, calma y una seguridad que aparece sin pedir permiso.",
      reason: "Tus respuestas apuntan a orden, filtro y energia selectiva, una combinacion muy de estilo pulido."
    }
  ],
  "tipo-alma": [
    {
      id: "cometa",
      title: "Alma cometa",
      scoreLabel: "Brillo",
      subtitle: "Pasas rapido, pero dejas algo encendido.",
      summary: "Tu alma tiene impulso, hambre de experiencia y una forma muy viva de buscar lo que te despierta.",
      reason: "Tus respuestas se mueven hacia accion, planes espontaneos y emocion inmediata."
    },
    {
      id: "puente",
      title: "Alma puente",
      scoreLabel: "Union",
      subtitle: "Conectas mundos, personas e ideas sin hacer ruido.",
      summary: "Tu resultado habla de alguien que entiende matices. Sabes estar entre energia y calma, entre instinto y cabeza.",
      reason: "Has elegido respuestas bastante equilibradas, con tendencia a adaptarte sin borrarte."
    },
    {
      id: "faro",
      title: "Alma faro",
      scoreLabel: "Guia",
      subtitle: "Calma por fuera, mucha lectura por dentro.",
      summary: "Tu alma tiene una presencia serena: observa, filtra y aparece fuerte justo cuando hace falta.",
      reason: "Tus respuestas reflejan pausa, limites y una forma muy selectiva de cuidar tu energia."
    }
  ],
  "cancion-energia": [
    {
      id: "hit",
      title: "Hit de verano",
      scoreLabel: "Play",
      subtitle: "Energia pegadiza, directa y con ganas de plan.",
      summary: "Si fueras una cancion, sonarias a algo que sube el volumen de la habitacion. Tienes una vibra facil de contagiar.",
      reason: "Tus respuestas apuntan a impulso, expresividad y reaccion rapida ante los cambios."
    },
    {
      id: "indie",
      title: "Tema indie",
      scoreLabel: "Loop",
      subtitle: "Ligera, especial y con detalle cuando escuchas bien.",
      summary: "Tu energia no necesita ser la mas ruidosa para enganchar. Tiene personalidad, cambios suaves y un punto muy tuyo.",
      reason: "Has mezclado espontaneidad con filtro, como alguien que se deja llevar pero no por cualquier cosa."
    },
    {
      id: "nocturna",
      title: "Balada nocturna",
      scoreLabel: "Deep",
      subtitle: "Mas intensa de lo que parece a primera escucha.",
      summary: "Tu cancion tiene calma, fondo y una emocion que entra despacio. No busca gustar a todos, pero conecta fuerte con quien entiende.",
      reason: "Tus respuestas tienden a pausa, profundidad y energia reservada, por eso el resultado baja el ritmo y gana peso."
    }
  ]
};

const difficultyOrder: Record<QuizDifficulty, number> = {
  facil: 0,
  medio: 1,
  dificil: 2,
  extremo: 3
};

const difficultyOverrides: Record<string, QuizDifficulty> = {
  "edad-mental": "facil",
  "curiosidades-rapidas": "facil",
  "todo-el-mundo-deberia-saber": "facil",
  "geografia-express": "facil",
  "adivina-deporte-pista": "facil",
  "cine-basico": "facil",
  "series-famosas": "facil",
  "personajes-pantalla": "facil",
  "animales": "facil",
  "reflejos": "facil",
  "numero-diferente": "facil",
  "reaccion": "facil",
  "conocimientos-futbol": "medio",
  "conocimientos-baloncesto": "medio",
  "conocimientos-tenis": "medio",
  "conocimientos-formula-1": "medio",
  "reglas-deportivas": "medio",
  "jugadores-famosos": "medio",
  "cultura-general": "medio",
  "cultura-general-espana": "medio",
  "cultura-general-europa": "medio",
  "cultura-general-mundo": "medio",
  "banderas-mundo": "medio",
  "paises-por-pistas": "medio",
  "mapas-continentes": "medio",
  "rios-montanas-oceanos": "medio",
  "geografia-espana": "medio",
  "historia-espana": "medio",
  "historia-mundial": "medio",
  "edad-media": "medio",
  "segunda-guerra-mundial": "medio",
  "civilizaciones-antiguas": "medio",
  "reyes-imperios-conquistas": "medio",
  "biologia-basica": "facil",
  "fisica-basica": "facil",
  "quimica-basica": "facil",
  "astronomia": "medio",
  "cuerpo-humano": "facil",
  "inventos-descubrimientos": "medio",
  "cultura-musical": "medio",
  "adivina-cancion-pista": "medio",
  "cine-series": "medio",
  "pokemon": "medio",
  "reggaeton": "medio",
  "historia-futbol": "dificil",
  "concentracion-60": "dificil"
};

function getQuizDifficulty(draft: QuizDraft): QuizDifficulty {
  if (draft.difficulty) return draft.difficulty;
  if (difficultyOverrides[draft.slug]) return difficultyOverrides[draft.slug];

  const difficultyText = `${draft.slug} ${draft.title} ${draft.subject}`.toLowerCase();

  if (difficultyText.includes("extremo") || difficultyText.includes("extrema")) return "extremo";
  if (difficultyText.includes("dificil") || difficultyText.includes("dificiles")) return "dificil";
  if (difficultyText.includes("medio") || difficultyText.includes("media")) return "medio";
  if (difficultyText.includes("basico") || difficultyText.includes("basica") || difficultyText.includes("basicos") || difficultyText.includes("basicas")) {
    return "facil";
  }

  if (draft.kind === "challenge") return "medio";
  if (draft.kind === "personal") return "facil";

  return "medio";
}

function makeQuiz(draft: QuizDraft, accent: string): Quiz {
  return {
    slug: draft.slug,
    title: draft.title,
    tagline: draft.tagline,
    duration: draft.duration ?? "2 min",
    kind: draft.kind,
    difficulty: getQuizDifficulty(draft),
    note:
      draft.kind === "trivia"
        ? "Test de entretenimiento: no es una evaluacion oficial."
        : "Resultado orientativo y de entretenimiento.",
    href: `/test/${draft.slug}`,
    questions: makeQuestions(draft.kind, draft.slug, draft.subject),
    results: makeResults(draft.kind, draft.subject, accent, draft.slug)
  };
}

function advancedDrafts(sectionId: AdvancedSectionId): QuizDraft[] {
  return advancedQuizDraftsBySection[sectionId].map(({ slug, title, tagline, subject, difficulty }) => ({
    slug,
    title,
    tagline,
    kind: "trivia",
    subject,
    difficulty
  }));
}

const sectionDrafts: Array<Omit<QuizSection, "quizzes"> & { quizzes: QuizDraft[] }> = [
  {
    id: "inteligencia-mente",
    title: "Inteligencia",
    description: "Un test rapido para medir agilidad mental sin ponerse academico.",
    accent: "#ff5b6e",
    quizzes: [
      { slug: "iq-rapido", title: "Test de IQ rapido", tagline: "Agilidad, foco y lectura rapida en 15 preguntas.", kind: "challenge", subject: "IQ rapido" }
    ]
  },
  {
    id: "personalidad",
    title: "Personalidad",
    description: "Tests simbolicos, visuales y virales sobre tu energia.",
    accent: "#9b5cff",
    quizzes: [
      { slug: "verdadero-pais", title: "Cual es tu verdadero pais", tagline: "El pais que encaja con tu energia interior.", kind: "personal", subject: "verdadero pais" },
      { slug: "estacion-eres", title: "Que estacion eres", tagline: "Tu forma de brillar segun tu ritmo emocional.", kind: "personal", subject: "estacion personal" },
      { slug: "color-energia", title: "Que color representa tu energia", tagline: "Un color para tu vibra real.", kind: "personal", subject: "color de energia" },
      { slug: "animal-personalidad", title: "Que animal refleja tu personalidad", tagline: "Tu instinto convertido en simbolo.", kind: "personal", subject: "animal de personalidad" },
      { slug: "ciudad-encaja", title: "Que ciudad encaja contigo", tagline: "La ciudad que tendria tu ritmo.", kind: "personal", subject: "ciudad que encaja contigo" },
      { slug: "elemento-eres", title: "Que elemento eres", tagline: "Fuego, aire o agua segun tus respuestas.", kind: "personal", subject: "elemento personal" },
      { slug: "vibe-transmites", title: "Que vibe transmites", tagline: "La primera impresion que dejas sin darte cuenta.", kind: "personal", subject: "vibe que transmites" },
      { slug: "estetica-eres", title: "Que estetica eres", tagline: "Tu estilo interior en version visual.", kind: "personal", subject: "estetica personal" },
      { slug: "tipo-alma", title: "Que tipo de alma tienes", tagline: "Un resultado mas simbolico y emocional.", kind: "personal", subject: "tipo de alma" },
      { slug: "cancion-energia", title: "Que cancion representa tu energia", tagline: "Tu energia convertida en mood musical.", kind: "personal", subject: "cancion de energia" }
    ]
  },
  {
    id: "deportes",
    title: "Deportes",
    description: "Trivia, reglas, historia y retos de conocimiento deportivo.",
    accent: "#f4b63f",
    quizzes: [
      { slug: "conocimientos-futbol", title: "Test de conocimientos de futbol", tagline: "Reglas, historia y cultura futbolera.", kind: "trivia", subject: "futbol" },
      { slug: "futbol-basico", title: "Futbol basico", tagline: "Reglas y datos que todo aficionado reconoce.", kind: "trivia", subject: "futbol basico" },
      { slug: "futbol-dificil", title: "Futbol dificil", tagline: "Historia, torneos y detalles para quien sabe.", kind: "trivia", subject: "futbol dificil" },
      { slug: "futbol-extremo", title: "Futbol extremo", tagline: "Preguntas muy especificas de cultura futbolera.", kind: "trivia", subject: "futbol extremo" },
      { slug: "conocimientos-baloncesto", title: "Test de conocimientos de baloncesto", tagline: "Cancha, reglas y jugadores clave.", kind: "trivia", subject: "baloncesto" },
      { slug: "baloncesto-basico", title: "Baloncesto basico", tagline: "Puntos, pista y reglas faciles.", kind: "trivia", subject: "baloncesto basico" },
      { slug: "baloncesto-dificil", title: "Baloncesto dificil", tagline: "MVPs, campeones y jugadores historicos.", kind: "trivia", subject: "baloncesto dificil" },
      { slug: "conocimientos-tenis", title: "Test de conocimientos de tenis", tagline: "Puntos, torneos y golpes basicos.", kind: "trivia", subject: "tenis" },
      { slug: "conocimientos-formula-1", title: "Test de conocimientos de Formula 1", tagline: "Circuitos, estrategia y velocidad.", kind: "trivia", subject: "Formula 1" },
      { slug: "formula-1-basico", title: "Formula 1 basico", tagline: "Banderas, boxes y conceptos clave.", kind: "trivia", subject: "Formula 1 basica" },
      { slug: "formula-1-dificil", title: "Formula 1 dificil", tagline: "Campeones, escuderias y carreras historicas.", kind: "trivia", subject: "Formula 1 dificil" },
      { slug: "adivina-deporte-pista", title: "Adivina el deporte por la pista", tagline: "Lee la pista y piensa rapido.", kind: "trivia", subject: "deportes por pistas" },
      { slug: "reglas-deportivas", title: "Test de reglas deportivas", tagline: "Normas que cambian por completo una jugada.", kind: "trivia", subject: "reglas deportivas" },
      { slug: "historia-futbol", title: "Test de historia del futbol", tagline: "Copas, epocas y momentos famosos.", kind: "trivia", subject: "historia del futbol" },
      { slug: "jugadores-famosos", title: "Test de jugadores famosos", tagline: "Trayectorias, iconos y nombres que suenan.", kind: "trivia", subject: "jugadores famosos" },
      ...advancedDrafts("deportes")
    ]
  },
  {
    id: "cultura-general",
    title: "Cultura general",
    description: "Trivia ligera de conocimientos, curiosidades y datos utiles.",
    accent: "#ff7a4f",
    quizzes: [
      { slug: "cultura-general", title: "Test de cultura general", tagline: "Una mezcla rapida de datos, mundo y memoria.", kind: "trivia", subject: "cultura general" },
      { slug: "curiosidades-rapidas", title: "Curiosidades rapidas", tagline: "Preguntas cortas para ver cuanto se te queda.", kind: "trivia", subject: "curiosidades" },
      { slug: "cultura-general-basico", title: "Cultura general basico", tagline: "Preguntas faciles para calentar sin miedo.", kind: "trivia", subject: "cultura general basica" },
      { slug: "cultura-general-medio", title: "Cultura general medio", tagline: "Un poco mas de mundo, lectura y memoria.", kind: "trivia", subject: "cultura general media" },
      { slug: "cultura-general-dificil", title: "Cultura general dificil", tagline: "Para quien suele quedarse con los detalles.", kind: "trivia", subject: "cultura general dificil" },
      { slug: "cultura-general-extremo", title: "Cultura general extremo", tagline: "Preguntas duras para picarse en serio.", kind: "trivia", subject: "cultura general extrema" },
      { slug: "cultura-general-espana", title: "Cultura general Espana", tagline: "Arte, lugares, historia y referencias de aqui.", kind: "trivia", subject: "cultura general de Espana" },
      { slug: "cultura-general-europa", title: "Cultura general Europa", tagline: "Capitales, rios, arte y datos europeos.", kind: "trivia", subject: "cultura general europea" },
      { slug: "cultura-general-mundo", title: "Cultura general mundo", tagline: "Un viaje rapido por datos del planeta.", kind: "trivia", subject: "cultura general del mundo" },
      { slug: "todo-el-mundo-deberia-saber", title: "Preguntas que todo el mundo deberia saber", tagline: "Basicos utiles que conviene tener frescos.", kind: "trivia", subject: "conocimientos basicos" },
      ...advancedDrafts("cultura-general")
    ]
  },
  {
    id: "geografia",
    title: "Geografia",
    description: "Capitales, banderas, mapas, rios y pistas del mundo.",
    accent: "#2f9e71",
    quizzes: [
      { slug: "geografia-express", title: "Geografia express", tagline: "Paises, mapas y pistas sin ponerse academico.", kind: "trivia", subject: "geografia" },
      { slug: "capitales-basico", title: "Capitales nivel basico", tagline: "Capitales populares para entrar en ritmo.", kind: "trivia", subject: "capitales basicas" },
      { slug: "capitales-dificil", title: "Capitales nivel dificil", tagline: "Capitales menos obvias para subir el nivel.", kind: "trivia", subject: "capitales dificiles" },
      { slug: "banderas-mundo", title: "Banderas del mundo", tagline: "Colores, simbolos y detalles reconocibles.", kind: "trivia", subject: "banderas del mundo" },
      { slug: "paises-por-pistas", title: "Paises por pistas", tagline: "Lee la pista y ubica el pais correcto.", kind: "trivia", subject: "paises por pistas" },
      { slug: "mapas-continentes", title: "Mapas y continentes", tagline: "Hemisferios, oceanos y ubicacion global.", kind: "trivia", subject: "mapas y continentes" },
      { slug: "rios-montanas-oceanos", title: "Rios, montanas y oceanos", tagline: "Geografia fisica sin rodeos.", kind: "trivia", subject: "rios, montanas y oceanos" },
      { slug: "geografia-espana", title: "Geografia de Espana", tagline: "Rios, islas, ciudades y comunidades.", kind: "trivia", subject: "geografia de Espana" },
      { slug: "geografia-extrema", title: "Geografia extrema", tagline: "Datos menos obvios para gente de mapa fino.", kind: "trivia", subject: "geografia extrema" },
      ...advancedDrafts("geografia")
    ]
  },
  {
    id: "historia",
    title: "Historia",
    description: "Epocas, guerras, civilizaciones y personajes historicos.",
    accent: "#b86b3f",
    quizzes: [
      { slug: "historia-basica", title: "Historia basica", tagline: "Fechas y hechos que salen en cualquier conversacion.", kind: "trivia", subject: "historia basica" },
      { slug: "historia-espana", title: "Historia de Espana", tagline: "Reinos, constituciones, guerras y cambios clave.", kind: "trivia", subject: "historia de Espana" },
      { slug: "historia-mundial", title: "Historia mundial", tagline: "Un repaso global sin quedarse en lo facil.", kind: "trivia", subject: "historia mundial" },
      { slug: "edad-media", title: "Edad Media", tagline: "Feudos, reinos, peste y castillos con contexto.", kind: "trivia", subject: "Edad Media" },
      { slug: "segunda-guerra-mundial", title: "Segunda Guerra Mundial", tagline: "Frentes, batallas y fechas fundamentales.", kind: "trivia", subject: "Segunda Guerra Mundial" },
      { slug: "civilizaciones-antiguas", title: "Civilizaciones antiguas", tagline: "Egipto, Roma, Grecia, America y Mesopotamia.", kind: "trivia", subject: "civilizaciones antiguas" },
      { slug: "reyes-imperios-conquistas", title: "Reyes, imperios y conquistas", tagline: "Gobernantes, expansiones y nombres grandes.", kind: "trivia", subject: "reyes, imperios y conquistas" },
      { slug: "historia-extrema", title: "Historia nivel extremo", tagline: "Tratados, batallas y detalles para nota.", kind: "trivia", subject: "historia extrema" },
      ...advancedDrafts("historia")
    ]
  },
  {
    id: "ciencia",
    title: "Ciencia",
    description: "Biologia, fisica, quimica, astronomia e inventos.",
    accent: "#20a6d9",
    quizzes: [
      { slug: "ciencia-basica", title: "Ciencia basica", tagline: "Conceptos claros para empezar fuerte.", kind: "trivia", subject: "ciencia basica" },
      { slug: "biologia-basica", title: "Biologia basica", tagline: "Celulas, seres vivos y cuerpo en modo sencillo.", kind: "trivia", subject: "biologia basica" },
      { slug: "fisica-basica", title: "Fisica basica", tagline: "Fuerzas, energia, luz y movimiento.", kind: "trivia", subject: "fisica basica" },
      { slug: "quimica-basica", title: "Quimica basica", tagline: "Elementos, formulas y cambios de estado.", kind: "trivia", subject: "quimica basica" },
      { slug: "astronomia", title: "Astronomia", tagline: "Planetas, estrellas, lunas y espacio.", kind: "trivia", subject: "astronomia" },
      { slug: "cuerpo-humano", title: "Cuerpo humano", tagline: "Organos, huesos y funciones esenciales.", kind: "trivia", subject: "cuerpo humano" },
      { slug: "animales", title: "Animales", tagline: "Especies, rasgos y curiosidades naturales.", kind: "trivia", subject: "animales" },
      { slug: "inventos-descubrimientos", title: "Inventos y descubrimientos", tagline: "Ideas, hallazgos y personas que cambiaron cosas.", kind: "trivia", subject: "inventos y descubrimientos" },
      ...advancedDrafts("ciencia")
    ]
  },
  {
    id: "tecnologia",
    title: "Tecnologia",
    description: "Internet, ciberseguridad, hardware, software e historia digital.",
    accent: "#4f8cff",
    quizzes: advancedDrafts("tecnologia")
  },
  {
    id: "musica",
    title: "Musica",
    description: "Ritmos, cultura musical y retos para quien siempre tararea algo.",
    accent: "#e24ca7",
    quizzes: [
      { slug: "cultura-musical", title: "Test de cultura musical", tagline: "Artistas, estilos y memoria de canciones.", kind: "trivia", subject: "musica" },
      { slug: "musica-basico", title: "Musica basico", tagline: "Hits, artistas y grupos muy reconocibles.", kind: "trivia", subject: "musica basica" },
      { slug: "musica-dificil", title: "Musica dificil", tagline: "Albumes, escenas y nombres para melomanos.", kind: "trivia", subject: "musica dificil" },
      { slug: "reggaeton", title: "Reggaeton", tagline: "Artistas, himnos y cultura urbana latina.", kind: "trivia", subject: "reggaeton" },
      { slug: "adivina-cancion-pista", title: "Adivina la cancion por la pista", tagline: "Lee la pista, piensa en ritmo y responde.", kind: "trivia", subject: "canciones por pistas" },
      ...advancedDrafts("musica")
    ]
  },
  {
    id: "cine-series",
    title: "Cine y series",
    description: "Pantalla grande, maratones, personajes y cultura pop.",
    accent: "#3d7cff",
    quizzes: [
      { slug: "cine-series", title: "Test de cine y series", tagline: "Un repaso rapido por historias, escenas y fandom.", kind: "trivia", subject: "cine y series" },
      { slug: "cine-basico", title: "Cine basico", tagline: "Peliculas y personajes que casi todos ubican.", kind: "trivia", subject: "cine basico" },
      { slug: "cine-dificil", title: "Cine dificil", tagline: "Directores, clasicos y cinefilia con detalle.", kind: "trivia", subject: "cine dificil" },
      { slug: "series-famosas", title: "Series famosas", tagline: "Personajes, cafeterias, familias y tronos.", kind: "trivia", subject: "series famosas" },
      { slug: "personajes-pantalla", title: "Personajes famosos", tagline: "Reconoce iconos de peliculas y series por pistas.", kind: "trivia", subject: "personajes de cine y series" },
      ...advancedDrafts("cine-series")
    ]
  },
  {
    id: "gaming",
    title: "Gaming",
    description: "Videojuegos, sagas, personajes y cultura gamer.",
    accent: "#6c7cff",
    quizzes: [
      { slug: "videojuegos-basicos", title: "Videojuegos basicos", tagline: "Personajes y sagas faciles de reconocer.", kind: "trivia", subject: "videojuegos basicos" },
      { slug: "videojuegos-dificiles", title: "Videojuegos dificiles", tagline: "Estudios, juegos de culto y detalles finos.", kind: "trivia", subject: "videojuegos dificiles" },
      { slug: "pokemon", title: "Pokemon", tagline: "Pokedex, regiones, tipos y clasicos de la saga.", kind: "trivia", subject: "Pokemon" },
      ...advancedDrafts("gaming")
    ]
  },
  {
    id: "naturaleza-animales",
    title: "Naturaleza y animales",
    description: "Animales raros, oceanos, dinosaurios y biologia natural.",
    accent: "#2f9e44",
    quizzes: advancedDrafts("naturaleza-animales")
  },
  {
    id: "comida",
    title: "Comida",
    description: "Gastronomia mundial, ingredientes, postres y tecnicas.",
    accent: "#d77b28",
    quizzes: advancedDrafts("comida")
  },
  {
    id: "idiomas",
    title: "Idiomas",
    description: "Etimologia, ortografia, traducciones y lenguas del mundo.",
    accent: "#8f5cf4",
    quizzes: advancedDrafts("idiomas")
  }
];

export const quizSections: QuizSection[] = sectionDrafts.map((section) => ({
  ...section,
  quizzes: section.quizzes
    .map((quiz, index) => ({ quiz: makeQuiz(quiz, section.accent), index }))
    .sort(
      (first, second) =>
        difficultyOrder[first.quiz.difficulty] - difficultyOrder[second.quiz.difficulty] ||
        first.index - second.index
    )
    .map(({ quiz }) => quiz)
}));

export const quizzes: Quiz[] = quizSections.flatMap((section) => section.quizzes);

export function getQuizBySlug(slug: string) {
  return quizzes.find((quiz) => quiz.slug === slug);
}

export function getSectionById(id: string) {
  return quizSections.find((section) => section.id === id);
}

export function getResultForScore(quiz: Quiz, score: number) {
  if (quiz.slug === "edad-mental") {
    if (score < 21) return quiz.results[0];
    if (score < 31) return quiz.results[1];
    if (score < 42) return quiz.results[2];
    if (score < 53) return quiz.results[3];
    return quiz.results[4];
  }

  if (quiz.kind === "trivia") {
    if (score <= 3) return quiz.results[0];
    if (score <= 6) return quiz.results[1];
    if (score <= 9) return quiz.results[2];
    if (score <= 12) return quiz.results[3];
    if (score <= 14) return quiz.results[4];
    return quiz.results[5];
  }

  if (score < 2.35) return quiz.results[0];
  if (score < 3.25) return quiz.results[1];
  return quiz.results[2];
}
