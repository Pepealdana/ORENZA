import { useMemo, useState } from 'react';

import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import activities from '../../data/activities';

import {
  saveCompletedActivity,
} from '../../utils/activityStorage';

import {
  getLocalDateString,
} from '../../utils/dateUtils';

import styles from './ActivityPage.module.css';


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

  const activity = useMemo(
    () =>
      activities.find(
        (item) =>
          item.id === activityId
      ),
    [activityId]
  );


  /*
   * ========================================
   * ESTADO DE LA ACTIVIDAD
   * ========================================
   */

  const [currentStep, setCurrentStep] =
    useState(0);

  const [responses, setResponses] =
    useState({});


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

  const handleNext = () => {

    /*
     * Si todavía hay pasos,
     * avanzamos al siguiente.
     */

    if (!isLastStep) {

      setCurrentStep(
        (previous) =>
          previous + 1
      );

      return;
    }


    /*
     * ======================================
     * ACTIVIDAD COMPLETADA
     * ======================================
     *
     * Guardamos únicamente los datos
     * propios de la experiencia realizada.
     *
     * El título, descripción, competencias,
     * dificultad y demás información de la
     * actividad permanecen en activities.js.
     */

    const completedActivity = {

      id:
        `experience-${Date.now()}`,

      activityId:
        activity.id,

      completedAt:
        getLocalDateString(),

      responses: {
        ...responses,
      },

    };


    /*
     * ======================================
     * GUARDAR EXPERIENCIA
     * ======================================
     */

    const savedActivity =
      saveCompletedActivity(
        completedActivity
      );


    /*
     * Si el almacenamiento falla,
     * permanecemos en la actividad.
     */

    if (!savedActivity) {
      return;
    }


    /*
     * ======================================
     * REGRESAR A ACTIVIDADES
     * ======================================
     */

    navigate(
      '/estudiante/actividades'
    );
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
    <section
      className={styles.page}
    >


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

          onClick={
            handleNext
          }
        >

          {isLastStep
            ? 'Terminar'
            : 'Continuar'}


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