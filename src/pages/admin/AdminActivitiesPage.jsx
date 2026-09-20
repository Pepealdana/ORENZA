import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, Edit3, LoaderCircle, Plus, Save, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import styles from './AdminActivitiesPage.module.css';

const TYPE_OPTIONS = [
  ['reflection', 'Reflexión'],
  ['emotional', 'Emocional'],
  ['situation', 'Situación'],
  ['decision', 'Decisión'],
  ['creative', 'Creativa'],
  ['journal', 'Diario'],
  ['observation', 'Observación'],
  ['challenge', 'Desafío'],
  ['exploration', 'Exploración'],
];

const RESPONSE_OPTIONS = [
  ['textarea', 'Texto libre'],
  ['single-choice', 'Opción única'],
  ['text', 'Respuesta corta'],
];

const COMPETENCY_OPTIONS = [
  ['autoconocimiento', 'Autoconocimiento'],
  ['autorregulacion', 'Autorregulación'],
  ['empatia', 'Empatía'],
  ['relaciones-positivas', 'Relaciones positivas'],
];

const DIFFICULTY_OPTIONS = [
  ['easy', 'Fácil'],
  ['medium', 'Media'],
  ['hard', 'Difícil'],
];

const emptyStep = () => ({
  id: '',
  type: 'reflection',
  question: '',
  responseType: 'textarea',
  options: [],
});

const emptyForm = {
  activityId: '',
  title: '',
  description: '',
  purpose: '',
  type: 'reflection',
  category: 'autoconocimiento',
  instructions: '',
  estimatedTime: 10,
  ageMin: 12,
  ageMax: 18,
  primaryCompetency: 'autoconocimiento',
  secondaryCompetencies: [],
  emotions: [],
  difficulty: 'easy',
  repeatable: false,
  order: 1,
  steps: [emptyStep()],
};

function toForm(activity) {
  return {
    activityId: activity.activityId || '',
    title: activity.title || '',
    description: activity.description || '',
    purpose: activity.purpose || '',
    type: activity.type || 'reflection',
    category: activity.category || activity.competencies?.primary || 'autoconocimiento',
    instructions: activity.instructions || '',
    estimatedTime: activity.estimatedTime || 10,
    ageMin: activity.ageRange?.min ?? 12,
    ageMax: activity.ageRange?.max ?? 18,
    primaryCompetency: activity.competencies?.primary || 'autoconocimiento',
    secondaryCompetencies: activity.competencies?.secondary || [],
    emotions: activity.emotions || [],
    difficulty: activity.difficulty || 'easy',
    repeatable: Boolean(activity.repeatable),
    order: activity.order ?? 1,
    steps: (activity.steps || []).map((step) => ({
      id: step.id || '',
      type: step.type || 'reflection',
      question: step.question || '',
      responseType: step.responseType || 'textarea',
      options: Array.isArray(step.options) ? step.options : [],
    })),
  };
}

function toPayload(form) {
  return {
    activityId: form.activityId,
    title: form.title,
    description: form.description,
    purpose: form.purpose,
    type: form.type,
    category: form.category,
    instructions: form.instructions,
    estimatedTime: Number(form.estimatedTime),
    ageRange: { min: Number(form.ageMin), max: Number(form.ageMax) },
    competencies: {
      primary: form.primaryCompetency,
      secondary: form.secondaryCompetencies,
    },
    emotions: form.emotions,
    difficulty: form.difficulty,
    repeatable: form.repeatable,
    order: Number(form.order),
    steps: form.steps.map((step, index) => ({
      id: step.id || `step-${index + 1}`,
      type: step.type,
      question: step.question,
      responseType: step.responseType,
      ...(step.responseType === 'single-choice' ? { options: step.options } : {}),
    })),
  };
}

function AdminActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showInactive, setShowInactive] = useState(false);

  const activeCount = useMemo(() => activities.filter((item) => item.active).length, [activities]);
  const inactiveCount = activities.length - activeCount;
  const visibleActivities = useMemo(
    () => showInactive ? activities : activities.filter((item) => item.active),
    [activities, showInactive]
  );

  const loadActivities = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.getActivities();
      setActivities(response.activities || []);
    } catch (requestError) {
      setError(requestError.message || 'No fue posible cargar las actividades.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const updateArrayField = (name, value) => {
    setForm((current) => ({
      ...current,
      [name]: value.split(',').map((item) => item.trim()).filter(Boolean),
    }));
  };

  const toggleSecondary = (value) => {
    setForm((current) => ({
      ...current,
      secondaryCompetencies: current.secondaryCompetencies.includes(value)
        ? current.secondaryCompetencies.filter((item) => item !== value)
        : [...current.secondaryCompetencies, value],
    }));
  };

  const updateStep = (index, field, value) => {
    setForm((current) => ({
      ...current,
      steps: current.steps.map((step, stepIndex) => stepIndex === index ? { ...step, [field]: value } : step),
    }));
  };

  const addStep = () => {
    setForm((current) => ({ ...current, steps: [...current.steps, emptyStep()] }));
  };

  const removeStep = (index) => {
    setForm((current) => ({
      ...current,
      steps: current.steps.length === 1 ? current.steps : current.steps.filter((_, stepIndex) => stepIndex !== index),
    }));
  };

  const updateOption = (stepIndex, optionIndex, field, value) => {
    setForm((current) => ({
      ...current,
      steps: current.steps.map((step, index) => {
        if (index !== stepIndex) return step;
        return {
          ...step,
          options: step.options.map((option, optionIndexCurrent) =>
            optionIndexCurrent === optionIndex ? { ...option, [field]: value } : option
          ),
        };
      }),
    }));
  };

  const addOption = (stepIndex) => {
    setForm((current) => ({
      ...current,
      steps: current.steps.map((step, index) => index === stepIndex
        ? { ...step, options: [...step.options, { id: `option-${step.options.length + 1}`, label: '' }] }
        : step),
    }));
  };

  const removeOption = (stepIndex, optionIndex) => {
    setForm((current) => ({
      ...current,
      steps: current.steps.map((step, index) => index === stepIndex
        ? { ...step, options: step.options.filter((_, currentIndex) => currentIndex !== optionIndex) }
        : step),
    }));
  };

  const startEdit = (activity) => {
    setEditingId(activity.id);
    setForm(toForm(activity));
    setMessage('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveActivity = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const payload = toPayload(form);
      const response = editingId
        ? await api.updateActivity(editingId, payload)
        : await api.createActivity(payload);

      setMessage(editingId ? 'Actividad actualizada correctamente.' : 'Actividad creada correctamente.');
      setActivities((current) => editingId
        ? current.map((item) => item.id === editingId ? response.activity : item)
        : [...current, response.activity].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));

      resetForm();
    } catch (requestError) {
      setError(requestError.message || 'No fue posible guardar la actividad.');
    } finally {
      setSaving(false);
    }
  };

  const toggleActivity = async (activity) => {
    setMessage('');
    setError('');

    try {
      const response = activity.active
        ? await api.deleteActivity(activity.id)
        : await api.updateActivity(activity.id, { active: true });

      setActivities((current) => current.map((item) => item.id === activity.id ? response.activity : item));
      setMessage(activity.active ? 'Actividad desactivada.' : 'Actividad activada.');
    } catch (requestError) {
      setError(requestError.message || 'No fue posible cambiar el estado de la actividad.');
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <Link className={styles.back} to="/administrador"><ArrowLeft size={17} /> Volver al panel</Link>
          <p className={styles.eyebrow}>Administración de contenidos</p>
          <h1>Actividades socioemocionales</h1>
          <p>Administra el catálogo que utilizan los estudiantes en ORENZA.</p>
        </div>
        <div className={styles.summary}>
          <strong>{activeCount}</strong>
          <span>activas</span>
        </div>
      </header>

      {error && <div className={styles.alert} role="alert">{error}</div>}
      {message && <div className={styles.success} role="status">{message}</div>}

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.eyebrow}>{editingId ? 'Edición' : 'Nueva actividad'}</p>
            <h2>{editingId ? 'Editar actividad' : 'Crear actividad'}</h2>
          </div>
          {editingId && <button type="button" className={styles.secondaryButton} onClick={resetForm}><X size={16} /> Cancelar</button>}
        </div>

        <form onSubmit={saveActivity}>
          <div className={styles.formGrid}>
            <label>Identificador<input name="activityId" value={form.activityId} onChange={updateField} placeholder="ej. reconocer-mis-fortalezas" required /></label>
            <label>Título<input name="title" value={form.title} onChange={updateField} placeholder="Título de la actividad" required /></label>
            <label>Tipo<select name="type" value={form.type} onChange={updateField}>{TYPE_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <label>Categoría<input name="category" value={form.category} onChange={updateField} placeholder="Categoría" /></label>
            <label>Tiempo estimado (min.)<input name="estimatedTime" type="number" min="1" max="180" value={form.estimatedTime} onChange={updateField} required /></label>
            <label>Orden<input name="order" type="number" min="0" value={form.order} onChange={updateField} required /></label>
            <label>Edad mínima<input name="ageMin" type="number" min="0" max="100" value={form.ageMin} onChange={updateField} required /></label>
            <label>Edad máxima<input name="ageMax" type="number" min="0" max="100" value={form.ageMax} onChange={updateField} required /></label>
            <label>Dificultad<select name="difficulty" value={form.difficulty} onChange={updateField}>{DIFFICULTY_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          </div>

          <div className={styles.fieldBlock}>
            <label>Descripción<textarea name="description" value={form.description} onChange={updateField} maxLength={500} rows="3" /></label>
            <label>Propósito<textarea name="purpose" value={form.purpose} onChange={updateField} maxLength={500} rows="3" /></label>
            <label>Instrucciones<textarea name="instructions" value={form.instructions} onChange={updateField} maxLength={3000} rows="4" /></label>
          </div>

          <div className={styles.fieldBlock}>
            <div>
              <span className={styles.fieldLabel}>Competencia principal</span>
              <select value={form.primaryCompetency} onChange={(event) => setForm((current) => ({ ...current, primaryCompetency: event.target.value, category: event.target.value }))}>
                {COMPETENCY_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </div>
            <div>
              <span className={styles.fieldLabel}>Competencias secundarias</span>
              <div className={styles.checkGrid}>
                {COMPETENCY_OPTIONS.filter(([value]) => value !== form.primaryCompetency).map(([value, label]) => (
                  <label className={styles.check} key={value}><input type="checkbox" checked={form.secondaryCompetencies.includes(value)} onChange={() => toggleSecondary(value)} />{label}</label>
                ))}
              </div>
            </div>
            <label>Emociones asociadas<input value={form.emotions.join(', ')} onChange={(event) => updateArrayField('emotions', event.target.value)} placeholder="calma, frustración, confianza" /></label>
            <label className={styles.check}><input name="repeatable" type="checkbox" checked={form.repeatable} onChange={updateField} /> Actividad repetible</label>
          </div>

          <div className={styles.stepsHeader}>
            <div><span className={styles.fieldLabel}>Pasos de la actividad</span><small>Define las preguntas y el tipo de respuesta de cada paso.</small></div>
            <button type="button" className={styles.secondaryButton} onClick={addStep}><Plus size={16} /> Agregar paso</button>
          </div>

          <div className={styles.steps}>
            {form.steps.map((step, index) => (
              <article className={styles.step} key={index}>
                <div className={styles.stepHeader}>
                  <strong>Paso {index + 1}</strong>
                  <button type="button" className={styles.iconButton} onClick={() => removeStep(index)} aria-label={`Eliminar paso ${index + 1}`}><Trash2 size={16} /></button>
                </div>
                <div className={styles.formGrid}>
                  <label>Tipo de paso<select value={step.type} onChange={(event) => updateStep(index, 'type', event.target.value)}><option value="reflection">Reflexión</option><option value="instruction">Instrucción</option><option value="question">Pregunta</option></select></label>
                  <label>Tipo de respuesta<select value={step.responseType} onChange={(event) => updateStep(index, 'responseType', event.target.value)}>{RESPONSE_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
                </div>
                <label>Pregunta o instrucción<textarea value={step.question} onChange={(event) => updateStep(index, 'question', event.target.value)} rows="3" required /></label>

                {step.responseType === 'single-choice' && (
                  <div className={styles.options}>
                    <div className={styles.optionsHeader}><span className={styles.fieldLabel}>Opciones de respuesta</span><button type="button" className={styles.secondaryButton} onClick={() => addOption(index)}><Plus size={15} /> Opción</button></div>
                    {step.options.map((option, optionIndex) => (
                      <div className={styles.optionRow} key={optionIndex}>
                        <input value={option.id} onChange={(event) => updateOption(index, optionIndex, 'id', event.target.value)} placeholder="id" />
                        <input value={option.label} onChange={(event) => updateOption(index, optionIndex, 'label', event.target.value)} placeholder="Texto de la opción" required />
                        <button type="button" className={styles.iconButton} onClick={() => removeOption(index, optionIndex)} aria-label="Eliminar opción"><Trash2 size={15} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.primaryButton} disabled={saving}>
              {saving ? <LoaderCircle className={styles.spin} size={17} /> : <Save size={17} />}
              {saving ? 'Guardando…' : editingId ? 'Guardar cambios' : 'Crear actividad'}
            </button>
          </div>
        </form>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div><p className={styles.eyebrow}>Catálogo</p><h2>Actividades registradas</h2></div>
          <div className={styles.catalogMeta}>
            <label className={styles.toggleInactive}>
              <input type="checkbox" checked={showInactive} onChange={(event) => setShowInactive(event.target.checked)} />
              Mostrar inactivas ({inactiveCount})
            </label>
            <span className={styles.count}>{visibleActivities.length}</span>
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}><LoaderCircle className={styles.spin} size={21} /> Cargando actividades…</div>
        ) : (
          <div className={styles.tableWrap}>
            <table>
              <thead><tr><th>Actividad</th><th>Competencia</th><th>Tipo</th><th>Orden</th><th>Estado</th><th>Acciones</th></tr></thead>
              <tbody>
                {visibleActivities.map((activity) => (
                  <tr key={activity.id}>
                    <td><strong>{activity.title}</strong><small>{activity.activityId}</small></td>
                    <td>{COMPETENCY_OPTIONS.find(([value]) => value === activity.competencies?.primary)?.[1] || activity.competencies?.primary || '—'}</td>
                    <td>{TYPE_OPTIONS.find(([value]) => value === activity.type)?.[1] || activity.type || '—'}</td>
                    <td>{activity.order ?? '—'}</td>
                    <td><span className={activity.active ? styles.active : styles.inactive}>{activity.active ? 'Activa' : 'Inactiva'}</span></td>
                    <td>
                      <div className={styles.actions}>
                        <button type="button" className={styles.iconButton} onClick={() => startEdit(activity)} title="Editar"><Edit3 size={16} /></button>
                        <button type="button" className={styles.iconButton} onClick={() => toggleActivity(activity)} title={activity.active ? 'Desactivar' : 'Activar'}>{activity.active ? <Trash2 size={16} /> : <Check size={16} />}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminActivitiesPage;
