import { ArrowLeft, BookOpen } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import resources from '../../data/resources';
import styles from './ResourceDetailPage.module.css';

function ResourceDetailPage() {
  const { resourceId } = useParams();
  const resource = resources.find((item) => item.id === resourceId);

  if (!resource) {
    return (
      <section className={styles.page}>
        <Link to="/estudiante/recursos" className={styles.back}><ArrowLeft size={18} /> Volver a recursos</Link>
        <h1>Recurso no encontrado</h1>
        <p>Este contenido no está disponible en la biblioteca.</p>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <Link to="/estudiante/recursos" className={styles.back}><ArrowLeft size={18} /> Volver a recursos</Link>

      <header className={styles.header}>
        <div className={styles.icon}><BookOpen size={28} aria-hidden="true" /></div>
        <p className={styles.eyebrow}>{resource.type} · {resource.estimatedTime}</p>
        <h1>{resource.title}</h1>
        <p className={styles.description}>{resource.description}</p>
      </header>

      <div className={styles.content}>
        {resource.sections.map((section) => (
          <article key={section.title} className={styles.section}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </div>

      <aside className={styles.reflection}>
        <p className={styles.eyebrow}>Para llevar contigo</p>
        <h2>Una pregunta para ti</h2>
        <p>{resource.reflection}</p>
      </aside>

      <Link to="/estudiante/actividades" className={styles.primary}>Explorar actividades relacionadas</Link>
    </section>
  );
}
export default ResourceDetailPage;
