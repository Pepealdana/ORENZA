import { Building2, Database, Settings, UsersRound } from 'lucide-react';
import styles from './AdminDashboardPage.module.css';

function AdminDashboardPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Administración institucional</p>
        <h1>Panel de administración</h1>
        <p>Gestiona la configuración general de ORENZA desde un espacio independiente.</p>
      </header>

      <section className={styles.grid}>
        <article className={styles.card}><span><UsersRound /></span><strong>Usuarios</strong><small>Gestión de accesos y roles</small></article>
        <article className={styles.card}><span><Building2 /></span><strong>Instituciones</strong><small>Configuración institucional</small></article>
        <article className={styles.card}><span><Database /></span><strong>Contenidos</strong><small>Recursos y contenidos generales</small></article>
        <article className={styles.card}><span><Settings /></span><strong>Configuración</strong><small>Parámetros del sistema</small></article>
      </section>

      <section className={styles.notice}>
        <Settings size={22} />
        <div><strong>Base visual preparada</strong><p>Las funciones administrativas se conectarán al backend durante la siguiente fase.</p></div>
      </section>
    </main>
  );
}

export default AdminDashboardPage;
