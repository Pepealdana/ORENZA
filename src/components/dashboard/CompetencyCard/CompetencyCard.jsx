import ProgressBar from '../../ui/ProgressBar/ProgressBar';

import styles from './CompetencyCard.module.css';

function CompetencyCard({ name, progress }) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3>{name}</h3>

        <span className={styles.percentage}>
          {progress}%
        </span>
      </div>

      <ProgressBar
        value={progress}
        showValue={false}
        label={`Progreso en ${name}`}
      />
    </article>
  );
}

export default CompetencyCard;