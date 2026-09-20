import { useEffect, useState } from 'react';

import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import { api } from '../../services/api';

import styles from './ActivityPage.module.css';
import IdentityVisual from '../../components/visual/IdentityVisual';


function ActivityPage() {
  const navigate = useNavigate();

  const {
    activityId,
  } = useParams();


  /*
   * ========================================
   * ACTIVIDAD ACTUAL
   * ========================================
   */

  const [activity, setActivity] = useState(null);
  const [activityLoading, setActivityLoading] = useState(true);


  /*
   * ========================================
   * ESTADO DE LA ACTIVIDAD
   * ========================================
   */

  const [currentStep, setCurrentStep] =
    useState(0);

  const [responses, setResponses] = useState({});
  const [progressExists, setProgressExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    let active = true;

    setActivityLoading(true);
    setActivity(null);
    setError('');

    api.getActivity(activityId)
      .then(({ activity: loadedActivity }) => {
        if (active) setActivity({
          id: loadedActivity.activityId,
          backendId: loadedActivity.id,
          title: loadedActivity.title,
          description: loadedActivity.description || '',
          purpose: loadedActivity.purpose || '',
          type: loadedActivity.type || loadedActivity.category || 'exploration',
          estimatedTime: loadedActivity.estimatedTime,
          ageRange: loadedActivity.ageRange || { min: 13, max: 18 },
          competencies: loadedActivity.competencies || { primary: 'general', secondary: [] },
          emotions: loadedActivity.emotions || [],
          difficulty: loadedActivity.difficulty || 'easy',
          repeatable: loadedActivity.repeatable !== false,
          steps: loadedActivity.steps || [],
          order: loadedActivity.order || 0,
          active: loadedActivity.active !== false,
        });
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.message || 'No fue posible cargar la actividad.');
          setActivity(null);
        }
      })
      .finally(() => {
        if (active) setActivityLoading(false);
      });

    return () => {
      active = false;
    };
  }, [activityId]);


  useEffect(() => {
    if (!activity) return undefined;

    let active = true;

    setLoading(true);

    api.getActivityProgressById(activityId)
      .then(({ item }) => {
        if (!active) return;

        setProgressExists(Boolean(item));

        if (item?.answers) {
          setResponses(item.answers);

          const answeredSteps = activity.steps
            ?.map((stepItem, index) => ({
              index,
              answered:
                item.answers[stepItem.id] !== undefined &&
                item.answers[stepItem.id] !== '',
            }))
            .filter((entry) => entry.answered) || [];

          if (item.status === 'in-progress' && answeredSteps.length > 0) {
            setCurrentStep(
              Math.min(
                answeredSteps[answeredSteps.length - 1].index + 1,
                Math.max((activity.steps?.length || 1) - 1, 0)
              )
            );
          }

          if (item.status === 'completed') {
            setCurrentStep(
              Math.max((activity.steps?.length || 1) - 1, 0)
            );
          }
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.message || 'No fue posible recuperar el progreso guardado.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [activityId, activity]);

  if (activityLoading) {
    return (
      <section className={styles.page} aria-live="polite">
        <p className={styles.eyebrow}>Experiencia</p>
        <h1>Cargando actividad…</h1>
        <p>Estamos preparando esta experiencia para ti.</p>
      </section>
    );
  }


  /*
   * ========================================
   * ACTIVIDAD NO ENCONTRADA
   * ========================================
   */

  if (!activity) {
    return (
      <section
        className={styles.page}
      >

        <h1>
          Actividad no encontrada
        </h1>

        <button
          type="button"
          onClick={() =>
            navigate(
              '/estudiante/actividades'
            )
          }
        >
          Volver a actividades
        </button>

      </section>
    );
  }


  /*
   * ========================================
   * ACTIVIDAD SIN PASOS
   * ========================================
   */

  if (!Array.isArray(activity.steps) || activity.steps.length === 0) {
    return (
      <section className={styles.page}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate('/estudiante/actividades')}
        >
          <ChevronLeft size={20} aria-hidden="true" />
          Volver a actividades
        </button>

        <div className={styles.alert} role="alert">
          <strong>Esta experiencia aún no está disponible.</strong>
          <p>La actividad no tiene pasos configurados.</p>
        </div>
      </section>
    );
  }

  /*
   * ========================================
   * INFORMACIÓN DEL PASO ACTUAL
   * ========================================
   */

  const step =
    activity.steps[currentStep];

  const totalSteps =
    activity.steps.length;

  const isLastStep =
    currentStep ===
    totalSteps - 1;

  const currentResponse =
    responses[step.id] || '';


  /*
   * ========================================
   * CAMBIO DE RESPUESTA
   * ========================================
   */

  const handleResponseChange = (
    value
  ) => {

    setResponses(
      (previous) => ({
        ...previous,

        [step.id]:
          value,
      })
    );
  };


  /*
   * ========================================
   * SIGUIENTE PASO / FINALIZAR
   * ========================================
   */

  const handleNext = async () => {
    setError('');
    setSaving(true);

    try {
      const payload = {
        activityId: activity.id,
        status: isLastStep ? 'completed' : 'in-progress',
        answers: responses,
      };

      if (progressExists) {
        await api.updateActivityProgress(activity.id, payload);
      } else {
        await api.createActivityProgress(payload);
        setProgressExists(true);
      }

      if (!isLastStep) {
        setCurrentStep((previous) => previous + 1);
      } else {
        navigate('/estudiante/actividades');
      }
    } catch (requestError) {
      setError(requestError.message || 'No fue posible guardar tu progreso.');
    } finally {
      setSaving(false);
    }
  };


  /*
   * ========================================
   * PASO ANTERIOR
   * ========================================
   */

  const handlePrevious = () => {

    if (currentStep > 0) {

      setCurrentStep(
        (previous) =>
          previous - 1
      );

    }
  };


  /*
   * ========================================
   * INTERFAZ
   * ========================================
   */

  return (
    <section className={styles.page}>
      {error && <div className={styles.alert} role="alert">{error}</div>}


      {/* ======================================
          VOLVER
          ====================================== */}

      <button
        type="button"

        className={
          styles.backButton
        }

        onClick={() =>
          navigate(
            '/estudiante/actividades'
          )
        }
      >

        <ChevronLeft
          size={20}
          aria-hidden="true"
        />

        Volver a actividades

      </button>


      {/* ======================================
          ENCABEZADO
          ====================================== */}

      <header
        className={styles.header}
      >

        <p
          className={
            styles.eyebrow
          }
        >

          {getActivityTypeLabel(
            activity.type
          )}

        </p>


        <h1>
          {activity.title}
        </h1>


        <p
          className={
            styles.description
          }
        >
          {activity.description}
        </p>


        <div
          className={
            styles.meta
          }
        >

          <span>
            {activity.estimatedTime} min
          </span>

          <span>
            {totalSteps} pasos
          </span>

        </div>

      </header>

      <IdentityVisual variant="actividades" />


      {/* ======================================
          PROGRESO
          ====================================== */}

      <div
        className={
          styles.progressArea
        }
      >

        <div
          className={
            styles.progressHeader
          }
        >

          <span>
            Paso {currentStep + 1} de {totalSteps}
          </span>

          <span>
            {Math.round(
              (
                (currentStep + 1) /
                totalSteps
              ) * 100
            )}%
          </span>

        </div>


        <div
          className={
            styles.progressTrack
          }
        >

          <div
            className={
              styles.progressBar
            }

            style={{
              width: `${
                (
                  (currentStep + 1) /
                  totalSteps
                ) * 100
              }%`,
            }}
          />

        </div>

      </div>


      {/* ======================================
          PASO ACTUAL
          ====================================== */}

      <article
        className={
          styles.stepCard
        }
      >

        <p
          className={
            styles.stepType
          }
        >
          {getStepTypeLabel(
            step.type
          )}
        </p>


        <h2>
          {step.question}
        </h2>


        {/* ====================================
            RESPUESTA ABIERTA
            ==================================== */}

        {step.responseType ===
          'textarea' && (

          <textarea
            className={
              styles.textarea
            }

            value={
              currentResponse
            }

            onChange={(event) =>
              handleResponseChange(
                event.target.value
              )
            }

            placeholder="Escribe aquí lo que piensas..."

            rows={6}
          />

        )}


        {/* ====================================
            OPCIONES
            ==================================== */}

        {step.responseType ===
          'single-choice' && (

          <div
            className={
              styles.options
            }
          >

            {step.options.map(
              (option) => (

                <button
                  key={
                    option.id
                  }

                  type="button"

                  className={`
                    ${styles.option}
                    ${
                      currentResponse ===
                      option.id
                        ? styles.optionSelected
                        : ''
                    }
                  `}

                  onClick={() =>
                    handleResponseChange(
                      option.id
                    )
                  }
                >

                  <span
                    className={
                      styles.optionIndicator
                    }
                  >

                    {currentResponse ===
                    option.id
                      ? '✓'
                      : ''}

                  </span>


                  <span>
                    {option.label}
                  </span>

                </button>

              )
            )}

          </div>

        )}

      </article>


      {/* ======================================
          NAVEGACIÓN
          ====================================== */}

      <div
        className={
          styles.navigation
        }
      >

        <button
          type="button"

          className={
            styles.secondaryButton
          }

          onClick={
            handlePrevious
          }

          disabled={
            currentStep === 0
          }
        >

          <ChevronLeft
            size={18}
            aria-hidden="true"
          />

          Anterior

        </button>


        <button
          type="button"

          className={
            styles.primaryButton
          }

          onClick={handleNext}
          disabled={saving || loading}
        >

          {saving ? 'Guardando…' : isLastStep ? 'Terminar' : 'Continuar'}


          {!isLastStep && (

            <ChevronRight
              size={18}
              aria-hidden="true"
            />

          )}

        </button>

      </div>


      {/* ======================================
          MENSAJE DE ACOMPAÑAMIENTO
          ====================================== */}

      <p
        className={
          styles.supportMessage
        }
      >
        No hay respuestas correctas o
        incorrectas. Este espacio es para
        que puedas conocerte un poco mejor.
      </p>

    </section>
  );
}


/*
 * =========================================
 * TIPO DE ACTIVIDAD
 * =========================================
 */

function getActivityTypeLabel(
  type
) {

  const labels = {

    reflection:
      'Reflexión',

    emotional:
      'Exploración emocional',

    situation:
      'Situación',

    decision:
      'Decisión',

    creative:
      'Experiencia creativa',

    journal:
      'Diario personal',

    observation:
      'Observación',

    challenge:
      'Reto',

    exploration:
      'Exploración',

  };

  return (
    labels[type] ||
    'Exploración'
  );
}


/*
 * =========================================
 * TIPO DE PASO
 * =========================================
 */

function getStepTypeLabel(
  type
) {

  const labels = {

    question:
      'Pregúntate',

    reflection:
      'Reflexiona',

    situation:
      'Imagina la situación',

  };

  return (
    labels[type] ||
    'Explora'
  );
}


export default ActivityPage;