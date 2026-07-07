import { q, type TriviaSeed } from "./types";

type AdvancedDifficulty = "dificil" | "extremo";

type AdvancedQuizDraft = {
  slug: string;
  title: string;
  tagline: string;
  subject: string;
  difficulty: AdvancedDifficulty;
  pool: string;
  offset: number;
};

type Fact = {
  prompt: string;
  correct: string;
  group: string;
};

function f(prompt: string, correct: string, group: string): Fact {
  return { prompt, correct, group };
}

function getWrongAnswers(pool: Fact[], current: Fact, index: number) {
  const sameGroup = pool.filter((fact) => fact.group === current.group && fact.correct !== current.correct);
  const fallback = pool.filter((fact) => fact.correct !== current.correct);
  const candidates = sameGroup.length >= 3 ? sameGroup : fallback;
  const start = index % candidates.length;
  const wrongs: string[] = [];

  for (let step = 0; wrongs.length < 3 && step < candidates.length * 2; step += 1) {
    const candidate = candidates[(start + step) % candidates.length].correct;
    if (!wrongs.includes(candidate)) {
      wrongs.push(candidate);
    }
  }

  return wrongs as [string, string, string];
}

function makeQuestions(pool: Fact[], offset = 0): TriviaSeed[] {
  return Array.from({ length: 15 }, (_, questionIndex) => {
    const factIndex = (offset + questionIndex) % pool.length;
    const fact = pool[factIndex];
    const wrongs = getWrongAnswers(pool, fact, factIndex);

    return q(fact.prompt, fact.correct, wrongs[0], wrongs[1], wrongs[2]);
  });
}

const advancedPools = {
  cultureHard: [
    f("Que autor escribio En busca del tiempo perdido?", "Marcel Proust", "person"),
    f("Que compositor escribio Las cuatro estaciones?", "Antonio Vivaldi", "person"),
    f("Que cientifica gano dos premios Nobel en disciplinas distintas?", "Marie Curie", "person"),
    f("Que filosofo escribio Critica de la razon pura?", "Immanuel Kant", "person"),
    f("Que escritor checo escribio El proceso?", "Franz Kafka", "person"),
    f("Que pais tiene como capital a Ulan Bator?", "Mongolia", "country"),
    f("Que pais tiene como capital a Liubliana?", "Eslovenia", "country"),
    f("Que pais tiene como capital a Wellington?", "Nueva Zelanda", "country"),
    f("Que pais tiene como capital a Paramaribo?", "Surinam", "country"),
    f("Que pais tiene como capital a Kigali?", "Ruanda", "country"),
    f("Que elemento quimico tiene el simbolo W?", "Wolframio", "term"),
    f("Que instrumento mide la presion atmosferica?", "Barometro", "term"),
    f("Que movimiento artistico se asocia con Andre Breton?", "Surrealismo", "term"),
    f("Que ciencia estudia los sellos postales?", "Filatelia", "term"),
    f("Que disciplina estudia las monedas y medallas?", "Numismatica", "term"),
    f("En que ano cayo Constantinopla ante los otomanos?", "1453", "year"),
    f("En que ano se publico la primera parte de Don Quijote?", "1605", "year"),
    f("En que ano empezo la Revolucion francesa?", "1789", "year")
  ],
  cultureExtreme: [
    f("Que autor escribio El hombre sin atributos?", "Robert Musil", "person"),
    f("Que poeta escribio Las flores del mal?", "Charles Baudelaire", "person"),
    f("Que matematico da nombre a la conjetura demostrada por Andrew Wiles?", "Fermat", "person"),
    f("Que filosofo escribio Ser y tiempo?", "Martin Heidegger", "person"),
    f("Que antropologo escribio Tristes tropicos?", "Claude Levi-Strauss", "person"),
    f("Que pais tiene como capital a Ngerulmud?", "Palaos", "country"),
    f("Que pais tiene como capital a Funafuti?", "Tuvalu", "country"),
    f("Que pais tiene como capital a Yamusukro?", "Costa de Marfil", "country"),
    f("Que pais tiene como capital a Porto Novo?", "Benin", "country"),
    f("Que pais tiene como capital a Dili?", "Timor Oriental", "country"),
    f("Que palabra designa un libro publicado antes de 1501?", "Incunable", "term"),
    f("Que figura retorica invierte el orden de palabras en una frase?", "Hiperbaton", "term"),
    f("Que escala mide la dureza de los minerales?", "Mohs", "term"),
    f("Que periodo geologico precede al Jurasico?", "Triasico", "term"),
    f("Que sistema de escritura uso la antigua Mesopotamia?", "Cuneiforme", "term"),
    f("En que ano se firmo el Tratado de Tordesillas?", "1494", "year"),
    f("En que ano se firmo la Paz de Westfalia?", "1648", "year"),
    f("En que ano se celebro el Congreso de Viena?", "1815", "year")
  ],
  geographyHard: [
    f("Cual es la capital de Butan?", "Timbu", "capital"),
    f("Cual es la capital de Laos?", "Vientiane", "capital"),
    f("Cual es la capital de Belice?", "Belmopan", "capital"),
    f("Cual es la capital de Namibia?", "Windhoek", "capital"),
    f("Cual es la capital de Kirguistan?", "Biskek", "capital"),
    f("Que pais esta completamente rodeado por Sudafrica?", "Lesoto", "country"),
    f("Que pais tiene como capital a Suva?", "Fiyi", "country"),
    f("Que pais tiene como capital a Gaborone?", "Botsuana", "country"),
    f("Que pais tiene como capital a Asjabad?", "Turkmenistan", "country"),
    f("Que pais tiene como capital a Dushanbe?", "Tayikistan", "country"),
    f("Que estrecho separa Asia y America del Norte?", "Bering", "place"),
    f("Que canal conecta el Mediterraneo con el mar Rojo?", "Suez", "place"),
    f("Que desierto se encuentra principalmente en Mongolia y China?", "Gobi", "place"),
    f("Que lago es el mas profundo del mundo?", "Baikal", "place"),
    f("Que cordillera contiene el monte Elbrus?", "Caucaso", "place"),
    f("Que oceano rodea el Polo Norte?", "Artico", "place"),
    f("Que archipielago ecuatoriano es famoso por Darwin?", "Galapagos", "place"),
    f("Que mar se considera el mayor lago cerrado del mundo?", "Caspio", "place")
  ],
  geographyExtreme: [
    f("Cual es la capital de Eritrea?", "Asmara", "capital"),
    f("Cual es la capital de Comoras?", "Moroni", "capital"),
    f("Cual es la capital de Vanuatu?", "Port Vila", "capital"),
    f("Cual es la capital de San Cristobal y Nieves?", "Basseterre", "capital"),
    f("Cual es la capital de Santo Tome y Principe?", "Santo Tome", "capital"),
    f("Que territorio tiene como capital a Nuuk?", "Groenlandia", "territory"),
    f("Que territorio britanico tiene como capital a Stanley?", "Islas Malvinas", "territory"),
    f("Que territorio frances tiene como capital a Cayena?", "Guayana Francesa", "territory"),
    f("Que territorio tiene como capital a Torshavn?", "Islas Feroe", "territory"),
    f("Que territorio tiene como capital a Hagatna?", "Guam", "territory"),
    f("Que rio forma parte de la frontera entre Mexico y Estados Unidos?", "Rio Bravo", "place"),
    f("Que estrecho conecta el mar Negro con el mar de Marmara?", "Bosforo", "place"),
    f("Que isla grande se encuentra al sureste de Africa?", "Madagascar", "place"),
    f("Que peninsula contiene a Oman y Yemen?", "Arabiga", "place"),
    f("Que mar separa Arabia de Africa nororiental?", "Rojo", "place"),
    f("Que monte es el punto mas alto de los Alpes?", "Mont Blanc", "place"),
    f("Que rio atraviesa Basilea, Estrasburgo y Colonia?", "Rin", "place"),
    f("Que pais tiene salida al mar Caspio y capital en Baku?", "Azerbaiyan", "country")
  ],
  historyHard: [
    f("Que tratado puso fin a la Primera Guerra Mundial con Alemania?", "Versalles", "treaty"),
    f("Que tratado de 1713 cerro en parte la Guerra de Sucesion espanola?", "Utrecht", "treaty"),
    f("Que paz de 1648 puso fin a la Guerra de los Treinta Anos?", "Westfalia", "treaty"),
    f("Que tratado dividio zonas de expansion entre Castilla y Portugal?", "Tordesillas", "treaty"),
    f("Que documento ingles fue firmado en 1215?", "Carta Magna", "treaty"),
    f("Que emperador bizantino ordeno recopilar un famoso codigo legal?", "Justiniano", "person"),
    f("Que rey frances fue conocido como el Rey Sol?", "Luis XIV", "person"),
    f("Que lider mongol fundo el Imperio mongol?", "Gengis Kan", "person"),
    f("Que emperador romano legalizo el cristianismo con el Edicto de Milan?", "Constantino", "person"),
    f("Que gobernante del Imperio de Mali fue famoso por su peregrinacion a La Meca?", "Mansa Musa", "person"),
    f("En que ano empezo la Segunda Guerra Mundial?", "1939", "year"),
    f("En que ano cayo el Muro de Berlin?", "1989", "year"),
    f("En que ano empezo la Primera Guerra Mundial?", "1914", "year"),
    f("En que ano termino la Guerra Civil espanola?", "1939", "year"),
    f("En que ano se aprobo la Constitucion espanola vigente?", "1978", "year"),
    f("Que batalla de 1066 cambio la historia de Inglaterra?", "Hastings", "battle"),
    f("Que batalla naval de 480 a. C. enfrento a griegos y persas?", "Salamina", "battle"),
    f("Que batalla de 1815 derroto definitivamente a Napoleon?", "Waterloo", "battle")
  ],
  historyExtreme: [
    f("Que edicto frances de 1598 concedio derechos a los hugonotes?", "Nantes", "treaty"),
    f("Que acuerdo de 1555 reconocio la division religiosa del Sacro Imperio?", "Augsburgo", "treaty"),
    f("Que conferencia de 1884-1885 regulo el reparto colonial de Africa?", "Berlin", "treaty"),
    f("Que tratado de 1923 definio fronteras de la Turquia moderna?", "Lausana", "treaty"),
    f("Que tratado de 1494 dividio areas de expansion atlantica?", "Tordesillas", "treaty"),
    f("Que emperador romano establecio la tetrarquia?", "Diocleciano", "person"),
    f("Que rey persa fundo el Imperio aquemenida?", "Ciro II", "person"),
    f("Que lider chino lidero la Rebelion Taiping?", "Hong Xiuquan", "person"),
    f("Que emperador franco fue coronado en Roma en el ano 800?", "Carlomagno", "person"),
    f("Que sultan otomano conquisto Constantinopla?", "Mehmed II", "person"),
    f("En que ano se produjo la batalla de Poitiers asociada a Carlos Martel?", "732", "year"),
    f("En que ano los otomanos conquistaron Constantinopla?", "1453", "year"),
    f("En que ano empezo la Guerra de los Treinta Anos?", "1618", "year"),
    f("En que ano termino la Guerra de los Treinta Anos?", "1648", "year"),
    f("En que ano comenzo la Revolucion rusa?", "1917", "year"),
    f("Que batalla enfrento a Octavio y Marco Antonio en 31 a. C.?", "Accio", "battle"),
    f("Que batalla de 1805 fue una victoria naval britanica decisiva?", "Trafalgar", "battle"),
    f("Que batalla de 1521 aseguro la conquista espanola del imperio mexica?", "Tenochtitlan", "battle")
  ],
  scienceHard: [
    f("Que constante se representa habitualmente con la letra h en fisica cuantica?", "Planck", "term"),
    f("Que principio afirma la imposibilidad de conocer posicion y momento exactos a la vez?", "Incertidumbre", "term"),
    f("Que particula tiene carga positiva?", "Proton", "term"),
    f("Que particula elemental tiene carga negativa?", "Electron", "term"),
    f("Que particula del nucleo no tiene carga electrica?", "Neutron", "term"),
    f("Que cientifico propuso la teoria de la relatividad general?", "Albert Einstein", "person"),
    f("Que cientifico formulo leyes de la herencia con guisantes?", "Gregor Mendel", "person"),
    f("Que cientifica ayudo a revelar la estructura del ADN con difraccion de rayos X?", "Rosalind Franklin", "person"),
    f("Que astronomo formulo leyes del movimiento planetario?", "Johannes Kepler", "person"),
    f("Que quimico organizo una tabla periodica temprana?", "Dmitri Mendeleev", "person"),
    f("Que organulo realiza la fotosintesis en plantas?", "Cloroplasto", "term"),
    f("Que organulo se asocia con la produccion de energia celular?", "Mitocondria", "term"),
    f("Que molecula contiene la informacion genetica?", "ADN", "term"),
    f("Que escala mide acidez o basicidad?", "pH", "term"),
    f("Que tipo de enlace comparte electrones?", "Covalente", "term"),
    f("Que planeta tiene la Gran Mancha Roja?", "Jupiter", "place"),
    f("Que luna de Saturno tiene una atmosfera densa?", "Titan", "place"),
    f("Que galaxia grande se acerca a la Via Lactea?", "Andromeda", "place")
  ],
  scienceExtreme: [
    f("Que boson fue confirmado experimentalmente en el CERN en 2012?", "Higgs", "term"),
    f("Que ecuacion relaciona energia y masa en relatividad especial?", "E=mc2", "term"),
    f("Que numero atomico tiene el carbono?", "6", "number"),
    f("Que numero atomico tiene el oxigeno?", "8", "number"),
    f("Que numero atomico tiene el hierro?", "26", "number"),
    f("Que fisico da nombre al principio de exclusion?", "Wolfgang Pauli", "person"),
    f("Que biologa compartio el Nobel por el desarrollo de CRISPR-Cas9?", "Jennifer Doudna", "person"),
    f("Que cientifico da nombre a la ley de gravitacion universal?", "Newton", "person"),
    f("Que astronomo propuso el modelo heliocentrico moderno?", "Nicolas Copernico", "person"),
    f("Que fisico introdujo el concepto de cuanto de energia?", "Max Planck", "person"),
    f("Que periodo geologico precedio al Cretacico?", "Jurasico", "term"),
    f("Que tipo de ARN lleva aminoacidos al ribosoma?", "ARNt", "term"),
    f("Que enzima copia ADN a partir de ARN en retrovirus?", "Transcriptasa inversa", "term"),
    f("Que capa solar visible se observa como superficie aparente?", "Fotosfera", "term"),
    f("Que escala se usa para clasificar estrellas por temperatura OBAFGKM?", "Espectral", "term"),
    f("Que luna de Jupiter tiene un oceano bajo el hielo?", "Europa", "place"),
    f("Que planeta tiene el dia mas largo por rotacion entre los planetas?", "Venus", "place"),
    f("Que objeto Messier corresponde a la galaxia de Andromeda?", "M31", "term")
  ],
  sportsHard: [
    f("Quien fue MVP de la NBA en 1999?", "Karl Malone", "person"),
    f("Que jugador gano el Balon de Oro en 1995?", "George Weah", "person"),
    f("Que tenista gano Wimbledon 2001 como invitado?", "Goran Ivanisevic", "person"),
    f("Que piloto gano el Mundial de F1 de 2009?", "Jenson Button", "person"),
    f("Que atleta jamaicano domino los 100 metros en Pekin 2008?", "Usain Bolt", "person"),
    f("Que club gano la Champions League de 2004?", "Porto", "team"),
    f("Que club gano la Champions League de 1995?", "Ajax", "team"),
    f("Que seleccion gano la Eurocopa 2004?", "Grecia", "team"),
    f("Que franquicia NBA gano el titulo de 2011?", "Dallas Mavericks", "team"),
    f("Que equipo gano el Mundial de constructores de F1 de 2009?", "Brawn GP", "team"),
    f("En que ano se jugo el primer Mundial masculino de futbol?", "1930", "year"),
    f("En que ano se celebraron los Juegos Olimpicos de Barcelona?", "1992", "year"),
    f("En que ano gano Argentina el oro olimpico masculino de baloncesto?", "2004", "year"),
    f("En que ano se disputo el Maracanazo?", "1950", "year"),
    f("En que ano gano Espana el Mundial masculino de futbol?", "2010", "year"),
    f("Que torneo de tenis se juega sobre hierba en Londres?", "Wimbledon", "event"),
    f("Que circuito belga es famoso por Eau Rouge?", "Spa-Francorchamps", "event"),
    f("Que competicion sudamericana de clubes es la mas prestigiosa?", "Copa Libertadores", "event")
  ],
  sportsExtreme: [
    f("Que piloto gano el primer Mundial de F1 en 1950?", "Giuseppe Farina", "person"),
    f("Que futbolista marco el gol de la final del Mundial 2010?", "Andres Iniesta", "person"),
    f("Que jugador uruguayo gano el Balon de Oro del Mundial 2010?", "Diego Forlan", "person"),
    f("Que jugador popularizo el penalti picado que lleva su apellido?", "Antonin Panenka", "person"),
    f("Que jugador aleman lidero a Dallas al titulo NBA de 2011?", "Dirk Nowitzki", "person"),
    f("Que club gano la Copa de Europa de 1991?", "Estrella Roja", "team"),
    f("Que seleccion gano el Mundial masculino de 1954?", "Alemania Federal", "team"),
    f("Que equipo gano la Champions de 1999 con dos goles en el descuento?", "Manchester United", "team"),
    f("Que seleccion gano la Eurocopa de 1992?", "Dinamarca", "team"),
    f("Que equipo uso el McLaren MP4/4 en 1988?", "McLaren", "team"),
    f("En que ano se firmo la sentencia Bosman?", "1995", "year"),
    f("En que ano se disputo la final olimpica de baloncesto con el Dream Team?", "1992", "year"),
    f("En que ano gano Grecia la Eurocopa?", "2004", "year"),
    f("En que ano gano Brawn GP su unico titulo de constructores?", "2009", "year"),
    f("En que ano se celebro el Mundial de futbol en Uruguay?", "1930", "year"),
    f("Que estilo defensivo se asocia historicamente con Italia?", "Catenaccio", "term"),
    f("Que concepto neerlandes se asocia al Ajax y Holanda de los 70?", "Futbol Total", "term"),
    f("Que sistema de desempate corto se usa en tenis?", "Tie-break", "term")
  ],
  cinemaHard: [
    f("Quien dirigio Ciudadano Kane?", "Orson Welles", "person"),
    f("Quien dirigio Los siete samurais?", "Akira Kurosawa", "person"),
    f("Quien dirigio El padrino?", "Francis Ford Coppola", "person"),
    f("Quien dirigio 2001: Una odisea del espacio?", "Stanley Kubrick", "person"),
    f("Quien dirigio Pulp Fiction?", "Quentin Tarantino", "person"),
    f("Que pelicula surcoreana gano el Oscar a mejor pelicula en 2020?", "Parasite", "work"),
    f("Que pelicula de Ridley Scott presenta replicantes?", "Blade Runner", "work"),
    f("Que pelicula de Hayao Miyazaki gano el Oscar a mejor pelicula animada?", "El viaje de Chihiro", "work"),
    f("Que pelicula de David Fincher gira alrededor de un club clandestino?", "Fight Club", "work"),
    f("Que pelicula de Fellini incluye la Fontana di Trevi?", "La dolce vita", "work"),
    f("Que serie tiene como protagonista a Walter White?", "Breaking Bad", "series"),
    f("Que serie incluye a la familia Roy y un imperio mediatico?", "Succession", "series"),
    f("Que serie tiene el cafe Central Perk?", "Friends", "series"),
    f("Que serie incluye a Eleven?", "Stranger Things", "series"),
    f("Que serie incluye a Saul Goodman?", "Better Call Saul", "series"),
    f("En que ano gano Titanic el Oscar a mejor pelicula?", "1998", "year"),
    f("En que ano se estreno Star Wars: A New Hope?", "1977", "year"),
    f("En que ano se estreno El padrino?", "1972", "year")
  ],
  cinemaExtreme: [
    f("Que director realizo Persona en 1966?", "Ingmar Bergman", "person"),
    f("Que director realizo Stalker?", "Andrei Tarkovsky", "person"),
    f("Que director japones realizo Tokyo Story?", "Yasujiro Ozu", "person"),
    f("Que directora realizo Beau Travail?", "Claire Denis", "person"),
    f("Que director realizo In the Mood for Love?", "Wong Kar-wai", "person"),
    f("Que pelicula gano la Palma de Oro en 1994?", "Pulp Fiction", "work"),
    f("Que pelicula muda alemana dirigio F. W. Murnau sobre un vampiro?", "Nosferatu", "work"),
    f("Que pelicula de Billy Wilder tiene a Norma Desmond?", "Sunset Boulevard", "work"),
    f("Que pelicula de Kurosawa narra versiones contradictorias de un crimen?", "Rashomon", "work"),
    f("Que pelicula de Coppola adapta la novela de S. E. Hinton sobre pandillas?", "The Outsiders", "work"),
    f("Que serie de culto de David Lynch transcurre en un pueblo con Laura Palmer?", "Twin Peaks", "series"),
    f("Que serie britanica de culto incluyo el episodio San Junipero?", "Black Mirror", "series"),
    f("Que serie de HBO sigue a detectives en antologias por temporada?", "True Detective", "series"),
    f("Que serie usa el parque de atracciones futurista de Delos?", "Westworld", "series"),
    f("Que serie italiana adapta una novela de Roberto Saviano?", "Gomorrah", "series"),
    f("En que ano se estreno Ciudadano Kane?", "1941", "year"),
    f("En que ano se estreno 2001: Una odisea del espacio?", "1968", "year"),
    f("En que ano se estreno Blade Runner?", "1982", "year")
  ],
  musicHard: [
    f("Que banda publico OK Computer?", "Radiohead", "artist"),
    f("Que duo frances publico Random Access Memories?", "Daft Punk", "artist"),
    f("Que trompetista lidero Kind of Blue?", "Miles Davis", "artist"),
    f("Que banda publico The Dark Side of the Moon?", "Pink Floyd", "artist"),
    f("Que grupo publico Rumours?", "Fleetwood Mac", "artist"),
    f("Que album de Kendrick Lamar recibio el Pulitzer de musica?", "DAMN.", "work"),
    f("Que album de Nirvana se publico en 1991?", "Nevermind", "work"),
    f("Que disco de Prince acompano una pelicula homonima de 1984?", "Purple Rain", "work"),
    f("Que album de Amy Winehouse incluye Rehab?", "Back to Black", "work"),
    f("Que album de The Beatles se asocia con Sgt. Pepper?", "Sgt. Pepper's Lonely Hearts Club Band", "work"),
    f("Que compositor escribio La consagracion de la primavera?", "Igor Stravinsky", "person"),
    f("Que compositor escribio la Quinta Sinfonia?", "Ludwig van Beethoven", "person"),
    f("Que compositor escribio El clave bien temperado?", "Johann Sebastian Bach", "person"),
    f("Que compositor escribio Bolero?", "Maurice Ravel", "person"),
    f("Que compositor escribio Carmen?", "Georges Bizet", "person"),
    f("Que sello se asocia con Marvin Gaye y Stevie Wonder?", "Motown", "term"),
    f("Que genero se asocia con improvisacion y swing?", "Jazz", "term"),
    f("Que movimiento musical britanico incluyo a Oasis y Blur?", "Britpop", "term")
  ],
  musicExtreme: [
    f("Que banda publico Loveless en 1991?", "My Bloody Valentine", "artist"),
    f("Que artista publico The Rise and Fall of Ziggy Stardust?", "David Bowie", "artist"),
    f("Que grupo aleman es pionero de la musica electronica con Autobahn?", "Kraftwerk", "artist"),
    f("Que saxofonista publico A Love Supreme?", "John Coltrane", "artist"),
    f("Que cantante caboverdiana fue conocida como la Diva de los pies descalzos?", "Cesaria Evora", "artist"),
    f("Que album de Talk Talk es clave del post-rock temprano?", "Spirit of Eden", "work"),
    f("Que album de The Velvet Underground tiene portada de banana?", "The Velvet Underground & Nico", "work"),
    f("Que opera de Mozart incluye a Papageno?", "La flauta magica", "work"),
    f("Que obra de Orff empieza con O Fortuna?", "Carmina Burana", "work"),
    f("Que album de Radiohead siguio a OK Computer?", "Kid A", "work"),
    f("Que compositor escribio Pierrot lunaire?", "Arnold Schoenberg", "person"),
    f("Que compositor minimalista escribio Music for 18 Musicians?", "Steve Reich", "person"),
    f("Que productora y cantante produjo el album Oil of Every Pearl's Un-Insides?", "SOPHIE", "person"),
    f("Que productor trabajo con Brian Eno en la trilogia berlinesa de Bowie?", "Tony Visconti", "person"),
    f("Que compositora fue pionera de la musica electronica con la BBC Radiophonic Workshop?", "Delia Derbyshire", "person"),
    f("Que subgenero metal se asocia con blast beats y voces guturales?", "Death metal", "term"),
    f("Que genero jamaicano precedio directamente al reggae?", "Rocksteady", "term"),
    f("Que tecnica vocal usa silabas sin significado en jazz?", "Scat", "term")
  ],
  technologyHard: [
    f("Que protocolo traduce nombres de dominio a direcciones IP?", "DNS", "term"),
    f("Que protocolo se usa para transferir paginas web cifradas?", "HTTPS", "term"),
    f("Que sigla identifica una red privada virtual?", "VPN", "term"),
    f("Que tecnica convierte datos en un resumen de longitud fija?", "Hashing", "term"),
    f("Que ataque prueba muchas contrasenas posibles?", "Fuerza bruta", "term"),
    f("Quien creo la World Wide Web?", "Tim Berners-Lee", "person"),
    f("Quien es conocido por la maquina teorica que lleva su apellido?", "Alan Turing", "person"),
    f("Quien cofundo Apple junto a Steve Jobs?", "Steve Wozniak", "person"),
    f("Quien creo Linux inicialmente?", "Linus Torvalds", "person"),
    f("Quien diseno el lenguaje C junto a Dennis Ritchie?", "Brian Kernighan", "person"),
    f("Que empresa desarrollo el procesador 8086?", "Intel", "company"),
    f("Que empresa adquirio Android Inc. y desarrollo Android como plataforma global?", "Google", "company"),
    f("Que empresa publico MS-DOS como sistema operativo historico?", "Microsoft", "company"),
    f("Que empresa fabrica la familia de GPU GeForce?", "Nvidia", "company"),
    f("Que empresa popularizo la base de datos Oracle?", "Oracle", "company"),
    f("En que ano se publico el primer iPhone?", "2007", "year"),
    f("En que ano se lanzo Windows 95?", "1995", "year"),
    f("En que ano se creo el protocolo Bitcoin?", "2008", "year")
  ],
  technologyExtreme: [
    f("Que ataque explota consultas SQL mal filtradas?", "Inyeccion SQL", "term"),
    f("Que vulnerabilidad web ejecuta scripts en el navegador de la victima?", "XSS", "term"),
    f("Que modelo divide redes en siete capas?", "OSI", "term"),
    f("Que algoritmo de clave publica se basa en factorizacion de enteros?", "RSA", "term"),
    f("Que tecnica ejecuta codigo aislado en contenedores ligeros?", "Contenedorizacion", "term"),
    f("Quien formulo la ley sobre transistores que duplican su densidad?", "Gordon Moore", "person"),
    f("Quien desarrollo el lenguaje Python?", "Guido van Rossum", "person"),
    f("Quien creo el lenguaje JavaScript?", "Brendan Eich", "person"),
    f("Quien propuso el test de Turing?", "Alan Turing", "person"),
    f("Quien diseno la arquitectura de von Neumann?", "John von Neumann", "person"),
    f("Que empresa desarrollo el lenguaje Go?", "Google", "company"),
    f("Que empresa creo Kubernetes originalmente?", "Google", "company"),
    f("Que empresa desarrollo Java originalmente?", "Sun Microsystems", "company"),
    f("Que empresa creo GitHub?", "GitHub Inc.", "company"),
    f("Que empresa desarrollo el navegador Firefox?", "Mozilla", "company"),
    f("En que ano se presento el primer Macintosh?", "1984", "year"),
    f("En que ano se creo el proyecto GNU?", "1983", "year"),
    f("En que ano se lanzo la primera version publica de Linux?", "1991", "year")
  ],
  gamingHard: [
    f("Que estudio desarrollo Dark Souls?", "FromSoftware", "studio"),
    f("Que estudio desarrollo Baldur's Gate 3?", "Larian Studios", "studio"),
    f("Que estudio creo The Last of Us?", "Naughty Dog", "studio"),
    f("Que estudio desarrollo Half-Life 2?", "Valve", "studio"),
    f("Que estudio desarrollo The Witcher 3?", "CD Projekt Red", "studio"),
    f("Que creador se asocia con Metal Gear?", "Hideo Kojima", "person"),
    f("Que creador se asocia con Mario y Zelda?", "Shigeru Miyamoto", "person"),
    f("Que compositor es famoso por la musica de Final Fantasy?", "Nobuo Uematsu", "person"),
    f("Que creador diseno Minecraft originalmente?", "Markus Persson", "person"),
    f("Que creador se asocia con Pokemon como disenador?", "Satoshi Tajiri", "person"),
    f("Que consola sucedio a Super Nintendo?", "Nintendo 64", "console"),
    f("Que consola de Sony se lanzo originalmente en 1994 en Japon?", "PlayStation", "console"),
    f("Que consola portatil de Nintendo popularizo Pokemon Rojo y Azul?", "Game Boy", "console"),
    f("Que consola de Sega compitio con Super Nintendo?", "Mega Drive", "console"),
    f("Que consola de Microsoft inicio la saga Halo?", "Xbox", "console"),
    f("En que ciudad submarina se ambienta BioShock?", "Rapture", "place"),
    f("Como se llama la nave de Mass Effect?", "Normandy", "place"),
    f("Que region aparece en los primeros juegos de Pokemon?", "Kanto", "place")
  ],
  gamingExtreme: [
    f("Que juego de Team Ico se centra en derrotar colosos?", "Shadow of the Colossus", "work"),
    f("Que survival horror de 1996 ocurre cerca de Raccoon City?", "Resident Evil", "work"),
    f("Que juego de Valve incluye la IA GLaDOS?", "Portal", "work"),
    f("Que juego de Rockstar se ambienta principalmente en Vice City?", "GTA Vice City", "work"),
    f("Que juego de Mojang usa el material redstone para circuitos?", "Minecraft", "work"),
    f("Que Pokemon es el numero 1 de la Pokedex nacional?", "Bulbasaur", "pokemon"),
    f("Que Pokemon evoluciona de Magikarp?", "Gyarados", "pokemon"),
    f("Que Pokemon bloquea caminos dormido en Kanto?", "Snorlax", "pokemon"),
    f("Que Pokemon es de tipo Psiquico y fue creado a partir de Mew?", "Mewtwo", "pokemon"),
    f("Que evolucion de Eevee es de tipo Agua?", "Vaporeon", "pokemon"),
    f("Que consola de Nintendo uso cartuchos y cuatro puertos de mando?", "Nintendo 64", "console"),
    f("Que consola de Sega uso GD-ROM?", "Dreamcast", "console"),
    f("Que consola portatil tuvo dos pantallas?", "Nintendo DS", "console"),
    f("Que consola de Sony uso UMD?", "PSP", "console"),
    f("Que consola de Nintendo introdujo controles de movimiento masivos?", "Wii", "console"),
    f("En que ano se lanzo The Elder Scrolls V: Skyrim?", "2011", "year"),
    f("En que ano se lanzo Minecraft 1.0?", "2011", "year"),
    f("En que ano se lanzo Pokemon Rojo y Verde en Japon?", "1996", "year")
  ],
  natureHard: [
    f("Que mamifero pone huevos?", "Ornitorrinco", "animal"),
    f("Que animal es el mamifero mas grande del mundo?", "Ballena azul", "animal"),
    f("Que ave no voladora es endemica de Nueva Zelanda?", "Kiwi", "animal"),
    f("Que reptil cambia de color con gran habilidad?", "Camaleon", "animal"),
    f("Que molusco tiene ocho brazos?", "Pulpo", "animal"),
    f("Que periodo geologico precedio al Jurasico?", "Triasico", "term"),
    f("Que periodo geologico siguio al Jurasico?", "Cretacico", "term"),
    f("Que proceso usan las plantas para fabricar alimento con luz?", "Fotosintesis", "term"),
    f("Que grupo animal incluye ranas y salamandras?", "Anfibios", "term"),
    f("Que grupo animal tiene columna vertebral?", "Vertebrados", "term"),
    f("Que dinosaurio carnivoro es famoso por sus brazos cortos?", "Tyrannosaurus rex", "dinosaur"),
    f("Que dinosaurio tenia tres cuernos faciales?", "Triceratops", "dinosaur"),
    f("Que dinosaurio tenia placas dorsales?", "Stegosaurus", "dinosaur"),
    f("Que reptil marino mesozoico no era dinosaurio y tenia cuello largo?", "Plesiosaurio", "dinosaur"),
    f("Que pterosaurio famoso tenia gran cresta craneal?", "Pteranodon", "dinosaur"),
    f("Que oceano es el mas grande?", "Pacifico", "place"),
    f("Que fosa oceanica es la mas profunda conocida?", "Marianas", "place"),
    f("Que arrecife australiano es el mayor sistema coralino?", "Gran Barrera de Coral", "place")
  ],
  natureExtreme: [
    f("Que mamifero monotremado ademas del ornitorrinco pone huevos?", "Equidna", "animal"),
    f("Que cefalopodo tiene concha externa en espiral?", "Nautilus", "animal"),
    f("Que pez se considera un fosil viviente descubierto vivo en 1938?", "Celacanto", "animal"),
    f("Que mamifero marino tiene el diente largo en espiral?", "Narval", "animal"),
    f("Que ave extinta era endemica de Mauricio?", "Dodo", "animal"),
    f("Que era geologica contiene Triasico, Jurasico y Cretacico?", "Mesozoica", "term"),
    f("Que teoria explica el movimiento de placas continentales?", "Tectonica de placas", "term"),
    f("Que simbiosis entre hongo y alga forma liquenes?", "Liquen", "term"),
    f("Que capa oceanica recibe luz suficiente para fotosintesis?", "Fotica", "term"),
    f("Que proceso convierte nitrogeno atmosferico en formas utilizables?", "Fijacion de nitrogeno", "term"),
    f("Que reptil marino fosil se asocia con hallazgos tempranos de Mary Anning?", "Ictiosaurio", "dinosaur"),
    f("Que dinosaurio argentino es uno de los mayores sauropodos conocidos?", "Argentinosaurus", "dinosaur"),
    f("Que dinosaurio con gran garra da nombre a Deinonychus?", "Deinonychus", "dinosaur"),
    f("Que dinosaurio acorazado tenia una maza en la cola?", "Ankylosaurus", "dinosaur"),
    f("Que dinosaurio con vela dorsal fue Spinosaurus?", "Spinosaurus", "dinosaur"),
    f("Que corriente oceanica calienta Europa occidental?", "Corriente del Golfo", "place"),
    f("Que mar sin salida natural al oceano pierde agua por evaporacion intensa?", "Mar Muerto", "place"),
    f("Que oceano rodea la Antartida?", "Antartico", "place")
  ],
  foodHard: [
    f("Que pais se asocia con el plato pho?", "Vietnam", "country"),
    f("Que pais se asocia con el kimchi?", "Corea del Sur", "country"),
    f("Que pais se asocia con el ceviche?", "Peru", "country"),
    f("Que pais se asocia con el haggis?", "Escocia", "country"),
    f("Que pais se asocia con el goulash?", "Hungria", "country"),
    f("Que ingrediente base tiene el hummus?", "Garbanzo", "ingredient"),
    f("Que ingrediente da color amarillo al risotto alla milanese?", "Azafran", "ingredient"),
    f("Que fruto seco se usa en pesto genoves tradicional?", "Pinon", "ingredient"),
    f("Que fermentado japones se hace con soja y koji?", "Miso", "ingredient"),
    f("Que cereal es base del couscous tradicional?", "Semola de trigo", "ingredient"),
    f("Que postre italiano significa literalmente tirame arriba?", "Tiramisu", "dessert"),
    f("Que postre frances se carameliza por encima con azucar?", "Creme brulee", "dessert"),
    f("Que postre austriaco clasico se hace con manzana en masa fina?", "Apfelstrudel", "dessert"),
    f("Que postre turco usa capas de masa filo y frutos secos?", "Baklava", "dessert"),
    f("Que postre portugues usa crema en tartaleta de hojaldre?", "Pastel de nata", "dessert"),
    f("Que salsa madre francesa se hace con roux y leche?", "Bechamel", "term"),
    f("Que tecnica cocina alimentos sellados al vacio a baja temperatura?", "Sous-vide", "term"),
    f("Que sabor basico se asocia con glutamato?", "Umami", "term")
  ],
  foodExtreme: [
    f("Que pais se asocia con el injera?", "Etiopia", "country"),
    f("Que pais se asocia con el nasi lemak?", "Malasia", "country"),
    f("Que pais se asocia con el feijoada?", "Brasil", "country"),
    f("Que pais se asocia con el khachapuri?", "Georgia", "country"),
    f("Que pais se asocia con el mole poblano?", "Mexico", "country"),
    f("Que ingrediente fermentado de pescado es comun en garum historico?", "Pescado", "ingredient"),
    f("Que especia procede de estigmas de Crocus sativus?", "Azafran", "ingredient"),
    f("Que alga se usa para envolver sushi maki?", "Nori", "ingredient"),
    f("Que raiz picante japonesa suele servirse con sushi?", "Wasabi", "ingredient"),
    f("Que queso azul italiano se elabora con leche de vaca?", "Gorgonzola", "ingredient"),
    f("Que postre frances tiene capas de hojaldre y crema?", "Mille-feuille", "dessert"),
    f("Que postre italiano helado significa semicongelado?", "Semifreddo", "dessert"),
    f("Que postre latinoamericano se hace con tres tipos de leche?", "Tres leches", "dessert"),
    f("Que postre aleman de chocolate y cerezas se asocia a la Selva Negra?", "Schwarzwalder Kirschtorte", "dessert"),
    f("Que postre japones usa arroz glutinoso?", "Mochi", "dessert"),
    f("Que tecnica corta verduras en tiras muy finas?", "Juliana", "term"),
    f("Que mezcla francesa de hierbas suele incluir perejil, estragon, cebollino y perifollo?", "Fines herbes", "term"),
    f("Que termino designa coccion breve en agua hirviendo y enfriado rapido?", "Blanquear", "term")
  ],
  languageHard: [
    f("De que lengua procede la palabra algebra?", "Arabe", "language"),
    f("De que lengua procede la palabra robot?", "Checo", "language"),
    f("De que lengua procede la palabra karaoke?", "Japones", "language"),
    f("De que lengua procede la palabra sauna?", "Finlandes", "language"),
    f("De que lengua procede la palabra chocolate a traves del nahuatl?", "Nahuatl", "language"),
    f("Que signo abre una pregunta en espanol normativo?", "Signo de interrogacion invertido", "term"),
    f("Que signo abre una exclamacion en espanol normativo?", "Signo de exclamacion invertido", "term"),
    f("Que tilde diferencia palabras como tu y tu?", "Tilde diacritica", "term"),
    f("Que letra fue eliminada como letra independiente del alfabeto espanol en 2010?", "Ch", "term"),
    f("Que fenomeno une dos vocales en una misma silaba?", "Diptongo", "term"),
    f("Que familia linguistica incluye espanol, frances e italiano?", "Romance", "family"),
    f("Que familia incluye ingles, aleman y neerlandes?", "Germanica", "family"),
    f("Que familia incluye ruso, polaco y checo?", "Eslava", "family"),
    f("Que lengua clasica dio origen a las lenguas romances?", "Latin", "language"),
    f("Que lengua usa el alfabeto hangul?", "Coreano", "language"),
    f("Como se traduce 'library' al espanol en sentido habitual?", "Biblioteca", "translation"),
    f("Como se traduce 'actually' al espanol en sentido habitual?", "En realidad", "translation"),
    f("Como se traduce 'exit' en un cartel?", "Salida", "translation")
  ],
  languageExtreme: [
    f("De que lengua procede la palabra tsunami?", "Japones", "language"),
    f("De que lengua procede la palabra bungalow?", "Hindi", "language"),
    f("De que lengua procede la palabra bazar?", "Persa", "language"),
    f("De que lengua procede la palabra piano?", "Italiano", "language"),
    f("De que lengua procede la palabra whisky?", "Gaelico", "language"),
    f("Que figura repite sonidos iniciales en palabras cercanas?", "Aliteracion", "term"),
    f("Que recurso consiste en atribuir cualidades humanas a objetos?", "Personificacion", "term"),
    f("Que palabra tiene la silaba tonica antes de la antepenultima?", "Sobresdrujula", "term"),
    f("Que fenomeno separa vocales contiguas en silabas distintas?", "Hiato", "term"),
    f("Que signo ortografico marca la omision de sonidos o letras?", "Apostrofo", "term"),
    f("Que familia linguistica incluye finlandes y hungaro?", "Uralica", "family"),
    f("Que familia linguistica incluye turco y azerbaiyano?", "Turquica", "family"),
    f("Que lengua semitica se habla oficialmente en Malta?", "Maltes", "language"),
    f("Que lengua tiene escritura devanagari como una de sus escrituras principales?", "Hindi", "language"),
    f("Que lengua clasica de India se asocia con textos vedicos?", "Sanscrito", "language"),
    f("Como se traduce 'sensible' del ingles al espanol habitual?", "Sensato", "translation"),
    f("Como se traduce 'embarrassed' al espanol habitual?", "Avergonzado", "translation"),
    f("Como se traduce 'constipated' al espanol habitual?", "Estrenido", "translation")
  ]
};

function pack(
  slug: string,
  title: string,
  tagline: string,
  subject: string,
  difficulty: AdvancedDifficulty,
  pool: keyof typeof advancedPools,
  offset: number
): AdvancedQuizDraft {
  return { slug, title, tagline, subject, difficulty, pool, offset };
}

export const advancedQuizDraftsBySection = {
  "cultura-general": [
    pack("datos-casi-nadie-sabe", "Datos que casi nadie sabe", "Cultura general dificil con detalles poco obvios.", "datos poco conocidos", "dificil", "cultureHard", 0),
    pack("conocimiento-mundial-dificil", "Conocimiento mundial dificil", "Paises, autores, ciencia y arte para subir nivel.", "conocimiento mundial dificil", "dificil", "cultureHard", 2),
    pack("cultura-general-erudita", "Cultura general erudita", "Preguntas para quien acumula lecturas y referencias.", "cultura general erudita", "dificil", "cultureHard", 4),
    pack("cultura-general-detalles", "Cultura general de detalles", "Nombres, anos y conceptos que no salen siempre.", "detalles de cultura general", "dificil", "cultureHard", 6),
    pack("cultura-general-experto", "Cultura general experto", "Un test duro para medir memoria cultural real.", "cultura general experta", "dificil", "cultureHard", 8),
    pack("cultura-general-extrema-avanzada", "Cultura general extrema avanzada", "Solo para quien disfruta preguntas poco obvias.", "cultura general extrema", "extremo", "cultureExtreme", 0),
    pack("preguntas-imposibles-cultura-general", "Preguntas imposibles de cultura general", "Autores, terminos y paises muy especificos.", "cultura general imposible", "extremo", "cultureExtreme", 2),
    pack("cultura-general-master", "Cultura general master", "Una ronda extrema de datos cruzados.", "cultura general master", "extremo", "cultureExtreme", 4),
    pack("cultura-general-ultra", "Cultura general ultra", "Preguntas complejas para gente muy curiosa.", "cultura general ultra", "extremo", "cultureExtreme", 6),
    pack("cultura-general-final-boss", "Cultura general final boss", "El tramo mas exigente de cultura general.", "cultura general final", "extremo", "cultureExtreme", 8)
  ],
  geografia: [
    pack("capitales-extremas", "Capitales extremas", "Capitales menos populares y paises pequenos.", "capitales extremas", "dificil", "geographyHard", 0),
    pack("paises-pequenos-territorios", "Paises pequenos y territorios", "Geografia politica para hilar fino.", "paises pequenos y territorios", "dificil", "geographyHard", 2),
    pack("rios-montanas-dificiles", "Rios y montanas dificiles", "Relieve, rios y accidentes geograficos exigentes.", "rios y montanas dificiles", "dificil", "geographyHard", 4),
    pack("geografia-mundial-avanzada", "Geografia mundial avanzada", "Mapas mentales de nivel alto.", "geografia mundial avanzada", "dificil", "geographyHard", 6),
    pack("geografia-politica-dificil", "Geografia politica dificil", "Capitales, paises y regiones con trampa.", "geografia politica dificil", "dificil", "geographyHard", 8),
    pack("geografia-extrema-global", "Geografia extrema global", "Territorios, estrechos y lugares poco obvios.", "geografia extrema global", "extremo", "geographyExtreme", 0),
    pack("capitales-ultra-dificiles", "Capitales ultra dificiles", "Capitales que separan aficionados de expertos.", "capitales ultra dificiles", "extremo", "geographyExtreme", 2),
    pack("territorios-remotos", "Territorios remotos", "Islas, territorios y capitales complicadas.", "territorios remotos", "extremo", "geographyExtreme", 4),
    pack("mapa-mundial-final", "Mapa mundial final", "Una ronda muy exigente de ubicacion global.", "mapa mundial extremo", "extremo", "geographyExtreme", 6),
    pack("geografia-imposible", "Geografia imposible", "Para quien mira mapas por gusto.", "geografia imposible", "extremo", "geographyExtreme", 8)
  ],
  historia: [
    pack("guerras-y-tratados", "Guerras y tratados", "Tratados, batallas y fechas de alto nivel.", "guerras y tratados", "dificil", "historyHard", 0),
    pack("fechas-historicas-dificiles", "Fechas historicas dificiles", "Anos clave sin pistas faciles.", "fechas historicas dificiles", "dificil", "historyHard", 2),
    pack("reyes-imperios-dinastias", "Reyes, imperios y dinastias", "Gobernantes y estados historicos exigentes.", "reyes, imperios y dinastias", "dificil", "historyHard", 4),
    pack("batallas-historicas-dificiles", "Batallas historicas dificiles", "Conflictos que requieren memoria fina.", "batallas historicas dificiles", "dificil", "historyHard", 6),
    pack("historia-mundial-dificil-plus", "Historia mundial dificil plus", "Un repaso duro por epocas y continentes.", "historia mundial dificil", "dificil", "historyHard", 8),
    pack("historia-mundial-extrema", "Historia mundial extrema", "Tratados, rebeliones y fechas poco obvias.", "historia mundial extrema", "extremo", "historyExtreme", 0),
    pack("historia-extrema-tratados", "Historia extrema: tratados", "Acuerdos historicos para expertos.", "tratados extremos", "extremo", "historyExtreme", 2),
    pack("imperios-antiguos-extremo", "Imperios antiguos extremo", "Personajes, batallas y cronologia avanzada.", "imperios antiguos extremos", "extremo", "historyExtreme", 4),
    pack("cronologia-imposible", "Cronologia imposible", "Fechas historicas muy concretas.", "cronologia historica extrema", "extremo", "historyExtreme", 6),
    pack("historia-final-boss", "Historia final boss", "Una ronda extrema para amantes de la historia.", "historia final", "extremo", "historyExtreme", 8)
  ],
  ciencia: [
    pack("ciencia-extrema", "Ciencia extrema", "Fisica, quimica y biologia con detalle.", "ciencia extrema", "dificil", "scienceHard", 0),
    pack("fisica-avanzada-basica", "Fisica avanzada basica", "Conceptos avanzados explicados en preguntas directas.", "fisica avanzada basica", "dificil", "scienceHard", 2),
    pack("biologia-dificil", "Biologia dificil", "Celulas, genetica y evolucion de nivel alto.", "biologia dificil", "dificil", "scienceHard", 4),
    pack("astronomia-dificil", "Astronomia dificil", "Planetas, lunas y galaxias menos obvias.", "astronomia dificil", "dificil", "scienceHard", 6),
    pack("quimica-y-fisica-dificil", "Quimica y fisica dificil", "Terminos, particulas y modelos cientificos.", "quimica y fisica dificil", "dificil", "scienceHard", 8),
    pack("ciencia-ultra-extrema", "Ciencia ultra extrema", "Preguntas muy especificas de ciencia moderna.", "ciencia ultra extrema", "extremo", "scienceExtreme", 0),
    pack("fisica-extrema", "Fisica extrema", "Particulas, constantes y conceptos duros.", "fisica extrema", "extremo", "scienceExtreme", 2),
    pack("biologia-molecular-extrema", "Biologia molecular extrema", "ARN, enzimas y genetica avanzada.", "biologia molecular extrema", "extremo", "scienceExtreme", 4),
    pack("astronomia-extrema", "Astronomia extrema", "Objetos, lunas y clasificaciones astronomicas.", "astronomia extrema", "extremo", "scienceExtreme", 6),
    pack("ciencia-final-boss", "Ciencia final boss", "Una ronda extrema para mentes cientificas.", "ciencia final", "extremo", "scienceExtreme", 8)
  ],
  deportes: [
    pack("champions-league-dificil", "Deportes dificil: copas y campeones", "Clubes, finales, MVPs y campeones para expertos.", "deportes dificil", "dificil", "sportsHard", 0),
    pack("nba-historica", "Deportes dificil: leyendas y MVPs", "Baloncesto, futbol, tenis y motor con memoria historica.", "deportes dificil historico", "dificil", "sportsHard", 2),
    pack("tenis-historico", "Deportes dificil: torneos historicos", "Torneos, campeones y momentos grandes.", "torneos deportivos historicos", "dificil", "sportsHard", 4),
    pack("juegos-olimpicos-dificiles", "Deportes dificil: olimpicos y mundiales", "Sedes, anos y competiciones historicas.", "Juegos Olimpicos y mundiales dificiles", "dificil", "sportsHard", 6),
    pack("deporte-mundial-dificil", "Deporte mundial dificil", "Futbol, motor, tenis y basket mezclados.", "deporte mundial dificil", "dificil", "sportsHard", 8),
    pack("futbol-extremo-avanzado", "Futbol extremo avanzado", "Historia futbolera muy especifica.", "futbol extremo avanzado", "extremo", "sportsExtreme", 0),
    pack("formula-1-extrema", "Formula 1 extrema", "Pilotos, equipos y temporadas para expertos.", "Formula 1 extrema", "extremo", "sportsExtreme", 2),
    pack("records-deportivos-extremos", "Records deportivos extremos", "Datos duros de competiciones historicas.", "records deportivos extremos", "extremo", "sportsExtreme", 4),
    pack("deportes-final-boss", "Deportes final boss", "La ronda mas complicada de deporte.", "deportes final", "extremo", "sportsExtreme", 6),
    pack("copas-y-campeones-extremo", "Copas y campeones extremo", "Campeones, anos y competiciones exigentes.", "copas y campeones extremos", "extremo", "sportsExtreme", 8)
  ],
  "cine-series": [
    pack("cine-clasico-dificil", "Cine clasico dificil", "Directores, peliculas y premios para cinefilos.", "cine clasico dificil", "dificil", "cinemaHard", 0),
    pack("directores-filmografia", "Directores y filmografia", "Une nombres importantes con sus obras.", "directores y filmografia", "dificil", "cinemaHard", 2),
    pack("series-de-culto", "Series de culto", "Series famosas y detalles de cultura pop.", "series de culto", "dificil", "cinemaHard", 4),
    pack("oscars-dificiles", "Cine dificil: premios y directores", "Premios, anos, series y peliculas destacadas.", "premios y cine dificil", "dificil", "cinemaHard", 6),
    pack("cine-moderno-dificil", "Cine moderno dificil", "Peliculas recientes, autores y clasicos modernos.", "cine moderno dificil", "dificil", "cinemaHard", 8),
    pack("oscars-extremos", "Oscars extremos", "Premios y peliculas para memoria de cinefilo.", "Oscars extremos", "extremo", "cinemaExtreme", 0),
    pack("cine-de-autor-extremo", "Cine de autor extremo", "Directores y peliculas menos obvias.", "cine de autor extremo", "extremo", "cinemaExtreme", 2),
    pack("series-extremas", "Series extremas", "Series de culto y referencias avanzadas.", "series extremas", "extremo", "cinemaExtreme", 4),
    pack("filmografia-imposible", "Filmografia imposible", "Una ronda extrema de directores y obras.", "filmografia imposible", "extremo", "cinemaExtreme", 6),
    pack("cine-series-final-boss", "Cine y series final boss", "La ronda mas dura de pantalla.", "cine y series final", "extremo", "cinemaExtreme", 8)
  ],
  musica: [
    pack("historia-musica-dificil", "Historia de la musica dificil", "Albumes, sellos y movimientos exigentes.", "historia de la musica dificil", "dificil", "musicHard", 0),
    pack("albumes-premios-dificil", "Albumes y premios dificil", "Discos historicos y reconocimientos.", "albumes y premios dificil", "dificil", "musicHard", 2),
    pack("artistas-dificiles", "Artistas dificiles", "Nombres y obras para quien escucha mucho.", "artistas dificiles", "dificil", "musicHard", 4),
    pack("rock-pop-dificil", "Rock y pop dificil", "Bandas, albumes y escenas clave.", "rock y pop dificil", "dificil", "musicHard", 6),
    pack("musica-clasica-dificil", "Musica dificil: clasica y albumes", "Compositores, discos y obras reconocibles pero exigentes.", "musica clasica y albumes dificil", "dificil", "musicHard", 8),
    pack("musica-extrema", "Musica extrema", "Discos, generos y nombres muy concretos.", "musica extrema", "extremo", "musicExtreme", 0),
    pack("albumes-extremos", "Albumes extremos", "Referencias para melomanos de nivel alto.", "albumes extremos", "extremo", "musicExtreme", 2),
    pack("artistas-extremos", "Artistas extremos", "Nombres menos obvios de la historia musical.", "artistas extremos", "extremo", "musicExtreme", 4),
    pack("generos-musicales-extremos", "Generos musicales extremos", "Subgeneros y escenas con detalle.", "generos musicales extremos", "extremo", "musicExtreme", 6),
    pack("musica-final-boss", "Musica final boss", "La ronda mas exigente para melomanos.", "musica final", "extremo", "musicExtreme", 8)
  ],
  tecnologia: [
    pack("historia-tecnologia-dificil", "Historia de la tecnologia dificil", "Protocolos, empresas y anos clave.", "historia de la tecnologia dificil", "dificil", "technologyHard", 0),
    pack("internet-avanzado", "Internet avanzado", "Protocolos y conceptos de red exigentes.", "internet avanzado", "dificil", "technologyHard", 2),
    pack("ciberseguridad-dificil", "Ciberseguridad dificil", "Ataques, tecnicas y conceptos de seguridad.", "ciberseguridad dificil", "dificil", "technologyHard", 4),
    pack("hardware-software-dificil", "Hardware y software dificil", "Empresas, sistemas y piezas historicas.", "hardware y software dificil", "dificil", "technologyHard", 6),
    pack("tecnologia-mundial-dificil", "Tecnologia mundial dificil", "Una mezcla dura de historia digital.", "tecnologia mundial dificil", "dificil", "technologyHard", 8),
    pack("tecnologia-extrema", "Tecnologia extrema", "Historia y conceptos poco obvios.", "tecnologia extrema", "extremo", "technologyExtreme", 0),
    pack("internet-extremo", "Internet extremo", "Protocolos, capas y seguridad avanzada.", "internet extremo", "extremo", "technologyExtreme", 2),
    pack("ciberseguridad-extrema", "Ciberseguridad extrema", "Vulnerabilidades y criptografia dura.", "ciberseguridad extrema", "extremo", "technologyExtreme", 4),
    pack("software-extremo", "Software extremo", "Lenguajes, sistemas y creadores clave.", "software extremo", "extremo", "technologyExtreme", 6),
    pack("tecnologia-final-boss", "Tecnologia final boss", "La ronda mas tecnica de ViralQuiz.", "tecnologia final", "extremo", "technologyExtreme", 8)
  ],
  gaming: [
    pack("videojuegos-retro-dificil", "Videojuegos retro dificil", "Consolas, estudios y juegos historicos.", "videojuegos retro dificil", "dificil", "gamingHard", 0),
    pack("historia-consolas-dificil", "Historia de consolas dificil", "Plataformas y generaciones con detalle.", "historia de consolas dificil", "dificil", "gamingHard", 2),
    pack("pokemon-dificil-avanzado", "Pokemon dificil", "Regiones, evoluciones y datos clasicos.", "Pokemon dificil", "dificil", "gamingHard", 4),
    pack("gta-dificil", "Gaming dificil: sagas y mundos", "Rockstar, ciudades, consolas y cultura gamer.", "gaming dificil de sagas", "dificil", "gamingHard", 6),
    pack("minecraft-avanzado", "Gaming dificil: sistemas y clasicos", "Mecanicas, consolas y juegos de culto.", "gaming avanzado", "dificil", "gamingHard", 8),
    pack("gaming-extremo", "Gaming extremo", "Juegos de culto y datos muy concretos.", "gaming extremo", "extremo", "gamingExtreme", 0),
    pack("videojuegos-retro-extremo", "Videojuegos retro extremo", "Consolas y lanzamientos para expertos.", "videojuegos retro extremo", "extremo", "gamingExtreme", 2),
    pack("pokemon-extremo", "Pokemon extremo", "Pokedex y detalles de Kanto para nota.", "Pokemon extremo", "extremo", "gamingExtreme", 4),
    pack("gta-extremo", "GTA extremo", "Ciudades, titulos y cultura Rockstar.", "GTA extremo", "extremo", "gamingExtreme", 6),
    pack("gaming-final-boss", "Gaming final boss", "La ronda mas dura para jugadores veteranos.", "gaming final", "extremo", "gamingExtreme", 8)
  ],
  "naturaleza-animales": [
    pack("animales-raros-dificil", "Animales raros dificil", "Especies y rasgos poco comunes.", "animales raros dificil", "dificil", "natureHard", 0),
    pack("biologia-animal-dificil", "Biologia animal dificil", "Clasificacion, evolucion y funciones.", "biologia animal dificil", "dificil", "natureHard", 2),
    pack("dinosaurios-dificil", "Naturaleza dificil: dinosaurios y eras", "Periodos, especies y vida antigua.", "dinosaurios y eras dificil", "dificil", "natureHard", 4),
    pack("oceanos-dificiles", "Naturaleza dificil: oceanos y especies", "Mares, fosas, dinosaurios y vida marina.", "oceanos y especies dificiles", "dificil", "natureHard", 6),
    pack("naturaleza-avanzada", "Naturaleza avanzada", "Ecosistemas, especies y geologia.", "naturaleza avanzada", "dificil", "natureHard", 8),
    pack("animales-raros-extremo", "Animales raros extremo", "Especies extranas y conceptos especificos.", "animales raros extremo", "extremo", "natureExtreme", 0),
    pack("biologia-animal-extrema", "Biologia animal extrema", "Simbiosis, procesos y grupos poco obvios.", "biologia animal extrema", "extremo", "natureExtreme", 2),
    pack("dinosaurios-extremos", "Dinosaurios extremos", "Nombres y detalles de paleontologia.", "dinosaurios extremos", "extremo", "natureExtreme", 4),
    pack("oceanos-extremos", "Oceanos extremos", "Corrientes, capas y lugares complejos.", "oceanos extremos", "extremo", "natureExtreme", 6),
    pack("naturaleza-final-boss", "Naturaleza final boss", "La ronda mas dura de animales y planeta.", "naturaleza final", "extremo", "natureExtreme", 8)
  ],
  comida: [
    pack("gastronomia-mundial-dificil", "Gastronomia mundial dificil", "Platos y paises para paladares curiosos.", "gastronomia mundial dificil", "dificil", "foodHard", 0),
    pack("ingredientes-raros-dificil", "Ingredientes raros dificil", "Ingredientes, tecnicas y sabores.", "ingredientes raros dificil", "dificil", "foodHard", 2),
    pack("cocina-internacional-dificil", "Cocina internacional dificil", "Platos del mundo y su origen.", "cocina internacional dificil", "dificil", "foodHard", 4),
    pack("postres-mundo-dificil", "Comida dificil: postres y tecnicas", "Dulces, tecnicas y clasicos de varios paises.", "postres y tecnicas dificil", "dificil", "foodHard", 6),
    pack("tecnicas-cocina-dificil", "Tecnicas de cocina dificil", "Conceptos culinarios exigentes.", "tecnicas de cocina dificil", "dificil", "foodHard", 8),
    pack("gastronomia-mundial-extrema", "Gastronomia mundial extrema", "Platos y terminos menos obvios.", "gastronomia mundial extrema", "extremo", "foodExtreme", 0),
    pack("ingredientes-raros-extremo", "Ingredientes raros extremo", "Sabores, algas, quesos y especias.", "ingredientes raros extremo", "extremo", "foodExtreme", 2),
    pack("cocina-internacional-extrema", "Cocina internacional extrema", "Origenes gastronomicos de alto nivel.", "cocina internacional extrema", "extremo", "foodExtreme", 4),
    pack("postres-mundo-extremo", "Postres del mundo extremo", "Dulces complicados por nombre y origen.", "postres del mundo extremo", "extremo", "foodExtreme", 6),
    pack("comida-final-boss", "Comida final boss", "La ronda mas exigente para foodies.", "comida final", "extremo", "foodExtreme", 8)
  ],
  idiomas: [
    pack("etimologia-basica-dificil", "Idiomas dificil: etimologia y usos", "Origenes de palabras, signos y familias linguisticas.", "etimologia e idiomas dificil", "dificil", "languageHard", 0),
    pack("ortografia-avanzada", "Ortografia avanzada", "Tildes, signos y conceptos de escritura.", "ortografia avanzada", "dificil", "languageHard", 2),
    pack("idiomas-mundo-dificil", "Idiomas del mundo dificil", "Familias, escrituras y lenguas.", "idiomas del mundo dificil", "dificil", "languageHard", 4),
    pack("traducciones-complicadas", "Traducciones complicadas", "Falsos amigos y traducciones directas.", "traducciones complicadas", "dificil", "languageHard", 6),
    pack("linguistica-dificil", "Linguistica dificil", "Conceptos y familias linguisticas.", "linguistica dificil", "dificil", "languageHard", 8),
    pack("etimologia-extrema", "Etimologia extrema", "Origenes de palabras menos obvios.", "etimologia extrema", "extremo", "languageExtreme", 0),
    pack("ortografia-extrema", "Ortografia extrema", "Figuras, acentos y terminos finos.", "ortografia extrema", "extremo", "languageExtreme", 2),
    pack("idiomas-mundo-extremo", "Idiomas del mundo extremo", "Lenguas, familias y escrituras complejas.", "idiomas del mundo extremo", "extremo", "languageExtreme", 4),
    pack("traducciones-extremas", "Traducciones extremas", "Falsos amigos para no caer.", "traducciones extremas", "extremo", "languageExtreme", 6),
    pack("idiomas-final-boss", "Idiomas final boss", "La ronda mas dura de lenguaje.", "idiomas final", "extremo", "languageExtreme", 8)
  ]
} satisfies Record<string, AdvancedQuizDraft[]>;

export const advancedKnowledgeTriviaSeeds = Object.fromEntries(
  Object.values(advancedQuizDraftsBySection)
    .flat()
    .map((draft) => [draft.slug, makeQuestions(advancedPools[draft.pool as keyof typeof advancedPools], draft.offset)])
) satisfies Record<string, TriviaSeed[]>;
