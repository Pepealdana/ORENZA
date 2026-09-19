import { ArrowRight, CheckCircle2, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './ActivityCard.module.css';

function ActivityCard({ title, status, date, activityId }) {
  const isCompleted = status === 'completed';
  const content = (
    <>
      <div className={styles.icon} aria-hidden="true">{isCompleted ? <CheckCircle2 size={21} /> : <Clock3 size={21} />}</div>
      <div className={styles.content}>
        <div className={styles.topline}>
          <span className={styles.badge}>{isCompleted ? 'Explorada' : 'Disponible'}</span>
          {date && <time dateTime={date}>{date}</time>}
        </div>
        <h3>{title}</h3>
        <p>{isCompleted ? 'Has dedicado un momento a esta experiencia.' : 'Elige esta experiencia para comenzar.'}</p>
      </div>
      <ArrowRight className={styles.arrow} size={18} aria-hidden="true" />
    </>
  );

  return activityId ? (
    <Link to={`/estudiante/actividades/${activityId}`} className={styles.card}>
      {content}
    </Link>
  ) : (
    <article className={styles.card}>{content}</article>
  );
}
export default ActivityCard;
