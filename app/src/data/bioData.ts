// ============================================
// DATOS BIOHORROR - HATERS 2099
// ============================================

import type { BioMod, Track, ForumMessage } from '@/types';

// ============================================
// COLORES DE REDES SOCIALES — fuente única de verdad
// ============================================
export const SOCIAL_COLORS = {
  instagram: '#E1306C',
  tiktok:    '#00f2ea',
  soundcloud:'#ff5500',
  facebook:  '#1877F2',
  youtube:   '#ff0000',
  bandlab:   '#ff00ff',
  linktree:  '#39ff14',
} as const;

// ============================================
// TEXTOS CORRUPTOS — biohorror mode
// ============================================
export const CORRUPTED_TEXTS = [
  'DISECCIÓN', 'HORROR', 'CARNE ABIERTA', 'HUESO EXPUESTO',
  'SANGRA', 'NO SIENTES', 'LA CARNE CEDE', 'CORTA',
  'TEJIDO MUERTO', 'PARÁSITO', 'SE PUDRE', 'ABRE',
  'NERVIO VIVO', 'BIOMASA', 'CONSUME', 'INFECTADO',
  'VISCERAL', 'DRENA', 'LATIDO FINAL', 'CARNE>METAL',
  'NULL::FLESH', 'ERR_BIOMASS', '▓▒░HORROR░▒▓', 'DISECCION.exe',
  'metal o carne?', 'METAL', 'CARNE', '???',
  '0x4D455441 4C', '01001101', '▓▒░▓▒░',
  'ERR_BIOMASS', 'NULL::FLESH', '##CARNE##',
  'CARNE>METAL', 'SYS::ERR',
] as const;

// ============================================
// BIOMODS - CATÁLOGO DE IMPLANTES
// ============================================
export const bioMods: BioMod[] = [
  {
    id: 'cortex-overclock',
    name: 'CÓRTEX OVERCLOCK',
    description: 'Placa de acero forjado trepanada directamente al hueso occipital. Haces de fibra óptica magenta y cian perforan la duramadre para acelerar el procesamiento neuronal por un factor de 5. Pensamiento cuántico. Instalación sin anestesia.',
    price: 8900,
    image: '/images/biomods/cortex.jpg',
    category: 'neural',
    stock: 3,
    sideEffects: ['Insomnio perpetuo', 'Alucinaciones matemáticas', 'Despersonalización', 'Fluido cefalorraquídeo con tinte cian'],
  },
  {
    id: 'heart-synth',
    name: 'CORAZÓN SINTÉTICO DUAL',
    description: 'El esternón ha sido reemplazado por un armazón de metal oxidado. Cables de cobre y fibra óptica se trenzan con las arterias principales, pulsando energía cian. Resistencia atlética extrema y regeneración acelerada. El latido es audible a 3 metros.',
    price: 9200,
    image: '/images/biomods/heart.jpg',
    category: 'physical',
    stock: 0,
    sideEffects: ['Latidos audibles a distancia', 'Sobrecalentamiento corporal', 'Bio-combustible azul en el flujo sanguíneo', 'Hambre constante de metales'],
  },
  {
    id: 'neural-link-vr',
    name: 'ENLACE NEURAL [LNK-VR.01]',
    description: 'Micro-filamento de alta densidad que emerge de una placa grabada directamente en el cuello. Se conecta mediante una estructura mecánica externa hacia los visores VR. Navegación a velocidad del pensamiento. La placa crece con el tiempo.',
    price: 5800,
    image: '/images/biomods/neural-jack.jpg',
    category: 'neural',
    stock: 0,
    sideEffects: ['Adicción a la red', 'Migrañas eléctricas', 'Memorias ajenas durante el sueño', 'Rigidez cervical permanente'],
  },
  {
    id: 'skate-implant',
    name: 'PATINETAS ÓSEAS BIOMECÁNICAS',
    description: 'Amputación funcional del talón para integrar ruedas de grafeno. Estructuras de soporte mecánico ancladas directamente a la tibia y el peroné expuestos. Velocidad máxima 87km/h. Carne necrótica sellada con grapas industriales en cada borde de corte.',
    price: 8300,
    image: '/images/biomods/tendons.jpg',
    category: 'physical',
    stock: 0,
    sideEffects: ['Activación involuntaria al correr', 'Dolor fantasma en los talones amputados', 'Imposible usar calzado convencional', 'Atracción magnética hacia concreto'],
  },
  {
    id: 'skin-camouflage',
    name: 'PIEL DE CAMUFLAJE ADAPTIVO',
    description: 'Reemplazo de la piel humana por una capa de escamas sintéticas adaptativas tipo serpiente. Se fusiona mediante grapas quirúrgicas y micro-conectores a los nervios táctiles. Invisibilidad óptica parcial. Los bordes de fusión nunca cicatrizan.',
    price: 6700,
    image: '/images/biomods/skin-camo.jpg',
    category: 'illegal',
    stock: 0,
    sideEffects: ['Pérdida permanente de sensibilidad táctil', 'Cambios de humor según el color', 'Muda estacional dolorosa', 'Bordes de fusión crónicamente necróticos'],
  },
  {
    id: 'parasite-synx',
    name: 'PARÁSITO SYN-X',
    description: 'Colonia bacteriana inyectada que forma un bulto necrótico y húmedo en el hombro. Se conecta a la placa del hombro mediante tubos transparentes que transportan adrenalina al sistema linfático. Es simbiótico. Probablemente.',
    price: 5500,
    image: '/images/biomods/bio-lung.jpg',
    category: 'illegal',
    stock: 3,
    sideEffects: ['El parásito tiene hambre propia', 'Respiración con sonido húmedo y audible', 'Expulsión ocasional de esporas por la nariz', 'Vínculo emocional irreversible con el organismo'],
  },
  {
    id: 'vacuum-lungs',
    name: 'PULMONES DE VACÍO',
    description: 'Dos cámaras de filtrado de aire pesado incrustadas entre las escápulas. El metal forjado sustituye parte de las costillas dorsales, permitiendo respirar en zonas de alta toxicidad o vacío parcial. Las válvulas de escape son visibles bajo la piel.',
    price: 7200,
    image: '/images/biomods/hawk-eye.jpg',
    category: 'physical',
    stock: 0,
    sideEffects: ['Tos con partículas metálicas filtradas', 'La espalda emite calor constante', 'Incapacidad de hundirse en agua', 'Zumbido de válvulas al exhalar'],
  },
  {
    id: 'neural-chip-collar',
    name: 'VR + ADAPTADOR DE CUELLO',
    description: 'Microchip de 128 núcleos implantado en la base del cráneo con adaptador vertebral de titanio. Procesa señales del entorno y las traduce en instinto puro. El adaptador de cuello permite conexión directa con otros portadores.',
    price: 200,
    image: '/images/biomods/neural-jack.jpg',
    category: 'neural',
    stock: 2,
    sideEffects: ['Rigidez cervical permanente', 'Sueños de otras personas', 'Incapacidad de mentir', 'Zumbido constante en frecuencia 440Hz', 'Atracción involuntaria hacia otros portadores'],
  },
  {
    id: 'bone-antenna',
    name: 'ANTENA ÓSEA SUBCRANEAL',
    description: 'Filamento de cobre biorecubierto que crece desde el hueso parietal hacia afuera del cuero cabelludo. Recibe señales de radio, wifi y transmisiones encriptadas de la resistencia. Invisible bajo el cabello.',
    price: 3800,
    image: '/images/biomods/skin-camo.jpg',
    category: 'illegal',
    stock: 0,
    sideEffects: ['Interferencia con microondas domésticos', 'Sensación de voces en zonas con alta señal', 'El cabello crece en espiral alrededor de la antena', 'Atracción de rayos en tormenta eléctrica'],
  },
];

// ============================================
// FRECUENCIA OXIDADA - TRACKLIST
// ============================================

export const tracks: Track[] = [
  {
    id: 'intro',
    title: 'INTRO',
    artist: 'H.A.T.E.R_S',
    duration: '1:44',
    description: 'El inicio. La señal que precede a la mutación.',
  },
  {
    id: 'necesidad',
    title: 'NECESIDAD',
    artist: 'H.A.T.E.R_S',
    duration: '3:41',
    description: 'Lo que el cuerpo exige cuando la carne ya no es suficiente.',
    url: '/sounds/tracks/Necesidad.m4a',
  },
  {
    id: 'nauseas',
    title: 'NÁUSEAS',
    artist: 'H.A.T.E.R_S',
    duration: '3:54',
    description: 'El rechazo orgánico ante lo que no puede ser revertido.',
    url: '/sounds/tracks/Nauseas.m4a',
  },
  {
    id: 'diseccion',
    title: 'DISECCIÓN',
    artist: 'H.A.T.E.R_S',
    duration: '4:05',
    description: 'Apertura. Análisis. Lo que hay adentro no tiene nombre.',
  },
  {
    id: 'terminar-bien',
    title: 'TERMINAR BIEN',
    artist: 'H.A.T.E.R_S',
    duration: '3:47',
    description: 'La promesa que nadie puede cumplir en Cusco 2099.',
  },
  {
    id: 'heraud',
    title: 'HERAUD',
    artist: 'H.A.T.E.R_S',
    duration: '5:12',
    description: 'Homenaje al poeta que murió antes de ver la nueva carne nacer.',
  },
  {
    id: 'cerezas',
    title: 'CEREZAS',
    artist: 'H.A.T.E.R_S',
    duration: '4:33',
    description: 'Dulce. Rojo. Lo último que recuerdas antes de la incorporación.',
  },
];

// ============================================
// MENSAJES DEL FORO - LA NUEVA CARNE
// ============================================

export const initialForumMessages: ForumMessage[] = [
  {
    id: 'msg-1',
    author: 'CIBERCHAMAN_99',
    content: 'Acabo de instalarme el Córtex Overclock. Los colores ahora tienen sabor. El número 7 sabe a menta.',
    timestamp: new Date(Date.now() - 3600000),
    isUser: false,
    mutationLevel: 3,
  },
  {
    id: 'msg-2',
    author: 'OXIDO_VIVO',
    content: 'ALGUIEN MÁS ESCUCHA EL ZUMBITO EN LOS DIENTES? ES NORMAL DESPUÉS DEL NEURAL JACK?',
    timestamp: new Date(Date.now() - 7200000),
    isUser: false,
    mutationLevel: 2,
  },
  {
    id: 'msg-3',
    author: 'CARNE_NUEVA',
    content: 'El sector de Cusco está evolucionando. La piedra de Sacsayhuamán está viva, lo juro. Tiene pulsos.',
    timestamp: new Date(Date.now() - 10800000),
    isUser: false,
    mutationLevel: 4,
  },
  {
    id: 'msg-4',
    author: 'DR_IMPLANTE',
    content: '⚠️ ADVERTENCIA: Los lotes de Bio-Filtro Pulmonar del mes pasado tienen un bug. Algunos usuarios están respirando en reversa.',
    timestamp: new Date(Date.now() - 14400000),
    isUser: false,
    mutationLevel: 1,
  },
  {
    id: 'msg-5',
    author: 'MUTANTE_ANON',
    content: '26 de junio. El día que la carne despierta. El día que el metal muere. ESTÉN LISTOS.',
    timestamp: new Date(Date.now() - 18000000),
    isUser: false,
    mutationLevel: 5,
  },
  {
    id: 'msg-6',
    author: 'NERVIO_7734',
    content: 'mi segundo corazón latió fuera de ritmo por 3 horas. el primero lo siguió. ahora laten en espejo. no sé si eso es bueno.',
    timestamp: new Date(Date.now() - 21600000),
    isUser: false,
    mutationLevel: 3,
  },
  {
    id: 'msg-7',
    author: 'PIEL_INVERTIDA',
    content: 'CORPORACIÓN BIOMODS ESTÁ MONITOREANDO ESTE CANAL. vi el log de paquetes. hay un nodo espía en el sector 4. CUIDADO.',
    timestamp: new Date(Date.now() - 25200000),
    isUser: false,
    mutationLevel: 4,
  },
  {
    id: 'msg-8',
    author: 'GLÁNDULA_X',
    content: 'probé las glándulas de veneno en modo feromonas. mi vecino me trajo comida sin que se lo pidiera. lleva 3 días haciéndolo. no sé cómo parar.',
    timestamp: new Date(Date.now() - 28800000),
    isUser: false,
    mutationLevel: 3,
  },
  {
    id: 'msg-9',
    author: 'SISTEMA_NODO',
    content: '> ALERTA: Se detectaron 14 nuevas mutaciones espontáneas en el sector Qorikancha. No son de origen BIOMODS. Origen desconocido.',
    timestamp: new Date(Date.now() - 32400000),
    isUser: false,
    mutationLevel: 0,
  },
  {
    id: 'msg-10',
    author: 'HUESO_VERDE',
    content: 'alguien más tiene sueños que no son suyos desde el Neural Jack? anoche soñé en un idioma que no existe. lo escribí al despertar. nadie lo reconoce.',
    timestamp: new Date(Date.now() - 36000000),
    isUser: false,
    mutationLevel: 4,
  },
  {
    id: 'msg-11',
    author: 'TENDÓN_ROTO',
    content: 'los cables de fibra de carbono no son silenciosos. cuando camino de noche escucho mis propios pasos antes de darlos.',
    timestamp: new Date(Date.now() - 39600000),
    isUser: false,
    mutationLevel: 2,
  },
  {
    id: 'msg-12',
    author: 'CÓRTEX_LIBRE',
    content: 'MANIFIESTO: La corporación llama "efectos secundarios" a lo que nosotros llamamos EVOLUCIÓN. No somos bugs. Somos la siguiente versión.',
    timestamp: new Date(Date.now() - 43200000),
    isUser: false,
    mutationLevel: 5,
  },
  {
    id: 'msg-13',
    author: 'ANON_8492',
    content: 'mi piel camuflaje se activó sola mientras dormía. mi pareja no me encontró por 4 horas. estaba en la cama.',
    timestamp: new Date(Date.now() - 46800000),
    isUser: false,
    mutationLevel: 3,
  },
  {
    id: 'msg-14',
    author: 'BIOMASA_ROJA',
    content: '¿alguien más siente que las piedras del Cusco antiguo responden al tacto? no es alucinación. es comunicación. la ciudad recuerda.',
    timestamp: new Date(Date.now() - 50400000),
    isUser: false,
    mutationLevel: 5,
  },
  {
    id: 'msg-15',
    author: 'SISTEMA_NODO',
    content: '> TRANSMISIÓN INTERCEPTADA: "...el sujeto 8492 ha superado el umbral de mutación permitido. proceder con protocolo de recuperación de biomasa..." FIN DE TRANSMISIÓN.',
    timestamp: new Date(Date.now() - 54000000),
    isUser: false,
    mutationLevel: 0,
  },
  {
    id: 'msg-16',
    author: 'PARPADOS_0101',
    content: 'Mis párpados no dejan de parpadear en binario desde que instalé el Visor RV. Mi mujer dice que estoy transmitiendo las coordenadas del sector 4 mientras duermo.',
    timestamp: new Date(Date.now() - 57600000),
    isUser: false,
    mutationLevel: 4,
  },
  {
    id: 'msg-17',
    author: 'CONCRETO_LOVER',
    content: 'las patinetas óseas son increíbles pero ahora no puedo despegarme de las veredas de granito. siento un tirón magnético cada vez que paso cerca del Qorikancha.',
    timestamp: new Date(Date.now() - 61200000),
    isUser: false,
    mutationLevel: 3,
  },
  {
    id: 'msg-18',
    author: 'RESPIRA_HUMEDO',
    content: '¿alguien más siente que el parásito Syn-X le habla? no con palabras, sino con hambre. mi pecho ronronea cuando paso cerca de la tienda de biomods.',
    timestamp: new Date(Date.now() - 64800000),
    isUser: false,
    mutationLevel: 5,
  },
  {
    id: 'msg-19',
    author: 'ANTENA_ALTA',
    content: 'instalé la antena ósea y anoche me cayó un rayo. no morí. ahora escucho la radio de la policía de Lima pero con eco de hace 20 años.',
    timestamp: new Date(Date.now() - 68400000),
    isUser: false,
    mutationLevel: 4,
  },
  {
    id: 'msg-20',
    author: 'BINARIO_MUERTO',
    content: 'ALERTA: El protocolo LA NUEVA CARNE ha detectado que BIOMODS CORP está inyectando lealtad subliminal en los parches de memoria. NO DESCARGUEN EL UPDATE V.2.0.99.',
    timestamp: new Date(Date.now() - 72000000),
    isUser: false,
    mutationLevel: 5,
  },
  {
    id: 'msg-21',
    author: 'SISTEMA_ERROR',
    content: '01001000 01000101 01001100 01010000 00100000 01001101 01000101 (LA CARNE ES DEBIL, LA PIEDRA ES ETERNA)',
    timestamp: new Date(Date.now() - 75600000),
    isUser: false,
    mutationLevel: 5,
  },
];

// ============================================
// LORE DE LA RESISTENCIA
// ============================================

export const resistanceLore = `[ARCHIVO RE-CLASIFICADO - CUSCO 26/06/2099]

ORIGEN: Frecuencia Oxidada (Cusco 26 de junio de 2026) 

ESTADO: Interceptado por el Ministerio de Armonía (N-arK-estado) BIOMODS inc.

En el año 2099, la democracia en el Perú es un mito fósil. El Gobierno Estatal de Negocio y Arkmonía es solo la fachada política del Cártel de la Biomasa: un verdadero narcoestado que no trafica sustancias, sino actualizaciones celulares obligatorias. BIOMODS controla el 97% de los cuerpos vivos. El otro 3% somos nosotros, sobreviviendo en las grietas de Cusco, o lo que queda... donde ésta resistencia aún interfiere con sus frecuencias de control.

La corrupción ya no se mide en dinero; se mide en privilegio genético. Mientras los ministros y ejecutivos compran extensiones de vida y mutaciones de lujo en sus provincias privadas… a la población se le impone la Actualización de Apatía Estructural. Nos quitan los sentimientos bajo la excusa de "erradicar la violencia y la delincuencia". Es la mentira perfecta: un pueblo que no siente rabia, no se rebela. Un pueblo que no siente dolor, trabaja hasta morir.

El control social se sostiene sobre el Bio-Terror Organizado. El Estado inyecta patógenos sintéticos en los suministros de agua de los barrios periféricas para luego vender la cura "financiada" a cambio de lealtad absoluta. Si protestas, te cortan el suministro de dopamina regulatoria. Si piensas diferente, tu propio cuerpo te apaga. El miedo a la desconexión es el arma más barata y letal del gobierno.

Por eso nacimos... H.A.T.E.R_S (Humanos Aislados por Tec. de “Evolución” Radical Social). Hemos fundado la NUEVA CARNE 2099. Somos la resistencia que prefiere el dolor crudo de estar vivos antes que la paz del diseño perfecto de sus laboratorios.

Aquí no compramos sus dosis de felicidad gubernamental. No nos implantamos sus chips de rastreo. No editamos nuestro ADN bajo sus estándares de producción masiva. Intercambiamos injertos biológicos en los mercados negros como "San_Pedro", cultivamos órganos rebeldes y abrazamos la mutación caótica.

El miedo es su negocio, pero la evolución es nuestra respuesta.

LA NUEVA CARNE NO PIDE PERMISO.

LA NUEVA CARNE SIENTE.

LA NUEVA CARNE SERÁ LIBRE!

[FIN DEL ARCHIVO - SEÑAL ENCRIPTADA]`;

// ============================================
// FECHA DEL FIN
// ============================================

export const JUDGEMENT_DATE = new Date('2026-06-26T16:00:00');

// ============================================
// SECUENCIA DE BOOT
// ============================================

export const bootSequence = [
  '> INICIANDO SECUENCIA DE ARRANQUE...',
  '> ESTABLECIENDO ENLACE TÁLAMO-CÓRTEX...',
  '> CALIBRANDO CONEXIÓN NEURAL...',
  '> ANALIZANDO ADN DEL OPERADOR...',
  '> DETECTANDO ANOMALÍAS EN CUSCO...',
  '> SINCRONIZANDO CON H.A.T.E.R_S...',
  '> CARGANDO PROTOCOLO LA NUEVA CARNE...',
  '> INFECCIÓN AL 100%',
  '> BIENVENIDO AL SISTEMA',
];
