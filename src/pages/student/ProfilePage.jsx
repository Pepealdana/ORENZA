import { Link } from 'react-router-dom';
import { Activity, ArrowRight, BookOpen, CheckCircle2, Mail, Settings, UserRound } from 'lucide-react';

import studentData from '../../data/studentData';
import { useAuth } from '../../context/AuthContext';
import { getCompletedActivities } from '../../utils/activityStorage';
import styles from './ProfilePage.module.css';
import perfilIllustration from '../../assets/illustrations/perfil.svg';

function ProfilePage() {
  const { user } = useAuth();
  const completedCount = getCompletedActivities().length;
  const competencyCount = studentData.competencies?.length ?? 0;

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Mi espacio</p>
        <h1>Mi perfil</h1>
        <p>Consulta tus datos básicos y reconoce el camino que has construido en ORENZA.</p>
      </header>

      <div className={styles.heroVisual}><img src={perfilIllustration} alt="" aria-hidden="true" /></div>

      <div className={styles.heroVisual}>
        <img src={perfilIllustration} alt="" aria-hidden="true" />
      </div>

      <section className={styles.profileCard} aria-labelledby="profile-name">
        <div className={styles.avatar} aria-hidden="true"><UserRound size={34} strokeWidth={1.7} /></div>
        <div className={styles.identity}>
          <p className={styles.identityLabel}>Tu cuenta</p>
          <h2 id="profile-name">{user?.name || studentData.name}</h2>
          <p className={styles.role}>Estudiante · {user?.grade || studentData.grade || 'En formación'}</p>
          {(user?.email || studentData.email) && <p className={styles.email}><Mail size={14} aria-hidden="true" />{user?.email || studentData.email}</p>}
        </div>
        <Link className={styles.settingsLink} to="/estudiante/configuracion" aria-label="Ir a configuración" title="Configuración"><Settings size={19} /></Link>
      </section>

      <section className={styles.section} aria-labelledby="journey-summary">
        <div className={styles.sectionTitle}>
          <div><p className={styles.sectionEyebrow}>Tu proceso</p><h2 id="journey-summary">Resumen de crecimiento</h2></div>
          <span>Sin comparaciones</span>
        </div>
        <div className={styles.stats}>
          <article className={styles.stat}><span className={styles.statIcon}><Activity size={20} /></span><strong>{completedCount}</strong><span>experiencias exploradas</span></article>
          <article className={styles.stat}><span className={styles.statIcon}><BookOpen size={20} /></span><strong>{competencyCount}</strong><span>competencias disponibles</span></article>
          <article className={styles.stat}><span className={styles.statIcon + ' ' + styles.success}><CheckCircle2 size={20} /></span><strong>En proceso</strong><span>tu crecimiento continúa a tu ritmo</span></article>
        </div>
      </section>

      <section className={styles.notice}>
        <div className={styles.noticeIcon}><UserRound size={20} /></div>
        <div><h2>Tu información es personal</h2><p>ORENZA acompaña tu proceso. El progreso representa tus propias experiencias y no es una calificación ni un diagnóstico.</p></div>
      </section>

      <Link className={styles.continueCard} to="/estudiante/recorrido">
        <div><span className={styles.cardEyebrow}>Historia personal</span><h2>Ver mi recorrido</h2><p>Revisa tus experiencias y momentos registrados en ORENZA.</p></div>
        <ArrowRight size={21} />
      </Link>
    </section>
  );
}

export default ProfilePage;