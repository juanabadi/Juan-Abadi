/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
import {
  Language,
  MusicEmbedItem,
  MUSIC_DISCIPLINES_ES,
  MUSIC_DISCIPLINES_EN,
  MUSIC_DISCIPLINES_FR,
  WEB_PROJECTS_ES,
  WEB_PROJECTS_EN,
  WEB_PROJECTS_FR,
  MUSIC_EMBEDS_ES,
  MUSIC_EMBEDS_EN,
  MUSIC_EMBEDS_FR,
  CONFERENCE_PRESENTATIONS_ES,
  CONFERENCE_PRESENTATIONS_EN,
  CONFERENCE_PRESENTATIONS_FR,
  ACADEMIC_PUBLICATIONS_ES,
  ACADEMIC_PUBLICATIONS_EN,
  ACADEMIC_PUBLICATIONS_FR,
} from './translations';

const YOUTUBE_VIDEO_ID = '14DI2FTnubE';
const TARGET_RADIUS = 300;

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// Enforce maximum quality available on YouTube
const setMaxQuality = (player: any) => {
  if (!player) return;
  try {
    const levels: string[] = player.getAvailableQualityLevels?.() || [];
    if (Array.isArray(levels) && levels.length > 0) {
      const priorityOrder = ['highres', 'hd2160', 'hd1440', 'hd1080', 'hd720'];
      const highest = priorityOrder.find((lvl) => levels.includes(lvl)) || levels[0];
      player.setPlaybackQuality?.(highest);
    } else {
      player.setPlaybackQuality?.('highres');
    }
  } catch {
    // Ignore
  }
};

interface PopupSection {
  id: number;
  colorRgb: string;
  colorHex: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

const renderMusicCard = (item: MusicEmbedItem) => (
  <div
    key={item.id}
    className="flex flex-col bg-white/45 hover:bg-white/75 backdrop-blur-sm border border-[#4D4D4D]/20 hover:border-[#4D4D4D]/50 rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md text-left p-4 sm:p-5 space-y-4"
  >
    <div className="flex items-start justify-between gap-3">
      <h4 className="font-transmediale text-[16px] sm:text-[18px] font-medium text-[#222222] leading-snug">
        {item.title}
      </h4>
      {item.directUrl && (
        <a
          href={item.directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[#4D4D4D]/70 hover:text-black p-1 transition-colors"
          title="Abrir enlace externo"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>

    {item.type === 'youtube' ? (
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/10 border border-[#4D4D4D]/15 shadow-sm">
        <iframe
          className="w-full h-full border-0"
          src={item.embedSrc}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    ) : (
      <div className="w-full rounded-lg overflow-hidden border border-[#4D4D4D]/15 shadow-sm bg-black/5">
        <iframe
          className="w-full border-0 block"
          src={item.embedSrc}
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={item.title}
        />
      </div>
    )}

    <p className="text-[13px] sm:text-[14px] font-normal leading-relaxed text-[#4D4D4D]">
      {item.description}
    </p>
  </div>
);

const getPopupSections = (lang: Language): Record<number, PopupSection> => {
  const isEn = lang === 'en';
  const isFr = lang === 'fr';
  const academicPubs = isFr
    ? ACADEMIC_PUBLICATIONS_FR
    : isEn
    ? ACADEMIC_PUBLICATIONS_EN
    : ACADEMIC_PUBLICATIONS_ES;
  const conferencePress = isFr
    ? CONFERENCE_PRESENTATIONS_FR
    : isEn
    ? CONFERENCE_PRESENTATIONS_EN
    : CONFERENCE_PRESENTATIONS_ES;
  const webProjects = isFr
    ? WEB_PROJECTS_FR
    : isEn
    ? WEB_PROJECTS_EN
    : WEB_PROJECTS_ES;
  const musicEmbeds = isFr
    ? MUSIC_EMBEDS_FR
    : isEn
    ? MUSIC_EMBEDS_EN
    : MUSIC_EMBEDS_ES;

  return {
    1: {
      id: 1,
      colorRgb: '255, 79, 12',
      colorHex: '#FF4F0C',
      title: isFr ? 'Poésie coloniale' : isEn ? 'Colonial Poetry' : 'Poesía colonial',
      subtitle: isFr ? 'RECHERCHE' : isEn ? 'RESEARCH' : 'INVESTIGACIÓN',
      content: (
        <>
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8 mb-10 text-left">
            <div className="flex-1 text-[#222222] leading-[1.7] text-[18px] sm:text-[20px] md:text-[22px] font-normal space-y-4">
              <p className="mt-0 text-[16px] sm:text-[17.5px] md:text-[19px] text-[#2B2B2B] leading-[1.6]">
                {isFr
                  ? 'Licencié et professeur en Lettres (UBA). Étudiant en master d’études curatoriales (UNTREF).'
                  : isEn
                  ? 'BA and Professor in Literature (UBA). Master’s candidate in Curatorial Studies (UNTREF).'
                  : 'Licenciado y profesor en Letras por la UBA. Maestrando en Curaduría por UNTREF.'}
              </p>
              <p>
                {isFr
                  ? 'À partir de mes recherches sur la poésie épistolaire baroque et ses liens avec l’image, j’ai commencé à explorer ses échos néobaroques dans la culture contemporaine. Je développe actuellement un projet curatorial sur le baroque chiffré dans l’art contemporain latino-américain, qui croise arts visuels et littérature visuelle, mais aussi musique, mises en scène d’opéra, costumes et études sur la fête.'
                  : isEn
                  ? 'From my research into Baroque epistolary poetry and its relationship with imagery, I began exploring its Neobaroque echoes in contemporary culture. I am currently developing a curatorial project on the encrypted Baroque in Latin American contemporary art, spanning visual arts and visual literature, as well as music, opera stagings, costumes, and party studies.'
                  : 'A partir de mis investigaciones en poesía epistolar del barroco y su relación con la imagen comencé a interesarme por sus ecos neobarrocos en la contemporaneidad. Desarrollo ahora un proyecto curatorial sobre el barroco encriptado en el arte latinoamericano contemporáneo, en artes visuales y literatura visual, pero también en músicas, puestas de ópera, vestuarios y estudios de fiestas.'}
              </p>
            </div>
            <div className="w-full sm:w-[280px] md:w-[300px] lg:w-[340px] shrink-0 pt-0.5 md:pt-1">
              <img
                src="/Sor_Juana_Inés_de_la_Cruz_(Juan_de_Miranda).jpg"
                alt="Sor Juana Inés de la Cruz"
                className="w-full h-auto aspect-[349/550] object-contain rounded-lg shadow-md border border-[#222222]/30 block"
              />
              <p className="text-right text-[11.5px] sm:text-[12.5px] text-[#222222]/65 leading-snug mt-2 font-normal">
                {isFr
                  ? 'Portrait de Sor Juana Inés de la Cruz, « Copie fidèle »'
                  : isEn
                  ? 'Portrait of Sor Juana Inés de la Cruz, "Faithful copy"'
                  : 'Retrato de Sor Juana Inés de la Cruz, "Copia fiel"'}
                <br />
                Juan de Miranda, 1715
              </p>
            </div>
          </div>

          <div className="text-left mt-8 pt-6 border-t border-[#222222]/30">
            <h3 className="text-[#222222] text-[15px] sm:text-[17px] font-semibold uppercase tracking-[0.18em] mb-4">
              {isFr
                ? 'Chercheur affilié au Groupe d’études baroques, Institut de littérature hispano-américaine (ILH-UBA)'
                : isEn
                ? 'Affiliated Researcher, Baroque Studies Group, Institute of Hispanic American Literature (ILH-UBA)'
                : 'Investigador adscripto al Grupo de Estudios Barrocos (ILH-UBA)'}
            </h3>
            <div className="space-y-2.5 text-[#222222] leading-[1.65] text-[15.5px] sm:text-[17px] font-normal">
              <p>
                {isFr
                  ? 'Participant au projet de recherche « Intersticios del archivo: edición y crítica en la obra de Carlos de Sigüenza y Góngora ».'
                  : isEn
                  ? 'Participant in the research project “Interstices of the Archive: Editing and Criticism in the Work of Carlos de Sigüenza y Góngora”.'
                  : 'Participo en el proyecto de investigación “Intersticios del archivo: edición y crítica en la obra de Carlos de Sigüenza y Góngora”.'}
              </p>
              <p>
                {isFr
                  ? 'Ancien participant au projet « Agendas, léxicos y conceptos en la crítica literaria latinoamericana ».'
                  : isEn
                  ? 'Former participant in the project “Agendas, Lexicons, and Concepts in Latin American Literary Criticism”.'
                  : 'Participé del proyecto “Agendas, léxicos y conceptos en la crítica literaria latinoamericana”.'}
              </p>
              <p>
                {isFr
                  ? 'Ancien chercheur affilié, chaire de Littérature latino-américaine I (Colombi–Añón), Faculté de philosophie et lettres, UBA.'
                  : isEn
                  ? 'Former Research Affiliate, Latin American Literature I (Colombi–Añón chair), Faculty of Philosophy and Letters, UBA.'
                  : 'Fui investigador adscripto en la materia Literatura Latinoamericana I (Colombi - Añón).'}
              </p>
            </div>
          </div>

          <div className="text-left mt-8 pt-6 border-t border-[#222222]/30">
            <h3 className="text-[#222222] text-[15px] sm:text-[17px] font-semibold uppercase tracking-[0.18em] mb-4">
              {isFr ? 'Boursier de l’UBA (2020-2022)' : isEn ? 'UBA Fellow (2020-2022)' : 'Becario UBA (2020-2022)'}
            </h3>
            <div className="space-y-2.5 text-[#222222] leading-[1.65] text-[15.5px] sm:text-[17px] font-normal">
              <p>
                {isFr
                  ? 'Bourse Estímulo UBA 200 años, pour étudier les stratégies d’autofiguration dans l’œuvre de sor Juana Inés de la Cruz.'
                  : isEn
                  ? 'Awarded the UBA 200 Years stimulus scholarship to study self-figuration strategies in the literature of Sor Juana Inés de la Cruz.'
                  : 'Obtuve la beca estímulo UBA 200 años para estudiar las estrategias de autofiguración en la literatura de sor Juana Inés de la Cruz.'}
              </p>
              <p>
                {isFr
                  ? 'Ancien chercheur accrédité à la Bibliothèque nationale Mariano Moreno, pour consulter les éditions originales de l’œuvre de sor Juana conservées dans le Tesoro.'
                  : isEn
                  ? 'Accredited researcher at the Mariano Moreno National Library to study the first editions of Sor Juana’s works preserved in the Rare Book Collection (Tesoro).'
                  : 'Fui investigador acreditado de la Biblioteca Nacional Mariano Moreno para revisar las primeras ediciones de la obra de sor Juana conservadas en el Tesoro.'}
              </p>
            </div>
          </div>

          <div className="text-left mt-8 pt-6 border-t border-[#222222]/30">
            <h3 className="text-[#222222] text-[15px] sm:text-[17px] font-semibold uppercase tracking-[0.18em] mb-5">
              {isFr ? 'Articles et comptes rendus' : isEn ? 'Articles and reviews' : 'Artículos y reseñas'}
            </h3>
            <div className="space-y-6">
              {academicPubs.map((pub) => (
                <article key={pub.id} className="group">
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#222222] hover:text-black transition-colors"
                  >
                    <h4 className="text-[17px] sm:text-[19px] font-medium underline underline-offset-4 decoration-[#222222]/40 group-hover:decoration-black">
                      {pub.title}
                    </h4>
                  </a>
                  <p className="text-[14px] sm:text-[15.5px] text-[#2B2B2B] mt-1">
                    <em>{pub.journal}</em> ({pub.institution}, {pub.year}) · {pub.volumeInfo}
                  </p>
                  {pub.abstract && (
                    <p className="text-[13.5px] sm:text-[14.5px] text-[#2B2B2B]/90 mt-1.5 font-light leading-relaxed">
                      {pub.abstract}
                    </p>
                  )}
                </article>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-[#222222]/30">
              <h3 className="text-[#222222] text-[15px] sm:text-[17px] font-semibold uppercase tracking-[0.18em] mb-5">
                {isFr ? 'Conférences et communications' : isEn ? 'Conferences and presentations' : 'Conferencias y ponencias'}
              </h3>
              <div className="space-y-6">
                {conferencePress.map((conf) => (
                  <article key={conf.id}>
                    <h4 className="text-[17px] sm:text-[19px] font-medium text-[#222222]">
                      <em>{conf.title}</em>
                    </h4>
                    <p className="text-[14px] sm:text-[15.5px] text-[#2B2B2B] mt-1 leading-relaxed">
                      {conf.event}
                    </p>
                    <p className="text-[13px] sm:text-[14px] text-[#2B2B2B]/80 mt-1 font-light">
                      {conf.date}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-[#222222]/30">
              <h3 className="text-[#222222] text-[15px] sm:text-[17px] font-semibold uppercase tracking-[0.18em] mb-5">
                {isFr ? 'Formations, cours et ateliers' : isEn ? 'Training, courses, and workshops' : 'Formaciones, cursos y talleres'}
              </h3>
              <div className="space-y-4 text-[#222222] leading-[1.65] text-[15px] sm:text-[16.5px] font-normal">
                <p>
                  {isFr
                    ? 'Ateliers de scénario et de dramaturgie avec Pablo Solarz, Mauricio Kartún, Vivi Tellas, Agustín Mendilaharzu et Walter Jakob'
                    : isEn
                    ? 'Screenwriting and playwriting workshops with Pablo Solarz, Mauricio Kartún, Vivi Tellas, Agustín Mendilaharzu, and Walter Jakob'
                    : 'Talleres de guion y dramaturgia con Pablo Solarz, Mauricio Kartún, Vivi Tellas, Agustín Mendilaharzu y Walter Jakob'}
                </p>
                <p>
                  {isFr
                    ? 'Deuxième cohorte du Laboratorio de Investigaciones Quebradas de Azotea, dirigé par Víctor López Zumelzu avec Martín Touzón (2026)'
                    : isEn
                    ? 'Second cohort of the Quebradas de Azotea Research Laboratory, directed by Víctor López Zumelzu alongside Martín Touzón (2026)'
                    : 'Segunda cohorte del Laboratorio de Investigaciones Quebradas de Azotea dirigido por Victor López Zumelzu junto a Martín Touzón (2026)'}
                </p>
                <p>
                  {isFr
                    ? 'Conseil en UX writing et design par Mercedes Lara (2026)'
                    : isEn
                    ? 'UX writing and design consultancy with Mercedes Lara (2026)'
                    : 'Consultoría de UX writing y design por Mercedes Lara (2026)'}
                </p>
                <p>
                  {isFr
                    ? 'Cours d’initiation au Traitement automatique du langage naturel, Faculté de philosophie et lettres, UBA (2025)'
                    : isEn
                    ? 'Introductory course in Natural Language Processing, Faculty of Philosophy and Letters, UBA (2025)'
                    : 'Curso introductorio de Procesamiento de Lenguaje Natural, Facultad de Filosofía y Letras, UBA (2025)'}
                </p>
                <p>
                  {isFr
                    ? 'Cours d’initiation à LaTeX pour les humanités, Faculté de philosophie et lettres, UBA (2023)'
                    : isEn
                    ? 'Introductory course in LaTeX for the Humanities, Faculty of Philosophy and Letters, UBA (2023)'
                    : 'Curso introductorio a LaTEX para Humanidades, Facultad de Filosofía y Letras, UBA (2023)'}
                </p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-[#222222]/30">
              <div className="w-full">
                <img
                  src="/laufer.gif"
                  alt="Milton Läufer, Aleph"
                  className="w-full h-auto max-h-[440px] object-cover rounded-xl shadow-md border border-[#222222]/20 block"
                />
                <p className="text-right text-[11.5px] sm:text-[12.5px] text-[#222222]/65 leading-snug mt-2 font-normal">
                  Aleph
                  <br />
                  Milton Läufer, 2024
                </p>
              </div>
            </div>
          </div>
        </>
      ),
    },
    3: {
      id: 3,
      colorRgb: '150, 255, 80',
      colorHex: '#96FF50',
      title: 'Ilusiones compartidas',
      subtitle: isFr ? 'ÉCRITURE' : isEn ? 'WRITING' : 'TEXTO',
      content: (
        <>
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8 mb-6 md:mb-8 text-left">
            <div className="w-full md:w-1/2 text-[#4D4D4D] leading-[1.7] text-[16px] sm:text-[17.5px] md:text-[18.5px] font-normal">
              <p>
                {isFr
                  ? 'J’ai travaillé comme rédacteur pour des contenus éducatifs, des campagnes politiques et du marketing de contenu axé sur le référencement naturel (SEO). En plus de l’espagnol, ma langue maternelle, je suis parfaitement bilingue en français, je possède un très bon niveau d’anglais qui me permet de lire, d’écrire et d’évoluer avec aisance en milieu professionnel, ainsi qu’un niveau de base en portugais et en allemand.'
                  : isEn
                  ? 'I have worked as a copywriter on educational content, political campaigns, and SEO-driven content marketing. Besides my native Spanish, I am fully bilingual in French, have strong English that lets me read, write, and work comfortably in professional settings, and a basic level of Portuguese and German.'
                  : 'Trabajé como redactor de contenidos educativos, de campañas políticas y de campañas de marketing de contenidos enfocadas en performance SEO. Además del español, tengo un nivel de francés bilingüe, un fuerte nivel de inglés que me permite leer, escribir y desenvolverme en ambientes laborales con comodidad, y un nivel básico de portugués y alemán.'}
              </p>
            </div>

            <div className="w-full md:w-1/2 shrink-0">
              <iframe
                src="https://ilusionescompartidas.substack.com/embed?transparent=1"
                width="100%"
                height="320"
                style={{ border: 0, background: 'transparent', width: '100%' }}
                className="w-full block"
                frameBorder="0"
                scrolling="no"
                title="Suscripción a Ilusiones Compartidas"
              />
            </div>
          </div>

          <div className="w-full text-left text-[#4D4D4D] leading-[1.7] text-[16px] sm:text-[17.5px] md:text-[18.5px] font-normal mb-8">
            <p>
              {isFr
                ? 'Je traduis depuis et vers le français. Parmi mes travaux figurent des contenus éducatifs (UNICEF), des livres (La Marca editora), des articles universitaires (Universidad Nacional de San Martín), des articles de presse (El Dipló, l’édition argentine du Monde diplomatique), ainsi que des sous-titres de films et de pièces de théâtre pour des festivals en France et en Argentine.'
                : isEn
                ? 'I translate between French and Spanish. My work includes educational content (UNICEF), books (La Marca editora), academic papers (Universidad Nacional de San Martín), press articles (El Dipló, the Argentine edition of Le Monde diplomatique), and film and theater subtitles for festivals in France and Argentina.'
                : 'Traduzco textos de y al francés. Traduje contenidos educativos (UNICEF), libros (la marca editora), artículos académicos (UNSAM), notas de prensa (El Dipló - Le monde diplomatique Argentina), subtítulos de cine y teatro para festivales franceses y argentinos, y mucho más.'}
            </p>
          </div>

          <div className="w-full mb-8">
            <img
              src="/vigo3.jpg"
              alt="Ilusiones compartidas"
              className="w-full h-auto max-h-[440px] object-cover rounded-xl shadow-md border border-[#4D4D4D]/20 block"
            />
            <p className="text-right text-[11.5px] sm:text-[12.5px] text-[#4D4D4D]/70 leading-snug mt-2 font-normal">
              {isFr
                ? 'MAILARTWORK en quatre parties (2/4)'
                : isEn
                ? 'MAILARTWORK in four parts (2/4)'
                : 'MAILARTWORK en cuatro partes (2/4)'}
              <br />
              {isFr
                ? 'Edgardo Antonio Vigo, juillet 1976'
                : isEn
                ? 'Edgardo Antonio Vigo, July 1976'
                : 'Edgardo Antonio Vigo, julio 1976'}
            </p>
          </div>

          <div className="text-left mt-8 pt-6 border-t border-[#4D4D4D]/25">
            <h3 className="text-[#4D4D4D] text-[15px] sm:text-[17px] font-semibold uppercase tracking-[0.18em] mb-5">
              {isFr ? 'Articles et critiques' : isEn ? 'Articles and reviews' : 'Artículos y reseñas'}
            </h3>
            <div className="space-y-6">
              <article className="group">
                <a
                  href="https://farsamag.com/obras/los-amigos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#4D4D4D] hover:text-[#111111] transition-colors"
                >
                  <h4 className="text-[17px] sm:text-[19px] font-medium underline underline-offset-4 decoration-[#4D4D4D]/40 group-hover:decoration-[#4D4D4D]">
                    {isFr ? 'Los amigos, de Vivi Tellas' : isEn ? 'Los amigos, by Vivi Tellas' : 'Los amigos, de Vivi Tellas'}
                  </h4>
                </a>
                <p className="text-[14px] sm:text-[15.5px] text-[#4D4D4D]/85 mt-1">
                  <em>Farsa mag</em>, 27/09/2019
                </p>
              </article>

              <article className="group">
                <a
                  href="https://indiehoy.com/teatro/la-vida-extraordinaria-ponerle-cuerpo-al-enemigo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#4D4D4D] hover:text-[#111111] transition-colors"
                >
                  <h4 className="text-[17px] sm:text-[19px] font-medium underline underline-offset-4 decoration-[#4D4D4D]/40 group-hover:decoration-[#4D4D4D]">
                    {isFr
                      ? '« La vida extraordinaria » : Donner son corps à l’ennemi'
                      : isEn
                      ? '“La vida extraordinaria”: Putting (one’s) Body to the Enemy'
                      : '“La vida extraordinaria”: Ponerle (el) cuerpo al enemigo'}
                  </h4>
                </a>
                <p className="text-[14px] sm:text-[15.5px] text-[#4D4D4D]/85 mt-1">
                  <em>Indie Hoy</em>, 07/09/2018
                </p>
              </article>
            </div>
          </div>
        </>
      ),
    },
    4: {
      id: 4,
      colorRgb: '160, 160, 255',
      colorHex: '#A0A0FF',
      title: 'Fundar',
      subtitle: isFr ? 'RÉCITS NUMÉRIQUES' : isEn ? 'DIGITAL NARRATIVES' : 'NARRATIVAS DIGITALES',
      content: (
        <>
          <div className="text-left text-[#4D4D4D] leading-[1.7] text-[18px] sm:text-[20px] md:text-[22px] font-normal mb-8">
            <p className="mt-0">
              {isFr
                ? 'Je travaille au sein de l’équipe de communication de Fundar, un centre de recherche et de conception de politiques publiques œuvrant pour le développement durable de l’Amérique latine. J’y élabore des récits transmédia qui permettent à nos recherches d’atteindre de nouveaux publics, notamment à travers des scénarios web et audiovisuels, de l’UX writing, de l’édition de textes universitaires, des supports de presse et des contenus pour les réseaux sociaux.'
                : isEn
                ? 'I work on the Communications team at Fundar, a policy research and design organization promoting the sustainable development of Latin America. I build transmedia narratives that help our research reach new audiences, and my work includes web and audiovisual scripts, UX writing, academic editing, press materials, and social media content.'
                : 'Trabajo en el área de Comunicación de Fundar, un centro de investigación y diseño de políticas que promueve el desarrollo sostenible de América Latina, donde colaboro con narrativas transmediales para que las investigaciones alcancen nuevas audiencias. Desarrollo guiones web y audiovisuales, escritura UX, ediciones de textos académicos, textos para prensa, web y redes sociales.'}
            </p>
          </div>

          <div className="w-full mb-8">
            <img
              src="/Industria2030-Boomba.Inc.png"
              alt="Industria 2030 - Boomba.Inc"
              className="w-full h-auto max-h-[440px] object-cover rounded-xl shadow-md border border-[#4D4D4D]/20 block"
            />
            <p className="text-right text-[11.5px] sm:text-[12.5px] text-[#4D4D4D]/70 leading-snug mt-2 font-normal">
              {isFr
                ? 'La politique industrielle du XXIe siècle,'
                : isEn
                ? '21st Century Industrial Policy,'
                : 'La política industrial del siglo XXI,'}
              <br />
              <a
                href="https://www.instagram.com/boomba.inc/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#4D4D4D] transition-colors"
              >
                Boomba.Inc
              </a>{' '}
              {isFr
                ? 'pour l’annuaire de Fundar 2023'
                : isEn
                ? 'for the Fundar 2023 Annual Report'
                : 'para el anuario de Fundar 2023'}
            </p>
          </div>

          <div className="text-left text-[#4D4D4D] leading-[1.7] mb-8">
            <p className="text-[16px] sm:text-[17.5px] md:text-[19px] text-[#5C5C5C] leading-[1.6]">
              {isFr
                ? 'Je mobilise un parcours associant science politique, informatique et recherche universitaire à des années de formation en scénario et dramaturgie.'
                : isEn
                ? 'There, I put to work a background that combines politics, computing, and academic research with years of training in screenwriting and playwriting.'
                : 'Pongo en funcionamiento mis conocimientos de política, computación, investigación académica y los años estudiando guion y dramaturgia.'}
            </p>
          </div>

          <div className="text-left mt-10 pt-8 border-t border-[#4D4D4D]/25">
            <h3 className="text-[#4D4D4D] text-[15px] sm:text-[17px] font-semibold uppercase tracking-[0.18em] mb-6">
              {isFr ? 'Projets numériques' : isEn ? 'Digital projects' : 'Proyectos digitales'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6">
              {webProjects.map((project) => (
                <a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-white/45 hover:bg-white/75 backdrop-blur-sm border border-[#4D4D4D]/20 hover:border-[#4D4D4D]/50 rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md text-left"
                >
                  <div className="relative w-full aspect-[16/9] bg-black/5 overflow-hidden border-b border-[#4D4D4D]/15">
                    <img
                      src={project.imageUrl || `https://api.microlink.io?url=${encodeURIComponent(project.url)}&screenshot=true&embed=screenshot.url`}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-[#4D4D4D]/90 text-white text-[10px] tracking-wider uppercase font-medium px-2 py-0.5 rounded flex items-center gap-1 backdrop-blur-sm group-hover:bg-[#222222] transition-colors">
                      <span>{isFr ? 'VISITER' : isEn ? 'VISIT' : 'VISITAR'}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="inline-block text-[10px] tracking-wider uppercase font-semibold text-[#4D4D4D]/80 bg-[#4D4D4D]/10 px-2 py-0.5 rounded border border-[#4D4D4D]/15 mb-2">
                        {project.organization}
                      </span>
                      <h4 className="font-transmediale text-[16px] sm:text-[18px] font-medium text-[#222222] group-hover:text-black leading-snug mb-2">
                        {project.title}
                      </h4>
                      <p className="text-[14.5px] sm:text-[16px] font-normal text-[#1a1a1a] leading-snug">
                        {project.role}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#4D4D4D]/15">
                      <p className="text-[12.5px] sm:text-[13.5px] font-normal leading-relaxed text-[#4D4D4D]">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </>
      ),
    },
    5: {
      id: 5,
      colorRgb: '206, 125, 158',
      colorHex: '#CE7D9E',
      title: isFr ? 'Pratique sonore' : isEn ? 'Sound Practice' : 'Práctica Sonora',
      subtitle: isFr ? 'Musique et art sonore' : isEn ? 'Music and sound art' : 'Música y arte sonoro',
      content: (
        <>
          <div className="text-left mb-10 space-y-4">
            <p className="mt-0 text-[#4D4D4D] leading-[1.7] text-[18px] sm:text-[20px] md:text-[22px] font-normal">
              {isFr
                ? 'Je me développe dans différents environnements sonores : de la chanson à la musique électronique de club, en passant par l’art sonore, l’ambient et la musique pour l’audiovisuel. Je recherche le traitement en direct de sources sonores en quête de nouvelles résonances, de manière acoustique, analogique et numérique. Ma poétique part à la recherche de la nature et des relations qu’elle propose. Je développe actuellement des pièces collaboratives pour de multiples sources sonores.'
                : isEn
                ? 'I work across a range of sonic environments, from song to electronic club music, with stops along the way in sound art, ambient, and music for audiovisual media. I research the live processing of sound sources in search of new resonances, working acoustically, analogically, and digitally. My poetics seeks out nature and the kinds of relationships it proposes. I am currently developing collaborative pieces for multiple sound sources.'
                : 'Me desarrollo en distintos entornos sonoros: desde la canción a la música electrónica de club, con pasos por el arte sonoro, el ambient y la música para audiovisual. Investigo el procesamiento en vivo de fuentes de sonido en busca de nuevas resonancias, de manera acústica, analógica y digital. Mi poética va en busca de la naturaleza y sus propuestas de relación. Actualmente me encuentro desarrollando piezas colaborativas para múltiples fuentes de sonido.'}
            </p>
            <p className="text-[16px] sm:text-[17.5px] md:text-[19px] text-[#5C5C5C] leading-[1.6]">
              {isFr
                ? 'J’ai fait partie du Laboratorio de Sonido du Centro Cultural Borges, dirigé par Guillermina Etkin (2026), et de la deuxième cohorte du Laboratorio de Investigaciones Quebradas de Azotea, dirigé par Víctor López Zumelzu avec Martín Touzón (2026).'
                : isEn
                ? 'I was part of the Sound Laboratory at Centro Cultural Borges, directed by Guillermina Etkin (2026), and of the Quebradas de Azotea Research Laboratory, directed by Víctor López Zumelzu alongside Martín Touzón (2026).'
                : 'Formé parte del Laboratorio de Sonido del Centro Cultural Borges dirigido por Guillermina Etkin (2026) y de la segunda cohorte del Laboratorio de Investigaciones Quebradas de Azotea dirigido por Victor López Zumelzu junto a Martín Touzón (2026).'}
            </p>
          </div>

          <div className="text-left mt-10 pt-8 border-t border-[#4D4D4D]/25">
            <h3 className="text-[#4D4D4D] text-[15px] sm:text-[17px] font-semibold uppercase tracking-[0.18em] mb-6">
              {isFr ? 'Pièces et enregistrements sonores' : isEn ? 'Sound pieces and records' : 'Piezas y registros sonoros'}
            </h3>
            {/* Mobile: 1 column */}
            <div className="flex md:hidden flex-col gap-6 pb-6">
              {musicEmbeds.map(renderMusicCard)}
            </div>

            {/* Tablet & Desktop: 2 independent columns, constant gap-6, naturally staggered */}
            <div className="hidden md:flex items-start gap-6 pb-6">
              <div className="flex-1 flex flex-col gap-6">
                {musicEmbeds.filter((_, idx) => idx % 2 === 0).map(renderMusicCard)}
              </div>
              <div className="flex-1 flex flex-col gap-6">
                {musicEmbeds.filter((_, idx) => idx % 2 === 1).map(renderMusicCard)}
              </div>
            </div>
          </div>
        </>
      ),
    },
  };
};

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [isMuted, setIsMuted] = useState(true);
  const [musicIndex, setMusicIndex] = useState(0);
  const [isWordBlurred, setIsWordBlurred] = useState(false);
  const [activePopupId, setActivePopupId] = useState<number | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [hasOpenedPopup, setHasOpenedPopup] = useState<boolean>(() => {
    try {
      return localStorage.getItem('has_opened_popup') === 'true';
    } catch {
      return false;
    }
  });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showClickHint, setShowClickHint] = useState(false);
  const hasClickedTextRef = useRef(false);
  const lensTimerRef = useRef<any>(null);

  const popupSections = useMemo(() => getPopupSections(lang), [lang]);
  const musicDisciplines =
    lang === 'fr'
      ? MUSIC_DISCIPLINES_FR
      : lang === 'es'
      ? MUSIC_DISCIPLINES_ES
      : MUSIC_DISCIPLINES_EN;

  // Show "CLIC AL TEXTO" hint 10s after landing ONLY if user hasn't opened any popup yet
  useEffect(() => {
    if (hasOpenedPopup) return;
    const timer = setTimeout(() => {
      try {
        if (localStorage.getItem('has_opened_popup') === 'true') {
          return;
        }
      } catch {}
      if (!hasClickedTextRef.current) {
        setShowClickHint(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [hasOpenedPopup]);

  const openPopup = (id: number) => {
    hasClickedTextRef.current = true;
    setHasOpenedPopup(true);
    setShowClickHint(false);
    try {
      localStorage.setItem('has_opened_popup', 'true');
    } catch {}
    setActivePopupId(id);
    requestAnimationFrame(() => {
      setIsPopupVisible(true);
    });
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setTimeout(() => {
      setActivePopupId(null);
    }, 400);
  };

  // Close popup with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cycle through music disciplines with blur-out and focus-in effect
  useEffect(() => {
    let timeoutId: any = null;
    const interval = setInterval(() => {
      // 1. Blur out current text
      setIsWordBlurred(true);

      // 2. Switch text at peak blur and focus back in
      timeoutId = setTimeout(() => {
        setMusicIndex((prev) => (prev + 1) % 5);
        setIsWordBlurred(false);
      }, 450);
    }, 2800);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const targetRadiusRef = useRef(0);
  const currentRadiusRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  const playerRef = useRef<any>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // Smoothly animate focus radius expanding from 0 to 300px on entry and collapsing on exit
  const animateRadius = useCallback(() => {
    const diff = targetRadiusRef.current - currentRadiusRef.current;
    if (Math.abs(diff) > 0.4) {
      currentRadiusRef.current += diff * 0.11; // Fluid organic spring expansion
      const r = Math.max(0, currentRadiusRef.current);
      if (mainContainerRef.current) {
        mainContainerRef.current.style.setProperty('--lens-radius', `${r.toFixed(1)}px`);
        mainContainerRef.current.style.setProperty('--lens-core', `${(r * 0.45).toFixed(1)}px`);
      }
      rafIdRef.current = requestAnimationFrame(animateRadius);
    } else {
      currentRadiusRef.current = targetRadiusRef.current;
      if (mainContainerRef.current) {
        mainContainerRef.current.style.setProperty(
          '--lens-radius',
          `${currentRadiusRef.current.toFixed(1)}px`
        );
        mainContainerRef.current.style.setProperty(
          '--lens-core',
          `${(currentRadiusRef.current * 0.45).toFixed(1)}px`
        );
      }
      rafIdRef.current = null;
    }
  }, []);

  const setTargetRadius = useCallback(
    (target: number) => {
      targetRadiusRef.current = target;
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(animateRadius);
      }
    },
    [animateRadius]
  );

  // Mouse / Touch movement tracking with animated expansion
  const handleUserMovement = useCallback(
    (clientX: number, clientY: number) => {
      if (mainContainerRef.current) {
        mainContainerRef.current.style.setProperty('--mouse-x', `${clientX}px`);
        mainContainerRef.current.style.setProperty('--mouse-y', `${clientY}px`);
      }

      setTargetRadius(TARGET_RADIUS);

      if (lensTimerRef.current) {
        clearTimeout(lensTimerRef.current);
      }

      // When the mouse stops moving for 2 seconds, gradually blur back and collapse radius
      lensTimerRef.current = setTimeout(() => {
        setTargetRadius(0);
      }, 2000);
    },
    [setTargetRadius]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      handleUserMovement(e.clientX, e.clientY);
    },
    [handleUserMovement]
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      handleUserMovement(e.clientX, e.clientY);
    },
    [handleUserMovement]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      if (touch) {
        handleUserMovement(touch.clientX, touch.clientY);
      }
    },
    [handleUserMovement]
  );

  const handleMouseLeave = useCallback(() => {
    if (lensTimerRef.current) {
      clearTimeout(lensTimerRef.current);
    }
    // Gradual re-blur and collapse radius when cursor leaves the window
    setTargetRadius(0);
  }, [setTargetRadius]);

  useEffect(() => {
    return () => {
      if (lensTimerRef.current) clearTimeout(lensTimerRef.current);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Initialize single master YouTube background player (Zero controls, fully muted by default, loops seamlessly)
  useEffect(() => {
    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      if (!playerRef.current && document.getElementById('youtube-bg-player')) {
        playerRef.current = new window.YT.Player('youtube-bg-player', {
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
            modestbranding: 1,
            iv_load_policy: 3,
            disablekb: 1,
            playsinline: 1,
            fs: 0,
            cc_load_policy: 0,
            autohide: 1,
            vq: 'highres',
            suggestedQuality: 'highres',
            origin: window.location.origin,
            widget_referrer: window.location.origin,
            enablejsapi: 1,
          },
          events: {
            onReady: (event: any) => {
              try {
                event.target.mute();
                setMaxQuality(event.target);
                event.target.playVideo();
              } catch {
                // Ignore
              }
            },
            onStateChange: (event: any) => {
              if (event.data === 1) {
                // Video is actively playing
                setIsVideoPlaying(true);
                setMaxQuality(event.target);
              } else if (event.data === -1) {
                setMaxQuality(event.target);
              }
              // If video ends, seamlessly loop without seeking
              if (event.data === (window.YT?.PlayerState?.ENDED ?? 0)) {
                try {
                  event.target.playVideo();
                } catch {
                  // Ignore
                }
              }
              // Prevent YouTube from staying in paused state where it would show pause/seek controls
              if (event.data === (window.YT?.PlayerState?.PAUSED ?? 2)) {
                try {
                  event.target.playVideo();
                } catch {
                  // Ignore
                }
              }
            },
            onPlaybackQualityChange: (event: any) => {
              setMaxQuality(event.target);
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.async = true;
        document.head.appendChild(tag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === 'function') {
          prevCallback();
        }
        initPlayer();
      };
    }

    return () => {
      try {
        playerRef.current?.destroy?.();
        playerRef.current = null;
      } catch {
        // Ignore
      }
    };
  }, []);

  const toggleSound = useCallback(() => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (playerRef.current) {
      try {
        setMaxQuality(playerRef.current);
        if (nextMuted) {
          playerRef.current.mute?.();
        } else {
          playerRef.current.unMute?.();
          playerRef.current.setVolume?.(100);
          playerRef.current.playVideo?.();
        }
      } catch (e) {
        console.warn('Player command error:', e);
      }
    }
  }, [isMuted]);

  return (
    <div
      ref={mainContainerRef}
      className="relative w-screen h-screen overflow-hidden bg-black select-none cursor-default"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        if (touch) handleUserMovement(touch.clientX, touch.clientY);
      }}
      onTouchMove={handleTouchMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          '--mouse-x': '-1000px',
          '--mouse-y': '-1000px',
          '--lens-radius': '0px',
          '--lens-core': '0px',
        } as React.CSSProperties
      }
    >

      {/* 1. LAYER 1 (VIDEO BACKGROUND): Single master sharp high-res video, scaled to hide YouTube UI edges */}
      <div
        id="youtube-player-wrapper"
        className={`fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 flex items-center justify-center bg-black video-wrapper select-none transition-opacity duration-700 ${
          isVideoPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
        tabIndex={-1}
      >
        <div
          className="absolute top-1/2 left-1/2 pointer-events-none select-none"
          style={{
            width: 'max(100vw, 177.78vh)',
            height: 'max(56.25vw, 100vh)',
            transform: 'translate(-50%, -50%) scale(1.38)',
            transformOrigin: 'center center',
          }}
        >
          <div id="youtube-bg-player" className="w-full h-full pointer-events-none" tabIndex={-1} />
        </div>
      </div>

      {/* 2. LAYER 2 (LENS BLUR MASK): Fullscreen 30px backdrop blur with circular cutout revealing sharp video under cursor */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-10 select-none"
        aria-hidden="true"
        style={{
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          maskImage:
            'radial-gradient(circle var(--lens-radius, 0px) at var(--mouse-x, -1000px) var(--mouse-y, -1000px), transparent 0%, transparent var(--lens-core, 0px), black var(--lens-radius, 0px))',
          WebkitMaskImage:
            'radial-gradient(circle var(--lens-radius, 0px) at var(--mouse-x, -1000px) var(--mouse-y, -1000px), transparent 0%, transparent var(--lens-core, 0px), black var(--lens-radius, 0px))',
          willChange: 'mask-image',
        }}
      />

      {/* Subtle organic film grain texture overlay */}
      <div className="fixed inset-0 z-15 pointer-events-none opacity-20" aria-hidden="true">
        <div className="absolute inset-0 noise-texture mix-blend-overlay" />
      </div>

      {/* 3. INTERACTION SHIELD: Absorbs any background click/touch so NO gesture ever interacts with the YouTube player */}
      <div
        className="fixed inset-0 z-20 pointer-events-auto bg-transparent select-none"
        aria-hidden="true"
      />

      {/* Header with left-aligned "Juan Abadi", centered audio button, and right-aligned ES | EN button */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 pt-4 sm:pt-5 pointer-events-none">
        {/* Left: "Juan Abadi" in transmediale typography */}
        <div className="pointer-events-auto select-none flex items-center">
          <span className="font-transmediale text-sm sm:text-base font-semibold text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Juan Abadi
          </span>
        </div>

        {/* Center: SONIDO / SOUND toggle button */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 sm:top-5 pointer-events-none flex items-center">
          <button
            type="button"
            role="switch"
            aria-checked={!isMuted}
            onClick={toggleSound}
            aria-label={
              lang === 'fr'
                ? isMuted
                  ? 'Activer le son'
                  : 'Couper le son'
                : lang === 'es'
                ? isMuted
                  ? 'Activar sonido'
                  : 'Desactivar sonido'
                : isMuted
                  ? 'Unmute sound'
                  : 'Mute sound'
            }
            className="
              pointer-events-auto
              inline-flex items-center gap-2
              bg-white/30 hover:bg-white/45
              backdrop-blur-md
              border border-white/25 hover:border-white/40
              rounded-full
              px-3 py-1
              shadow-lg
              cursor-pointer
              select-none
              transition-all duration-200 ease-out
              active:scale-95
              focus:outline-none focus:ring-1 focus:ring-black/40
            "
          >
            {/* Label in same typography as 'Juan Abadi' */}
            <span
              className={`
                font-transmediale text-[11px] font-semibold tracking-wider uppercase leading-none transition-colors duration-200
                ${isMuted ? 'text-black/70' : 'text-black'}
              `}
            >
              {lang === 'fr' ? 'SON' : lang === 'es' ? 'SONIDO' : 'SOUND'}
            </span>

            {/* Sliding Switch Pill */}
            <div
              className={`
                relative w-6 h-3 rounded-full flex items-center p-[2px] transition-colors duration-200
                ${isMuted ? 'bg-black/20' : 'bg-black'}
              `}
            >
              <div
                className={`
                  w-2 h-2
                  rounded-full
                  transition-all duration-200 ease-out
                  ${isMuted ? 'translate-x-0 bg-neutral-600' : 'translate-x-2.5 bg-white'}
                `}
              />
            </div>
          </button>
        </div>

        {/* Right: Language switch button ES | EN | FR - letras sobre el fondo solamente, sin fondo ni redondeado */}
        <div className="pointer-events-auto select-none flex items-center">
          <div
            className="
              pointer-events-auto
              inline-flex items-center
              p-1
              select-none
            "
            aria-label="ES | EN | FR"
          >
            <span className="font-transmediale text-[11px] sm:text-[12px] font-semibold tracking-wider uppercase leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] flex items-center">
              <button
                type="button"
                onClick={() => setLang('es')}
                className={`transition-colors duration-200 cursor-pointer focus:outline-none ${
                  lang === 'es' ? 'text-white' : 'text-white/45 hover:text-white/80'
                }`}
                title="Español"
              >
                ES
              </button>
              <span className="text-white/35 mx-1 font-light select-none">|</span>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`transition-colors duration-200 cursor-pointer focus:outline-none ${
                  lang === 'en' ? 'text-white' : 'text-white/45 hover:text-white/80'
                }`}
                title="English"
              >
                EN
              </button>
              <span className="text-white/35 mx-1 font-light select-none">|</span>
              <button
                type="button"
                onClick={() => setLang('fr')}
                className={`transition-colors duration-200 cursor-pointer focus:outline-none ${
                  lang === 'fr' ? 'text-white' : 'text-white/45 hover:text-white/80'
                }`}
                title="Français"
              >
                FR
              </button>
            </span>
          </div>
        </div>
      </header>

      {/* Centered statement text in transmediale typography with sentence spray hover effects */}
      <main className="fixed inset-0 z-30 flex items-center justify-center p-6 sm:p-8 lg:p-12 pointer-events-none">
        <div className="relative w-full max-w-[670px] md:max-w-[745px] lg:max-w-[880px] xl:max-w-[980px] 2xl:max-w-[1040px] pointer-events-auto select-text px-4 sm:px-6">
          <p className="font-transmediale text-center text-white text-[18px] sm:text-[20px] md:text-[22.5px] lg:text-[26.5px] xl:text-[29.5px] leading-[1.68] sm:leading-[1.72] lg:leading-[1.68] xl:leading-[1.68] tracking-wide font-normal drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            <span
              className="spray-highlight spray-1"
              onClick={() => openPopup(1)}
              role="button"
              tabIndex={0}
            >
              {lang === 'fr' ? (
                <>
                  Mes recherches s’étendent de la poésie baroque{' '}
                  <span className="whitespace-nowrap">
                    latino-américaine{' '}
                    <img
                      src="/sjdetalle2.jpg"
                      alt="Sor Juana Inés de la Cruz"
                      className="inline-block h-[1.15em] w-auto aspect-[349/215] align-[-0.15em] rounded-[2px] shadow-sm object-cover"
                    />
                  </span>{' '}
                  à l’art{' '}
                  <span className="whitespace-nowrap">
                    contemporain.{' '}
                    <img
                      src="/laufer.gif"
                      alt="Milton Läufer"
                      className="inline-block h-[1.15em] w-auto aspect-[349/215] align-[-0.15em] rounded-[2px] shadow-sm object-cover"
                    />
                  </span>
                </>
              ) : lang === 'es' ? (
                <>
                  Investigo desde la poesía barroca{' '}
                  <span className="whitespace-nowrap">
                    latinoamericana{' '}
                    <img
                      src="/sjdetalle2.jpg"
                      alt="Sor Juana Inés de la Cruz"
                      className="inline-block h-[1.15em] w-auto aspect-[349/215] align-[-0.15em] rounded-[2px] shadow-sm object-cover"
                    />
                  </span>{' '}
                  hacia el arte{' '}
                  <span className="whitespace-nowrap">
                    contemporáneo.{' '}
                    <img
                      src="/laufer.gif"
                      alt="Milton Läufer"
                      className="inline-block h-[1.15em] w-auto aspect-[349/215] align-[-0.15em] rounded-[2px] shadow-sm object-cover"
                    />
                  </span>
                </>
              ) : (
                <>
                  My research moves from Latin American Baroque{' '}
                  <span className="whitespace-nowrap">
                    poetry{' '}
                    <img
                      src="/sjdetalle2.jpg"
                      alt="Sor Juana Inés de la Cruz"
                      className="inline-block h-[1.15em] w-auto aspect-[349/215] align-[-0.15em] rounded-[2px] shadow-sm object-cover"
                    />
                  </span>{' '}
                  towards contemporary{' '}
                  <span className="whitespace-nowrap">
                    art.{' '}
                    <img
                      src="/laufer.gif"
                      alt="Milton Läufer"
                      className="inline-block h-[1.15em] w-auto aspect-[349/215] align-[-0.15em] rounded-[2px] shadow-sm object-cover"
                    />
                  </span>
                </>
              )}
            </span>{' '}
            <span
              className="spray-highlight spray-3"
              onClick={() => openPopup(3)}
              role="button"
              tabIndex={0}
            >
              {lang === 'fr' ? (
                <>
                  J'écris dans la presse culture et j’entretiens une correspondance publique avec des <span className="whitespace-nowrap">artistes.{' '}<img
                      src="/vigo3detalle2.png"
                      alt="Ilusiones compartidas"
                      className="inline-block h-[1.15em] w-auto aspect-[349/215] align-[-0.15em] rounded-[2px] shadow-sm object-cover"
                    />
                  </span>
                </>
              ) : lang === 'es' ? (
                <>
                  Escribo sobre cultura y sostengo una correspondencia pública con artistas en <i>Ilusiones</i>{' '}
                  <span className="whitespace-nowrap">
                    <i>compartidas</i>.{' '}
                    <img
                      src="/vigo3detalle2.png"
                      alt="Ilusiones compartidas"
                      className="inline-block h-[1.15em] w-auto aspect-[349/215] align-[-0.15em] rounded-[2px] shadow-sm object-cover"
                    />
                  </span>
                </>
              ) : (
                <>
                  I write about culture and keep up a public correspondence with <span className="whitespace-nowrap">artists.
                  {' '}
                    <img
                      src="/vigo3detalle2.png"
                      alt="Ilusiones compartidas"
                      className="inline-block h-[1.15em] w-auto aspect-[349/215] align-[-0.15em] rounded-[2px] shadow-sm object-cover"
                    />
                  </span>
                </>
              )}
            </span>{' '}
            <span
              className="spray-highlight spray-4"
              onClick={() => openPopup(4)}
              role="button"
              tabIndex={0}
            >
              {lang === 'fr' ? (
                <>
                  Je conçois des récits numériques chez Fundar, un laboratoire d’idées pour le développement durable de l’Amérique{' '}
                  <span className="whitespace-nowrap">
                    latine.{' '}
                    <img
                      src="/industriadetalle2.png"
                      alt="Boomba.inc"
                      className="inline-block h-[1.15em] w-auto aspect-[349/215] align-[-0.15em] rounded-[2px] shadow-sm object-cover"
                    />
                  </span>
                </>
              ) : lang === 'es' ? (
                <>
                  Diseño narrativas digitales en Fundar, un laboratorio de políticas para el desarrollo sostenible de América{' '}
                  <span className="whitespace-nowrap">
                    Latina.{' '}
                    <img
                      src="/industriadetalle2.png"
                      alt="Boomba.inc"
                      className="inline-block h-[1.15em] w-auto aspect-[349/215] align-[-0.15em] rounded-[2px] shadow-sm object-cover"
                    />
                  </span>
                </>
              ) : (
                <>
                  I design digital storytelling projects at Fundar, a think tank for the sustainable development of Latin{' '}
                  <span className="whitespace-nowrap">
                    America.{' '}
                    <img
                      src="/industriadetalle2.png"
                      alt="Boomba.inc"
                      className="inline-block h-[1.15em] w-auto aspect-[349/215] align-[-0.15em] rounded-[2px] shadow-sm object-cover"
                    />
                  </span>
                </>
              )}
            </span>{' '}
            <span
              className="spray-highlight spray-5 whitespace-nowrap"
              onClick={() => openPopup(5)}
              role="button"
              tabIndex={0}
            >
              {lang === 'fr' ? 'Je fais\u00A0' : lang === 'es' ? 'Hago\u00A0' : 'I make\u00A0'}
              <span className="inline-grid text-left align-baseline">
                <span
                  className="invisible pointer-events-none select-none row-start-1 col-start-1"
                  aria-hidden="true"
                >
                  {lang === 'fr'
                    ? 'de la musique expérimentale.'
                    : lang === 'es'
                    ? 'música experimental.'
                    : 'experimental music.'}
                </span>
                <span
                  className="row-start-1 col-start-1 transition-all duration-500 ease-in-out whitespace-nowrap"
                  style={{
                    filter: isWordBlurred ? 'blur(8px)' : 'blur(0px)',
                    opacity: isWordBlurred ? 0.2 : 1,
                    transform: isWordBlurred ? 'scale(0.96)' : 'scale(1)',
                  }}
                >
                  {musicDisciplines[musicIndex]}
                </span>
              </span>
            </span>
          </p>

          {/* Hint: CLIC AL TEXTO (en su propia caja independiente y absoluta, sin desplazar el párrafo) */}
          {showClickHint && !hasOpenedPopup && !hasClickedTextRef.current && activePopupId === null && (
            <div
              className="absolute top-full left-0 right-0 mt-5 sm:mt-7 flex justify-center pointer-events-none select-none animate-hint-pulse"
              aria-hidden="true"
            >
              <span className="font-transmediale text-[11px] font-semibold tracking-wider uppercase leading-none text-white/30 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                {lang === 'fr' ? 'CLIQUEZ SUR LE TEXTE' : lang === 'es' ? 'CLIC AL TEXTO' : 'CLICK THE TEXT'}
              </span>
            </div>
          )}
        </div>
      </main>

      {/* Footer: Social & contact icons (primer ícono: sobre de mail con mailto) */}
      <footer className="fixed bottom-5 sm:bottom-7 inset-x-0 z-30 flex justify-center pointer-events-none select-none">
        <div className="pointer-events-auto flex items-center gap-3.5 sm:gap-4">
          {/* 1. Mail icon link */}
          <a
            href="mailto:juanabadi@gmail.com"
            className="p-1 text-white/55 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
            title="juanabadi@gmail.com"
            aria-label="Email"
          >
            <svg
              className="w-4 h-4 sm:w-[17px] sm:h-[17px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>

          {/* 2. Instagram */}
          <a
            href="https://www.instagram.com/_juan_abadi/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-white/55 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
            title="Instagram @_juan_abadi"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4 sm:w-[17px] sm:h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* 3. Bandcamp / Music */}
          <a
            href="https://jnau.bandcamp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-white/55 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
            title="Bandcamp jnau"
            aria-label="Bandcamp"
          >
            <svg
              className="w-4 h-4 sm:w-[17px] sm:h-[17px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" fill="currentColor" />
              <circle cx="18" cy="16" r="3" fill="currentColor" />
            </svg>
          </a>

          {/* 4. YouTube */}
          <a
            href="https://www.youtube.com/@jnau.u.u"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-white/55 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
            title="YouTube @jnau.u.u"
            aria-label="YouTube"
          >
            <svg className="w-4 h-4 sm:w-[17px] sm:h-[17px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>

          {/* 5. LinkedIn */}
          <a
            href="https://www.linkedin.com/in/juanabadi/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-white/55 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
            title="LinkedIn Juan Abadi"
            aria-label="LinkedIn"
          >
            <svg className="w-4 h-4 sm:w-[17px] sm:h-[17px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          {/* 6. Substack */}
          <a
            href="https://ilusionescompartidas.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-white/55 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
            title="Substack Ilusiones Compartidas"
            aria-label="Substack"
          >
            <svg className="w-4 h-4 sm:w-[17px] sm:h-[17px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
            </svg>
          </a>
        </div>
      </footer>

      {/* Fullscreen Pop-up Modal covering the entire screen in matching color */}
      {activePopupId !== null && popupSections[activePopupId] && (() => {
        const activePopup = popupSections[activePopupId];
        return (
          <div
            className={`fixed inset-0 z-50 w-full h-[100dvh] flex flex-col overflow-hidden transition-all duration-500 ease-out select-text ${
              isPopupVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
            style={{
              backgroundColor: activePopup.colorHex,
            }}
          >
            {/* Header: Subtitle and Close button, fixed/sticky at the top */}
            <header
              className="sticky top-0 z-30 w-full px-6 sm:px-12 md:px-16 pt-6 sm:pt-10 pb-4 flex items-center justify-between shrink-0 transition-colors"
              style={{
                backgroundColor: activePopup.colorHex,
              }}
            >
              <span className={`font-transmediale ${activePopup.id === 1 ? 'text-[#222222]' : 'text-[#4D4D4D]'} text-[11px] sm:text-[13px] uppercase tracking-[0.25em] font-medium opacity-90`}>
                {activePopup.subtitle}
              </span>
              <button
                onClick={closePopup}
                className={`p-2 sm:p-2.5 rounded-full ${activePopup.id === 1 ? 'text-[#222222] hover:text-black' : 'text-[#4D4D4D] hover:text-[#111111]'} hover:bg-black/10 transition-all duration-200 focus:outline-none cursor-pointer`}
                title={lang === 'fr' ? 'Fermer' : lang === 'es' ? 'Cerrar' : 'Close'}
                aria-label={lang === 'fr' ? 'Fermer le modal' : lang === 'es' ? 'Cerrar modal' : 'Close modal'}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke={activePopup.id === 1 ? '#222222' : '#4D4D4D'} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>

            {/* Scrollable central content area */}
            <main className="flex-1 w-full overflow-y-auto px-6 sm:px-12 md:px-16 pb-20 flex flex-col items-center custom-circle-scroll">
              <div className="w-full max-w-[760px] text-center py-6 sm:py-10">
                <div className={`font-transmediale ${activePopup.id === 1 ? 'text-[#222222]' : 'text-[#4D4D4D]'} font-normal leading-[1.75]`}>
                  {activePopup.content}
                </div>
              </div>
            </main>
          </div>
        );
      })()}
    </div>
  );
}
