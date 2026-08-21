import { Link } from 'react-router-dom';

import ProgressBar from '../../ui/ProgressBar/ProgressBar';

import styles from './CompetencyCard.module.css';

function CompetencyCard({
  name,
  progress,
  completedCount = 0,
  totalActivities = 0,
  to,
}) {
  return (
    <article className={styles.card}>

      <div className={styles.header}>

        <h3>
          {name}
        </h3>

        <span className={styles.percentage}>
          {progress}%
        </span>

      </div>


      <ProgressBar
        value={progress}
        showValue={false}
        label={`Progreso en ${name}`}
      />


      <p className={styles.experienceCount}>
        {completedCount} de {totalActivities}{' '}
        {totalActivities === 1
          ? 'experiencia explorada'
          : 'experiencias exploradas'}
      </p>


      {to && (
        <Link
          to={to}
          className={styles.detailLink}
        >
          Ver competencia
        </Link>
      )}

    </article>
  );
}

export default CompetencyCard;