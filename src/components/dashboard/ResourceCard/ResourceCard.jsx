import { ArrowUpRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './ResourceCard.module.css';

function ResourceCard({ title, type, resourceId }) {
  return (
    <article className={styles.card}>
      <div className={styles.icon} aria-hidden="true"><BookOpen size={22} /></div>
      <div className={styles.content}>
        <span className={styles.type}>{type}</span>
        <h3>{title}</h3>
      </div>
      {resourceId ? (
        <Link to={`/estudiante/recursos/${resourceId}`} className={styles.action} aria-label={`Abrir recurso: ${title}`}>
          <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      ) : (
        <span className={styles.action} aria-hidden="true"><ArrowUpRight size={20} /></span>
      )}
    </article>
  );
}
export default ResourceCard;
