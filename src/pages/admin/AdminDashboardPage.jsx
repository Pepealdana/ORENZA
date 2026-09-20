import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Building2, Database, Edit3, LoaderCircle, Save, Settings, ShieldCheck, UserPlus, UsersRound, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import styles from './AdminDashboardPage.module.css';

const emptyForm = {
  name: '',
  email: '',
  password: '',
  role: 'student',
  grade: '',
  institution: '',
};

const roleLabels = {
  student: 'Estudiante',
  teacher: 'Docente',
  counselor: 'Orientador',
  admin: 'Administrador',
};

function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: 'student', grade: '', institution: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const [statsResponse, usersResponse] = await Promise.all([
        api.getAdminStats(),
        api.getAdminUsers(),
      ]);
      setStats(statsResponse.stats);
      setUsers(usersResponse.users);
    } catch (requestError) {
      setError(requestError.message || 'No fue posible cargar la administración.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateForm = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const createUser = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      await api.createAdminUser(form);
      setForm(emptyForm);
      setMessage('Usuario creado correctamente.');
      await loadData();
    } catch (requestError) {
      setError(requestError.message || 'No fue posible crear el usuario.');
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (item) => {
    setError('');
    setMessage('');
    setEditingUser(item.id);
    setEditForm({
      name: item.name || '',
      email: item.email || '',
      role: item.role || 'student',
      grade: item.grade || '',
      institution: item.institution || '',
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setEditForm({ name: '', email: '', role: 'student', grade: '', institution: '' });
  };

  const updateEditForm = (event) => {
    setEditForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const saveUser = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    try {
      const response = await api.updateAdminUser(editingUser, {
        name: editForm.name,
        role: editForm.role,
        grade: editForm.grade,
        institution: editForm.institution,
      });
      setUsers((current) => current.map((item) => item.id === editingUser ? response.user : item));
      setMessage('Usuario actualizado correctamente.');
      cancelEdit();
      const statsResponse = await api.getAdminStats();
      setStats(statsResponse.stats);
    } catch (requestError) {
      setError(requestError.message || 'No fue posible actualizar el usuario.');
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (item) => {
    setError('');
    setMessage('');

    try {
      const response = await api.updateAdminUser(item.id, { active: !item.active });
      setUsers((current) => current.map((userItem) => userItem.id === item.id ? response.user : userItem));
      setMessage(response.user.active ? 'Usuario activado.' : 'Usuario desactivado.');
      const statsResponse = await api.getAdminStats();
      setStats(statsResponse.stats);
    } catch (requestError) {
      setError(requestError.message || 'No fue posible actualizar el usuario.');
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Administración institucional</p>
          <h1>Panel de administración</h1>
          <p>Gestiona usuarios, roles y estado de acceso de ORENZA.</p>
        </div>
        <div className={styles.identity}>
          <ShieldCheck size={20} />
          <span>{user?.name}</span>
        </div>
      </header>


      {error && <div className={styles.alert} role="alert">{error}</div>}
      {message && <div className={styles.success} role="status">{message}</div>}

      {loading ? (
        <div className={styles.loading}><LoaderCircle className={styles.spin} size={22} /> Cargando administración…</div>
      ) : (
        <>
          <section className={styles.stats} aria-label="Resumen de usuarios">
            <article><UsersRound size={20} /><strong>{stats?.total ?? 0}</strong><span>Usuarios</span></article>
            <article><Activity size={20} /><strong>{stats?.active ?? 0}</strong><span>Activos</span></article>
            <article><ShieldCheck size={20} /><strong>{stats?.students ?? 0}</strong><span>Estudiantes</span></article>
            <article><UsersRound size={20} /><strong>{stats?.counselors ?? 0}</strong><span>Orientadores</span></article>
          </section>

          <section className={styles.grid} aria-label="Módulos de administración">
            <article className={styles.cardDisabled} aria-disabled="true">
              <span><UsersRound /></span><strong>Usuarios</strong><small>Gestión de accesos y roles</small><em>No disponible</em>
            </article>
            <article className={styles.cardDisabled} aria-disabled="true">
              <span><Building2 /></span><strong>Instituciones</strong><small>Configuración institucional</small><em>No disponible</em>
            </article>
            <Link className={styles.cardLink} to="/administrador/contenidos">
              <span><Database /></span><strong>Contenidos</strong><small>Recursos y contenidos generales</small><em>Gestionar actividades</em>
            </Link>
            <article className={styles.cardDisabled} aria-disabled="true">
              <span><Settings /></span><strong>Configuración</strong><small>Parámetros del sistema</small><em>No disponible</em>
            </article>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.eyebrow}>Gestión rápida</p>
                <h2>Crear usuario</h2>
              </div>
              <UserPlus size={22} />
            </div>

            <form className={styles.form} onSubmit={createUser}>
              <input name="name" value={form.name} onChange={updateForm} placeholder="Nombre completo" required />
              <input name="email" type="email" value={form.email} onChange={updateForm} placeholder="Correo electrónico" required />
              <input name="password" type="password" value={form.password} onChange={updateForm} placeholder="Contraseña (mín. 8)" minLength={8} required />
              <select name="role" value={form.role} onChange={updateForm}>
                {Object.entries(roleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
              <input name="grade" value={form.grade} onChange={updateForm} placeholder="Grado (opcional)" />
              <input name="institution" value={form.institution} onChange={updateForm} placeholder="Institución (opcional)" />
              <button type="submit" disabled={saving}><Save size={17} /> {saving ? 'Guardando…' : 'Crear usuario'}</button>
            </form>
          </section>

          {editingUser && (
            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.eyebrow}>Edición</p>
                  <h2>Editar usuario</h2>
                </div>
                <button type="button" className={styles.iconButton} onClick={cancelEdit} aria-label="Cancelar edición">
                  <X size={20} />
                </button>
              </div>
              <form className={styles.editForm} onSubmit={saveUser}>
                <input name="name" value={editForm.name} onChange={updateEditForm} placeholder="Nombre completo" minLength={2} maxLength={100} required />
                <input name="email" value={editForm.email} readOnly aria-label="Correo electrónico" />
                <select name="role" value={editForm.role} onChange={updateEditForm}>
                  {Object.entries(roleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
                <input name="grade" value={editForm.grade} onChange={updateEditForm} placeholder="Grado (opcional)" />
                <input name="institution" value={editForm.institution} onChange={updateEditForm} placeholder="Institución (opcional)" />
                <div className={styles.editActions}>
                  <button type="button" className={styles.secondaryButton} onClick={cancelEdit} disabled={saving}>Cancelar</button>
                  <button type="submit" disabled={saving}><Save size={17} /> {saving ? 'Guardando…' : 'Guardar cambios'}</button>
                </div>
              </form>
            </section>
          )}

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.eyebrow}>Accesos</p>
                <h2>Usuarios registrados</h2>
              </div>
              <span className={styles.count}>{users.length}</span>
            </div>

            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr><th>Usuario</th><th>Rol</th><th>Estado</th><th>Acción</th></tr>
                </thead>
                <tbody>
                  {users.map((item) => (
                    <tr key={item.id}>
                      <td><strong>{item.name}</strong><small>{item.email}</small></td>
                      <td><span className={styles.roleLabel}>{roleLabels[item.role] || item.role}</span></td>
                      <td><span className={item.active ? styles.active : styles.inactive}>{item.active ? 'Activo' : 'Inactivo'}</span></td>
                      <td>
                        <div className={styles.rowActions}>
                          <button type="button" className={styles.textButton} onClick={() => startEdit(item)} disabled={saving}>
                            <Edit3 size={15} /> Editar
                          </button>
                          <button type="button" className={styles.textButton} onClick={() => toggleActive(item)} disabled={saving}>
                            {item.active ? 'Desactivar' : 'Activar'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default AdminDashboardPage;
