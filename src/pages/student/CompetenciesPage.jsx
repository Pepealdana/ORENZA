import { Target } from 'lucide-react';
import studentData from '../../data/studentData';
import CompetencyList from '../../components/competencies/CompetencyList/CompetencyList';
import { getAllCompetencyStats } from '../../utils/competencyUtils';
import styles from './CompetenciesPage.module.css';

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
      <CompetencyList competencies={competencyStats} />
    </section>
  );
}
export default CompetenciesPage;
