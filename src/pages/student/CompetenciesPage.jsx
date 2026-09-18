import { Target } from 'lucide-react';
import studentData from '../../data/studentData';
import CompetencyList from '../../components/competencies/CompetencyList/CompetencyList';
import { getAllCompetencyStats } from '../../utils/competencyUtils';
import styles from './CompetenciesPage.module.css';
import personalIcon from '../../assets/illustrations/personal.svg';
import emocionalIcon from '../../assets/illustrations/emocional.svg';
import cognitivaIcon from '../../assets/illustrations/cognitiva.svg';
import socialIcon from '../../assets/illustrations/social.svg';
import academicaIcon from '../../assets/illustrations/academica.svg';
import bienestarIcon from '../../assets/illustrations/bienestar.svg';
import aprendizajeIcon from '../../assets/illustrations/aprendizaje.svg';
import exploracionIcon from '../../assets/illustrations/exploracion.svg';
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
      <div className={styles.competencyVisual}><div><strong>Explora diferentes dimensiones de ti</strong><span>Tu proceso puede incluir lo emocional, personal, social y otras áreas de crecimiento.</span></div><div className={styles.dimensionGrid}>{dimensions.map(([label, icon]) => <div key={label} className={styles.dimension}><img src={icon} alt="" aria-hidden="true" /><span>{label}</span></div>)}</div></div>
      <CompetencyList competencies={competencyStats} iconMap={competencyIcons} />
    </section>
  );
}
export default CompetenciesPage;
