import { Link } from 'react-router-dom';
import { Activity, ArrowRight, BookOpen, CheckCircle2, Settings, UserRound } from 'lucide-react';

import studentData from '../../data/studentData';
import styles from './ProfilePage.module.css';

function ProfilePage() {
  const completed = studentData.recentActivities?.length ?? 0;
  const competencies = studentData.competencies?.length ?? 0;

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Mi espacio</p>
        <h1>Mi perfil</h1>
        <p>Consulta tus datos básicos y reconoce el camino que has construido.</p>
      </header>

      <div className={styles.profileCard}>
        <div className={styles.avatar}><UserRound size={34} strokeWidth={1.7} /></div>
        <div className={styles.identity}>
          <h2>{studentData.name}</h2>
          <p>Estudiante</p>
        </div>
        <Link className={styles.settingsLink} to="/estudiante/configuracion" aria-label="Ir a configuración">
          <Settings size={19} />
        </Link>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <h2>Tu recorrido</h2>
          <span>Sin comparaciones</span>
        </div>
        <div className={styles.stats}>
          <article className={styles.stat}>
            <Activity size={20} aria-hidden="true" />
            <strong>{completed}</strong>
            <span>experiencias registradas</span>
          </article>
          <article className={styles.stat}>
            <BookOpen size={20} aria-hidden="true" />
            <strong>{competencies}</strong>
            <span>competencias para explorar</span>
          </article>
          <article className={styles.stat}>
            <CheckCircle2 size={20} aria-hidden="true" />
            <strong>En proceso</strong>
            <span>tu crecimiento continúa</span>
          </article>
        </div>
      </section>

      <Link className={styles.continueCard} to="/estudiante/recorrido">
        <div>
          <span className={styles.cardEyebrow}>Historia personal</span>
          <h2>Ver mi recorrido</h2>
          <p>Revisa tus experiencias y momentos registrados en ORENZA.</p>
        </div>
        <ArrowRight size={21} aria-hidden="true" />
      </Link>
    </section>
  );
}

export default ProfilePage;
