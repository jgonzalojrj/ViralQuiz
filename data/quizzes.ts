import { expandedKnowledgeTriviaSeeds, type TriviaSeed } from "./trivia";

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
  summary: string;
  accent: string;
};

export type QuizKind = "personal" | "trivia" | "challenge";

export type Quiz = {
  slug: string;
  title: string;
  tagline: string;
  duration: string;
  kind: QuizKind;
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
};

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
    summary: "Tu edad mental va ligera, impulsiva y curiosa. Te mueve mas la energia del momento que el manual de instrucciones.",
    accent: "#ff5b6e"
  },
  {
    id: "young",
    title: "Mente joven",
    scoreLabel: "24",
    summary: "Tienes ganas de moverte, pero ya empiezas a elegir mejor tus batallas. Espontaneidad con algo de filtro.",
    accent: "#18b7a0"
  },
  {
    id: "adult",
    title: "Equilibrio adulto",
    scoreLabel: "36",
    summary: "Tu resultado mezcla energia y criterio. Sabes divertirte, pero tambien detectar cuando toca poner orden.",
    accent: "#f4b63f"
  },
  {
    id: "calm",
    title: "Cabeza serena",
    scoreLabel: "48",
    summary: "Lees bastante bien las situaciones y no todo te arrastra. Prefieres calma, claridad y decisiones con sentido.",
    accent: "#3568ff"
  },
  {
    id: "wise",
    title: "Sabiduria tranquila",
    scoreLabel: "60",
    summary: "Tu energia es selectiva y muy tuya. No todo merece prisa, respuesta o explicacion, y eso te queda bien.",
    accent: "#9b5cff"
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
        id: "basic",
        title: "Base en marcha",
        scoreLabel: "Basico",
        summary: `Has acertado algunas de ${subject}, pero todavia hay margen para pillar mejor los datos mas claros.`,
        accent
      },
      {
        id: "medium",
        title: "Buen nivel",
        scoreLabel: "Medio",
        summary: `Tienes una base solida de ${subject}. Fallas alguna pregunta menos obvia, pero controlas lo principal.`,
        accent
      },
      {
        id: "hard",
        title: "Muy fino",
        scoreLabel: "Dificil",
        summary: `Has sacado bastante nota en ${subject}. Se nota que recuerdas detalles y no solo lo mas popular.`,
        accent
      },
      {
        id: "extreme",
        title: "Nivel experto",
        scoreLabel: "Extremo",
        summary: `Resultado fuerte en ${subject}. Si esto fuera un pique en grupo, tocaria presumir un poco.`,
        accent
      }
    ];
  }

  if (kind === "challenge") {
    return [
      {
        id: "warm",
        title: "Arranque suave",
        scoreLabel: "Foco",
        summary: `En ${subject} vas mejor cuando bajas el ruido y encuentras ritmo antes de acelerar.`,
        accent
      },
      {
        id: "sharp",
        title: "Reflejos finos",
        scoreLabel: "Rapido",
        summary: `Tienes buena mezcla de velocidad y control. ${subject} se te da mejor cuando confias sin precipitarte.`,
        accent
      },
      {
        id: "locked",
        title: "Concentracion total",
        scoreLabel: "Pro",
        summary: `Tu resultado en ${subject} tiene pinta de mente entrenada: lees, decides y no te vas con la primera trampa.`,
        accent
      }
    ];
  }

  return [
    {
      id: "spark",
      title: "Impulso vivo",
      scoreLabel: "Activo",
      summary: `En ${subject} tiras de energia, intuicion y ganas de moverte. Lo tuyo es entrar en accion rapido.`,
      accent
    },
    {
      id: "balance",
      title: "Equilibrio flexible",
      scoreLabel: "Mix",
      summary: `Tu resultado en ${subject} mezcla espontaneidad con cabeza. Te adaptas sin perder demasiado el centro.`,
      accent
    },
    {
      id: "calm",
      title: "Calma selectiva",
      scoreLabel: "Zen",
      summary: `En ${subject} prefieres elegir bien antes que correr. Observas, filtras y sueles cuidar tu energia.`,
      accent
    }
  ];
}

function makeQuiz(draft: QuizDraft, accent: string): Quiz {
  return {
    slug: draft.slug,
    title: draft.title,
    tagline: draft.tagline,
    duration: draft.duration ?? "2 min",
    kind: draft.kind,
    note:
      draft.kind === "trivia"
        ? "Test de entretenimiento: no es una evaluacion oficial."
        : "Resultado orientativo y de entretenimiento.",
    href: `/test/${draft.slug}`,
    questions: makeQuestions(draft.kind, draft.slug, draft.subject),
    results: makeResults(draft.kind, draft.subject, accent, draft.slug)
  };
}

const sectionDrafts: Array<Omit<QuizSection, "quizzes"> & { quizzes: QuizDraft[] }> = [
  {
    id: "inteligencia-mente",
    title: "Inteligencia / Mente",
    description: "Edad mental, logica, memoria, atencion y formas de pensar.",
    accent: "#ff5b6e",
    quizzes: [
      { slug: "edad-mental", title: "Test de edad mental", tagline: "Tu energia mental en version rapida.", kind: "personal", subject: "edad mental" },
      { slug: "logica-rapida", title: "Test de logica rapida", tagline: "Preguntas cortas para pensar sin dormirse.", kind: "challenge", subject: "logica rapida" },
      { slug: "memoria-visual", title: "Test de memoria visual", tagline: "Mide como observas y recuerdas patrones.", kind: "challenge", subject: "memoria visual" },
      { slug: "atencion", title: "Test de atencion", tagline: "Detalles, trampas pequenas y foco.", kind: "challenge", subject: "atencion" },
      { slug: "inteligencia-predomina", title: "Que inteligencia predomina en ti", tagline: "Tu forma natural de resolver cosas.", kind: "personal", subject: "inteligencia predominante" }
    ]
  },
  {
    id: "personalidad",
    title: "Personalidad",
    description: "Tests sobre energia, estilo personal, caos y forma de ser.",
    accent: "#9b5cff",
    quizzes: [
      { slug: "tipo-de-mente", title: "Que tipo de mente tienes", tagline: "Analitica, creativa, practica o intuitiva.", kind: "personal", subject: "tipo de mente" },
      { slug: "vibe-transmites", title: "Que vibe transmites", tagline: "La primera impresion que dejas sin darte cuenta.", kind: "personal", subject: "vibe que transmites" },
      { slug: "tan-caotico-eres", title: "Que tan caotico eres", tagline: "Orden, improvisacion y un poco de caos diario.", kind: "personal", subject: "caos mental" },
      { slug: "mente-ordenada", title: "Que tan ordenada es tu mente", tagline: "Listas, ruido mental y prioridades.", kind: "personal", subject: "orden mental" }
    ]
  },
  {
    id: "relaciones",
    title: "Relaciones",
    description: "Pareja, amistad, limites y comportamiento social.",
    accent: "#18b7a0",
    quizzes: [
      { slug: "tipo-pareja", title: "Que tipo de pareja eres", tagline: "Tu estilo cuando quieres bien.", kind: "personal", subject: "relaciones de pareja" },
      { slug: "tipo-amigo", title: "Que tipo de amigo eres", tagline: "Como estas para los tuyos.", kind: "personal", subject: "amistad" },
      { slug: "tan-celoso-eres", title: "Que tan celoso eres", tagline: "Confianza, dudas y calma emocional.", kind: "personal", subject: "celos" },
      { slug: "compatibilidad", title: "Que tan compatible eres con alguien", tagline: "Ritmos, planes y forma de comunicarse.", kind: "personal", subject: "compatibilidad" },
      { slug: "red-flags", title: "Test de red flags", tagline: "Detecta senales que conviene mirar dos veces.", kind: "personal", subject: "red flags" },
      { slug: "green-flags", title: "Test de green flags", tagline: "Lo sano tambien merece puntuacion.", kind: "personal", subject: "green flags" },
      { slug: "facil-te-enamoras", title: "Que tan facil te enamoras", tagline: "Intensidad, ilusion y pies en la tierra.", kind: "personal", subject: "enamorarse" },
      { slug: "poner-limites", title: "Que tan bien sabes poner limites", tagline: "Decir que no sin montar una pelicula.", kind: "personal", subject: "limites personales" }
    ]
  },
  {
    id: "deportes",
    title: "Deportes",
    description: "Trivia, reglas, historia y retos de conocimiento deportivo.",
    accent: "#f4b63f",
    quizzes: [
      { slug: "conocimientos-futbol", title: "Test de conocimientos de futbol", tagline: "Reglas, historia y cultura futbolera.", kind: "trivia", subject: "futbol" },
      { slug: "conocimientos-baloncesto", title: "Test de conocimientos de baloncesto", tagline: "Cancha, reglas y jugadores clave.", kind: "trivia", subject: "baloncesto" },
      { slug: "conocimientos-tenis", title: "Test de conocimientos de tenis", tagline: "Puntos, torneos y golpes basicos.", kind: "trivia", subject: "tenis" },
      { slug: "conocimientos-formula-1", title: "Test de conocimientos de Formula 1", tagline: "Circuitos, estrategia y velocidad.", kind: "trivia", subject: "Formula 1" },
      { slug: "adivina-deporte-pista", title: "Adivina el deporte por la pista", tagline: "Lee la pista y piensa rapido.", kind: "trivia", subject: "deportes por pistas" },
      { slug: "reglas-deportivas", title: "Test de reglas deportivas", tagline: "Normas que cambian por completo una jugada.", kind: "trivia", subject: "reglas deportivas" },
      { slug: "historia-futbol", title: "Test de historia del futbol", tagline: "Copas, epocas y momentos famosos.", kind: "trivia", subject: "historia del futbol" },
      { slug: "jugadores-famosos", title: "Test de jugadores famosos", tagline: "Trayectorias, iconos y nombres que suenan.", kind: "trivia", subject: "jugadores famosos" }
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
      { slug: "todo-el-mundo-deberia-saber", title: "Preguntas que todo el mundo deberia saber", tagline: "Basicos utiles que conviene tener frescos.", kind: "trivia", subject: "conocimientos basicos" }
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
      { slug: "geografia-extrema", title: "Geografia extrema", tagline: "Datos menos obvios para gente de mapa fino.", kind: "trivia", subject: "geografia extrema" }
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
      { slug: "historia-extrema", title: "Historia nivel extremo", tagline: "Tratados, batallas y detalles para nota.", kind: "trivia", subject: "historia extrema" }
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
      { slug: "inventos-descubrimientos", title: "Inventos y descubrimientos", tagline: "Ideas, hallazgos y personas que cambiaron cosas.", kind: "trivia", subject: "inventos y descubrimientos" }
    ]
  },
  {
    id: "musica",
    title: "Musica",
    description: "Ritmos, cultura musical y retos para quien siempre tararea algo.",
    accent: "#e24ca7",
    quizzes: [
      { slug: "cultura-musical", title: "Test de cultura musical", tagline: "Artistas, estilos y memoria de canciones.", kind: "trivia", subject: "musica" },
      { slug: "adivina-cancion-pista", title: "Adivina la cancion por la pista", tagline: "Lee la pista, piensa en ritmo y responde.", kind: "trivia", subject: "canciones por pistas" }
    ]
  },
  {
    id: "cine-series",
    title: "Cine y series",
    description: "Pantalla grande, maratones, personajes y cultura pop.",
    accent: "#3d7cff",
    quizzes: [
      { slug: "cine-series", title: "Test de cine y series", tagline: "Un repaso rapido por historias, escenas y fandom.", kind: "trivia", subject: "cine y series" },
      { slug: "personajes-pantalla", title: "Personajes famosos", tagline: "Reconoce iconos de peliculas y series por pistas.", kind: "trivia", subject: "personajes de cine y series" }
    ]
  },
  {
    id: "retos-rapidos",
    title: "Retos rapidos",
    description: "Mini-juegos de foco, reflejos y velocidad mental.",
    accent: "#9b5cff",
    quizzes: [
      { slug: "reflejos", title: "Test de reflejos", tagline: "Respuesta rapida sin perder precision.", kind: "challenge", subject: "reflejos" },
      { slug: "atencion-visual", title: "Test de atencion visual", tagline: "Mira bien antes de tocar.", kind: "challenge", subject: "atencion visual" },
      { slug: "decisiones-rapidas", title: "Test de decisiones rapidas", tagline: "Elegir con poco margen tambien se entrena.", kind: "challenge", subject: "decisiones rapidas" },
      { slug: "numero-diferente", title: "Encuentra el numero diferente", tagline: "Un clasico de ojo fino.", kind: "challenge", subject: "numero diferente" },
      { slug: "memoria-numerica", title: "Test de memoria numerica", tagline: "Bloques, cifras y cabeza fria.", kind: "challenge", subject: "memoria numerica" },
      { slug: "velocidad-mental", title: "Test de velocidad mental", tagline: "Pensar rapido sin atropellarte.", kind: "challenge", subject: "velocidad mental" },
      { slug: "reaccion", title: "Test de reaccion", tagline: "Control, impulso y timing.", kind: "challenge", subject: "reaccion" },
      { slug: "concentracion-60", title: "Test de concentracion en 60 segundos", tagline: "Un minuto para no despistarte.", kind: "challenge", subject: "concentracion en 60 segundos" }
    ]
  },
  {
    id: "vida-diaria",
    title: "Vida diaria",
    description: "Habitos, rutina, organizacion y pequenas decisiones.",
    accent: "#3568ff",
    quizzes: [
      { slug: "organizado-eres", title: "Que tan organizado eres", tagline: "Tu sistema real para no perderlo todo.", kind: "personal", subject: "organizacion diaria" },
      { slug: "procrastinador-eres", title: "Que tan procrastinador eres", tagline: "Manana tambien cuenta, pero hoy pregunta.", kind: "personal", subject: "procrastinacion" },
      { slug: "vivir-solo", title: "Que tan preparado estas para vivir solo", tagline: "Nevera, horarios y supervivencia basica.", kind: "personal", subject: "vivir solo" },
      { slug: "buena-rutina", title: "Que tan buena es tu rutina", tagline: "Lo que haces cuando nadie mira.", kind: "personal", subject: "rutina diaria" },
      { slug: "dependiente-movil", title: "Que tan dependiente eres del movil", tagline: "Notificaciones, scroll y autocontrol.", kind: "personal", subject: "uso del movil" },
      { slug: "productivo-eres", title: "Que tan productivo eres", tagline: "Foco sin venderte una agenda perfecta.", kind: "personal", subject: "productividad" },
      { slug: "gestionas-tiempo", title: "Que tan bien gestionas tu tiempo", tagline: "Llegar, priorizar y no vivir apagando fuegos.", kind: "personal", subject: "gestion del tiempo" }
    ]
  }
];

export const quizSections: QuizSection[] = sectionDrafts.map((section) => ({
  ...section,
  quizzes: section.quizzes.map((quiz) => makeQuiz(quiz, section.accent))
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
    if (score < 0.35) return quiz.results[0];
    if (score < 0.6) return quiz.results[1];
    if (score < 0.82) return quiz.results[2];
    return quiz.results[3];
  }

  if (score < 2.35) return quiz.results[0];
  if (score < 3.25) return quiz.results[1];
  return quiz.results[2];
}
