import { Link, useParams } from 'react-router-dom';

import studentData from '../../data/studentData';

import ProgressBar from '../../components/ui/ProgressBar/ProgressBar';

import styles from './CompetencyDetailPage.module.css';

function CompetencyDetailPage() {
  const { competencyId } = useParams();

  const competencyIndex = studentData.competencies.findIndex(
  (item) => item.id === competencyId
);

const competency = studentData.competencies[competencyIndex];

  if (!competency) {
    return (
      <section className={styles.page}>
        <h1 className={styles.title}>
          Competencia no encontrada
        </h1>

        <p className={styles.description}>
          La competencia que intentas consultar no existe.
        </p>

        <Link
          to="/estudiante/competencias"
          className={styles.backLink}
        >
          Volver a competencias
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <Link
        to="/estudiante/competencias"
        className={styles.backLink}
      >
        ← Volver a competencias
      </Link>

      <header className={styles.header}>
        <p className={styles.eyebrow}>
          Competencia socioemocional
        </p>

        <h1 className={styles.title}>
          {competency.name}
        </h1>

        <p className={styles.description}>
          Consulta tu progreso actual en esta competencia.
        </p>
      </header>

      <section className={styles.progressCard}>
        <div className={styles.progressHeader}>
          <h2>Tu progreso</h2>

          <span className={styles.percentage}>
            {competency.progress}%
          </span>
        </div>

        <ProgressBar
          value={competency.progress}
          showValue={false}
          label={`Progreso en ${competency.name}`}
        />

        <nav className={styles.navigation} aria-label="Navegación entre competencias">
  {competencyIndex > 0 ? (
    <Link
      to={`/estudiante/competencias/${studentData.competencies[competencyIndex - 1].id}`}
      className={styles.navigationLink}
    >
      ← Anterior
    </Link>
  ) : (
    <span />
  )}

  {competencyIndex < studentData.competencies.length - 1 ? (
    <Link
      to={`/estudiante/competencias/${studentData.competencies[competencyIndex + 1].id}`}
      className={styles.navigationLink}
    >
      Siguiente →
    </Link>
  ) : (
    <span />
  )}
</nav>
      </section>
    </section>
  );
}

export default CompetencyDetailPage;