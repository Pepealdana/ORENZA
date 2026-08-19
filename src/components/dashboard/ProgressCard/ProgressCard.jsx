import ProgressBar from '../../ui/ProgressBar/ProgressBar';

import styles from './ProgressCard.module.css';

function ProgressCard({
  progress,
  completedActivities,
  totalActivities,
}) {
  return (
    <section
      className={styles.card}
      aria-labelledby="progress-card-title"
    >
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Tu progreso</p>

          <h2 id="progress-card-title">
            Progreso general
          </h2>
        </div>

        <span className={styles.percentage}>
          {progress}%
        </span>
      </div>

      <ProgressBar
        value={progress}
        showValue={false}
        label="Progreso general"
      />

      <p className={styles.activities}>
        <strong>{completedActivities}</strong> de{' '}
        <strong>{totalActivities}</strong> actividades completadas
      </p>
    </section>
  );
}

export default ProgressCard;