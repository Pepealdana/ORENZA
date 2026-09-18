import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Accessibility, Bell, Check, ChevronRight, LockKeyhole, Palette, ShieldCheck } from 'lucide-react';

import styles from './SettingsPage.module.css';

const initialOptions = { notifications: true, reducedMotion: false };

function SettingsPage() {
  const [preferences, setPreferences] = useState(initialOptions);

  const toggle = (key) => setPreferences((current) => ({ ...current, [key]: !current[key] }));

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Mi espacio</p>
        <h1>Configuración</h1>
        <p>Administra tus preferencias y opciones personales de ORENZA.</p>
      </header>

      <section className={styles.group} aria-labelledby="preferences-title">
        <div className={styles.groupHeading}><p>Preferencias</p><h2 id="preferences-title">Tu experiencia</h2></div>
        <div className={styles.card}>
          <button type="button" className={styles.option} onClick={() => toggle('notifications')} aria-pressed={preferences.notifications}>
            <span className={styles.icon}><Bell size={20} /></span>
            <span className={styles.copy}><strong>Notificaciones</strong><small>Recibe avisos relacionados con tu experiencia.</small></span>
            <span className={styles.switch + (preferences.notifications ? ' ' + styles.switchOn : '')} aria-hidden="true"><span /></span>
          </button>
          <button type="button" className={styles.option} onClick={() => toggle('reducedMotion')} aria-pressed={preferences.reducedMotion}>
            <span className={styles.icon}><Accessibility size={20} /></span>
            <span className={styles.copy}><strong>Movimiento reducido</strong><small>Limita las animaciones de la interfaz.</small></span>
            <span className={styles.switch + (preferences.reducedMotion ? ' ' + styles.switchOn : '')} aria-hidden="true"><span /></span>
          </button>
        </div>
      </section>

      <section className={styles.group} aria-labelledby="account-title">
        <div className={styles.groupHeading}><p>Cuenta</p><h2 id="account-title">Privacidad y acceso</h2></div>
        <div className={styles.card}>
          <button type="button" className={styles.option}><span className={styles.icon}><ShieldCheck size={20} /></span><span className={styles.copy}><strong>Privacidad y seguridad</strong><small>Consulta opciones relacionadas con tu cuenta.</small></span><ChevronRight size={19} className={styles.arrow} /></button>
          <button type="button" className={styles.option}><span className={styles.icon}><LockKeyhole size={20} /></span><span className={styles.copy}><strong>Cambiar contraseña</strong><small>Actualiza tu contraseña de acceso.</small></span><ChevronRight size={19} className={styles.arrow} /></button>
          <button type="button" className={styles.option}><span className={styles.icon}><Palette size={20} /></span><span className={styles.copy}><strong>Apariencia</strong><small>Preferencias visuales de la interfaz.</small></span><ChevronRight size={19} className={styles.arrow} /></button>
        </div>
      </section>

      <div className={styles.info}><Check size={17} aria-hidden="true" /><p>Tus preferencias se mantienen en esta sesión. Las opciones de cuenta se conectarán al backend en la siguiente etapa.</p></div>
      <Link className={styles.back} to="/estudiante/perfil">Volver a mi perfil</Link>
    </section>
  );
}

export default SettingsPage;