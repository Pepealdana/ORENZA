import { useEffect, useState } from 'react';
import { ArrowLeft, Edit3, LoaderCircle, Plus, Save, ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import styles from './AdminInstitutionsPage.module.css';

const emptyForm = { name: '', code: '' };

function AdminInstitutionsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.getAdminInstitutions({ limit: 100, search, active: showInactive ? '' : 'true' });
      setItems(response.institutions || []);
    } catch (requestError) {
      setError(requestError.message || 'No fue posible cargar las instituciones.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [showInactive]);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      if (editingId) {
        const response = await api.updateAdminInstitution(editingId, form);
        setItems((current) => current.map((item) => item.id === editingId ? response.institution : item));
        setMessage('Institución actualizada correctamente.');
      } else {
        const response = await api.createAdminInstitution(form);
        setItems((current) => [...current, response.institution].sort((a, b) => a.name.localeCompare(b.name)));
        setMessage('Institución creada correctamente.');
      }
      setForm(emptyForm);
      setEditingId(null);
    } catch (requestError) {
      setError(requestError.message || 'No fue posible guardar la institución.');
    } finally {
      setSaving(false);
    }
  };

  const edit = (item) => {
    setEditingId(item.id);
    setForm({ name: item.name, code: item.code });
    setError('');
    setMessage('');
  };

  const toggle = async (item) => {
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const response = await api.updateAdminInstitution(item.id, { active: !item.active });
      setItems((current) => current.map((entry) => entry.id === item.id ? response.institution : entry));
      setMessage(response.institution.active ? 'Institución activada.' : 'Institución desactivada.');
    } catch (requestError) {
      setError(requestError.message || 'No fue posible cambiar el estado.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className={styles.page}>
      <Link className={styles.back} to="/administrador"><ArrowLeft size={16} /> Volver al panel</Link>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>Administración institucional</p><h1>Instituciones</h1><p>Administra las instituciones que delimitan el acompañamiento del orientador.</p></div>
        <ShieldCheck size={22} />
      </header>

      {error && <div className={styles.alert}>{error}</div>}
      {message && <div className={styles.success}>{message}</div>}

      <section className={styles.panel}>
        <div className={styles.panelHeader}><div><p className={styles.eyebrow}>{editingId ? 'Edición' : 'Nueva institución'}</p><h2>{editingId ? 'Editar institución' : 'Crear institución'}</h2></div>{editingId && <button className={styles.iconButton} type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }}><X size={18} /></button>}</div>
        <form className={styles.form} onSubmit={submit}>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nombre de la institución" minLength={2} maxLength={150} required />
          <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="Código institucional" maxLength={30} required />
          <button type="submit" disabled={saving}>{saving ? <LoaderCircle className={styles.spin} size={17} /> : editingId ? <Save size={17} /> : <Plus size={17} />}{saving ? 'Guardando…' : editingId ? 'Guardar cambios' : 'Crear institución'}</button>
        </form>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}><div><p className={styles.eyebrow}>Registro</p><h2>Instituciones registradas</h2></div><label className={styles.toggle}><input type="checkbox" checked={showInactive} onChange={(e) => setShowInactive(e.target.checked)} /> Mostrar inactivas</label></div>
        <div className={styles.search}><input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && load()} placeholder="Buscar por nombre o código" /><button type="button" onClick={load}>Buscar</button></div>
        {loading ? <div className={styles.loading}><LoaderCircle className={styles.spin} size={20} /> Cargando…</div> : <div className={styles.tableWrap}><table><thead><tr><th>Institución</th><th>Código</th><th>Estado</th><th>Acción</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><strong>{item.name}</strong></td><td>{item.code}</td><td><span className={item.active ? styles.active : styles.inactive}>{item.active ? 'Activa' : 'Inactiva'}</span></td><td><div className={styles.actions}><button type="button" onClick={() => edit(item)}><Edit3 size={15} /> Editar</button><button type="button" onClick={() => toggle(item)} disabled={saving}>{item.active ? 'Desactivar' : 'Activar'}</button></div></td></tr>)}{items.length === 0 && <tr><td colSpan="4" className={styles.empty}>No hay instituciones para mostrar.</td></tr>}</tbody></table></div>}
      </section>
    </main>
  );
}

export default AdminInstitutionsPage;
