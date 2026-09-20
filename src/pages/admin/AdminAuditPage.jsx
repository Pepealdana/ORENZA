import { useEffect, useState } from 'react';
import { ArrowLeft, ClipboardList, LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import styles from './AdminAuditPage.module.css';

function AdminAuditPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getAdminAuditLogs({ limit: 100 })
      .then((response) => setLogs(response.logs || []))
      .catch((requestError) => setError(requestError.message || 'No fue posible cargar la auditoría.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className={styles.page}>
      <Link className={styles.back} to="/administrador"><ArrowLeft size={16} /> Volver al panel</Link>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>Trazabilidad</p><h1>Auditoría</h1><p>Registro de cambios administrativos y eventos de seguridad relevantes.</p></div>
        <ClipboardList size={22} />
      </header>
      {error && <div className={styles.alert}>{error}</div>}
      {loading ? <div className={styles.loading}><LoaderCircle className={styles.spin} size={20} /> Cargando auditoría…</div> : (
        <section className={styles.panel}>
          <div className={styles.tableWrap}>
            <table><thead><tr><th>Fecha</th><th>Actor</th><th>Acción</th><th>Entidad</th><th>Detalle</th></tr></thead>
              <tbody>{logs.map((log) => <tr key={log._id}><td>{new Date(log.createdAt).toLocaleString('es-CO')}</td><td><strong>{log.actor?.name || 'Sistema'}</strong><small>{log.actor?.email || '—'}</small></td><td>{log.action}</td><td>{log.entity}</td><td>{log.summary || '—'}</td></tr>)}{logs.length === 0 && <tr><td colSpan="5" className={styles.empty}>No hay eventos registrados.</td></tr>}</tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
}

export default AdminAuditPage;
