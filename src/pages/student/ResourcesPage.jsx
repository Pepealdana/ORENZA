import { BookOpen } from 'lucide-react';
import resources from '../../data/resources';
import ResourceCard from '../../components/dashboard/ResourceCard/ResourceCard';
import styles from './ResourcesPage.module.css';
import IdentityVisual from '../../components/visual/IdentityVisual';

function ResourcesPage() {
  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerIcon}><BookOpen size={24} strokeWidth={1.8} aria-hidden="true" /></div>
        <div>
          <p className={styles.eyebrow}>Para seguir explorando</p>
          <h1 className={styles.title}>Recursos</h1>
          <p className={styles.description}>Encuentra materiales que pueden ayudarte a seguir reflexionando y fortaleciendo tus habilidades socioemocionales.</p>
        </div>
      </header>

      <IdentityVisual variant="recursos" />

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div><p className={styles.eyebrow}>Biblioteca ORENZA</p><h2>Recursos disponibles</h2></div>
          <span className={styles.count}>{resources.length} disponibles</span>
        </div>

        {resources.length === 0 ? (
          <div className={styles.emptyState}><BookOpen size={28} aria-hidden="true" /><h3>Todavía no hay recursos</h3><p>Pronto encontrarás nuevos contenidos para continuar tu proceso.</p></div>
        ) : (
          <div className={styles.list}>{resources.map((resource) => <ResourceCard key={resource.id} title={resource.title} type={resource.type} resourceId={resource.id} />)}</div>
        )}
      </section>
    </section>
  );
}
export default ResourcesPage;
