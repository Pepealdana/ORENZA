import { ArrowUpRight, BookOpen } from 'lucide-react';

import styles from './ResourceCard.module.css';

function ResourceCard({
  title,
  type,
}) {
  return (
    <article className={styles.card}>
      <div className={styles.icon} aria-hidden="true">
        <BookOpen size={22} />
      </div>

      <div className={styles.content}>
        <span className={styles.type}>
          {type}
        </span>

        <h3>{title}</h3>
      </div>

      <button
        type="button"
        className={styles.action}
        aria-label={`Abrir recurso: ${title}`}
      >
        <ArrowUpRight
          size={20}
          aria-hidden="true"
        />
      </button>
    </article>
  );
}

export default ResourceCard;