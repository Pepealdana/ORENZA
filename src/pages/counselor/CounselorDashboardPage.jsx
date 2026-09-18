import { BarChart3, ClipboardList, HeartHandshake, UsersRound } from 'lucide-react';
import styles from './CounselorDashboardPage.module.css';
import orientacionIllustration from '../../assets/illustrations/orientacion.svg';

function CounselorDashboardPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Panel de orientación</p>
        <h1>Acompañamiento educativo</h1>
        <p>Espacio para consultar información autorizada y acompañar procesos preventivos.</p>
      </header>

      <div className={styles.heroVisual}><img src={orientacionIllustration} alt="" aria-hidden="true" /></div>

      <section className={styles.grid}>
        <article className={styles.card}><span><UsersRound /></span><strong>Estudiantes</strong><small>Seguimiento por grupo</small></article>
        <article className={styles.card}><span><HeartHandshake /></span><strong>Acompañamiento</strong><small>Procesos registrados</small></article>
        <article className={styles.card}><span><BarChart3 /></span><strong>Indicadores</strong><small>Información preventiva</small></article>
        <article className={styles.card}><span><ClipboardList /></span><strong>Intervenciones</strong><small>Gestión autorizada</small></article>
      </section>

      <section className={styles.empty}>
        <HeartHandshake size={28} />
        <h2>Panel preparado para la integración</h2>
        <p>La conexión con usuarios, seguimiento y reportes se implementará en la fase de backend.</p>
      </section>
    </main>
  );
}

export default CounselorDashboardPage;
