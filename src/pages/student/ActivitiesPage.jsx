import { useMemo, useState } from 'react';
import { useStudentProgress } from '../../hooks/useStudentProgress';

import {
  ArrowRight,
  Check,
  Clock3,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

import { Link } from 'react-router-dom';

import { useActivities } from '../../hooks/useActivities';


import styles from './ActivitiesPage.module.css';
import IdentityVisual from '../../components/visual/IdentityVisual';


/*
 * ========================================
 * COMPETENCIAS
 * ========================================
 */

const competencyData = {
  autoconocimiento: {
    label: 'Autoconocimiento',
    shortLabel: 'Conócete',
  },

  autorregulacion: {
    label: 'Autorregulación',
    shortLabel: 'Regúlate',
  },

  empatia: {
    label: 'Empatía',
    shortLabel: 'Comprende',
  },

  relaciones: {
    label: 'Relaciones positivas',
    shortLabel: 'Conecta',
  },
};


/*
 * ========================================
 * TIPOS DE EXPERIENCIA
 * ========================================
 */

const typeLabels = {
  reflection: 'Reflexión',
  emotional: 'Exploración emocional',
  situation: 'Situación',
  decision: 'Decisión',
  creative: 'Experiencia creativa',
  journal: 'Diario personal',
  observation: 'Observación',
  challenge: 'Reto',
  exploration: 'Exploración',
};


function ActivitiesPage() {

  /*
   * ========================================
   * FILTRO
   * ========================================
   */

  const [
    selectedCompetency,
    setSelectedCompetency,
  ] = useState('all');


  /*
   * ========================================
   * HISTORIAL DE EXPERIENCIAS
   * ========================================
   */

  const { completedActivities } = useStudentProgress();
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();


  /*
   * Creamos un conjunto de IDs para
   * consultar rápidamente si una actividad
   * ya fue explorada.
   */

  const completedActivityIds =
    useMemo(() => {

      return new Set(
        completedActivities.map(
          (item) => item.activityId
        )
      );

    }, [completedActivities]);


  /*
   * ========================================
   * ACTIVIDADES FILTRADAS
   * ========================================
   */

  const filteredActivities =
    useMemo(() => {

      if (
        selectedCompetency === 'all'
      ) {
        return activities;
      }

      return getActivitiesForCompetencies(selectedCompetency);

    }, [selectedCompetency, activities]);


  return (
    <section
      className={styles.page}
    >

      {/* ======================================
          ENCABEZADO
          ====================================== */}

      <header
        className={styles.header}
      >

        <div
          className={styles.headerIcon}
        >

          <Sparkles
            size={24}
            aria-hidden="true"
          />

        </div>


        <div>

          <p
            className={styles.eyebrow}
          >
            Explora
          </p>


          <h1>
            Actividades para conocerte
          </h1>


          <p
            className={styles.description}
          >
            No tienes que completarlas todas.
            Elige una que te llame la atención
            y date un momento para explorar.
          </p>

        </div>

      </header>

      <IdentityVisual variant="actividades" />


      {/* ======================================
          RESUMEN
          ====================================== */}

      <section
        className={styles.summary}
      >

        <div>

          <strong>
            {activities.length}
          </strong>

          <span>
            experiencias disponibles
          </span>

        </div>


        <div>

          <strong>
            {completedActivityIds.size}
          </strong>

          <span>
            experiencias exploradas
          </span>

        </div>


        <div>

          <strong>
            3–10
          </strong>

          <span>
            minutos aproximadamente
          </span>

        </div>

      </section>


      {/* ======================================
          FILTROS
          ====================================== */}

      <section
        className={styles.filtersSection}
      >

        <div
          className={styles.filtersHeader}
        >

          <div>

            <p
              className={styles.eyebrow}
            >
              Elige cómo quieres explorar
            </p>

            <h2>
              ¿Qué quieres descubrir hoy?
            </h2>

          </div>

        </div>


        <div
          className={styles.filters}
        >

          <button
            type="button"
            className={`
              ${styles.filterButton}
              ${
                selectedCompetency === 'all'
                  ? styles.filterButtonActive
                  : ''
              }
            `}
            onClick={() =>
              setSelectedCompetency(
                'all'
              )
            }
          >
            Todas
          </button>


          {Object.entries(
            competencyData
          ).map(
            ([
              competencyId,
              competency,
            ]) => (

              <button
                key={competencyId}
                type="button"
                className={`
                  ${styles.filterButton}
                  ${
                    selectedCompetency ===
                    competencyId
                      ? styles.filterButtonActive
                      : ''
                  }
                `}
                onClick={() =>
                  setSelectedCompetency(
                    competencyId
                  )
                }
              >
                {competency.label}
              </button>

            )
          )}

        </div>

      </section>


      {activitiesError && (
        <div className={styles.emptyState} role="alert">
          <h2>No fue posible cargar las experiencias</h2>
          <p>{activitiesError}</p>
        </div>
      )}

      {activitiesLoading && !activitiesError && (
        <div className={styles.emptyState} aria-live="polite">
          <h2>Cargando experiencias…</h2>
          <p>Estamos preparando tu catálogo de actividades.</p>
        </div>
      )}

      {/* ======================================
          RESULTADOS
          ====================================== */}

      <section
        className={styles.activitiesSection}
      >

        <div
          className={
            styles.resultsHeader
          }
        >

          <p>
            {filteredActivities.length}{' '}
            {filteredActivities.length ===
            1
              ? 'experiencia'
              : 'experiencias'}
          </p>

        </div>


        {filteredActivities.length ===
        0 ? (

          <div
            className={styles.emptyState}
          >

            <Sparkles
              size={28}
              aria-hidden="true"
            />

            <h2>
              Todavía no hay experiencias
            </h2>

            <p>
              Prueba otra categoría para
              seguir explorando.
            </p>

          </div>

        ) : (

          <div
            className={
              styles.activitiesGrid
            }
          >

            {filteredActivities.map(
              (activity) => {

                const primaryCompetency =
                  activity.competencies?.primary;

                const competency =
                  competencyData[
                    primaryCompetency
                  ];

                const hasBeenExplored =
                  completedActivityIds.has(
                    activity.id
                  );


                return (
                  <article
                    key={activity.id}
                    className={`
                      ${styles.activityCard}
                      ${
                        hasBeenExplored
                          ? styles.activityCardExplored
                          : ''
                      }
                    `}
                  >

                    {/* ==============================
                        PARTE SUPERIOR
                        ============================== */}

                    <div
                      className={
                        styles.cardTop
                      }
                    >

                      <span
                        className={
                          styles.type
                        }
                      >
                        {typeLabels[
                          activity.type
                        ] ||
                          'Exploración'}
                      </span>


                      {hasBeenExplored ? (

                        <span
                          className={
                            styles.completed
                          }
                        >

                          <Check
                            size={14}
                            aria-hidden="true"
                          />

                          Ya explorada

                        </span>

                      ) : activity.repeatable ? (

                        <span
                          className={
                            styles.repeatable
                          }
                        >

                          <RotateCcw
                            size={14}
                            aria-hidden="true"
                          />

                          Puedes volver

                        </span>

                      ) : null}

                    </div>


                    {/* ==============================
                        CONTENIDO
                        ============================== */}

                    <div
                      className={
                        styles.cardContent
                      }
                    >

                      <p
                        className={
                          styles.competency
                        }
                      >
                        {competency?.label ||
                          'Exploración'}
                      </p>


                      <h2>
                        {activity.title}
                      </h2>


                      <p
                        className={
                          styles.description
                        }
                      >
                        {activity.description}
                      </p>

                    </div>


                    {/* ==============================
                        META
                        ============================== */}

                    <div
                      className={
                        styles.meta
                      }
                    >

                      <span>

                        <Clock3
                          size={15}
                          aria-hidden="true"
                        />

                        {activity.estimatedTime}{' '}
                        min

                      </span>


                      <span>
                        {getDifficultyLabel(
                          activity.difficulty
                        )}
                      </span>

                    </div>


                    {/* ==============================
                        ACCIÓN
                        ============================== */}

                    <Link
                      to={`/estudiante/actividades/${activity.id}`}
                      className={
                        styles.startButton
                      }
                    >

                      {hasBeenExplored
                        ? 'Volver a explorar'
                        : 'Explorar'}

                      <ArrowRight
                        size={18}
                        aria-hidden="true"
                      />

                    </Link>

                  </article>
                );
              }
            )}

          </div>

        )}

      </section>


      {/* ======================================
          MENSAJE FINAL
          ====================================== */}

      <section
        className={styles.footerMessage}
      >

        <Sparkles
          size={20}
          aria-hidden="true"
        />

        <p>
          No hay una forma correcta de
          conocerte. Algunas experiencias
          pueden ayudarte a descubrir algo
          que todavía no habías notado.
        </p>

      </section>

    </section>
  );
}


/*
 * ========================================
 * FILTRO DE ACTIVIDADES POR COMPETENCIA
 * ========================================
 */

function getActivitiesForCompetencies(
  selectedCompetency
) {

  const competencyMap = {
    autoconocimiento: 'autoconocimiento',
    autorregulacion: 'autorregulacion',
    empatia: 'empatia',
    relaciones: 'relaciones-positivas',
  };

  const target =
    competencyMap[selectedCompetency];

  if (!target) {
    return activities;
  }

  return activities.filter(
    (activity) =>
      activity.competencies?.primary === target ||
      activity.competencies?.secondary?.includes(target)
  );
}


/*
 * ========================================
 * DIFICULTAD
 * ========================================
 */

function getDifficultyLabel(
  difficulty
) {

  const labels = {
    easy: 'Suave',
    medium: 'Para profundizar',
    hard: 'Desafío',
  };

  return (
    labels[difficulty] ||
    'Exploración'
  );
}


export default ActivitiesPage;