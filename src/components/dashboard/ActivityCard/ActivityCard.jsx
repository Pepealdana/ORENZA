import { CheckCircle2, Clock3 } from 'lucide-react';

import styles from './ActivityCard.module.css';

function ActivityCard({
  title,
  status,
  date,
}) {
  const isCompleted = status === 'completed';

  return (
    <article className={styles.card}>
      <div className={styles.icon} aria-hidden="true">
        {isCompleted ? (
          <CheckCircle2 size={22} />
        ) : (
          <Clock3 size={22} />
        )}
      </div>

      <div className={styles.content}>
        <h3>{title}</h3>

        <p>
          {isCompleted
            ? 'Actividad completada'
            : 'Actividad en progreso'}
        </p>

        <time dateTime={date}>
          {date}
        </time>
      </div>
    </article>
  );
}

export default ActivityCard;