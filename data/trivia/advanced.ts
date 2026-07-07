import { q, type TriviaSeed } from "./types";
import { cultureTriviaSeeds } from "./culture";
import { geographyTriviaSeeds } from "./geography";
import { historyTriviaSeeds } from "./history";
import { nicheTriviaSeeds } from "./niches";
import { scienceTriviaSeeds } from "./science";

type AdvancedDifficulty = "facil" | "medio" | "dificil" | "extremo";

type AdvancedQuizDraft = {
  slug: string;
  title: string;
  tagline: string;
  subject: string;
  difficulty: AdvancedDifficulty;
  pool: string;
  offset: number;
};

type BalancedDraftSpec = {
  slug: string;
  title: string;
  tagline: string;
  subject: string;
};

type Fact = {
  prompt: string;
  correct: string;
  group: string;
};

type QuestionPool = Fact[] | TriviaSeed[];

function f(prompt: string, correct: string, group: string): Fact {
  return { prompt, correct, group };
}

function b(slug: string, title: string, tagline: string, subject: string): BalancedDraftSpec {
  return { slug, title, tagline, subject };
}

function triviaPool(...pools: TriviaSeed[][]): TriviaSeed[] {
  return pools.flat();
}

function isTriviaPool(pool: QuestionPool): pool is TriviaSeed[] {
  return pool.length > 0 && "wrong" in pool[0];
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

function makeQuestions(pool: QuestionPool, offset = 0): TriviaSeed[] {
  return Array.from({ length: 15 }, (_, questionIndex) => {
    const factIndex = (offset + questionIndex) % pool.length;
    const item = pool[factIndex];

    if (isTriviaPool(pool)) {
      return item as TriviaSeed;
    }

    const fact = item as Fact;
    const wrongs = getWrongAnswers(pool, fact, factIndex);

    return q(fact.prompt, fact.correct, wrongs[0], wrongs[1], wrongs[2]);
  });
}

const advancedPools = {
  cultureEasy: triviaPool(
    cultureTriviaSeeds["cultura-general-basico"],
    cultureTriviaSeeds["todo-el-mundo-deberia-saber"],
    cultureTriviaSeeds["cultura-general-mundo"]
  ),
  cultureMedium: triviaPool(
    cultureTriviaSeeds["cultura-general-medio"],
    cultureTriviaSeeds["cultura-general-espana"],
    cultureTriviaSeeds["cultura-general-europa"],
    cultureTriviaSeeds["cultura-general-mundo"]
  ),
  geographyEasy: triviaPool(
    geographyTriviaSeeds["capitales-basico"],
    geographyTriviaSeeds["mapas-continentes"],
    geographyTriviaSeeds["paises-por-pistas"]
  ),
  geographyMedium: triviaPool(
    geographyTriviaSeeds["banderas-mundo"],
    geographyTriviaSeeds["rios-montanas-oceanos"],
    geographyTriviaSeeds["geografia-espana"]
  ),
  historyEasy: triviaPool(
    historyTriviaSeeds["historia-basica"],
    historyTriviaSeeds["civilizaciones-antiguas"],
    historyTriviaSeeds["reyes-imperios-conquistas"]
  ),
  historyMedium: triviaPool(
    historyTriviaSeeds["historia-espana"],
    historyTriviaSeeds["historia-mundial"],
    historyTriviaSeeds["edad-media"],
    historyTriviaSeeds["segunda-guerra-mundial"]
  ),
  scienceEasy: triviaPool(
    scienceTriviaSeeds["ciencia-basica"],
    scienceTriviaSeeds["biologia-basica"],
    scienceTriviaSeeds["fisica-basica"],
    scienceTriviaSeeds["quimica-basica"],
    scienceTriviaSeeds["cuerpo-humano"],
    scienceTriviaSeeds["animales"]
  ),
  scienceMedium: triviaPool(
    scienceTriviaSeeds["astronomia"],
    scienceTriviaSeeds["inventos-descubrimientos"],
    scienceTriviaSeeds["biologia-basica"],
    scienceTriviaSeeds["fisica-basica"]
  ),
  sportsEasy: triviaPool(
    nicheTriviaSeeds["futbol-basico"],
    nicheTriviaSeeds["baloncesto-basico"],
    nicheTriviaSeeds["formula-1-basico"]
  ),
  sportsMedium: triviaPool(
    nicheTriviaSeeds["futbol-dificil"],
    nicheTriviaSeeds["baloncesto-dificil"],
    nicheTriviaSeeds["formula-1-dificil"]
  ),
  cinemaEasy: triviaPool(
    nicheTriviaSeeds["cine-basico"],
    nicheTriviaSeeds["series-famosas"]
  ),
  cinemaMedium: triviaPool(
    nicheTriviaSeeds["cine-dificil"],
    nicheTriviaSeeds["series-famosas"]
  ),
  musicEasy: triviaPool(
    nicheTriviaSeeds["musica-basico"],
    nicheTriviaSeeds["reggaeton"]
  ),
  musicMedium: triviaPool(
    nicheTriviaSeeds["musica-dificil"],
    nicheTriviaSeeds["reggaeton"]
  ),
  gamingEasy: triviaPool(
    nicheTriviaSeeds["videojuegos-basicos"],
    nicheTriviaSeeds["pokemon"]
  ),
  gamingMedium: triviaPool(
    nicheTriviaSeeds["videojuegos-dificiles"],
    nicheTriviaSeeds["pokemon"]
  ),
  technologyEasy: [
    q("Que dispositivo se usa normalmente para navegar por internet en movilidad?", "Smartphone", "Tostadora", "Microscopio", "Brujula"),
    q("Que significa normalmente Wi-Fi para un usuario?", "Conexion inalambrica", "Cable de corriente", "Pantalla tactil", "Bateria externa"),
    q("Que empresa desarrollo el sistema operativo Windows?", "Microsoft", "Nintendo", "Tesla", "Spotify"),
    q("Que buscador web esta asociado a Google?", "Google Search", "Excel", "Photoshop", "Steam"),
    q("Que aparato imprime documentos en papel?", "Impresora", "Router", "Altavoz", "Webcam"),
    q("Que pieza almacena energia en un movil?", "Bateria", "Teclado", "Ventilador", "Monitor"),
    q("Que extension suele tener una pagina web?", ".html", ".mp3", ".jpg", ".zip"),
    q("Que red social populariza videos cortos verticales?", "TikTok", "Wikipedia", "Gmail", "Dropbox"),
    q("Que cable moderno se usa mucho para cargar moviles Android recientes?", "USB-C", "VGA", "Ethernet", "HDMI antiguo"),
    q("Que icono suele representar borrar un archivo?", "Papelera", "Candado", "Avion", "Reloj"),
    q("Que programa se usa para visitar paginas web?", "Navegador", "Hoja de calculo", "Antivirus", "Compresor"),
    q("Que significa app en el uso comun?", "Aplicacion", "Altavoz portatil", "Archivo de papel", "Antena"),
    q("Que dispositivo conecta una casa a internet por Wi-Fi?", "Router", "Microfono", "Escaner", "Proyector"),
    q("Que servicio permite enviar correos electronicos?", "Email", "Bluetooth", "GPS", "NFC"),
    q("Que sistema operativo usan muchos iPhone?", "iOS", "Windows", "Linux Mint", "ChromeOS"),
    q("Que marca fabrica los iPhone?", "Apple", "Samsung", "Xiaomi", "Huawei"),
    q("Que componente muestra imagenes en un ordenador?", "Pantalla", "Raton", "Disco duro", "Procesador"),
    q("Que accion protege una cuenta con una clave secreta?", "Iniciar sesion con contrasena", "Cambiar el brillo", "Subir volumen", "Cerrar una pestana")
  ],
  technologyMedium: [
    q("Que protocolo se usa habitualmente para paginas web seguras?", "HTTPS", "FTP", "SMTP", "USB"),
    q("Que sigla identifica una red privada virtual?", "VPN", "CPU", "PNG", "RAM"),
    q("Que componente se considera el cerebro principal de un ordenador?", "CPU", "Altavoz", "Cable HDMI", "Carcasa"),
    q("Que memoria pierde datos al apagar el equipo?", "RAM", "SSD", "Blu-ray", "Pendrive desconectado"),
    q("Que tipo de almacenamiento suele ser mas rapido que un disco duro mecanico?", "SSD", "CD-ROM", "DVD", "Cinta magnetica"),
    q("Que lenguaje se usa mucho para estructurar paginas web?", "HTML", "SQL", "Python", "C"),
    q("Que lenguaje se ejecuta habitualmente en el navegador para interactividad?", "JavaScript", "Bash", "Swift", "Kotlin"),
    q("Que servicio traduce nombres de dominio a direcciones IP?", "DNS", "NFC", "GPS", "OLED"),
    q("Que tecnologia permite pagos acercando el movil al datafono?", "NFC", "VGA", "FTP", "BIOS"),
    q("Que ataque intenta enganar al usuario para robar credenciales?", "Phishing", "Streaming", "Renderizado", "Compilacion"),
    q("Que empresa creo Android como plataforma global tras adquirir Android Inc.?", "Google", "Sony", "Intel", "Adobe"),
    q("Que sistema de control de versiones usan muchos programadores?", "Git", "Excel", "Bluetooth", "ZIP"),
    q("Que formato de imagen suele conservar transparencia?", "PNG", "MP3", "TXT", "CSV"),
    q("Que significa URL?", "Direccion de un recurso web", "Tipo de bateria", "Cable de red", "Memoria grafica"),
    q("Que dispositivo convierte senales digitales para conectar a internet en casa?", "Router", "Teclado", "Monitor", "Altavoz"),
    q("Que concepto describe guardar archivos en servidores remotos accesibles por internet?", "Nube", "Pixel", "Cache local", "Kernel"),
    q("Que sistema operativo es de codigo abierto y tiene muchas distribuciones?", "Linux", "iOS", "Windows Phone", "MS-DOS"),
    q("Que componente grafico se abrevia como GPU?", "Procesador grafico", "Unidad de papel", "Puerto universal", "Gestor de usuarios")
  ],
  natureEasy: [
    q("Que animal es el mamifero mas grande del mundo?", "Ballena azul", "Elefante", "Jirafa", "Tiburon blanco"),
    q("Que animal tiene cuello muy largo?", "Jirafa", "Cebra", "Leon", "Koala"),
    q("Que insecto produce miel?", "Abeja", "Hormiga", "Mosca", "Escarabajo"),
    q("Que animal cambia de color con facilidad?", "Camaleon", "Panda", "Caballo", "Delfin"),
    q("Que ave no puede volar y vive en zonas frias del sur?", "Pinguino", "Aguila", "Loro", "Paloma"),
    q("Que animal tiene una trompa larga?", "Elefante", "Rinoceronte", "Hipopotamo", "Bisonte"),
    q("Que planta suele tener espinas y vivir en zonas secas?", "Cactus", "Helecho", "Nenufar", "Bambu"),
    q("Que proceso usan las plantas para fabricar alimento con luz?", "Fotosintesis", "Hibernacion", "Evaporacion", "Erosion"),
    q("Que animal marino tiene ocho brazos?", "Pulpo", "Medusa", "Tiburon", "Delfin"),
    q("Que reptil tiene caparazon?", "Tortuga", "Serpiente", "Cocodrilo", "Iguana"),
    q("Que animal es famoso por su velocidad terrestre?", "Guepardo", "Oso", "Panda", "Camello"),
    q("Que grupo animal incluye ranas y salamandras?", "Anfibios", "Mamiferos", "Aves", "Peces"),
    q("Que oceano es el mas grande?", "Pacifico", "Atlantico", "Indico", "Artico"),
    q("Que animal vive parte de su vida como renacuajo?", "Rana", "Lagarto", "Tortuga", "Pez payaso"),
    q("Que arbol produce bellotas?", "Encina", "Palmera", "Abeto", "Olivo"),
    q("Que animal blanco y negro come bambu?", "Panda", "Cebra", "Orca", "Mapache"),
    q("Que animal es conocido por llevar una bolsa para sus crias?", "Canguro", "Caballo", "Tigre", "Lobo"),
    q("Que animal domestico suele decir miau?", "Gato", "Perro", "Vaca", "Cabra")
  ],
  natureMedium: [
    q("Que mamifero pone huevos?", "Ornitorrinco", "Koala", "Delfin", "Murcielago"),
    q("Que ave no voladora es endemica de Nueva Zelanda?", "Kiwi", "Emu", "Avestruz", "Pinguino"),
    q("Que fosa oceanica es la mas profunda conocida?", "Marianas", "Tonga", "Puerto Rico", "Java"),
    q("Que arrecife australiano es el mayor sistema coralino?", "Gran Barrera de Coral", "Arrecife Mesoamericano", "Arrecife de Belice", "Arrecife del Mar Rojo"),
    q("Que periodo geologico siguio al Jurasico?", "Cretacico", "Triasico", "Permico", "Carbonifero"),
    q("Que dinosaurio tenia tres cuernos faciales?", "Triceratops", "Stegosaurus", "Diplodocus", "Iguanodon"),
    q("Que dinosaurio carnivoro es famoso por brazos cortos?", "Tyrannosaurus rex", "Brachiosaurus", "Ankylosaurus", "Parasaurolophus"),
    q("Que simbiosis entre hongo y alga forma una estructura comun en rocas?", "Liquen", "Musgo", "Coral", "Plancton"),
    q("Que grupo animal tiene columna vertebral?", "Vertebrados", "Moluscos", "Anelidos", "Cnidarios"),
    q("Que pigmento da color verde a muchas plantas?", "Clorofila", "Melanina", "Hemoglobina", "Quitina"),
    q("Que mamifero marino tiene un diente largo en espiral?", "Narval", "Manati", "Foca", "Orca"),
    q("Que pez se considera un fosil viviente redescubierto en 1938?", "Celacanto", "Atun", "Pez espada", "Merluza"),
    q("Que teoria explica el movimiento de placas continentales?", "Tectonica de placas", "Deriva termica", "Fotosintesis", "Evolucion dirigida"),
    q("Que capa oceanica recibe luz suficiente para fotosintesis?", "Fotica", "Abisal", "Hadal", "Batipelagica"),
    q("Que corriente oceanica ayuda a calentar Europa occidental?", "Corriente del Golfo", "Corriente de Humboldt", "Corriente de Benguela", "Corriente de California"),
    q("Que reptil marino fosil de cuello largo no era dinosaurio?", "Plesiosaurio", "Velociraptor", "Triceratops", "Pteranodon"),
    q("Que ave extinta era endemica de Mauricio?", "Dodo", "Moa", "Alca gigante", "Takahe"),
    q("Que oceano rodea la Antartida?", "Antartico", "Artico", "Indico", "Atlantico")
  ],
  foodEasy: [
    q("Que ingrediente principal lleva una tortilla francesa?", "Huevo", "Arroz", "Pasta", "Pan"),
    q("Que fruta es conocida por ser amarilla y alargada?", "Platano", "Fresa", "Uva", "Naranja"),
    q("Que plato italiano suele llevar tomate, queso y masa redonda?", "Pizza", "Sushi", "Taco", "Paella"),
    q("Que bebida se obtiene al exprimir naranjas?", "Zumo de naranja", "Cafe", "Leche", "Agua con gas"),
    q("Que cereal es base habitual de la paella?", "Arroz", "Trigo", "Maiz", "Avena"),
    q("Que alimento se hace normalmente con leche cuajada?", "Queso", "Pan", "Mermelada", "Pasta"),
    q("Que utensilio se usa para cortar comida?", "Cuchillo", "Vaso", "Plato", "Servilleta"),
    q("Que postre frio se hace con leche, azucar y sabores?", "Helado", "Gazpacho", "Tortilla", "Ensalada"),
    q("Que comida mexicana se dobla o enrolla en tortilla?", "Taco", "Croissant", "Ramen", "Curry"),
    q("Que ingrediente da sabor dulce?", "Azucar", "Sal", "Vinagre", "Pimienta"),
    q("Que bebida se prepara infusionando hojas?", "Te", "Aceite", "Caldo", "Refresco"),
    q("Que plato japones usa arroz y pescado en muchas versiones?", "Sushi", "Risotto", "Falafel", "Goulash"),
    q("Que verdura suele ser naranja y alargada?", "Zanahoria", "Lechuga", "Berenjena", "Coliflor"),
    q("Que alimento se hornea con harina, agua y levadura?", "Pan", "Queso", "Yogur", "Miel"),
    q("Que fruta se asocia con la sidra?", "Manzana", "Melon", "Kiwi", "Pera"),
    q("Que salsa suele acompanar pasta italiana y lleva tomate?", "Salsa de tomate", "Mayonesa", "Alioli", "Mostaza"),
    q("Que comida se suele tomar en un cucurucho y se derrite?", "Helado", "Arroz", "Sopa", "Lentejas"),
    q("Que bebida caliente se obtiene de granos tostados?", "Cafe", "Limonada", "Horchata", "Kefir")
  ],
  foodMedium: [
    q("Que pais se asocia con el pho?", "Vietnam", "Grecia", "Marruecos", "Suecia"),
    q("Que pais se asocia con el kimchi?", "Corea del Sur", "Italia", "Brasil", "Portugal"),
    q("Que ingrediente base tiene el hummus?", "Garbanzo", "Lenteja", "Arroz", "Maiz"),
    q("Que especia da color amarillo al risotto alla milanese?", "Azafran", "Canela", "Comino", "Pimenton"),
    q("Que fruto seco se usa en el pesto genoves tradicional?", "Pinon", "Almendra", "Nuez", "Avellana"),
    q("Que postre italiano significa literalmente tirame arriba?", "Tiramisu", "Panna cotta", "Cannoli", "Gelato"),
    q("Que salsa madre francesa se hace con roux y leche?", "Bechamel", "Holandesa", "Espagnole", "Veloute"),
    q("Que sabor basico se asocia con el glutamato?", "Umami", "Dulce", "Acido", "Amargo"),
    q("Que tecnica cocina alimentos al vacio a baja temperatura?", "Sous-vide", "Flambeado", "Gratinado", "Escabeche"),
    q("Que pais se asocia con la feijoada?", "Brasil", "India", "China", "Noruega"),
    q("Que alga se usa para envolver sushi maki?", "Nori", "Wakame", "Kombu", "Agar"),
    q("Que raiz picante japonesa suele servirse con sushi?", "Wasabi", "Jengibre", "Rabano negro", "Yuca"),
    q("Que postre portugues usa crema en tartaleta de hojaldre?", "Pastel de nata", "Baklava", "Mochi", "Brownie"),
    q("Que postre frances se carameliza por encima con azucar?", "Creme brulee", "Macaron", "Eclair", "Madeleine"),
    q("Que termino designa coccion breve y enfriado rapido?", "Blanquear", "Confitar", "Reducir", "Amasar"),
    q("Que mezcla francesa suele incluir perejil, estragon, cebollino y perifollo?", "Fines herbes", "Garam masala", "Ras el hanout", "Za'atar"),
    q("Que cereal es base tradicional del couscous?", "Semola de trigo", "Arroz glutinoso", "Avena", "Centeno"),
    q("Que queso azul italiano se elabora con leche de vaca?", "Gorgonzola", "Manchego", "Feta", "Brie")
  ],
  languageEasy: [
    q("Que idioma se habla oficialmente en Francia?", "Frances", "Aleman", "Italiano", "Portugues"),
    q("Que idioma se habla oficialmente en Brasil?", "Portugues", "Espanol", "Frances", "Ingles"),
    q("Que letra viene despues de la A en el alfabeto espanol?", "B", "C", "D", "E"),
    q("Cuantas vocales basicas tiene el espanol?", "5", "4", "6", "7"),
    q("Que signo abre una pregunta en espanol?", "Signo de interrogacion invertido", "Signo de cierre de pregunta", "Signo de exclamacion", "Punto"),
    q("Que signo cierra una exclamacion?", "!", "?", ",", ";"),
    q("Que palabra esta escrita correctamente?", "Casa", "Kasa", "Caza siempre", "Qasa"),
    q("Que idioma usa el alfabeto latino de forma habitual?", "Espanol", "Arabe", "Ruso", "Chino mandarin"),
    q("Como se traduce 'hello' al espanol?", "Hola", "Adios", "Gracias", "Perdon"),
    q("Como se traduce 'water' al espanol?", "Agua", "Pan", "Casa", "Libro"),
    q("Que palabra es un sustantivo?", "Mesa", "Correr", "Rapido", "Azulmente"),
    q("Que palabra es un verbo?", "Cantar", "Mesa", "Rojo", "Lejos"),
    q("Que lengua se habla mayoritariamente en Argentina?", "Espanol", "Italiano", "Portugues", "Frances"),
    q("Que idioma se asocia con Londres?", "Ingles", "Aleman", "Ruso", "Japones"),
    q("Que idioma se asocia con Roma?", "Italiano", "Sueco", "Holandes", "Coreano"),
    q("Que idioma se asocia con Tokio?", "Japones", "Hindi", "Griego", "Turco"),
    q("Que palabra es un saludo en espanol?", "Hola", "Mesa", "Correr", "Azul"),
    q("Que signo separa elementos en una enumeracion?", "Coma", "Guion largo", "Parentesis", "Asterisco")
  ],
  languageMedium: [
    q("Que tilde diferencia palabras como tu y tu en espanol?", "Tilde diacritica", "Tilde musical", "Tilde doble", "Tilde muda"),
    q("Que fenomeno une dos vocales en una misma silaba?", "Diptongo", "Hiato", "Sinalefa obligatoria", "Elipsis"),
    q("Que fenomeno separa vocales contiguas en silabas distintas?", "Hiato", "Diptongo", "Digrafo", "Acronimo"),
    q("Que familia linguistica incluye espanol, frances e italiano?", "Romance", "Germanica", "Eslava", "Uralica"),
    q("Que familia incluye ingles, aleman y neerlandes?", "Germanica", "Romance", "Semitica", "Turquica"),
    q("Que lengua clasica dio origen a las lenguas romances?", "Latin", "Griego", "Sanscrito", "Arabe"),
    q("Que lengua usa el alfabeto hangul?", "Coreano", "Japones", "Tailandes", "Vietnamita"),
    q("De que lengua procede la palabra robot?", "Checo", "Frances", "Italiano", "Arabe"),
    q("De que lengua procede la palabra karaoke?", "Japones", "Ruso", "Griego", "Persa"),
    q("Como se traduce 'library' al espanol en sentido habitual?", "Biblioteca", "Libreria", "Archivo", "Editorial"),
    q("Como se traduce 'actually' al espanol habitual?", "En realidad", "Actualmente", "Actuando", "Con acto"),
    q("Que letra fue eliminada como letra independiente del alfabeto espanol en 2010?", "Ch", "W", "K", "X"),
    q("Que palabra tiene la silaba tonica antes de la antepenultima?", "Sobresdrujula", "Aguda", "Llana", "Esdrujula"),
    q("Que figura repite sonidos iniciales en palabras cercanas?", "Aliteracion", "Metafora", "Hiperbole", "Antitesis"),
    q("Que recurso atribuye cualidades humanas a objetos o animales?", "Personificacion", "Onomatopeya", "Elipsis", "Hiperbaton"),
    q("Que familia linguistica incluye ruso, polaco y checo?", "Eslava", "Romance", "Germanica", "Uralica"),
    q("De que lengua procede la palabra algebra?", "Arabe", "Latin", "Japones", "Aleman"),
    q("Como se traduce 'exit' en un cartel?", "Salida", "Exito", "Entrada", "Escalera")
  ],
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

function balancedPacks(difficulty: AdvancedDifficulty, pool: keyof typeof advancedPools, specs: BalancedDraftSpec[]): AdvancedQuizDraft[] {
  return specs.map((spec, index) => pack(spec.slug, spec.title, spec.tagline, spec.subject, difficulty, pool, index * 7));
}

const balancedQuizDraftsBySection = {
  "cultura-general": [
    ...balancedPacks("facil", "cultureEasy", [
      b("cultura-muy-facil", "Cultura muy facil", "Basicos rapidos para entrar sin miedo.", "cultura general muy facil"),
      b("basicos-de-colegio", "Basicos de colegio", "Preguntas conocidas de clase y vida diaria.", "basicos de colegio"),
      b("datos-populares-facil", "Datos populares facil", "Cosas que suenan aunque no estudies.", "datos populares faciles"),
      b("mundo-facil", "Mundo facil", "Paises, objetos y referencias muy conocidas.", "mundo facil"),
      b("cultura-express-facil", "Cultura express facil", "Una ronda ligera de conocimientos comunes.", "cultura express facil"),
      b("conocimientos-basicos-rapidos", "Conocimientos basicos rapidos", "Lo tipico que conviene tener fresco.", "conocimientos basicos rapidos"),
      b("mezcla-facil", "Mezcla facil", "Un poco de todo en modo amable.", "mezcla facil"),
      b("cosas-que-suenan", "Cosas que suenan", "Preguntas populares para jugar rapido.", "cosas que suenan"),
      b("ronda-facil-de-cultura", "Ronda facil de cultura", "Cultura general de primer nivel.", "ronda facil de cultura")
    ]),
    ...balancedPacks("medio", "cultureMedium", [
      b("cultura-general-intermedia", "Cultura general intermedia", "Un poco mas de mundo y memoria.", "cultura general intermedia"),
      b("mundo-y-arte-medio", "Mundo y arte medio", "Paises, obras y referencias culturales.", "mundo y arte medio"),
      b("historia-ciencia-medio", "Historia y ciencia medio", "Datos conocidos, pero no tan automaticos.", "historia y ciencia medio"),
      b("lecturas-y-mapas-medio", "Lecturas y mapas medio", "Cultura cruzada para ir con cabeza.", "lecturas y mapas medio"),
      b("europa-y-mundo-medio", "Europa y mundo medio", "Capitales, lugares y datos globales.", "Europa y mundo medio"),
      b("datos-de-cultura-media", "Datos de cultura media", "Preguntas de nivel intermedio real.", "datos de cultura media"),
      b("mix-cultural-medio", "Mix cultural medio", "Una mezcla para quien suele acertar mas de la mitad.", "mix cultural medio")
    ])
  ],
  geografia: [
    ...balancedPacks("facil", "geographyEasy", [
      b("mapa-facil", "Mapa facil", "Ubicacion, continentes y paises conocidos.", "mapa facil"),
      b("capitales-populares", "Capitales populares", "Capitales famosas para calentar.", "capitales populares"),
      b("continentes-facil", "Continentes facil", "Mapamundi basico sin trampas raras.", "continentes faciles"),
      b("paises-famosos", "Paises famosos", "Pistas de paises muy reconocibles.", "paises famosos"),
      b("geografia-basica-mundo", "Geografia basica mundo", "Preguntas claras del planeta.", "geografia basica del mundo"),
      b("oceanos-y-mapas-facil", "Oceanos y mapas facil", "Oceanos, lineas y continentes.", "oceanos y mapas faciles"),
      b("ronda-facil-geografia", "Ronda facil de geografia", "Una vuelta sencilla por el mapa.", "ronda facil de geografia"),
      b("pistas-geograficas-faciles", "Pistas geograficas faciles", "Lee la pista y encuentra el pais.", "pistas geograficas faciles"),
      b("viaje-por-el-mapa-facil", "Viaje por el mapa facil", "Un recorrido rapido y reconocible.", "viaje por el mapa facil"),
      b("ubicacion-basica", "Ubicacion basica", "Lugares que conviene ubicar.", "ubicacion basica")
    ]),
    ...balancedPacks("medio", "geographyMedium", [
      b("capitales-intermedias", "Capitales intermedias", "Capitales conocidas con alguna trampa.", "capitales intermedias"),
      b("banderas-nivel-medio", "Banderas nivel medio", "Colores y simbolos para fijarse bien.", "banderas nivel medio"),
      b("rios-y-montanas-medio", "Rios y montanas medio", "Geografia fisica con algo mas de nivel.", "rios y montanas medio"),
      b("geografia-de-espana-medio", "Geografia de Espana medio", "Rios, islas y comunidades con detalle.", "geografia de Espana medio"),
      b("paises-y-fronteras-medio", "Paises y fronteras medio", "Mapas politicos sin ir a extremo.", "paises y fronteras medio"),
      b("mapa-mundial-medio", "Mapa mundial medio", "Ubicaciones para quien mira mapas.", "mapa mundial medio"),
      b("geografia-fisica-medio", "Geografia fisica medio", "Montanas, rios, mares y oceanos.", "geografia fisica medio")
    ])
  ],
  historia: [
    ...balancedPacks("facil", "historyEasy", [
      b("historia-muy-facil", "Historia muy facil", "Hechos historicos muy reconocibles.", "historia muy facil"),
      b("personajes-historicos-facil", "Personajes historicos facil", "Nombres que aparecen en cualquier repaso.", "personajes historicos faciles"),
      b("civilizaciones-facil", "Civilizaciones facil", "Egipto, Roma, Grecia y mundo antiguo.", "civilizaciones faciles"),
      b("fechas-basicas", "Fechas basicas", "Anos y hechos que se repiten mucho.", "fechas basicas"),
      b("historia-del-mundo-facil", "Historia del mundo facil", "Una ronda global para empezar.", "historia del mundo facil"),
      b("imperios-faciles", "Imperios faciles", "Imperios famosos y conquistadores conocidos.", "imperios faciles"),
      b("edad-media-facil", "Edad Media facil", "Castillos, reinos y conceptos populares.", "Edad Media facil"),
      b("guerras-basicas", "Guerras basicas", "Conflictos historicos muy conocidos.", "guerras basicas"),
      b("historia-de-espana-facil", "Historia de Espana facil", "Datos espanoles de nivel entrada.", "historia de Espana facil"),
      b("ronda-facil-historia", "Ronda facil de historia", "Historia para calentar la memoria.", "ronda facil de historia")
    ]),
    ...balancedPacks("medio", "historyMedium", [
      b("historia-intermedia", "Historia intermedia", "Fechas, imperios y nombres con mas detalle.", "historia intermedia"),
      b("historia-europa-medio", "Historia de Europa medio", "Reinos, guerras y cambios europeos.", "historia de Europa medio"),
      b("imperios-y-reyes-medio", "Imperios y reyes medio", "Gobernantes y conquistas de nivel medio.", "imperios y reyes medio"),
      b("segunda-guerra-medio", "Segunda Guerra medio", "Batallas, lideres y operaciones conocidas.", "Segunda Guerra Mundial medio"),
      b("civilizaciones-medio", "Civilizaciones medio", "Mundo antiguo con algo mas de precision.", "civilizaciones medio")
    ])
  ],
  ciencia: [
    ...balancedPacks("facil", "scienceEasy", [
      b("ciencia-muy-facil", "Ciencia muy facil", "Conceptos claros de cole y vida diaria.", "ciencia muy facil"),
      b("cuerpo-y-naturaleza-facil", "Cuerpo y naturaleza facil", "Organos, animales y plantas conocidos.", "cuerpo y naturaleza facil"),
      b("fisica-quimica-facil", "Fisica y quimica facil", "Fuerzas, elementos y cambios simples.", "fisica y quimica facil"),
      b("animales-y-plantas-facil", "Animales y plantas facil", "Seres vivos en modo sencillo.", "animales y plantas facil")
    ]),
    ...balancedPacks("medio", "scienceMedium", [
      b("ciencia-intermedia", "Ciencia intermedia", "Biologia, fisica y espacio con mas detalle.", "ciencia intermedia"),
      b("biologia-medio", "Biologia medio", "Celulas, organos y seres vivos.", "biologia medio"),
      b("fisica-medio", "Fisica medio", "Magnitudes, energia y movimiento.", "fisica medio"),
      b("quimica-medio", "Quimica medio", "Elementos, formulas y enlaces basicos.", "quimica medio"),
      b("astronomia-medio", "Astronomia medio", "Planetas, lunas y objetos del cielo.", "astronomia medio"),
      b("inventos-medio", "Inventos medio", "Descubrimientos y personas clave.", "inventos medio"),
      b("cuerpo-humano-medio", "Cuerpo humano medio", "Organos y funciones con algo de nivel.", "cuerpo humano medio"),
      b("ciencia-mixta-medio", "Ciencia mixta medio", "Una mezcla cientifica para pensar.", "ciencia mixta medio")
    ])
  ],
  deportes: [
    ...balancedPacks("facil", "sportsEasy", [
      b("deportes-muy-facil", "Deportes muy facil", "Reglas famosas y conceptos basicos.", "deportes muy faciles"),
      b("reglas-deportivas-faciles", "Reglas deportivas faciles", "Lo basico de cancha, campo y pista.", "reglas deportivas faciles"),
      b("futbol-facil-extra", "Futbol facil extra", "Datos de futbol que suenan a todos.", "futbol facil extra"),
      b("baloncesto-facil-extra", "Baloncesto facil extra", "Canastas, pista y reglas basicas.", "baloncesto facil extra"),
      b("formula-1-facil-extra", "Formula 1 facil extra", "Banderas, boxes y pilotos conocidos.", "Formula 1 facil extra"),
      b("deportes-populares-facil", "Deportes populares facil", "Futbol, basket y motor en modo entrada.", "deportes populares faciles"),
      b("iconos-deportivos-facil", "Iconos deportivos facil", "Nombres y competiciones muy populares.", "iconos deportivos faciles"),
      b("competiciones-faciles", "Competiciones faciles", "Torneos que casi siempre suenan.", "competiciones faciles"),
      b("pista-y-cancha-facil", "Pista y cancha facil", "Deportes de pista, cancha y circuito.", "pista y cancha facil"),
      b("deportes-en-tv-facil", "Deportes en TV facil", "Preguntas de cultura deportiva popular.", "deportes en TV facil"),
      b("ronda-facil-deportes", "Ronda facil de deportes", "Una ronda deportiva para calentar.", "ronda facil de deportes")
    ]),
    ...balancedPacks("medio", "sportsMedium", [
      b("deportes-intermedio", "Deportes intermedio", "Campeones, torneos y nombres con mas nivel.", "deportes intermedio"),
      b("futbol-medio", "Futbol medio", "Mundiales, clubes y jugadores historicos.", "futbol medio"),
      b("baloncesto-medio", "Baloncesto medio", "NBA, FIBA y leyendas conocidas.", "baloncesto medio"),
      b("formula-1-medio", "Formula 1 medio", "Pilotos, escuderias y circuitos.", "Formula 1 medio"),
      b("tenis-medio", "Tenis medio", "Torneos y campeones populares.", "tenis medio"),
      b("campeones-medio", "Campeones medio", "Titulos, finales y nombres ganadores.", "campeones medio"),
      b("reglas-y-torneos-medio", "Reglas y torneos medio", "Normas y competiciones con algo de historia.", "reglas y torneos medio"),
      b("deporte-historico-medio", "Deporte historico medio", "Momentos historicos sin llegar a extremo.", "deporte historico medio"),
      b("ronda-media-deportes", "Ronda media de deportes", "Deporte para quien controla bastante.", "ronda media de deportes")
    ])
  ],
  "cine-series": [
    ...balancedPacks("facil", "cinemaEasy", [
      b("cine-muy-facil", "Cine muy facil", "Peliculas famosas para acertar rapido.", "cine muy facil"),
      b("peliculas-famosas-facil", "Peliculas famosas facil", "Titulos que casi todos ubican.", "peliculas famosas facil"),
      b("series-populares-facil", "Series populares facil", "Series de conversacion diaria.", "series populares facil"),
      b("personajes-de-pantalla-facil", "Personajes de pantalla facil", "Heroes, villanos y protagonistas conocidos.", "personajes de pantalla facil"),
      b("sagas-famosas-facil", "Sagas famosas facil", "Universos de cine muy populares.", "sagas famosas facil"),
      b("animacion-facil", "Animacion facil", "Peliculas animadas y personajes conocidos.", "animacion facil"),
      b("cine-de-domingo-facil", "Cine de domingo facil", "Peliculas de esas que siempre vuelven.", "cine de domingo facil"),
      b("ronda-facil-cine-series", "Ronda facil de cine y series", "Pantalla grande y pequena en modo facil.", "ronda facil de cine y series")
    ]),
    ...balancedPacks("medio", "cinemaMedium", [
      b("cine-intermedio", "Cine intermedio", "Directores, premios y escenas conocidas.", "cine intermedio"),
      b("directores-populares-medio", "Directores populares medio", "Nombres importantes sin ir a cinefilia extrema.", "directores populares medio"),
      b("series-medio", "Series medio", "Detalles de series famosas y de culto popular.", "series medio"),
      b("oscars-medio", "Oscars medio", "Premios y peliculas ganadoras.", "Oscars medio"),
      b("peliculas-de-culto-medio", "Peliculas de culto medio", "Cine que exige algo mas de memoria.", "peliculas de culto medio"),
      b("cine-moderno-medio", "Cine moderno medio", "Peliculas recientes y clasicos modernos.", "cine moderno medio"),
      b("personajes-y-escenas-medio", "Personajes y escenas medio", "Reconoce momentos y protagonistas.", "personajes y escenas medio"),
      b("sagas-y-universos-medio", "Sagas y universos medio", "Franquicias, mundos y detalles.", "sagas y universos medio"),
      b("pantalla-pop-medio", "Pantalla pop medio", "Cultura pop de cine y series.", "pantalla pop medio"),
      b("ronda-media-cine-series", "Ronda media de cine y series", "Para quien ve bastante pantalla.", "ronda media de cine y series")
    ])
  ],
  musica: [
    ...balancedPacks("facil", "musicEasy", [
      b("musica-muy-facil", "Musica muy facil", "Artistas y canciones muy reconocibles.", "musica muy facil"),
      b("hits-populares-facil", "Hits populares facil", "Canciones que han sonado por todas partes.", "hits populares facil"),
      b("artistas-famosos-facil", "Artistas famosos facil", "Nombres grandes de la musica popular.", "artistas famosos facil"),
      b("instrumentos-facil", "Instrumentos facil", "Instrumentos y conceptos basicos.", "instrumentos facil"),
      b("pop-y-rock-facil", "Pop y rock facil", "Bandas y canciones muy conocidas.", "pop y rock facil"),
      b("reggaeton-facil-extra", "Reggaeton facil extra", "Himnos y artistas urbanos populares.", "reggaeton facil extra"),
      b("canciones-que-suenan-facil", "Canciones que suenan facil", "Ronda para reconocer musica popular.", "canciones que suenan facil"),
      b("musica-en-radio-facil", "Musica en radio facil", "Artistas que han sonado muchisimo.", "musica en radio facil"),
      b("cultura-musical-facil", "Cultura musical facil", "Datos musicales de entrada.", "cultura musical facil"),
      b("ronda-facil-musica", "Ronda facil de musica", "Una vuelta ligera por canciones y artistas.", "ronda facil de musica")
    ]),
    ...balancedPacks("medio", "musicMedium", [
      b("musica-intermedia", "Musica intermedia", "Albumes, artistas y generos con mas nivel.", "musica intermedia"),
      b("albumes-medio", "Albumes medio", "Discos conocidos para quien escucha bastante.", "albumes medio"),
      b("artistas-medio", "Artistas medio", "Nombres importantes de varias escenas.", "artistas medio"),
      b("rock-pop-medio", "Rock y pop medio", "Bandas, discos y momentos clave.", "rock y pop medio"),
      b("reggaeton-medio", "Reggaeton medio", "Historia urbana y artistas clave.", "reggaeton medio"),
      b("clasicos-musicales-medio", "Clasicos musicales medio", "Referencias de musica popular y clasica.", "clasicos musicales medio"),
      b("premios-musicales-medio", "Premios musicales medio", "Reconocimientos, albumes y artistas.", "premios musicales medio"),
      b("ronda-media-musica", "Ronda media de musica", "Para quien guarda canciones en la cabeza.", "ronda media de musica")
    ])
  ],
  tecnologia: [
    ...balancedPacks("facil", "technologyEasy", [
      b("tecnologia-muy-facil", "Tecnologia muy facil", "Dispositivos y conceptos de uso diario.", "tecnologia muy facil"),
      b("dispositivos-basicos", "Dispositivos basicos", "Moviles, ordenadores y perifericos.", "dispositivos basicos"),
      b("internet-facil", "Internet facil", "Navegadores, Wi-Fi y paginas web.", "internet facil"),
      b("moviles-y-apps-facil", "Moviles y apps facil", "Apps, carga y uso cotidiano.", "moviles y apps facil"),
      b("redes-sociales-facil", "Redes sociales facil", "Plataformas y usos conocidos.", "redes sociales facil"),
      b("ordenador-facil", "Ordenador facil", "Partes y acciones basicas.", "ordenador facil"),
      b("seguridad-digital-facil", "Seguridad digital facil", "Claves, cuentas y cuidado basico.", "seguridad digital facil"),
      b("herramientas-web-facil", "Herramientas web facil", "Servicios online comunes.", "herramientas web facil"),
      b("tecnologia-diaria-facil", "Tecnologia diaria facil", "Tecnologia que usamos cada dia.", "tecnologia diaria facil"),
      b("ronda-facil-tecnologia", "Ronda facil de tecnologia", "Una vuelta sencilla por lo digital.", "ronda facil de tecnologia")
    ]),
    ...balancedPacks("medio", "technologyMedium", [
      b("tecnologia-intermedia", "Tecnologia intermedia", "Web, hardware y seguridad con mas nivel.", "tecnologia intermedia"),
      b("internet-medio", "Internet medio", "Protocolos y conceptos de red conocidos.", "internet medio"),
      b("hardware-medio", "Hardware medio", "Piezas y memoria del ordenador.", "hardware medio"),
      b("software-medio", "Software medio", "Lenguajes, sistemas y formatos.", "software medio"),
      b("ciberseguridad-media", "Ciberseguridad media", "Riesgos y protecciones basicas reales.", "ciberseguridad media"),
      b("web-y-apps-medio", "Web y apps medio", "Como funcionan paginas y aplicaciones.", "web y apps medio"),
      b("sistemas-operativos-medio", "Sistemas operativos medio", "Windows, Linux, iOS y conceptos base.", "sistemas operativos medio"),
      b("datos-digitales-medio", "Datos digitales medio", "Archivos, formatos y almacenamiento.", "datos digitales medio"),
      b("historia-tech-medio", "Historia tech medio", "Empresas, lanzamientos y nombres clave.", "historia tech medio"),
      b("ronda-media-tecnologia", "Ronda media de tecnologia", "Tecnologia para quien controla un poco.", "ronda media de tecnologia")
    ])
  ],
  gaming: [
    ...balancedPacks("facil", "gamingEasy", [
      b("gaming-muy-facil", "Gaming muy facil", "Personajes y sagas muy famosas.", "gaming muy facil"),
      b("personajes-gamer-facil", "Personajes gamer facil", "Iconos faciles de reconocer.", "personajes gamer facil"),
      b("sagas-populares-facil", "Sagas populares facil", "Juegos que conoce casi todo el mundo.", "sagas populares facil"),
      b("consolas-facil", "Consolas facil", "Plataformas y mandos conocidos.", "consolas facil"),
      b("nintendo-facil", "Nintendo facil", "Mario, Zelda y compania.", "Nintendo facil"),
      b("videojuegos-clasicos-facil", "Videojuegos clasicos facil", "Clasicos de recreativa y consola.", "videojuegos clasicos facil"),
      b("mundos-abiertos-facil", "Mundos abiertos facil", "Juegos populares de explorar y construir.", "mundos abiertos facil"),
      b("juegos-online-facil", "Juegos online facil", "Titulos sociales y competitivos conocidos.", "juegos online facil"),
      b("pokemon-facil-extra", "Pokemon facil extra", "Pokedex y tipos en modo amable.", "Pokemon facil extra"),
      b("ronda-facil-gaming", "Ronda facil de gaming", "Una vuelta sencilla por videojuegos.", "ronda facil de gaming")
    ]),
    ...balancedPacks("medio", "gamingMedium", [
      b("gaming-intermedio", "Gaming intermedio", "Estudios, sagas y detalles con mas nivel.", "gaming intermedio"),
      b("sagas-gamer-medio", "Sagas gamer medio", "Franquicias famosas con algo de memoria.", "sagas gamer medio"),
      b("estudios-videojuegos-medio", "Estudios de videojuegos medio", "Desarrolladoras y juegos reconocibles.", "estudios de videojuegos medio"),
      b("consolas-medio", "Consolas medio", "Generaciones y plataformas historicas.", "consolas medio"),
      b("pokemon-medio", "Pokemon medio", "Regiones, evoluciones y Pokedex.", "Pokemon medio"),
      b("juegos-de-culto-medio", "Juegos de culto medio", "Titulos que piden algo mas de cultura gamer.", "juegos de culto medio"),
      b("historia-gaming-medio", "Historia gaming medio", "Lanzamientos, estudios y clasicos.", "historia gaming medio"),
      b("personajes-gamer-medio", "Personajes gamer medio", "Protagonistas y mundos conocidos.", "personajes gamer medio"),
      b("mecanicas-gaming-medio", "Mecanicas gaming medio", "Sistemas, generos y detalles jugables.", "mecanicas gaming medio"),
      b("ronda-media-gaming", "Ronda media de gaming", "Para quien juega y recuerda.", "ronda media de gaming")
    ])
  ],
  "naturaleza-animales": [
    ...balancedPacks("facil", "natureEasy", [
      b("naturaleza-muy-facil", "Naturaleza muy facil", "Animales, plantas y oceanos conocidos.", "naturaleza muy facil"),
      b("animales-famosos-facil", "Animales famosos facil", "Especies faciles de reconocer.", "animales famosos facil"),
      b("plantas-y-oceanos-facil", "Plantas y oceanos facil", "Naturaleza basica y visual.", "plantas y oceanos facil"),
      b("mamiferos-facil", "Mamiferos facil", "Mamiferos conocidos y rasgos claros.", "mamiferos facil"),
      b("aves-y-reptiles-facil", "Aves y reptiles facil", "Animales populares sin complicarse.", "aves y reptiles facil"),
      b("mundo-natural-facil", "Mundo natural facil", "Preguntas sencillas del planeta vivo.", "mundo natural facil"),
      b("ecosistemas-facil", "Ecosistemas facil", "Conceptos naturales de entrada.", "ecosistemas facil"),
      b("dinosaurios-facil", "Dinosaurios facil", "Dinosaurios famosos y datos conocidos.", "dinosaurios facil"),
      b("vida-marina-facil", "Vida marina facil", "Oceanos y animales del mar.", "vida marina facil"),
      b("ronda-facil-naturaleza", "Ronda facil de naturaleza", "Una vuelta sencilla por animales y planeta.", "ronda facil de naturaleza")
    ]),
    ...balancedPacks("medio", "natureMedium", [
      b("naturaleza-intermedia", "Naturaleza intermedia", "Animales, fosiles y oceanos con mas nivel.", "naturaleza intermedia"),
      b("animales-raros-medio", "Animales raros medio", "Especies menos obvias pero reconocibles.", "animales raros medio"),
      b("biologia-animal-medio", "Biologia animal medio", "Clasificacion y funciones de animales.", "biologia animal medio"),
      b("oceanos-medio", "Oceanos medio", "Fosas, corrientes y vida marina.", "oceanos medio"),
      b("dinosaurios-medio", "Dinosaurios medio", "Periodos, especies y fosiles.", "dinosaurios medio"),
      b("ecosistemas-medio", "Ecosistemas medio", "Relaciones naturales y habitats.", "ecosistemas medio"),
      b("geologia-natural-medio", "Geologia natural medio", "Placas, eras y relieve.", "geologia natural medio"),
      b("plantas-medio", "Plantas medio", "Pigmentos, procesos y adaptaciones.", "plantas medio"),
      b("fauna-mundial-medio", "Fauna mundial medio", "Animales del mundo con algo de detalle.", "fauna mundial medio"),
      b("ronda-media-naturaleza", "Ronda media de naturaleza", "Para quien mira documentales con ganas.", "ronda media de naturaleza")
    ])
  ],
  comida: [
    ...balancedPacks("facil", "foodEasy", [
      b("comida-muy-facil", "Comida muy facil", "Ingredientes y platos de todos los dias.", "comida muy facil"),
      b("platos-famosos-facil", "Platos famosos facil", "Comidas populares de aqui y de fuera.", "platos famosos facil"),
      b("ingredientes-basicos", "Ingredientes basicos", "Alimentos comunes y usos sencillos.", "ingredientes basicos"),
      b("postres-faciles", "Postres faciles", "Dulces y postres muy conocidos.", "postres faciles"),
      b("cocina-casera-facil", "Cocina casera facil", "Preguntas de cocina diaria.", "cocina casera facil"),
      b("bebidas-facil", "Bebidas facil", "Bebidas comunes y como se preparan.", "bebidas facil"),
      b("comida-del-mundo-facil", "Comida del mundo facil", "Platos internacionales famosos.", "comida del mundo facil"),
      b("utensilios-y-sabores-facil", "Utensilios y sabores facil", "Cocina basica para cualquiera.", "utensilios y sabores facil"),
      b("frutas-y-verduras-facil", "Frutas y verduras facil", "Productos faciles de reconocer.", "frutas y verduras facil"),
      b("ronda-facil-comida", "Ronda facil de comida", "Una vuelta sencilla por la cocina.", "ronda facil de comida")
    ]),
    ...balancedPacks("medio", "foodMedium", [
      b("comida-intermedia", "Comida intermedia", "Platos, tecnicas e ingredientes con mas nivel.", "comida intermedia"),
      b("gastronomia-mundial-medio", "Gastronomia mundial medio", "Origenes y platos de varios paises.", "gastronomia mundial medio"),
      b("ingredientes-medio", "Ingredientes medio", "Especias, algas y bases de cocina.", "ingredientes medio"),
      b("postres-medio", "Postres medio", "Dulces internacionales con nombre propio.", "postres medio"),
      b("tecnicas-cocina-medio", "Tecnicas de cocina medio", "Metodos y terminos culinarios.", "tecnicas de cocina medio"),
      b("salsas-y-especias-medio", "Salsas y especias medio", "Sabores, salsas madre y condimentos.", "salsas y especias medio"),
      b("cocina-internacional-medio", "Cocina internacional medio", "Platos del mundo con algo de detalle.", "cocina internacional medio"),
      b("sabores-medio", "Sabores medio", "Umami, fermentados y bases gastronomicas.", "sabores medio"),
      b("origenes-de-platos-medio", "Origenes de platos medio", "Paises y recetas reconocibles.", "origenes de platos medio"),
      b("ronda-media-comida", "Ronda media de comida", "Para quien disfruta comer y saber.", "ronda media de comida")
    ])
  ],
  idiomas: [
    ...balancedPacks("facil", "languageEasy", [
      b("idiomas-muy-facil", "Idiomas muy facil", "Palabras y lenguas muy conocidas.", "idiomas muy facil"),
      b("palabras-basicas", "Palabras basicas", "Traducciones simples y vocabulario comun.", "palabras basicas"),
      b("ingles-facil", "Ingles facil", "Traducciones basicas de uso diario.", "ingles facil"),
      b("lenguas-del-mundo-facil", "Lenguas del mundo facil", "Idiomas asociados a paises conocidos.", "lenguas del mundo facil"),
      b("ortografia-facil", "Ortografia facil", "Signos y letras de nivel entrada.", "ortografia facil"),
      b("gramatica-facil", "Gramatica facil", "Sustantivos, verbos y conceptos simples.", "gramatica facil"),
      b("traducciones-faciles", "Traducciones faciles", "Palabras comunes en ingles y espanol.", "traducciones faciles"),
      b("letras-y-signos-facil", "Letras y signos facil", "Alfabeto, signos y escritura basica.", "letras y signos facil"),
      b("espanol-basico", "Espanol basico", "Preguntas sencillas sobre el idioma.", "espanol basico"),
      b("ronda-facil-idiomas", "Ronda facil de idiomas", "Una vuelta amable por palabras y lenguas.", "ronda facil de idiomas")
    ]),
    ...balancedPacks("medio", "languageMedium", [
      b("idiomas-intermedio", "Idiomas intermedio", "Familias, tildes y traducciones con mas nivel.", "idiomas intermedio"),
      b("ortografia-medio", "Ortografia medio", "Tildes, signos y conceptos de escritura.", "ortografia medio"),
      b("familias-linguisticas-medio", "Familias linguisticas medio", "Grupos de lenguas y origenes.", "familias linguisticas medio"),
      b("traducciones-medio", "Traducciones medio", "Falsos amigos y usos habituales.", "traducciones medio"),
      b("etimologia-medio", "Etimologia medio", "Origenes de palabras conocidas.", "etimologia medio"),
      b("gramatica-medio", "Gramatica medio", "Silabas, recursos y conceptos basicos.", "gramatica medio"),
      b("figuras-del-lenguaje-medio", "Figuras del lenguaje medio", "Recursos expresivos reconocibles.", "figuras del lenguaje medio"),
      b("lenguas-del-mundo-medio", "Lenguas del mundo medio", "Escrituras y familias de idiomas.", "lenguas del mundo medio"),
      b("falsos-amigos-medio", "Falsos amigos medio", "Traducciones que suelen enganar.", "falsos amigos medio"),
      b("ronda-media-idiomas", "Ronda media de idiomas", "Para quien se fija en palabras.", "ronda media de idiomas")
    ])
  ]
} satisfies Record<string, AdvancedQuizDraft[]>;

export const advancedQuizDraftsBySection = {
  "cultura-general": [
    ...balancedQuizDraftsBySection["cultura-general"],
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
    ...balancedQuizDraftsBySection.geografia,
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
    ...balancedQuizDraftsBySection.historia,
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
    ...balancedQuizDraftsBySection.ciencia,
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
    ...balancedQuizDraftsBySection.deportes,
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
    ...balancedQuizDraftsBySection["cine-series"],
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
    ...balancedQuizDraftsBySection.musica,
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
    ...balancedQuizDraftsBySection.tecnologia,
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
    ...balancedQuizDraftsBySection.gaming,
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
    ...balancedQuizDraftsBySection["naturaleza-animales"],
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
    ...balancedQuizDraftsBySection.comida,
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
    ...balancedQuizDraftsBySection.idiomas,
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
