import { Target } from 'lucide-react';
import studentData from '../../data/studentData';
import CompetencyList from '../../components/competencies/CompetencyList/CompetencyList';
import { getAllCompetencyStats } from '../../utils/competencyUtils';
import styles from './CompetenciesPage.module.css';
import personalIcon from '../../assets/illustrations/icons/personal.png';
import emocionalIcon from '../../assets/illustrations/icons/emocional.png';
import cognitivaIcon from '../../assets/illustrations/icons/cognitiva.png';
import socialIcon from '../../assets/illustrations/icons/social.png';
import academicaIcon from '../../assets/illustrations/icons/academica.png';
import bienestarIcon from '../../assets/illustrations/icons/bienestar.png';
import aprendizajeIcon from '../../assets/illustrations/icons/aprendizaje.png';
import exploracionIcon from '../../assets/illustrations/icons/exploracion.png';
import personalFallback from '../../assets/illustrations/personal.svg';
import emocionalFallback from '../../assets/illustrations/emocional.svg';
import cognitivaFallback from '../../assets/illustrations/cognitiva.svg';
import socialFallback from '../../assets/illustrations/social.svg';
import academicaFallback from '../../assets/illustrations/academica.svg';
import bienestarFallback from '../../assets/illustrations/bienestar.svg';
import aprendizajeFallback from '../../assets/illustrations/aprendizaje.svg';
import exploracionFallback from '../../assets/illustrations/exploracion.svg';
import IdentityVisual from '../../components/visual/IdentityVisual';
import SafeImage from '../../components/ui/SafeImage/SafeImage';

const competencyIcons = {
  autoconocimiento: personalIcon,
  autorregulacion: emocionalIcon,
  empatia: socialIcon,
  relaciones: socialIcon,
};

const competencyIconFallbacks = {
  autoconocimiento: personalFallback,
  autorregulacion: emocionalFallback,
  empatia: socialFallback,
  relaciones: socialFallback,
};

const dimensions = [
  ['Emocional', emocionalIcon, emocionalFallback],
  ['Cognitiva', cognitivaIcon, cognitivaFallback],
  ['Social', socialIcon, socialFallback],
  ['Personal', personalIcon, personalFallback],
  ['Académica', academicaIcon, academicaFallback],
  ['Bienestar', bienestarIcon, bienestarFallback],
  ['Aprendizaje', aprendizajeIcon, aprendizajeFallback],
  ['Exploración', exploracionIcon, exploracionFallback],
];

function CompetenciesPage() {
  const { competencies } = studentData;
  const competencyStats = getAllCompetencyStats(competencies);

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerIcon}><Target size={24} strokeWidth={1.8} aria-hidden="true" /></div>
        <div>
          <p className={styles.eyebrow}>Tu recorrido</p>
          <h1 className={styles.title}>Mis competencias</h1>
          <p className={styles.description}>Explora tus habilidades socioemocionales y reconoce el proceso que estás construyendo.</p>
        </div>
      </header>
      <section className={styles.introCard}>
        <p><strong>Tu progreso es personal.</strong> Las experiencias que realizas te ayudan a explorar diferentes competencias. No se trata de competir ni de alcanzar una calificación.</p>
      </section>
      <IdentityVisual variant="competencias" />
      <div className={styles.competencyVisual}><div><strong>Explora diferentes dimensiones de ti</strong><span>Tu proceso puede incluir lo emocional, personal, social y otras áreas de crecimiento.</span></div><div className={styles.dimensionGrid}>{dimensions.map(([label, icon, fallback]) => <div key={label} className={styles.dimension}><SafeImage className={styles.dimensionIcon} src={icon} fallback={fallback} alt="" /><span>{label}</span></div>)}</div></div>
      <CompetencyList competencies={competencyStats} iconMap={competencyIcons} iconFallbackMap={competencyIconFallbacks} />
    </section>
  );
}
export default CompetenciesPage;
