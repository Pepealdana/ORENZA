import { ArrowRight, Sparkles } from 'lucide-react';

import styles from './ChallengeCard.module.css';

function ChallengeCard({
  title,
  description,
  estimatedTime,
  onAction,
}) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon} aria-hidden="true">
          <Sparkles size={22} />
        </div>

        <span className={styles.label}>
          Reto de hoy
        </span>
      </div>

      <h2 className={styles.title}>
        {title}
      </h2>

      <p className={styles.description}>
        {description}
      </p>

      <div className={styles.footer}>
        <span className={styles.time}>
          {estimatedTime}
        </span>

        <button
          type="button"
          className={styles.action}
          onClick={onAction}
          disabled={!onAction}
        >
          Lo intentaré
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export default ChallengeCard;