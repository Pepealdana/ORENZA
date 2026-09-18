import { Link } from 'react-router-dom';
import { Bell, ChevronRight, LockKeyhole, Palette, ShieldCheck, SlidersHorizontal } from 'lucide-react';

import styles from './SettingsPage.module.css';

const options = [
  { label: 'Notificaciones', description: 'Gestiona los avisos de tu experiencia.', icon: Bell },
  { label: 'Privacidad y seguridad', description: 'Consulta opciones relacionadas con tu cuenta.', icon: ShieldCheck },
  { label: 'Accesibilidad', description: 'Preferencias para facilitar el uso de la plataforma.', icon: SlidersHorizontal },
  { label: 'Apariencia', description: 'Preferencias visuales de la interfaz.', icon: Palette },
  { label: 'Cambiar contraseña', description: 'Actualiza tu contraseña de acceso.', icon: LockKeyhole },
];

function SettingsPage() {
  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Mi espacio</p>
        <h1>Configuración</h1>
        <p>Administra tus preferencias y opciones personales de ORENZA.</p>
      </header>

      <section className={styles.card}>
        {options.map(({ label, description, icon: Icon }) => (
          <button type="button" className={styles.option} key={label}>
            <span className={styles.icon}><Icon size={20} /></span>
            <span className={styles.copy}><strong>{label}</strong><small>{description}</small></span>
            <ChevronRight size={19} className={styles.arrow} aria-hidden="true" />
          </button>
        ))}
      </section>

      <Link className={styles.back} to="/estudiante/perfil">Volver a mi perfil</Link>
    </section>
  );
}

export default SettingsPage;
