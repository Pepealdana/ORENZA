import { useEffect, useState } from 'react';
import { AlertCircle, Accessibility, Bell, Check, CheckCircle2, ChevronRight, Eye, KeyRound, LogOut, Palette, ShieldCheck } from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import styles from './SettingsPage.module.css';

const initialOptions = { notifications: true, reducedMotion: false };

function SettingsPage() {
  const { user, logout } = useAuth();
  const [preferences, setPreferences] = useState(() => ({
    ...initialOptions,
    notifications: localStorage.getItem('orenza_notifications') !== 'false',
    reducedMotion: localStorage.getItem('orenza_reduced_motion') === 'true',
  }));
  const [activePanel, setActivePanel] = useState(null);
  const [appearance, setAppearance] = useState(() => localStorage.getItem('orenza_appearance') || 'claro');
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmation: '' });
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = appearance;
    localStorage.setItem('orenza_appearance', appearance);
  }, [appearance]);

  const toggle = (key) => {
    setPreferences((current) => {
      const next = { ...current, [key]: !current[key] };
      localStorage.setItem(key === 'notifications' ? 'orenza_notifications' : 'orenza_reduced_motion', String(next[key]));
      if (key === 'reducedMotion') document.documentElement.dataset.reducedMotion = String(next[key]);
      return next;
    });
  };

  const openPanel = (panel) => {
    setActivePanel((current) => current === panel ? null : panel);
    setPasswordError('');
    setPasswordMessage('');
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    setPasswordError('');
    setPasswordMessage('');

    if (passwords.newPassword.length < 8) {
      setPasswordError('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (passwords.newPassword !== passwords.confirmation) {
      setPasswordError('La confirmación no coincide con la nueva contraseña.');
      return;
    }

    setPasswordLoading(true);
    try {
      const data = await api.changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      setPasswordMessage(data.message);
      setPasswords({ currentPassword: '', newPassword: '', confirmation: '' });
    } catch (requestError) {
      setPasswordError(requestError.message || 'No fue posible cambiar la contraseña.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Mi espacio</p>
        <h1>Configuración</h1>
        <p>Administra tus preferencias, seguridad y opciones personales de ORENZA.</p>
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
          <button type="button" className={styles.option} onClick={() => openPanel('privacy')} aria-expanded={activePanel === 'privacy'}>
            <span className={styles.icon}><ShieldCheck size={20} /></span>
            <span className={styles.copy}><strong>Privacidad y seguridad</strong><small>Revisa la información de tu cuenta y tu sesión.</small></span>
            <ChevronRight size={19} className={styles.arrow} />
          </button>

          {activePanel === 'privacy' && (
            <div className={styles.panel}>
              <div className={styles.securityRow}><Eye size={18} /><div><strong>Cuenta activa</strong><p>{user?.email || 'Cuenta autenticada'}</p></div></div>
              <div className={styles.securityRow}><ShieldCheck size={18} /><div><strong>Autenticación</strong><p>Tu sesión utiliza un token de acceso y tu contraseña se almacena protegida en el servidor.</p></div></div>
              <div className={styles.securityNote}><CheckCircle2 size={17} />No se muestra ni se almacena tu contraseña en el perfil.</div>
              <button type="button" className={styles.secondaryButton} onClick={logout}><LogOut size={17} />Cerrar sesión en este dispositivo</button>
            </div>
          )}

          <button type="button" className={styles.option} onClick={() => openPanel('password')} aria-expanded={activePanel === 'password'}>
            <span className={styles.icon}><KeyRound size={20} /></span>
            <span className={styles.copy}><strong>Cambiar contraseña</strong><small>Actualiza tu contraseña de acceso.</small></span>
            <ChevronRight size={19} className={styles.arrow} />
          </button>

          {activePanel === 'password' && (
            <form className={styles.panel} onSubmit={handlePasswordChange}>
              {passwordError && <div className={styles.alert}><AlertCircle size={17} /><span>{passwordError}</span></div>}
              {passwordMessage && <div className={styles.success}><CheckCircle2 size={17} /><span>{passwordMessage}</span></div>}
              <label className={styles.field}><span>Contraseña actual</span><input type="password" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} autoComplete="current-password" required /></label>
              <label className={styles.field}><span>Nueva contraseña</span><input type="password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} autoComplete="new-password" minLength={8} required /></label>
              <label className={styles.field}><span>Confirmar nueva contraseña</span><input type="password" value={passwords.confirmation} onChange={(e) => setPasswords({ ...passwords, confirmation: e.target.value })} autoComplete="new-password" minLength={8} required /></label>
              <button className={styles.primaryButton} type="submit" disabled={passwordLoading}>{passwordLoading ? 'Actualizando…' : 'Actualizar contraseña'}</button>
            </form>
          )}

          <button type="button" className={styles.option} onClick={() => openPanel('appearance')} aria-expanded={activePanel === 'appearance'}>
            <span className={styles.icon}><Palette size={20} /></span>
            <span className={styles.copy}><strong>Apariencia</strong><small>Configura la forma en que quieres ver ORENZA.</small></span>
            <ChevronRight size={19} className={styles.arrow} />
          </button>

          {activePanel === 'appearance' && (
            <div className={styles.panel}>
              <p className={styles.panelIntro}>Estas preferencias se guardan en este dispositivo.</p>
              <div className={styles.appearanceOptions}>
                <button type="button" className={styles.appearanceOption + (appearance === 'claro' ? ' ' + styles.selected : '')} onClick={() => setAppearance('claro')}><span className={styles.previewLight} /><strong>Claro</strong><small>Vista estándar de ORENZA</small></button>
                <button type="button" className={styles.appearanceOption + (appearance === 'contraste' ? ' ' + styles.selected : '')} onClick={() => setAppearance('contraste')}><span className={styles.previewContrast} /><strong>Alto contraste</strong><small>Mayor diferencia entre fondos y textos</small></button>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className={styles.info}><Check size={17} aria-hidden="true" /><p>Las preferencias de esta sección se guardan localmente. Los cambios de contraseña se aplican directamente en la base de datos de la aplicación demo.</p></div>
    </section>
  );
}

export default SettingsPage;
