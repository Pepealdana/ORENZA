import {
  Link,
  useParams,
} from 'react-router-dom';

import studentData from '../../data/studentData';

import {
  getCompetencyStats,
} from '../../utils/competencyUtils';

import ProgressBar from '../../components/ui/ProgressBar/ProgressBar';

import styles from './CompetencyDetailPage.module.css';


function CompetencyDetailPage() {
  const {
    competencyId,
  } = useParams();


  /*
   * ========================================
   * COMPETENCIA ACTUAL
   * ========================================
   */

  const competencyIndex =
    studentData.competencies.findIndex(
      (item) =>
        item.id === competencyId
    );


  const competency =
    studentData.competencies[
      competencyIndex
    ];


  /*
   * ========================================
   * COMPETENCIA NO ENCONTRADA
   * ========================================
   */

  if (!competency) {
    return (
      <section className={styles.page}>

        <h1 className={styles.title}>
          Competencia no encontrada
        </h1>

        <p className={styles.description}>
          La competencia que intentas consultar
          no existe.
        </p>

        <Link
          to="/estudiante/competencias"
          className={styles.backLink}
        >
          Volver a competencias
        </Link>

      </section>
    );
  }


  /*
   * ========================================
   * ESTADÍSTICAS REALES
   * ========================================
   *
   * El progreso procede de las actividades
   * disponibles y de las experiencias
   * guardadas en localStorage.
   */

  const stats =
    getCompetencyStats(
      competency.id
    );


  const {
    activities,
    totalActivities,
    completedCount,
    progress,
    completedActivities,
  } = stats;


  /*
   * ========================================
   * ACTIVIDADES COMPLETADAS
   * ========================================
   *
   * Creamos un Set para consultar rápidamente
   * cuáles actividades ya fueron exploradas.
   */

  const completedActivityIds =
    new Set(
      completedActivities.map(
        (completedActivity) =>
          completedActivity.activityId
      )
    );


  return (
    <section className={styles.page}>

      {/* ======================================
          VOLVER
          ====================================== */}

      <Link
        to="/estudiante/competencias"
        className={styles.backLink}
      >
        ← Volver a competencias
      </Link>


      {/* ======================================
          ENCABEZADO
          ====================================== */}

      <header className={styles.header}>

        <p className={styles.eyebrow}>
          Competencia socioemocional
        </p>

        <h1 className={styles.title}>
          {competency.name}
        </h1>

        <p className={styles.description}>
          {competency.description}
        </p>

      </header>


      {/* ======================================
          RESUMEN DEL PROGRESO
          ====================================== */}

      <section className={styles.progressCard}>

        <div className={styles.progressHeader}>

          <div>

            <p className={styles.eyebrow}>
              Tu recorrido
            </p>

            <h2>
              Progreso en esta competencia
            </h2>

          </div>

          <span
            className={styles.percentage}
          >
            {progress}%
          </span>

        </div>


        <ProgressBar
          value={progress}
          showValue={false}
          label={`Progreso en ${competency.name}`}
        />


        <p className={styles.progressText}>

          {completedCount} de {totalActivities}{' '}

          {totalActivities === 1
            ? 'experiencia explorada'
            : 'experiencias exploradas'}

        </p>

      </section>


      {/* ======================================
          ACTIVIDADES
          ====================================== */}

      <section className={styles.activitiesSection}>

        <div className={styles.sectionHeader}>

          <p className={styles.eyebrow}>
            Para seguir explorando
          </p>

          <h2>
            Experiencias relacionadas
          </h2>

          <p className={styles.sectionDescription}>
            Elige una experiencia para continuar
            explorando esta competencia.
          </p>

        </div>


        {activities.length === 0 ? (

          <div className={styles.emptyState}>

            <h3>
              Todavía no hay experiencias
            </h3>

            <p>
              Pronto encontrarás nuevas actividades
              relacionadas con esta competencia.
            </p>

          </div>

        ) : (

          <div className={styles.activityList}>

            {activities.map(
              (activity) => {

                const completed =
                  completedActivityIds.has(
                    activity.id
                  );


                return (
                  <article
                    key={activity.id}
                    className={
                      styles.activityCard
                    }
                  >

                    <div
                      className={
                        styles.activityContent
                      }
                    >

                      <div
                        className={
                          styles.activityTop
                        }
                      >

                        <span
                          className={
                            styles.activityType
                          }
                        >
                          {getActivityTypeLabel(
                            activity.type
                          )}
                        </span>


                        {completed && (
                          <span
                            className={
                              styles.completedBadge
                            }
                          >
                            ✓ Ya explorada
                          </span>
                        )}

                      </div>


                      <h3>
                        {activity.title}
                      </h3>


                      <p
                        className={
                          styles.activityDescription
                        }
                      >
                        {activity.description}
                      </p>


                      <div
                        className={
                          styles.activityMeta
                        }
                      >

                        <span>
                          {activity.estimatedTime}{' '}
                          minutos
                        </span>

                        <span>
                          {getDifficultyLabel(
                            activity.difficulty
                          )}
                        </span>

                      </div>

                    </div>


                    <Link
                      to={
                        `/estudiante/actividades/${activity.id}`
                      }
                      className={
                        styles.activityButton
                      }
                    >

                      {completed
                        ? 'Volver a explorar'
                        : 'Comenzar actividad'}

                    </Link>

                  </article>
                );
              }
            )}

          </div>
        )}

      </section>


      {/* ======================================
          NAVEGACIÓN ENTRE COMPETENCIAS
          ====================================== */}

      <nav
        className={styles.navigation}
        aria-label="Navegación entre competencias"
      >

        {competencyIndex > 0 ? (

          <Link
            to={
              `/estudiante/competencias/${
                studentData.competencies[
                  competencyIndex - 1
                ].id
              }`
            }
            className={
              styles.navigationLink
            }
          >
            ← Anterior
          </Link>

        ) : (

          <span />

        )}


        {competencyIndex <
          studentData.competencies.length - 1 ? (

          <Link
            to={
              `/estudiante/competencias/${
                studentData.competencies[
                  competencyIndex + 1
                ].id
              }`
            }
            className={
              styles.navigationLink
            }
          >
            Siguiente →
          </Link>

        ) : (

          <span />

        )}

      </nav>

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


  return (
    labels[type] ||
    'Exploración'
  );
}


/*
 * =========================================
 * DIFICULTAD
 * =========================================
 */

function getDifficultyLabel(
  difficulty
) {
  const labels = {
    easy: 'Suave',
    medium: 'Intermedia',
    hard: 'Profundización',
  };


  return (
    labels[difficulty] ||
    'Exploración'
  );
}


export default CompetencyDetailPage;