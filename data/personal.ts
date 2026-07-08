export type PersonalQuestionSpec = {
  prompt: string;
  options: [string, string, string, string];
};

export const personalQuestionBanks: Record<string, PersonalQuestionSpec[]> = {
  "verdadero-pais": [
    {
      prompt: "Un dia perfecto fuera de casa empieza con...",
      options: ["Calle, sol y plan sin mapa", "Cafe largo y paseo bonito", "Ruta clara y sitios bien elegidos", "Mercado local y algo improvisado"]
    },
    {
      prompt: "Cuando piensas en comida, te tira mas...",
      options: ["Sabores intensos para compartir", "Mesa lenta con platos cuidados", "Algo simple, limpio y bien hecho", "Tapas, charla y probar de todo"]
    },
    {
      prompt: "Tu clima ideal para vivir seria...",
      options: ["Calor, luz y noches largas", "Templado, agradable y con estaciones suaves", "Fresco, ordenado y sin extremos", "Sol suficiente, pero con tardes tranquilas"]
    },
    {
      prompt: "En una ciudad nueva, lo primero que buscas es...",
      options: ["La zona con mas movimiento", "Calles bonitas y sitios con historia", "Transporte facil y rincones silenciosos", "Un barrio con vida local"]
    },
    {
      prompt: "Tu horario natural se parece mas a...",
      options: ["Tarde larga y noche con energia", "Manana sin prisa y sobremesa eterna", "Rutina puntual y descanso protegido", "Dias flexibles con algun ritual fijo"]
    },
    {
      prompt: "Socializando, funcionas mejor cuando...",
      options: ["Hay musica, risas y gente mezclada", "La conversacion tiene gracia y detalle", "El grupo es pequeno y respetuoso", "Hay confianza para hablar de todo"]
    },
    {
      prompt: "Para desconectar de verdad eliges...",
      options: ["Playa, calle o fiesta pequena", "Comida rica y paseo al atardecer", "Naturaleza tranquila o un sitio ordenado", "Escapada con encanto y cero prisa"]
    },
    {
      prompt: "Tu casa ideal tendria...",
      options: ["Balcon abierto y colores vivos", "Cocina bonita y mesa grande", "Espacios limpios y luz controlada", "Detalles artesanos y plantas"]
    },
    {
      prompt: "Si vas de viaje con amigos, tu papel suele ser...",
      options: ["Encender el plan cuando baja", "Elegir sitios con gusto", "Organizar rutas para que todo fluya", "Encontrar planes pequenos que sorprenden"]
    },
    {
      prompt: "La palabra que mas te representa viviendo seria...",
      options: ["Ritmo", "Sabor", "Armonia", "Encanto"]
    },
    {
      prompt: "Un domingo ideal tiene...",
      options: ["Gente, calle y algo espontaneo", "Comida larga y charla sin reloj", "Silencio, orden y descanso real", "Paseo lento y plan sencillo"]
    },
    {
      prompt: "Ante una invitacion de ultima hora...",
      options: ["Digo que si y luego veo", "Pregunto donde y con quien", "Necesito saber si encaja", "Voy si el plan tiene buena pinta"]
    },
    {
      prompt: "Te conquista mas un lugar cuando tiene...",
      options: ["Vida en la calle", "Belleza y caracter", "Calma y precision", "Mezcla de historia y cercania"]
    },
    {
      prompt: "Tu forma de celebrar algo bueno seria...",
      options: ["Salir y hacerlo visible", "Cena especial con gente querida", "Momento pequeno pero perfecto", "Brindis tranquilo y buena conversacion"]
    },
    {
      prompt: "Si tuvieras que mudarte manana, priorizarias...",
      options: ["Ambiente y libertad", "Cultura, comida y belleza", "Seguridad, orden y espacio", "Calidad de vida y buena luz"]
    }
  ],
  "estacion-eres": [
    {
      prompt: "Tu energia por la manana suele ser...",
      options: ["Alta si hay plan", "Curiosa y con ganas de empezar", "Lenta pero estable", "Depende mucho del ambiente"]
    },
    {
      prompt: "El clima que mejor te cambia el humor es...",
      options: ["Sol directo y calor", "Aire suave despues de lluvia", "Frio ligero y cielo dorado", "Tarde templada con luz bonita"]
    },
    {
      prompt: "Cuando algo nuevo llega a tu vida...",
      options: ["Te lanzas rapido", "Lo pruebas con ilusion", "Lo observas antes de abrirte", "Le haces hueco poco a poco"]
    },
    {
      prompt: "Tu plan favorito tiene mas pinta de...",
      options: ["Noche larga y risas", "Paseo, cafe y algo nuevo", "Casa, manta y conversacion", "Escapada corta con gente cercana"]
    },
    {
      prompt: "Cuando estas triste, necesitas...",
      options: ["Moverte para que pase", "Cambiar de aire", "Bajar el ritmo y ordenar dentro", "Un gesto pequeno de alguien"]
    },
    {
      prompt: "La ropa que mas te apetece llevar transmite...",
      options: ["Color y confianza", "Frescura y comodidad", "Tonos suaves y textura", "Algo natural con detalle"]
    },
    {
      prompt: "Tu relacion con los cambios es...",
      options: ["Me activan", "Me inspiran si no son bruscos", "Los proceso despacio", "Los acepto cuando tienen sentido"]
    },
    {
      prompt: "En un grupo, sueles aportar...",
      options: ["Energia y plan", "Ideas nuevas", "Calma y profundidad", "Equilibrio entre todos"]
    },
    {
      prompt: "Una tarde libre pide...",
      options: ["Salir sin pensarlo mucho", "Probar un sitio distinto", "Quedarte donde estas a gusto", "Hacer algo bonito sin correr"]
    },
    {
      prompt: "Cuando acabas una etapa, normalmente...",
      options: ["Buscas otra aventura", "Te ilusionas con lo que viene", "Te tomas tiempo para cerrar", "Guardas lo bueno y sigues"]
    },
    {
      prompt: "Tu manera de querer se parece mas a...",
      options: ["Presencia intensa", "Detalles que crecen", "Lealtad tranquila", "Cuidado constante"]
    },
    {
      prompt: "El sonido que mas encaja contigo seria...",
      options: ["Musica alta al aire libre", "Pajaros y ciudad despertando", "Lluvia suave en la ventana", "Pasos sobre hojas secas"]
    },
    {
      prompt: "Cuando tienes muchas cosas pendientes...",
      options: ["Atacas lo primero con energia", "Haces una lista ligera", "Necesitas silencio para ordenar", "Priorizas sin castigarte"]
    },
    {
      prompt: "Tu recuerdo favorito suele tener...",
      options: ["Risas y calor", "Comienzos y sorpresa", "Intimidad y calma", "Luz bonita y nostalgia buena"]
    },
    {
      prompt: "Si tu energia fuera una hora del dia seria...",
      options: ["Medianoche viva", "Manana luminosa", "Atardecer profundo", "Tarde dorada"]
    }
  ],
  "color-energia": [
    {
      prompt: "Cuando entras en una habitacion, tu energia suele...",
      options: ["Notarse rapido", "Hacer el ambiente mas facil", "Quedarse tranquila hasta confiar", "Adaptarse al tono"]
    },
    {
      prompt: "Tu emocion mas visible suele ser...",
      options: ["Entusiasmo", "Buen rollo", "Intensidad silenciosa", "Curiosidad amable"]
    },
    {
      prompt: "Cuando algo te enfada...",
      options: ["Saltas antes de enfriarte", "Intentas hablarlo sin romper", "Te apartas para no explotar", "Buscas explicarlo con calma"]
    },
    {
      prompt: "La creatividad te aparece mas cuando...",
      options: ["Hay urgencia o chispa", "El ambiente es ligero", "Estas a solas y enfocado", "Puedes probar sin juicio"]
    },
    {
      prompt: "Tu forma de expresarte es...",
      options: ["Directa y con fuerza", "Cercana y natural", "Medida pero profunda", "Flexible segun quien escucha"]
    },
    {
      prompt: "Si tu energia fuera una luz seria...",
      options: ["Neon caliente", "Luz de manana", "Azul de noche", "Luz suave de cafeteria"]
    },
    {
      prompt: "Cuando alguien necesita apoyo, das...",
      options: ["Empuje para reaccionar", "Calma y compania", "Escucha seria y espacio", "Palabras simples y utiles"]
    },
    {
      prompt: "Te desgasta sobre todo...",
      options: ["La monotonia", "El mal ambiente", "El ruido emocional", "La gente demasiado intensa"]
    },
    {
      prompt: "Tu estado ideal para crear algo es...",
      options: ["Modo impulso", "Modo fresco", "Modo concentrado", "Modo libre"]
    },
    {
      prompt: "En una discusion, tu color saldria como...",
      options: ["Rojo vivo", "Verde que baja tension", "Azul profundo", "Tono mixto"]
    },
    {
      prompt: "La gente suele recordarte por...",
      options: ["Tu fuerza", "Tu facilidad", "Tu misterio", "Tu equilibrio"]
    },
    {
      prompt: "Para recuperar energia prefieres...",
      options: ["Mover el cuerpo", "Respirar aire y ordenar poco", "Cerrar puerta y silencio", "Plan pequeno sin presion"]
    },
    {
      prompt: "Tu humor cambia mas por...",
      options: ["La accion del momento", "La energia de la gente", "Lo que llevas guardado", "El contexto general"]
    },
    {
      prompt: "Tu mensaje ideal a alguien seria...",
      options: ["Vamos, ahora", "Estoy aqui", "Lo entiendo", "Lo vemos juntos"]
    },
    {
      prompt: "Si fueras una paleta, tendrias...",
      options: ["Contraste fuerte", "Tonos frescos", "Sombras elegantes", "Base suave con acento"]
    }
  ],
  "animal-personalidad": [
    {
      prompt: "Tu instinto ante algo desconocido es...",
      options: ["Acercarte con curiosidad", "Observar y calcular", "Mantener distancia hasta confiar", "Rodearlo antes de decidir"]
    },
    {
      prompt: "En un grupo, tu liderazgo aparece cuando...",
      options: ["Hace falta movimiento", "Hay que leer el ambiente", "Alguien necesita proteccion", "Puedes aportar estrategia"]
    },
    {
      prompt: "Tu independencia se nota en que...",
      options: ["Cambias de plan sin miedo", "Te adaptas sin pedir permiso", "Cuidas mucho tu territorio", "Eliges tus companias"]
    },
    {
      prompt: "Cuando alguien cruza un limite...",
      options: ["Reaccionas rapido", "Le haces ver la jugada", "Te pones firme", "Te apartas con inteligencia"]
    },
    {
      prompt: "Tu energia fisica suele ser...",
      options: ["Rapida y nerviosa", "Agil y precisa", "Constante y resistente", "Variable pero atenta"]
    },
    {
      prompt: "Si algo te interesa, lo persigues...",
      options: ["Al momento", "Con tactica", "Con paciencia", "Probando caminos"]
    },
    {
      prompt: "Tu forma de cuidar a los tuyos es...",
      options: ["Animarles y sacarles fuera", "Detectar que necesitan", "Proteger sin hacer ruido", "Dar soluciones discretas"]
    },
    {
      prompt: "Cuando el ambiente esta tenso...",
      options: ["Lo rompes con energia", "Lees quien mueve cada pieza", "Te colocas cerca de los tuyos", "Esperas el hueco correcto"]
    },
    {
      prompt: "Tu mayor fortaleza instintiva es...",
      options: ["Curiosidad", "Astucia", "Lealtad", "Adaptacion"]
    },
    {
      prompt: "Tu espacio personal es...",
      options: ["Flexible si hay buena vibra", "Negociable con gente lista", "Sagrado", "Abierto pero con filtro"]
    },
    {
      prompt: "Cuando compites, sueles...",
      options: ["Ir rapido a por ello", "Esperar el error del otro", "Aguantar hasta el final", "Cambiar de ritmo"]
    },
    {
      prompt: "Tu manera de aprender es...",
      options: ["Probando", "Observando detalles", "Repitiendo con disciplina", "Explorando opciones"]
    },
    {
      prompt: "Si te sientes atrapado, necesitas...",
      options: ["Salir ya", "Encontrar una salida inteligente", "Volver a tu zona segura", "Moverte sin llamar la atencion"]
    },
    {
      prompt: "La gente te nota mas...",
      options: ["Vivo y cambiante", "Listo y atento", "Firme y protector", "Sutil y dificil de pillar"]
    },
    {
      prompt: "Tu reaccion ante un riesgo pequeno es...",
      options: ["Probar", "Calcular", "Proteger lo importante", "Mirar primero y actuar despues"]
    }
  ],
  "ciudad-encaja": [
    {
      prompt: "Tu barrio perfecto tendria...",
      options: ["Movimiento, arte y gente", "Calles con luz y cafes", "Orden, tecnologia y silencio", "Vida local sin agobio"]
    },
    {
      prompt: "Para moverte por la ciudad prefieres...",
      options: ["Caminar y descubrir", "Tranvia, paseo y calma", "Metro puntual y eficiente", "Ir sin prisa por zonas bonitas"]
    },
    {
      prompt: "Un viernes urbano ideal seria...",
      options: ["Concierto pequeno o terraza", "Cena lenta y paseo", "Plan nocturno muy concreto", "Cine, charla y vuelta tranquila"]
    },
    {
      prompt: "Lo que mas miras en una calle es...",
      options: ["Murales, tiendas y energia", "Balcones, luz y detalles", "Senales, orden y ritmo", "Rincones con encanto"]
    },
    {
      prompt: "Tu ciudad tiene que darte...",
      options: ["Estimulos", "Belleza suave", "Posibilidades bien conectadas", "Calidad de vida"]
    },
    {
      prompt: "Cuando hay demasiada gente...",
      options: ["Te mezclas si hay ambiente", "Buscas una mesa tranquila", "Cambias de ruta", "Te quedas si el plan merece"]
    },
    {
      prompt: "Tu plan cultural favorito seria...",
      options: ["Festival, expo o calle viva", "Museo pequeno y cafe", "Barrio futurista o tienda rara", "Concierto sentado o libreria"]
    },
    {
      prompt: "En casa necesitas mirar por la ventana y ver...",
      options: ["Movimiento", "Luz bonita", "Lineas limpias", "Arboles o tejados"]
    },
    {
      prompt: "Una ciudad te cansa cuando...",
      options: ["No pasa nada", "Pierde encanto", "Todo es caotico", "No deja respirar"]
    },
    {
      prompt: "Tu ritmo caminando es...",
      options: ["Rapido y curioso", "Lento si hay algo bonito", "Directo al destino", "Depende de la compania"]
    },
    {
      prompt: "El sitio donde mas quedarias seria...",
      options: ["Plaza con ambiente", "Mirador o cafe", "Zona moderna y precisa", "Mercado pequeno"]
    },
    {
      prompt: "De noche prefieres una ciudad...",
      options: ["Encendida", "Calida", "Ordenada y luminosa", "Tranquila con algun plan"]
    },
    {
      prompt: "Si trabajas fuera de casa, eliges...",
      options: ["Lugar con ruido vivo", "Cafe bonito", "Espacio minimalista", "Biblioteca agradable"]
    },
    {
      prompt: "Tu souvenir ideal seria...",
      options: ["Foto espontanea", "Objeto con historia", "Pieza pequena y perfecta", "Postal escrita a mano"]
    },
    {
      prompt: "Una ciudad encaja contigo si...",
      options: ["Te despierta", "Te abraza", "Te ordena", "Te deja ser"]
    }
  ],
  "elemento-eres": [
    {
      prompt: "Cuando algo te importa, reaccionas con...",
      options: ["Impulso", "Ideas", "Emocion profunda", "Movimiento con pausa"]
    },
    {
      prompt: "Tu energia en conflicto es...",
      options: ["Frontal", "Mental", "Sensible", "Cambiante"]
    },
    {
      prompt: "Para sentirte libre necesitas...",
      options: ["Accion", "Espacio", "Conectar de verdad", "Opciones abiertas"]
    },
    {
      prompt: "Tu forma de motivar a alguien es...",
      options: ["Empujarle a atreverse", "Darle perspectiva", "Hacerle sentir entendido", "Abrirle caminos"]
    },
    {
      prompt: "Lo que mas te bloquea es...",
      options: ["La pasividad", "La rigidez", "La frialdad", "La presion sin sentido"]
    },
    {
      prompt: "Tu mejor decision suele salir de...",
      options: ["Coraje", "Claridad mental", "Intuicion emocional", "Mezcla de aire y calma"]
    },
    {
      prompt: "En un proyecto nuevo eres quien...",
      options: ["Arranca", "Imagina", "Cuida el tono", "Conecta piezas"]
    },
    {
      prompt: "Tu manera de descansar es...",
      options: ["Quemar energia", "Cambiar de ambiente", "Sumergirte en calma", "Soltar obligaciones"]
    },
    {
      prompt: "Cuando alguien te conoce bien, sabe que...",
      options: ["Tienes mucha fuerza", "Necesitas margen", "Sientes mas de lo que dices", "Cambias con el contexto"]
    },
    {
      prompt: "Tu mayor riesgo es...",
      options: ["Ir demasiado rapido", "Dispersarte", "Absorber demasiado", "No elegir a tiempo"]
    },
    {
      prompt: "Tu frase interna seria...",
      options: ["Vamos", "Hay otra forma", "Lo siento claro", "Dejame respirar"]
    },
    {
      prompt: "La energia de los demas te afecta...",
      options: ["Como gasolina", "Como ruido mental", "Como marea", "Segun el dia"]
    },
    {
      prompt: "Cuando ganas confianza...",
      options: ["Brillas fuerte", "Hablas mas", "Te abres despacio", "Fluyes mejor"]
    },
    {
      prompt: "Si tuvieras un paisaje seria...",
      options: ["Hoguera al aire libre", "Cima con viento", "Lago oscuro", "Cielo despejado junto al mar"]
    },
    {
      prompt: "Tu poder silencioso es...",
      options: ["Activar", "Mover ideas", "Sostener", "Adaptar"]
    }
  ],
  "vibe-transmites": [
    {
      prompt: "La primera impresion que sueles dejar es...",
      options: ["Energia viva", "Cercania agradable", "Misterio tranquilo", "Naturalidad rara"]
    },
    {
      prompt: "Cuando hablas con alguien nuevo...",
      options: ["Entras rapido", "Escuchas y respondes facil", "Mides bastante", "Te adaptas al tono"]
    },
    {
      prompt: "Tu humor en redes parece...",
      options: ["Espontaneo", "Suave y cercano", "Reservado", "Mezcla de ironia y calma"]
    },
    {
      prompt: "La gente se acerca a ti para...",
      options: ["Animarse", "Sentirse comoda", "Contarte algo serio", "Pedir una lectura honesta"]
    },
    {
      prompt: "En fotos, tu energia suele salir...",
      options: ["Expresiva", "Dulce sin forzar", "Intensa", "Casual pero cuidada"]
    },
    {
      prompt: "Cuando estas callado, pareces...",
      options: ["A punto de decir algo", "Tranquilo", "Pensando mucho", "Observando sin prisa"]
    },
    {
      prompt: "Tu forma de saludar es...",
      options: ["Con energia", "Con sonrisa facil", "Con calma", "Segun la confianza"]
    },
    {
      prompt: "Si alguien te describe en una palabra diria...",
      options: ["Chispa", "Calidez", "Intriga", "Equilibrio"]
    },
    {
      prompt: "En una fiesta, tu vibe aparece cuando...",
      options: ["Sube la musica", "Encuentras tu grupo", "Te sientas a hablar de verdad", "El plan se vuelve mas pequeno"]
    },
    {
      prompt: "Tu mirada transmite mas...",
      options: ["Juego", "Amabilidad", "Fondo", "Atencion"]
    },
    {
      prompt: "Lo que menos encaja contigo es...",
      options: ["Quedarte invisible siempre", "Tension gratuita", "Exponerte de mas", "Fingir una energia que no tienes"]
    },
    {
      prompt: "Cuando alguien te cae bien...",
      options: ["Se nota rapido", "Le haces sitio", "Le das confianza poco a poco", "Lo cuidas sin hacerlo obvio"]
    },
    {
      prompt: "Tu presencia en un chat es...",
      options: ["Rapida y expresiva", "Atenta", "Selectiva", "Aparece cuando suma"]
    },
    {
      prompt: "Tu encanto funciona mejor cuando...",
      options: ["No te filtras tanto", "Estas relajado", "No intentas explicar todo", "Te dejan ir a tu ritmo"]
    },
    {
      prompt: "La sensacion que dejas al irte es...",
      options: ["Algo paso", "Que bien estar contigo", "Quiero saber mas", "Fue facil y bonito"]
    }
  ],
  "estetica-eres": [
    {
      prompt: "Tu outfit ideal para un dia normal tiene...",
      options: ["Una pieza que destaca", "Algo comodo con gracia", "Lineas limpias", "Detalle pequeno pero personal"]
    },
    {
      prompt: "Tu habitacion tenderia a verse...",
      options: ["Colorida y viva", "Natural y luminosa", "Ordenada y oscura", "Simple con objetos especiales"]
    },
    {
      prompt: "En una foto, eliges mas...",
      options: ["Flash, calle y movimiento", "Luz natural", "Sombras y composicion", "Plano espontaneo cuidado"]
    },
    {
      prompt: "Tu playlist visual seria...",
      options: ["Pop brillante", "Indie suave", "Electronica nocturna", "Mezcla rara pero bonita"]
    },
    {
      prompt: "Cuando compras algo, te gana...",
      options: ["El impacto", "La textura", "La forma limpia", "La historia que tiene"]
    },
    {
      prompt: "Tu color de fondo favorito seria...",
      options: ["Rosa, rojo o lima", "Verde suave o crema", "Negro, azul o gris", "Blanco roto con acento"]
    },
    {
      prompt: "Una app bonita para ti debe sentirse...",
      options: ["Viva", "Humana", "Pulida", "Clara con personalidad"]
    },
    {
      prompt: "Tu mesa perfecta tiene...",
      options: ["Pegatinas, cables y vida", "Cafe, libreta y plantas", "Pocos objetos bien puestos", "Un detalle que nadie mas tiene"]
    },
    {
      prompt: "Te inspira mas una ciudad...",
      options: ["Con graffitis y escaparates", "Con luz, mercados y musica", "Con neones y arquitectura", "Con calles pequenas y calma"]
    },
    {
      prompt: "Tu estetica falla cuando...",
      options: ["Todo es demasiado neutro", "Todo parece falso", "Hay demasiado ruido visual", "No hay nada personal"]
    },
    {
      prompt: "Para una foto de perfil eliges...",
      options: ["Algo con actitud", "Algo natural", "Algo sobrio", "Algo casual con detalle"]
    },
    {
      prompt: "Tu objeto favorito podria ser...",
      options: ["Gafas llamativas", "Bolsa de tela bonita", "Reloj minimal", "Camara vieja"]
    },
    {
      prompt: "Tu energia visual en redes es...",
      options: ["Color y movimiento", "Calma y luz", "Control y contraste", "Pocas cosas, bien elegidas"]
    },
    {
      prompt: "Un sitio donde te verias bien seria...",
      options: ["Azotea con musica", "Cafe con plantas", "Museo moderno", "Libreria pequena"]
    },
    {
      prompt: "La regla estetica que mas sigues es...",
      options: ["Que se note", "Que se sienta real", "Que respire", "Que tenga un punto mio"]
    }
  ],
  "tipo-alma": [
    {
      prompt: "Cuando nadie te ve, tu energia se vuelve...",
      options: ["Inquieta", "Conectada", "Serena", "Pensativa y abierta"]
    },
    {
      prompt: "Lo que mas te mueve por dentro es...",
      options: ["Vivir cosas", "Unir personas o ideas", "Cuidar lo esencial", "Entender lo que pasa"]
    },
    {
      prompt: "Tu forma de aparecer en la vida de alguien es...",
      options: ["Como una chispa", "Como un puente", "Como un lugar seguro", "Como una pregunta buena"]
    },
    {
      prompt: "Cuando algo termina, tu alma...",
      options: ["Busca otro horizonte", "Intenta darle sentido", "Guarda silencio un tiempo", "Se queda con lo aprendido"]
    },
    {
      prompt: "Te duele mas...",
      options: ["Sentirte frenado", "No poder arreglar una distancia", "Que no respeten tu calma", "Que todo sea superficial"]
    },
    {
      prompt: "Tu manera de querer es...",
      options: ["Intensa y presente", "Conectando mundos", "Constante y protectora", "Cuidada pero libre"]
    },
    {
      prompt: "Si tu alma tuviera movimiento seria...",
      options: ["Una estrella fugaz", "Un puente sobre agua", "Una luz en la costa", "Un camino entre arboles"]
    },
    {
      prompt: "En una crisis, sueles...",
      options: ["Activarte", "Juntar a la gente", "Mantenerte firme", "Leer lo que nadie dice"]
    },
    {
      prompt: "Tu esperanza aparece cuando...",
      options: ["Hay una posibilidad nueva", "Alguien vuelve a acercarse", "Recuperas tu paz", "Todo encaja un poco mas"]
    },
    {
      prompt: "Te define mas...",
      options: ["La intensidad", "La union", "La guia tranquila", "La sensibilidad con cabeza"]
    },
    {
      prompt: "Tu mayor regalo para otros es...",
      options: ["Encenderles", "Acercarles", "Sostenerles", "Entenderles"]
    },
    {
      prompt: "Cuando necesitas volver a ti...",
      options: ["Sales a buscar aire", "Hablas con alguien clave", "Te quedas en silencio", "Escribes o piensas"]
    },
    {
      prompt: "Tu sombra personal seria...",
      options: ["Quemarte demasiado rapido", "Cargar con puentes ajenos", "Cerrar la puerta mucho", "Analizar hasta cansarte"]
    },
    {
      prompt: "La frase que mas te calma es...",
      options: ["Todavia queda camino", "No estas solo", "Estas a salvo", "Tiene sentido"]
    },
    {
      prompt: "Si alguien te recuerda bien, recuerda...",
      options: ["Tu brillo", "Tu forma de conectar", "Tu calma", "Tu profundidad"]
    }
  ],
  "cancion-energia": [
    {
      prompt: "Tu entrada a una habitacion suena a...",
      options: ["Estribillo pegadizo", "Guitarra suave", "Sintetizador nocturno", "Base tranquila con detalle"]
    },
    {
      prompt: "Cuando estas feliz, tu ritmo es...",
      options: ["Bailable", "Ligero", "Intenso por dentro", "Medio tiempo"]
    },
    {
      prompt: "Tu letra ideal hablaria de...",
      options: ["Salir, vivir y no pensarlo tanto", "Encontrarte en cosas pequenas", "Sentir algo que no dices", "Cambiar sin perderte"]
    },
    {
      prompt: "En una playlist de amigos, tu cancion seria...",
      options: ["La que todos cantan", "La que alguien guarda", "La que aparece de noche", "La que une el viaje"]
    },
    {
      prompt: "Tu energia despues de medianoche es...",
      options: ["Mas alta", "Mas creativa", "Mas profunda", "Mas honesta"]
    },
    {
      prompt: "Si tuvieras un videoclip seria...",
      options: ["Verano, coche y luces", "Habitacion con sol y planos bonitos", "Ciudad de noche y lluvia", "Viaje en tren con recuerdos"]
    },
    {
      prompt: "Lo que mas te engancha de una cancion es...",
      options: ["El ritmo", "La melodia", "La atmosfera", "La letra"]
    },
    {
      prompt: "Cuando algo te supera, escuchas musica para...",
      options: ["Subirte el animo", "Sentirte acompanado", "Hundirte un poco y sacar algo", "Ordenar lo que sientes"]
    },
    {
      prompt: "Tu genero interior se acerca mas a...",
      options: ["Pop urbano", "Indie pop", "Alt nocturno", "Acustico moderno"]
    },
    {
      prompt: "Tu voz emocional seria...",
      options: ["Clara y directa", "Suave pero presente", "Baja e intensa", "Cercana y rota"]
    },
    {
      prompt: "Si alguien te dedicara una cancion, deberia tener...",
      options: ["Energia y sonrisa", "Detalle y ternura", "Profundidad y sombra", "Verdad sin exagerar"]
    },
    {
      prompt: "Tu momento musical favorito es...",
      options: ["Cuando entra el drop", "Cuando cambia el acorde", "Cuando se queda casi en silencio", "Cuando vuelve el estribillo"]
    },
    {
      prompt: "La frase que mejor te canta seria...",
      options: ["Vamos a por otra", "Me quedo un rato", "No lo digo, pero esta", "Estoy cambiando"]
    },
    {
      prompt: "Tu energia en directo seria...",
      options: ["Saltar delante", "Cantar con gente", "Mirar desde atras sintiendo todo", "Grabar un segundo y guardar el resto"]
    },
    {
      prompt: "Una cancion te representa si...",
      options: ["Te sube de golpe", "Te acompana", "Te atraviesa", "Te entiende sin explicarte"]
    }
  ]
};
