import React from 'react';

export type Language = 'es' | 'en' | 'fr';

export interface WebProject {
  id: string;
  title: string;
  organization: string;
  description: string;
  role: string;
  url: string;
  imageUrl?: string;
}

export interface MusicEmbedItem {
  id: string;
  title: string;
  type: 'youtube' | 'spotify';
  embedSrc: string;
  directUrl: string;
  description: string;
}

export interface AcademicPublication {
  id: string;
  title: string;
  year: number;
  journal: string;
  institution: string;
  volumeInfo: string;
  issn?: string;
  keywords?: string[];
  url?: string;
  abstract?: React.ReactNode;
}

export interface ConferencePresentation {
  id: string;
  title: string;
  event: string;
  date: string;
}

export const MUSIC_DISCIPLINES_ES = [
  'música experimental.',
  'arte sonoro.',
  'música ambient.',
  'canciones.',
  'música techno.',
];

export const MUSIC_DISCIPLINES_EN = [
  'experimental music.',
  'sound art.',
  'ambient music.',
  'songs.',
  'techno music.',
];

export const MUSIC_DISCIPLINES_FR = [
  'de la musique expérimentale.',
  'de l’art sonore.',
  'de la musique ambient.',
  'des chansons.',
  'de la musique techno.',
];

export const WEB_PROJECTS_ES: WebProject[] = [
  {
    id: 'mapas-verdes',
    title: 'Mapas verdes',
    organization: 'Open Society Foundations — Fundar',
    description: 'Mapas narrativos que cuentan el estado del Sur Global frente a la transición verdes, sus desafíos y oportunidades.',
    role: 'Diseño de narrativa digital y articulación de contenidos.',
    url: 'https://mapasverdes.fund.ar/',
  },
  {
    id: 'argendata',
    title: 'Argendata',
    organization: 'Fundar',
    description: 'Una web de visualización narrativa de datos para entender la Argentina.',
    role: 'Edición de contenidos, newsletters y redes sociales.',
    url: 'https://argendata.fund.ar/',
  },
  {
    id: 'ciudad-transformacion',
    title: 'Una ciudad en transformación',
    organization: 'CESBA — Fundar',
    description: 'Una narrativa interactiva para Buenos Aires, su gente y sus datos.',
    role: 'Guion, conceptualización y visualización de datos.',
    url: 'https://scrolly.cesba.gob.ar/poblacion#bloque-03',
  },
  {
    id: 'adn-argentino',
    title: 'ADN Argentino - serie web',
    organization: 'Corta — Fundar',
    description: 'Una serie web conducida por María Migliore en la que, a través de entrevistas, se desentraña la forma en que los argentinos generamos comunidades.',
    role: 'Idea, investigación y guion documental.',
    url: 'https://www.youtube.com/playlist?list=PLYyOYUYeEGxk',
    imageUrl: '/PortadaADN-WEB-2048x1158.png',
  },
  {
    id: 'catamarca-datos',
    title: 'Catamarca: gobierno de datos',
    organization: 'Gobierno de Catamarca — Fundar',
    description: 'Una explicación narrativa del trabajo de datos realizado para el gobierno de la provincia.',
    role: 'Desarrollo narrativo y comunicación de políticas públicas de datos.',
    url: 'https://fund.ar/publicacion/catamarca-gobierno-de-datos-para-decisiones-informadas/',
  },
  {
    id: 'peso-dolar',
    title: 'Hacia una convivencia del peso y el dólar',
    organization: 'Fundar',
    description: 'Gamificación interactiva de una investigación económica sobre la convivencia de monedas en la Argentina.',
    role: 'Estrategia narrativa y gamificación de la investigación.',
    url: 'https://fund.ar/publicacion/hacia-una-convivencia-entre-el-peso-y-el-dolar-2/',
  },
  {
    id: 'clubes-inseguridad',
    title: 'Combatir la inseguridad con clubes',
    organization: 'River Plate — Ciudades Sin Miedo — Fundar',
    description: 'Una narrativa digital para la iniciativa de promover clubes de barrio sanos para niños y niñas, previniendo la inseguridad en Rosario.',
    role: 'Diseño narrativo y visual de la investigación.',
    url: 'https://fund.ar/publicacion/un-club-para-nuevo-alberdi-oeste-estrategias-de-integracion-sociourbana-para-prevenir-la-violencia-y-el-delito/',
  },
  {
    id: 'monitor-empresas',
    title: 'Monitor Mensual de Empresas',
    organization: 'Fundar',
    description: 'Un reporte mensual digital con visualización interactiva de datos y noticias corporativas.',
    role: 'Edición de contenidos, difusión web, redes sociales y newsletters.',
    url: 'https://fund.ar/publicacion/monitor-mensual-de-empresas/',
  },
];

export const WEB_PROJECTS_EN: WebProject[] = [
  {
    id: 'mapas-verdes',
    title: 'Mapas verdes',
    organization: 'Open Society Foundations — Fundar',
    description: 'Narrative maps illustrating the Global South’s status, challenges, and opportunities in the green transition.',
    role: 'Digital narrative design and content synthesis.',
    url: 'https://mapasverdes.fund.ar/',
  },
  {
    id: 'argendata',
    title: 'Argendata',
    organization: 'Fundar',
    description: 'A narrative data visualization web platform designed to understand Argentina.',
    role: 'Content editing, newsletters, and social media strategy.',
    url: 'https://argendata.fund.ar/',
  },
  {
    id: 'ciudad-transformacion',
    title: 'A City in Transformation',
    organization: 'CESBA — Fundar',
    description: 'An interactive narrative exploring Buenos Aires, its citizens, and its data.',
    role: 'Scriptwriting, conceptualization, and data visualization.',
    url: 'https://scrolly.cesba.gob.ar/poblacion#bloque-03',
  },
  {
    id: 'adn-argentino',
    title: 'ADN Argentino - Web Series',
    organization: 'Corta — Fundar',
    description: 'A web series hosted by María Migliore exploring how Argentines build community through interviews.',
    role: 'Concept, research, and documentary scriptwriting.',
    url: 'https://www.youtube.com/playlist?list=PLYyOYUYeEGxk',
    imageUrl: '/PortadaADN-WEB-2048x1158.png',
  },
  {
    id: 'catamarca-datos',
    title: 'Catamarca: Data-Driven Government',
    organization: 'Catamarca Government — Fundar',
    description: 'A narrative explanation of the data initiatives carried out for the provincial government.',
    role: 'Narrative development and public policy data communications.',
    url: 'https://fund.ar/publicacion/catamarca-gobierno-de-datos-para-decisiones-informadas/',
  },
  {
    id: 'peso-dolar',
    title: 'Towards Coexistence of Peso & Dollar',
    organization: 'Fundar',
    description: 'Interactive gamification of economic research on bi-currency coexistence in Argentina.',
    role: 'Narrative strategy and research gamification.',
    url: 'https://fund.ar/publicacion/hacia-una-convivencia-entre-el-peso-y-el-dolar-2/',
  },
  {
    id: 'clubes-inseguridad',
    title: 'Tackling Urban Safety with Community Clubs',
    organization: 'River Plate — Fearless Cities — Fundar',
    description: 'A digital narrative advocating community sports clubs for youth to counter urban violence in Rosario.',
    role: 'Narrative and visual design of the research.',
    url: 'https://fund.ar/publicacion/un-club-para-nuevo-alberdi-oeste-estrategias-de-integracion-sociourbana-para-prevenir-la-violencia-y-el-delito/',
  },
  {
    id: 'monitor-empresas',
    title: 'Monthly Corporate Monitor',
    organization: 'Fundar',
    description: 'A monthly digital report featuring interactive data visualizations and corporate news.',
    role: 'Content editing, web publishing, social media, and newsletters.',
    url: 'https://fund.ar/publicacion/monitor-mensual-de-empresas/',
  },
];

export const WEB_PROJECTS_FR: WebProject[] = [
  {
    id: 'mapas-verdes',
    title: 'Mapas verdes',
    organization: 'Open Society Foundations — Fundar',
    description: 'Cartographies narratives illustrant la situation du Sud global face à la transition écologique, ses défis et ses opportunités.',
    role: 'Conception de récits numériques et synthèse de contenus.',
    url: 'https://mapasverdes.fund.ar/',
  },
  {
    id: 'argendata',
    title: 'Argendata',
    organization: 'Fundar',
    description: 'Plateforme web de visualisation narrative de données pour comprendre l’Argentine.',
    role: 'Édition de contenus, newsletters et stratégie sur les réseaux sociaux.',
    url: 'https://argendata.fund.ar/',
  },
  {
    id: 'ciudad-transformacion',
    title: 'Une ville en transformation',
    organization: 'CESBA — Fundar',
    description: 'Un récit interactif explorant Buenos Aires, ses citoyens et ses données.',
    role: 'Scénario, conceptualisation et visualisation de données.',
    url: 'https://scrolly.cesba.gob.ar/poblacion#bloque-03',
  },
  {
    id: 'adn-argentino',
    title: 'ADN Argentino - Série web',
    organization: 'Corta — Fundar',
    description: 'Une série web animée par María Migliore qui explore, à travers des entretiens, la manière dont les Argentins font communauté.',
    role: 'Idée originale, recherche et écriture du scénario documentaire.',
    url: 'https://www.youtube.com/playlist?list=PLYyOYUYeEGxk',
    imageUrl: '/PortadaADN-WEB-2048x1158.png',
  },
  {
    id: 'catamarca-datos',
    title: 'Catamarca : gouvernance des données',
    organization: 'Gouvernement de Catamarca — Fundar',
    description: 'Présentation narrative des initiatives de données menées pour le gouvernement provincial.',
    role: 'Développement narratif et communication des politiques publiques de données.',
    url: 'https://fund.ar/publicacion/catamarca-gobierno-de-datos-para-decisiones-informadas/',
  },
  {
    id: 'peso-dolar',
    title: 'Vers une coexistence du peso et du dollar',
    organization: 'Fundar',
    description: 'Gamification interactive d’une recherche économique sur la coexistence bimonétaire en Argentine.',
    role: 'Stratégie narrative et gamification de la recherche.',
    url: 'https://fund.ar/publicacion/hacia-una-convivencia-entre-el-peso-y-el-dolar-2/',
  },
  {
    id: 'clubes-inseguridad',
    title: 'Lutter contre l’insécurité par les clubs de quartier',
    organization: 'River Plate — Villes Sans Peur — Fundar',
    description: 'Un récit numérique promouvant les clubs sportifs de quartier pour les enfants afin de prévenir la violence à Rosario.',
    role: 'Conception narrative et visuelle de la recherche.',
    url: 'https://fund.ar/publicacion/un-club-para-nuevo-alberdi-oeste-estrategias-de-integracion-sociourbana-para-prevenir-la-violencia-y-el-delito/',
  },
  {
    id: 'monitor-empresas',
    title: 'Observatoire Mensuel des Entreprises',
    organization: 'Fundar',
    description: 'Un rapport mensuel numérique proposant des visualisations interactives de données et des analyses économiques.',
    role: 'Édition de contenus, diffusion web, réseaux sociaux et newsletters.',
    url: 'https://fund.ar/publicacion/monitor-mensual-de-empresas/',
  },
];

export const MUSIC_EMBEDS_ES: MusicEmbedItem[] = [
  {
    id: 'el-bien-comun',
    title: 'jnau - el bien común',
    type: 'youtube',
    embedSrc: 'https://www.youtube.com/embed/Dl-frSvCaDk?si=SXB7savSE3R0VU_R&controls=0',
    directUrl: 'https://www.youtube.com/watch?v=Dl-frSvCaDk',
    description: 'Performance en vivo de canción para voz, guitarra y procesamiento digital en vivo (sin pistas).',
  },
  {
    id: 'laboratorio-de-sonido',
    title: 'Ensamble Laboratorio de sonido - Centro Cultural Borges',
    type: 'youtube',
    embedSrc: 'https://www.youtube.com/embed/AdC1CJKmESU?si=lRkNVkD9iJtnGEy2&controls=0&start=12',
    directUrl: 'https://www.youtube.com/watch?v=AdC1CJKmESU',
    description: 'Pieza inicial para presentación del Laboratorio de Sonido dirigido por Guillermina Etkin en el Centro Cultural Borges (Sala +infinito), para 30 parlantes móviles que se desplazaban en el público reproduciendo sonidos de la fauna del Delta del Tigre.',
  },
  {
    id: 'las-frases-hechas-2025',
    title: 'jnau - las frases hechas (2025)',
    type: 'spotify',
    embedSrc: 'https://open.spotify.com/embed/album/1mSov8QbxLvphTiLDYhwoV?utm_source=generator&theme=0&si=c589d423bf1b429a',
    directUrl: 'https://open.spotify.com/album/1mSov8QbxLvphTiLDYhwoV',
    description: 'Trabajo solista centrado en poéticas de la naturaleza y el procesamiento digital en vivo de voces y guitarras.',
  },
  {
    id: 'intervencion-villa-ortuzar',
    title: 'bs aéries - de noche',
    type: 'youtube',
    embedSrc: 'https://www.youtube.com/embed/14DI2FTnubE?si=7ckGdIAyZZbh1HD5',
    directUrl: 'https://www.youtube.com/watch?v=14DI2FTnubE',
    description: 'Dúo de composición en vivo para sintetizadores, encendedores, guitarra y piano procesados. Intervención en el sonido de Villa Ortúzar, Buenos Aires.',
  },
  {
    id: 'bs-aeries-excuadros',
    title: 'bs aéries - excuadros (Alianza Francesa)',
    type: 'spotify',
    embedSrc: 'https://open.spotify.com/embed/album/14vzWpGaiJYCxwJSaFAfsM?utm_source=generator&si=1e3b5820f02d4143',
    directUrl: 'https://open.spotify.com/album/14vzWpGaiJYCxwJSaFAfsM',
    description: "Registro de la composición en vivo, intervención de la muestra 'esquadros' de la artista Catalina Sikorski en la Alianza Francesa de Buenos Aires.",
  },
  {
    id: 'ambient-techno-ableton',
    title: 'Atacama - Camino atrás',
    type: 'youtube',
    embedSrc: 'https://www.youtube.com/embed/H9g3jbno4mc?si=6Wt0XrApqKk51Tql&controls=0',
    directUrl: 'https://www.youtube.com/watch?v=H9g3jbno4mc',
    description: 'Fragmento de presentación de ambient techno construida en Ableton Live.',
  },
];

export const MUSIC_EMBEDS_EN: MusicEmbedItem[] = [
  {
    id: 'el-bien-comun',
    title: 'jnau - el bien común',
    type: 'youtube',
    embedSrc: 'https://www.youtube.com/embed/Dl-frSvCaDk?si=SXB7savSE3R0VU_R&controls=0',
    directUrl: 'https://www.youtube.com/watch?v=Dl-frSvCaDk',
    description: 'Live performance of a song for voice, guitar, and real-time digital processing (no backing tracks).',
  },
  {
    id: 'laboratorio-de-sonido',
    title: 'Sound Laboratory Ensemble - Centro Cultural Borges',
    type: 'youtube',
    embedSrc: 'https://www.youtube.com/embed/AdC1CJKmESU?si=lRkNVkD9iJtnGEy2&controls=0&start=12',
    directUrl: 'https://www.youtube.com/watch?v=AdC1CJKmESU',
    description: 'Opening piece for the Sound Laboratory presentation directed by Guillermina Etkin at Centro Cultural Borges (Sala +infinito), for 30 mobile speakers moving through the audience broadcasting sounds of the Paraná Delta fauna.',
  },
  {
    id: 'las-frases-hechas-2025',
    title: 'jnau - las frases hechas (2025)',
    type: 'spotify',
    embedSrc: 'https://open.spotify.com/embed/album/1mSov8QbxLvphTiLDYhwoV?utm_source=generator&theme=0&si=c589d423bf1b429a',
    directUrl: 'https://open.spotify.com/album/1mSov8QbxLvphTiLDYhwoV',
    description: 'Solo work focused on nature poetics and live digital processing of voice and guitar.',
  },
  {
    id: 'intervencion-villa-ortuzar',
    title: 'bs aéries - de noche',
    type: 'youtube',
    embedSrc: 'https://www.youtube.com/embed/14DI2FTnubE?si=7ckGdIAyZZbh1HD5',
    directUrl: 'https://www.youtube.com/watch?v=14DI2FTnubE',
    description: 'Live composition duo for synthesizers, lighters, processed guitar, and piano. Sound intervention in Villa Ortúzar, Buenos Aires.',
  },
  {
    id: 'bs-aeries-excuadros',
    title: 'bs aéries - excuadros (Alliance Française)',
    type: 'spotify',
    embedSrc: 'https://open.spotify.com/embed/album/14vzWpGaiJYCxwJSaFAfsM?utm_source=generator&si=1e3b5820f02d4143',
    directUrl: 'https://open.spotify.com/album/14vzWpGaiJYCxwJSaFAfsM',
    description: "Live recording of the sound intervention for Catalina Sikorski's 'esquadros' exhibition at Alliance Française in Buenos Aires.",
  },
  {
    id: 'ambient-techno-ableton',
    title: 'Atacama - Camino atrás',
    type: 'youtube',
    embedSrc: 'https://www.youtube.com/embed/H9g3jbno4mc?si=6Wt0XrApqKk51Tql&controls=0',
    directUrl: 'https://www.youtube.com/watch?v=H9g3jbno4mc',
    description: 'Live excerpt of ambient techno built in Ableton Live.',
  },
];

export const MUSIC_EMBEDS_FR: MusicEmbedItem[] = [
  {
    id: 'el-bien-comun',
    title: 'jnau - el bien común',
    type: 'youtube',
    embedSrc: 'https://www.youtube.com/embed/Dl-frSvCaDk?si=SXB7savSE3R0VU_R&controls=0',
    directUrl: 'https://www.youtube.com/watch?v=Dl-frSvCaDk',
    description: 'Performance en direct d’une chanson pour voix, guitare et traitement numérique en direct (sans pistes préenregistrées).',
  },
  {
    id: 'laboratorio-de-sonido',
    title: 'Ensemble Laboratoire Sonore - Centro Cultural Borges',
    type: 'youtube',
    embedSrc: 'https://www.youtube.com/embed/AdC1CJKmESU?si=lRkNVkD9iJtnGEy2&controls=0&start=12',
    directUrl: 'https://www.youtube.com/watch?v=AdC1CJKmESU',
    description: 'Pièce d’ouverture pour la présentation du Laboratoire Sonore dirigé par Guillermina Etkin au Centro Cultural Borges (Sala +infinito), pour 30 enceintes mobiles se déplaçant parmi le public en diffusant les sons de la faune du Delta du Tigre.',
  },
  {
    id: 'las-frases-hechas-2025',
    title: 'jnau - las frases hechas (2025)',
    type: 'spotify',
    embedSrc: 'https://open.spotify.com/embed/album/1mSov8QbxLvphTiLDYhwoV?utm_source=generator&theme=0&si=c589d423bf1b429a',
    directUrl: 'https://open.spotify.com/album/1mSov8QbxLvphTiLDYhwoV',
    description: 'Travail solo axé sur les poétiques de la nature et le traitement numérique en direct de voix et de guitares.',
  },
  {
    id: 'intervencion-villa-ortuzar',
    title: 'bs aéries - de noche',
    type: 'youtube',
    embedSrc: 'https://www.youtube.com/embed/14DI2FTnubE?si=7ckGdIAyZZbh1HD5',
    directUrl: 'https://www.youtube.com/watch?v=14DI2FTnubE',
    description: 'Duo de composition en direct pour synthétiseurs, briquets, guitare et piano traités. Intervention sonore à Villa Ortúzar, Buenos Aires.',
  },
  {
    id: 'bs-aeries-excuadros',
    title: 'bs aéries - excuadros (Alliance Française)',
    type: 'spotify',
    embedSrc: 'https://open.spotify.com/embed/album/14vzWpGaiJYCxwJSaFAfsM?utm_source=generator&si=1e3b5820f02d4143',
    directUrl: 'https://open.spotify.com/album/14vzWpGaiJYCxwJSaFAfsM',
    description: 'Enregistrement de l’intervention sonore en direct pour l’exposition « esquadros » de l’artiste Catalina Sikorski à l’Alliance Française de Buenos Aires.',
  },
  {
    id: 'ambient-techno-ableton',
    title: 'Atacama - Camino atrás',
    type: 'youtube',
    embedSrc: 'https://www.youtube.com/embed/H9g3jbno4mc?si=6Wt0XrApqKk51Tql&controls=0',
    directUrl: 'https://www.youtube.com/watch?v=H9g3jbno4mc',
    description: 'Extrait de performance d’ambient techno conçue sur Ableton Live.',
  },
];

export const CONFERENCE_PRESENTATIONS_ES: ConferencePresentation[] = [
  {
    id: 'caviedes-2026',
    title: 'Caviedes escribe a sor Juana: crítica de un poema epistolar',
    event: 'XXXVIII Jornadas del ILH-UBA, en el CC Paco Urondo',
    date: '11/03/2026',
  },
  {
    id: 'epistolas-2025',
    title: 'Epístolas de sor Juana a los poetas: una introducción a sus poemas remitentes',
    event: 'Jornadas internas de adscriptos a Literatura Latinoamericana IA (Añón), UBA',
    date: '04/12/2025',
  },
  {
    id: 'incipits-2024',
    title: 'Rastros epistolares en tres incipits poéticos sorjuaninos',
    event: 'XXXVI Jornadas del ILH-UBA, en el CC Paco Urondo',
    date: '05/06/2024',
  },
  {
    id: 'respuesta-2023',
    title: 'Sor Juana Inés de la Cruz. La literatura como respuesta',
    event:
      'Workshop “Textualizar la experiencia. Aspectos semánticos, pragmáticos e ideológicos del archivo colonial en la ficción y la teoría latinoamericana”, coordinado por Stephanie Béreiziat-Lang (Ruprecht-Karls-Universität Heidelberg, Alemania), Eugenia Ortiz Gambetta (IdHICS, UNLP- CONICET), y Facundo Ruiz (UBA-ILH-CONICET), realizado en el Instituto de Investigaciones en Humanidades y Ciencias Sociales (IdIHCS– Conicet/UNLP)',
    date: '18/05/2023',
  },
  {
    id: 'matriz-2022',
    title: 'La matriz epistolar en la poesía de sor Juana Inés de la Cruz',
    event: 'III Jornadas de Estudiantes Investigadorxs en Letras, Facultad de Filosofía y Letras (UBA)',
    date: '09/08/2022',
  },
  {
    id: 'laberinto-2021',
    title: 'Sor Juana Inés de la Cruz: formas de ingresar a un laberinto',
    event: 'I Jornadas de Adscripciones, INDEAL (UBA)',
    date: '06/12/2021',
  },
];

export const CONFERENCE_PRESENTATIONS_EN: ConferencePresentation[] = [
  {
    id: 'caviedes-2026',
    title: 'Caviedes Writes to Sor Juana: Critique of an Epistolary Poem',
    event: 'XXXVIII ILH-UBA Conference, CC Paco Urondo',
    date: '11/03/2026',
  },
  {
    id: 'epistolas-2025',
    title: 'Sor Juana’s Epistles to the Poets: An Introduction to Her Adressed Poems',
    event: 'Latin American Literature IA Fellow Conference (Añón), UBA',
    date: '04/12/2025',
  },
  {
    id: 'incipits-2024',
    title: 'Epistolary Traces in Three Sorjuanian Poetic Incipits',
    event: 'XXXVI ILH-UBA Conference, CC Paco Urondo',
    date: '05/06/2024',
  },
  {
    id: 'respuesta-2023',
    title: 'Sor Juana Inés de la Cruz: Literature as Response',
    event:
      'Workshop “Textualizing Experience: Semantic, Pragmatic, and Ideological Aspects of the Colonial Archive in Latin American Fiction and Theory”, Heidelberg University, IdIHCS-UNLP/CONICET',
    date: '18/05/2023',
  },
  {
    id: 'matriz-2022',
    title: 'The Epistolary Matrix in the Poetry of Sor Juana Inés de la Cruz',
    event: 'III Student Researchers Conference in Literature, School of Philosophy and Letters (UBA)',
    date: '09/08/2022',
  },
  {
    id: 'laberinto-2021',
    title: 'Sor Juana Inés de la Cruz: Ways into a Labyrinth',
    event: 'I Conference of Fellows, INDEAL (UBA)',
    date: '06/12/2021',
  },
];

export const CONFERENCE_PRESENTATIONS_FR: ConferencePresentation[] = [
  {
    id: 'caviedes-2026',
    title: 'Caviedes écrit à sor Juana : critique d’un poème épistolaire',
    event: 'XXXVIIIes Journées de l’ILH-UBA, CC Paco Urondo',
    date: '11/03/2026',
  },
  {
    id: 'epistolas-2025',
    title: 'Épîtres de sor Juana aux poètes : introduction à ses poèmes adressés',
    event: 'Journées internes des chercheurs affiliés en Littérature Latino-américaine IA (Añón), UBA',
    date: '04/12/2025',
  },
  {
    id: 'incipits-2024',
    title: 'Traces épistolaires dans trois incipits poétiques de sor Juana',
    event: 'XXXVIes Journées de l’ILH-UBA, CC Paco Urondo',
    date: '05/06/2024',
  },
  {
    id: 'respuesta-2023',
    title: 'Sor Juana Inés de la Cruz : la littérature comme réponse',
    event:
      'Atelier « Textualiser l’expérience : aspects sémantiques, pragmatiques et idéologiques de l’archive coloniale dans la fiction et la théorie latino-américaines », Université de Heidelberg, IdIHCS-UNLP/CONICET',
    date: '18/05/2023',
  },
  {
    id: 'matriz-2022',
    title: 'La matrice épistolaire dans la poésie de sor Juana Inés de la Cruz',
    event: 'IIIes Journées d’étudiant·e·s chercheur·e·s en Lettres, Faculté de Philosophie et Lettres (UBA)',
    date: '09/08/2022',
  },
  {
    id: 'laberinto-2021',
    title: 'Sor Juana Inés de la Cruz : manières d’entrer dans un labyrinthe',
    event: 'Ières Journées des chercheurs affiliés, INDEAL (UBA)',
    date: '06/12/2021',
  },
];

export const ACADEMIC_PUBLICATIONS_ES: AcademicPublication[] = [
  {
    id: 'criptobarroco-2025',
    title: 'Criptobarroco: una clave para la literatura digital latinoamericana',
    year: 2025,
    journal: 'Chuy',
    institution: 'UNTREF',
    volumeInfo: 'Número 18, pp. 92-115',
    issn: 'ISSN 2422-5932',
    keywords: ['expresiones digitales', 'neobarroco', 'artes transdisciplinarias'],
    url: 'https://revistas.untref.edu.ar/index.php/chuy/article/view/2486',
    abstract: 'Este trabajo se propone indagar tres obras de literatura digital latinoamericana desde la cripta barroca, buscando entender qué de este arte informa dicha literatura.',
  },
  {
    id: 'archivo-2024',
    title: 'Modos de re-presentar un archivo: entre Bellas artes y Magnetizado',
    year: 2024,
    journal: 'Orbis Tertius',
    institution: 'UNLP',
    volumeInfo: 'Volumen 29, Número 39',
    issn: 'ISSN 1851-7811',
    keywords: ['arte de archivo', 'instalación', 'literatura argentina'],
    url: 'https://www.orbistertius.unlp.edu.ar/article/view/ote286',
    abstract: (
      <>
        El par <em>Bellas artes</em> y <em>Magnetizado</em> puede postularse –por el tratamiento de temas tan disímiles– como ejemplar de una tendencia formal amplia en la literatura latinoamericana actual hacia los procedimientos de representación del arte contemporáneo (liderados por la performance y la instalación), y ya no tanto hacia la retórica literaria de los siglos XIX y XX, como hipotetiza Laddaga en su libro <em>Espectáculos de realidad</em> (2007). En esta línea, se estudiará el modo en que ambos libros operan con respecto a lo que Hal Foster ha llamado un “arte de archivo” (2016), en tanto rescatan como material de base documentos “previamente hechos” archivados en otros espacios de la cultura.
      </>
    ),
  },
  {
    id: 'diccionario-2023',
    title: 'Ficha del Diccionario de términos críticos de la literatura y de la cultura en América Latina',
    year: 2023,
    journal: 'Prismas',
    institution: 'UNQ',
    volumeInfo: 'Número 37, p. 322',
    issn: 'ISSN 1666-1508',
    keywords: ['estudios literarios', 'estudios culturales', 'reseña'],
    url: 'https://prismas.unq.edu.ar/OJS/index.php/Prismas/article/view/1431/2054',
    abstract: 'Reseña crítica del proyecto transcontinental coordinado por Beatriz Colombi para el abordaje de las categorías culturales y literarias de América Latina.',
  },
  {
    id: 'barroco-americano-2023',
    title: 'Sobre Barroco Americano: Mapas para uma literatura crítica',
    year: 2023,
    journal: 'Exlibris',
    institution: 'UBA',
    volumeInfo: 'Número 12, pp. 425-428',
    issn: 'ISSN 2314-3894',
    keywords: ['Barroco de Indias', 'Brasil-Argentina', 'arte de la Conquista'],
    url: 'http://revistas.filo.uba.ar/index.php/exlibris/article/view/4071/2739',
    abstract: 'Indagación transfronteriza entre el barroco colonial hispanoamericano y el barroco luso-brasileño, mapeando consonancias poéticas y espaciales.',
  },
  {
    id: 'escritura-creativa-2021',
    title: '¿Cuándo es creativa la escritura?',
    year: 2021,
    journal: 'Exlibris',
    institution: 'UBA',
    volumeInfo: 'Número 10, pp. 159-166',
    issn: 'ISSN 2314-3894',
    keywords: ['creación literaria', 'currículas académicas', 'debate'],
    url: 'http://revistas.filo.uba.ar/index.php/exlibris/article/view/3529/2400',
    abstract: 'Ensayo acerca de la institucionalización de la escritura creativa en los espacios universitarios y su fricción con el trabajo con el lenguaje.',
  },
];

export const ACADEMIC_PUBLICATIONS_EN: AcademicPublication[] = [
  {
    id: 'criptobarroco-2025',
    title: 'Cryptobaroque: A Key to Latin American Digital Literature',
    year: 2025,
    journal: 'Chuy',
    institution: 'UNTREF',
    volumeInfo: 'Issue 18, pp. 92-115',
    issn: 'ISSN 2422-5932',
    keywords: ['digital expressions', 'neobaroque', 'transdisciplinary arts'],
    url: 'https://revistas.untref.edu.ar/index.php/chuy/article/view/2486',
    abstract: 'This paper examines three works of Latin American digital literature through the lens of the baroque crypt, exploring how this aesthetic informs contemporary digital literature.',
  },
  {
    id: 'archivo-2024',
    title: 'Modes of Re-presenting an Archive: Between Bellas artes and Magnetizado',
    year: 2024,
    journal: 'Orbis Tertius',
    institution: 'UNLP',
    volumeInfo: 'Volume 29, Issue 39',
    issn: 'ISSN 1851-7811',
    keywords: ['archival art', 'installation', 'Argentine literature'],
    url: 'https://www.orbistertius.unlp.edu.ar/article/view/ote286',
    abstract: (
      <>
        The pair between <em>Bellas artes</em> and <em>Magnetizado</em> can be postulated as exemplary of a broader formal trend in contemporary Latin American literature toward contemporary art representation procedures (led by performance and installation), rather than nineteenth- and twentieth-century literary rhetoric.
      </>
    ),
  },
  {
    id: 'diccionario-2023',
    title: 'On the Dictionary of Critical Terms of Literature and Culture in Latin America',
    year: 2023,
    journal: 'Prismas',
    institution: 'UNQ',
    volumeInfo: 'Issue 37, p. 322',
    issn: 'ISSN 1666-1508',
    keywords: ['literary studies', 'cultural studies', 'review'],
    url: 'https://prismas.unq.edu.ar/OJS/index.php/Prismas/article/view/1431/2054',
    abstract: 'Critical review of the transcontinental project coordinated by Beatriz Colombi exploring cultural and literary categories of Latin America.',
  },
  {
    id: 'barroco-americano-2023',
    title: 'On American Baroque: Maps for a Critical Literature',
    year: 2023,
    journal: 'Exlibris',
    institution: 'UBA',
    volumeInfo: 'Issue 12, pp. 425-428',
    issn: 'ISSN 2314-3894',
    keywords: ['Baroque of the Indies', 'Brazil-Argentina', 'Conquest art'],
    url: 'http://revistas.filo.uba.ar/index.php/exlibris/article/view/4071/2739',
    abstract: 'Cross-border exploration between Spanish-American colonial Baroque and Luso-Brazilian Baroque, mapping poetic and spatial consonances.',
  },
  {
    id: 'escritura-creativa-2021',
    title: 'When is Writing Creative?',
    year: 2021,
    journal: 'Exlibris',
    institution: 'UBA',
    volumeInfo: 'Issue 10, pp. 159-166',
    issn: 'ISSN 2314-3894',
    keywords: ['creative writing', 'academic curricula', 'debate'],
    url: 'http://revistas.filo.uba.ar/index.php/exlibris/article/view/3529/2400',
    abstract: 'Essay on the institutionalization of creative writing in university departments and its tension with engagement in language.',
  },
];

export const ACADEMIC_PUBLICATIONS_FR: AcademicPublication[] = [
  {
    id: 'criptobarroco-2025',
    title: 'Cryptobaroque : une clé pour la littérature numérique latino-américaine',
    year: 2025,
    journal: 'Chuy',
    institution: 'UNTREF',
    volumeInfo: 'Numéro 18, pp. 92-115',
    issn: 'ISSN 2422-5932',
    keywords: ['expressions numériques', 'néobaroque', 'arts transdisciplinaires'],
    url: 'https://revistas.untref.edu.ar/index.php/chuy/article/view/2486',
    abstract: 'Cet article se propose d’analyser trois œuvres de littérature numérique latino-américaine depuis la crypte baroque, afin de comprendre en quoi cet art informe la dite littérature.',
  },
  {
    id: 'archivo-2024',
    title: 'Modes de re-présentation d’une archive : entre Bellas artes et Magnetizado',
    year: 2024,
    journal: 'Orbis Tertius',
    institution: 'UNLP',
    volumeInfo: 'Volume 29, Numéro 39',
    issn: 'ISSN 1851-7811',
    keywords: ['art d’archive', 'installation', 'littérature argentine'],
    url: 'https://www.orbistertius.unlp.edu.ar/article/view/ote286',
    abstract: (
      <>
        Le diptyque entre <em>Bellas artes</em> et <em>Magnetizado</em> peut être considéré, en raison du traitement de sujets pourtant si dissemblables, comme exemplaire d’une vaste tendance formelle dans la littérature latino-américaine contemporaine vers les protocoles de représentation de l’art contemporain (emmenés par la performance et l’installation), plutôt que vers la rhétorique littéraire des XIXe et XXe siècles.
      </>
    ),
  },
  {
    id: 'diccionario-2023',
    title: 'Sur le Dictionnaire de termes critiques de la littérature et de la culture en Amérique latine',
    year: 2023,
    journal: 'Prismas',
    institution: 'UNQ',
    volumeInfo: 'Numéro 37, p. 322',
    issn: 'ISSN 1666-1508',
    keywords: ['études littéraires', 'études culturelles', 'recension'],
    url: 'https://prismas.unq.edu.ar/OJS/index.php/Prismas/article/view/1431/2054',
    abstract: 'Recension critique du projet transcontinental coordonné par Beatriz Colombi pour l’exploration des catégories culturelles et littéraires de l’Amérique latine.',
  },
  {
    id: 'barroco-americano-2023',
    title: 'Sur Barroco Americano : cartes pour une littérature critique',
    year: 2023,
    journal: 'Exlibris',
    institution: 'UBA',
    volumeInfo: 'Numéro 12, pp. 425-428',
    issn: 'ISSN 2314-3894',
    keywords: ['Baroque des Indes', 'Brésil-Argentine', 'art de la Conquête'],
    url: 'http://revistas.filo.uba.ar/index.php/exlibris/article/view/4071/2739',
    abstract: 'Exploration transfrontalière entre le baroque colonial hispano-américain et le baroque luso-brésilien, cartographiant consonances poétiques et spatiales.',
  },
  {
    id: 'escritura-creativa-2021',
    title: 'Quand l’écriture est-elle créative ?',
    year: 2021,
    journal: 'Exlibris',
    institution: 'UBA',
    volumeInfo: 'Numéro 10, pp. 159-166',
    issn: 'ISSN 2314-3894',
    keywords: ['création littéraire', 'cursus universitaires', 'débat'],
    url: 'http://revistas.filo.uba.ar/index.php/exlibris/article/view/3529/2400',
    abstract: 'Essai sur l’institutionnalisation de l’écriture créative au sein des universités et ses tensions avec le travail de la langue.',
  },
];

