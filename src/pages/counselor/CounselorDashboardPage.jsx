import { useEffect, useState } from 'react';
import { Activity, CalendarCheck2, HeartHandshake, LoaderCircle, Search, UsersRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import styles from './CounselorDashboardPage.module.css';

function CounselorDashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState({ summary: null, students: [] });
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    api.getCounselorOverview()
      .then(setData)
      .catch((requestError) => setError(requestError.message || 'No fue posible cargar el acompañamiento.'))
      .finally(() => setLoading(false));
  }, []);

  const openStudent = async (student) => {
    setSelectedStudent(null);
    setError('');
    setDetailLoading(true);
    try {
      const response = await api.getCounselorStudent(student.id);
      setSelectedStudent(response);
    } catch (requestError) {
      setError(requestError.message || 'No fue posible consultar el estudiante.');
    } finally {
      setDetailLoading(false);
    }
  };

  const students = data.students.filter((student) => {
    const term = query.trim().toLowerCase();
    if (!term) return true;
    return [student.name, student.email, student.grade, student.institution]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(term));
  });

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Panel de orientación</p>
          <h1>Acompañamiento educativo</h1>
          <p>Consulta información preventiva y autorizada para acompañar los procesos de los estudiantes.</p>
        </div>
        <div className={styles.identity}>
          <HeartHandshake size={20} />
          <span>{user?.name || 'Orientación'}</span>
        </div>
      </header>

      {error && <div className={styles.alert} role="alert">{error}</div>}

      {loading ? (
        <div className={styles.loading}><LoaderCircle className={styles.spin} size={22} /> Cargando información…</div>
      ) : (
        <>
          <section className={styles.stats} aria-label="Resumen de acompañamiento">
            <article><UsersRound size={20} /><strong>{data.summary?.totalStudents ?? 0}</strong><span>Estudiantes</span></article>
            <article><Activity size={20} /><strong>{data.summary?.activeStudents ?? 0}</strong><span>Activos</span></article>
            <article><CalendarCheck2 size={20} /><strong>{data.summary?.studentsWithCheckIn ?? 0}</strong><span>Con registro emocional</span></article>
            <article><HeartHandshake size={20} /><strong>{data.summary?.studentsWithActivity ?? 0}</strong><span>Con experiencias</span></article>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.eyebrow}>Seguimiento preventivo</p>
                <h2>Estudiantes</h2>
              </div>
              <label className={styles.search}>
                <Search size={17} aria-hidden="true" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar estudiante" aria-label="Buscar estudiante" />
              </label>
            </div>

            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>Estudiante</th><th>Institución</th><th>Actividad</th><th>Último registro</th><th>Estado</th></tr></thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td><button type="button" className={styles.studentButton} onClick={() => openStudent(student)}><strong>{student.name}</strong><small>{student.email}</small>{student.grade && <small>{student.grade}</small>}</button></td>
                      <td>{student.institution || '—'}</td>
                      <td><span className={styles.metric}>{student.completedActivities}</span></td>
                      <td>{student.latestCheckIn ? <><strong>{student.latestCheckIn.date}</strong><small>{student.latestCheckIn.emotion} · intensidad {student.latestCheckIn.intensity}/5</small></> : <span className={styles.muted}>Sin registro</span>}</td>
                      <td><span className={student.active ? styles.active : styles.inactive}>{student.active ? 'Activo' : 'Inactivo'}</span></td>
                    </tr>
                  ))}
                  {students.length === 0 && <tr><td colSpan="5" className={styles.empty}>No se encontraron estudiantes.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>

          {(detailLoading || selectedStudent) && (
            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <p className={styles.eyebrow}>Consulta autorizada</p>
                  <h2>{detailLoading ? 'Cargando…' : selectedStudent?.student?.name}</h2>
                </div>
              </div>
              {selectedStudent && (
                <div className={styles.detailGrid}>
                  <div><strong>Registros emocionales</strong><span>{selectedStudent.checkIns.length}</span></div>
                  <div><strong>Experiencias</strong><span>{selectedStudent.activities.filter((item) => item.status === 'completed').length}</span></div>
                  <div className={styles.detailList}>
                    <h3>Actividad registrada</h3>
                    {selectedStudent.activities.length === 0 ? <p>No hay actividad guardada.</p> : selectedStudent.activities.map((item) => (
                      <article key={item._id}><strong>{item.activityId}</strong><span>{item.status === 'completed' ? 'Finalizada' : 'En progreso'}</span></article>
                    ))}
                  </div>
                  <div className={styles.detailList}>
                    <h3>Registros emocionales</h3>
                    {selectedStudent.checkIns.length === 0 ? <p>No hay registros emocionales.</p> : selectedStudent.checkIns.slice(0, 10).map((item) => (
                      <article key={item._id}><strong>{item.date}</strong><span>{item.emotion} · {item.intensity}/5</span></article>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          <section className={styles.note}>
            <HeartHandshake size={22} aria-hidden="true" />
            <div>
              <strong>Enfoque preventivo</strong>
              <p>Los registros de ORENZA sirven como apoyo para el acompañamiento educativo. No constituyen diagnóstico clínico ni reemplazan la atención profesional.</p>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default CounselorDashboardPage;
