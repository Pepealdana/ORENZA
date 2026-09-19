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
import IdentityVisual from '../../components/visual/IdentityVisual';

const competencyIcons = {
  autoconocimiento: personalIcon,
  autorregulacion: emocionalIcon,
  empatia: socialIcon,
  relaciones: socialIcon,
};

const dimensions = [
  ['Emocional', emocionalIcon],
  ['Cognitiva', cognitivaIcon],
  ['Social', socialIcon],
  ['Personal', personalIcon],
  ['Académica', academicaIcon],
  ['Bienestar', bienestarIcon],
  ['Aprendizaje', aprendizajeIcon],
  ['Exploración', exploracionIcon],
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
      <div className={styles.competencyVisual}><div><strong>Explora diferentes dimensiones de ti</strong><span>Tu proceso puede incluir lo emocional, personal, social y otras áreas de crecimiento.</span></div><div className={styles.dimensionGrid}>{dimensions.map(([label, icon]) => <div key={label} className={styles.dimension}><img className={styles.dimensionIcon} src={icon} alt="" aria-hidden="true" /><span>{label}</span></div>)}</div></div>
      <CompetencyList competencies={competencyStats} iconMap={competencyIcons} />
    </section>
  );
}
export default CompetenciesPage;
