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

const triviaPrompts = [
  "Cual seria la forma mas fiable de comprobar un dato sobre {subject}?",
  "En {subject}, que detalle suele decidir si alguien entiende bien el tema?",
  "Si una pregunta de {subject} incluye una excepcion, conviene...",
  "Que respuesta encaja mejor con un test de conocimientos de {subject}?",
  "Cuando dudas entre dos opciones sobre {subject}, lo mas sensato es...",
  "Un buen reto de {subject} deberia medir...",
  "Si aparece una norma basica de {subject}, normalmente importa...",
  "Que pista suele ayudar mas en una pregunta de {subject}?",
  "En una trivia de {subject}, un error frecuente es...",
  "Para reconocer a una figura famosa de {subject}, mirarias primero...",
  "Si la pregunta habla de historia de {subject}, conviene fijarse en...",
  "Una pregunta dificil de {subject} suele mezclar...",
  "Que opcion parece mas propia de alguien que domina {subject}?",
  "Antes de responder una pregunta rapida de {subject}, ayuda...",
  "Un resultado alto en {subject} significa que..."
];

const triviaOptions = [
  ["Recordar una frase viral", "Contrastar reglas, fechas o contexto", "Elegir la respuesta mas llamativa", "Responder por intuicion"],
  ["El color de la equipacion", "La norma o el contexto", "El nombre mas famoso", "La opcion mas larga"],
  ["Leerla dos veces", "Ignorarla", "Elegir al azar", "Buscar la opcion graciosa"],
  ["Una respuesta concreta", "Un estado de animo", "Un color favorito", "Una preferencia personal"],
  ["Descartar lo imposible", "Quedarte con la primera", "Elegir la mas popular", "Cambiar sin pensar"],
  ["Memoria y criterio", "Solo personalidad", "Solo suerte", "Solo velocidad"],
  ["Porque cambia la respuesta", "Porque queda bonito", "Porque siempre es igual", "Porque no afecta"],
  ["Fecha, regla o pista tecnica", "El tono de la frase", "El emoji imaginario", "La opcion mas corta"],
  ["Confundir fama con precision", "Leer demasiado", "Saber la regla", "Recordar el contexto"],
  ["Trayectoria, logro o estilo", "El peinado", "La ciudad al azar", "La respuesta mas nueva"],
  ["Epoca y competicion", "Tu equipo favorito", "El color mas fuerte", "La palabra mas rara"],
  ["Regla, contexto y memoria", "Solo opiniones", "Solo preferencias", "Solo estetica"],
  ["Distingue detalles pequenos", "Contesta siempre lo mismo", "Evita toda dificultad", "Elige lo que suena mejor"],
  ["Separar pista y respuesta", "Correr sin leer", "Mirar solo la primera palabra", "Pensar en otra cosa"],
  ["Tienes buena base y atencion", "Eres una persona perfecta", "Nunca fallas", "No necesitas leer"]
];

type TriviaSeed = {
  prompt: string;
  correct: string;
  wrong: [string, string, string];
};

const sportsTriviaSeeds: Record<string, TriviaSeed[]> = {
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

function makeOptions(labels: string[], prefix: string) {
  return labels.map((label, index) => ({
    id: `${prefix}-${index + 1}`,
    label,
    value: index + 1
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
        value: labelIndex === 0 ? 4 : 1
      }))
    };
  });
}

function makeQuestions(kind: QuizKind, slug: string, subject: string) {
  if (kind === "trivia" && sportsTriviaSeeds[slug]) {
    return makeTriviaSeedQuestions(slug, sportsTriviaSeeds[slug]);
  }

  const prompts = kind === "challenge" ? challengePrompts : kind === "trivia" ? triviaPrompts : personalPrompts;
  const optionGroups = kind === "challenge" ? challengeOptions : kind === "trivia" ? triviaOptions : personalOptions;

  return prompts.map((prompt, index) => ({
    id: `${slug}-${index + 1}`,
    prompt: prompt.replace("{subject}", subject),
    options: makeOptions(optionGroups[index], `${slug}-${index + 1}`)
  }));
}

function makeResults(kind: QuizKind, subject: string, accent: string): QuizResult[] {
  if (kind === "trivia") {
    return [
      {
        id: "starter",
        title: "Nivel curioso",
        scoreLabel: "Base",
        summary: `Tienes una primera base sobre ${subject}. Te falta afinar detalles, pero ya sabes por donde mirar.`,
        accent
      },
      {
        id: "solid",
        title: "Buen ojo",
        scoreLabel: "Bien",
        summary: `Te mueves con soltura en ${subject}. Hay memoria, criterio y alguna respuesta con bastante oficio.`,
        accent
      },
      {
        id: "expert",
        title: "Modo experto",
        scoreLabel: "Top",
        summary: `Dominas bastantes claves de ${subject}. Este resultado pide captura y un poco de pique sano.`,
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
    results: makeResults(draft.kind, draft.subject, accent)
  };
}

const sectionDrafts: Array<Omit<QuizSection, "quizzes"> & { quizzes: QuizDraft[] }> = [
  {
    id: "inteligencia-mente",
    title: "Inteligencia / Mente",
    description: "Personalidad, foco, memoria y pequenas pruebas mentales.",
    accent: "#ff5b6e",
    quizzes: [
      { slug: "edad-mental", title: "Test de edad mental", tagline: "Tu energia mental en version rapida.", kind: "personal", subject: "edad mental" },
      { slug: "tipo-de-mente", title: "Que tipo de mente tienes", tagline: "Analitica, creativa, practica o intuitiva.", kind: "personal", subject: "tipo de mente" },
      { slug: "vibe-transmites", title: "Que vibe transmites", tagline: "La primera impresion que dejas sin darte cuenta.", kind: "personal", subject: "vibe que transmites" },
      { slug: "tan-caotico-eres", title: "Que tan caotico eres", tagline: "Orden, improvisacion y un poco de caos diario.", kind: "personal", subject: "caos mental" },
      { slug: "logica-rapida", title: "Test de logica rapida", tagline: "Preguntas cortas para pensar sin dormirse.", kind: "challenge", subject: "logica rapida" },
      { slug: "memoria-visual", title: "Test de memoria visual", tagline: "Mide como observas y recuerdas patrones.", kind: "challenge", subject: "memoria visual" },
      { slug: "atencion", title: "Test de atencion", tagline: "Detalles, trampas pequenas y foco.", kind: "challenge", subject: "atencion" },
      { slug: "inteligencia-predomina", title: "Que inteligencia predomina en ti", tagline: "Tu forma natural de resolver cosas.", kind: "personal", subject: "inteligencia predominante" }
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
      { slug: "mente-ordenada", title: "Que tan ordenada es tu mente", tagline: "Listas, ruido mental y prioridades.", kind: "personal", subject: "orden mental" },
      { slug: "gestionas-tiempo", title: "Que tan bien gestionas tu tiempo", tagline: "Llegar, priorizar y no vivir apagando fuegos.", kind: "personal", subject: "gestion del tiempo" }
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

export function getResultForScore(quiz: Quiz, score: number) {
  if (score < 2.35) return quiz.results[0];
  if (score < 3.25) return quiz.results[1];
  return quiz.results[2];
}
