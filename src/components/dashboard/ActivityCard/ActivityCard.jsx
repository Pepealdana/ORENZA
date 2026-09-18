import { ArrowRight, CheckCircle2, Clock3 } from 'lucide-react';
import styles from './ActivityCard.module.css';

function ActivityCard({ title, status, date }) {
  const isCompleted = status === 'completed';
  return (
    <article className={styles.card}>
      <div className={styles.icon} aria-hidden="true">{isCompleted ? <CheckCircle2 size={21} /> : <Clock3 size={21} />}</div>
      <div className={styles.content}>
        <div className={styles.topline}>
          <span className={styles.badge}>{isCompleted ? 'Explorada' : 'En proceso'}</span>
          <time dateTime={date}>{date}</time>
        </div>
        <h3>{title}</h3>
        <p>{isCompleted ? 'Has dedicado un momento a esta experiencia.' : 'Puedes continuar cuando quieras.'}</p>
      </div>
      <ArrowRight className={styles.arrow} size={18} aria-hidden="true" />
    </article>
  );
}
export default ActivityCard;
