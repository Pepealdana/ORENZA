import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, BookOpen, CheckCircle2, Mail, Settings, UserRound } from 'lucide-react';

import studentData from '../../data/studentData';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { useStudentProgress } from '../../hooks/useStudentProgress';
import styles from './ProfilePage.module.css';
import IdentityVisual from '../../components/visual/IdentityVisual';

function ProfilePage() {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', grade: user?.grade || '', institution: user?.institution || '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { completedActivities } = useStudentProgress();
  const completedCount = completedActivities.length;
  const competencyCount = studentData.competencies?.length ?? 0;

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const response = await api.updateProfile(form);
      setUser(response.user);
      setForm({ name: response.user.name || '', grade: response.user.grade || '', institution: response.user.institution || '' });
      setEditing(false);
      setMessage('Datos actualizados correctamente.');
    } catch (requestError) {
      setError(requestError.message || 'No fue posible actualizar el perfil.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Mi espacio</p>
        <h1>Mi perfil</h1>
        <p>Consulta tus datos básicos y reconoce el camino que has construido en ORENZA.</p>
      </header>

      <IdentityVisual variant="perfil" />

      <section className={styles.profileCard} aria-labelledby="profile-name">
        <div className={styles.avatar} aria-hidden="true"><UserRound size={34} strokeWidth={1.7} /></div>
        <div className={styles.identity}>
          <p className={styles.identityLabel}>Tu cuenta</p>
          <h2 id="profile-name">{user?.name || studentData.name}</h2>
          <p className={styles.role}>Estudiante · {user?.grade || studentData.grade || 'En formación'}</p>
          {(user?.email || studentData.email) && <p className={styles.email}><Mail size={14} aria-hidden="true" />{user?.email || studentData.email}</p>}
        </div>
        <button type="button" className={styles.settingsLink} onClick={() => { setEditing((current) => !current); setError(''); setMessage(''); }} aria-expanded={editing} aria-label="Editar perfil" title="Editar perfil"><Settings size={19} /></button>
      </section>

      {message && <div className={styles.profileSuccess} role="status">{message}</div>}
      {error && <div className={styles.profileError} role="alert">{error}</div>}

      {editing && (
        <form className={styles.editCard} onSubmit={handleSave}>
          <label><span>Nombre</span><input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} minLength={2} maxLength={100} required /></label>
          <label><span>Grado</span><input value={form.grade} onChange={(event) => setForm({ ...form, grade: event.target.value })} maxLength={30} /></label>
          <label><span>Institución</span><input value={form.institution} readOnly aria-readonly="true" /></label>
          <div className={styles.editActions}><button type="button" onClick={() => setEditing(false)}>Cancelar</button><button type="submit" disabled={saving}>{saving ? 'Guardando…' : 'Guardar cambios'}</button></div>
        </form>
      )}

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