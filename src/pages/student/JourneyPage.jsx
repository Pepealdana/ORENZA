import { useMemo } from 'react';

import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  Heart,
  Sparkles,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import {
  getStoredCheckIns,
} from '../../utils/emotionalStorage';

import {
  getCompletedActivities,
} from '../../utils/activityStorage';

import {
  calculateCurrentStreak,
} from '../../utils/streakUtils';

import styles from './JourneyPage.module.css';


/*
 * =========================================
 * EMOCIONES
 * =========================================
 */

const emotionData = {
  alegria: {
    label: 'Alegría',
    emoji: '😊',
  },

  tranquilidad: {
    label: 'Tranquilidad',
    emoji: '😌',
  },

  motivacion: {
    label: 'Motivación',
    emoji: '✨',
  },

  preocupacion: {
    label: 'Preocupación',
    emoji: '😟',
  },

  frustracion: {
    label: 'Frustración',
    emoji: '😤',
  },

  tristeza: {
    label: 'Tristeza',
    emoji: '😔',
  },

  enojo: {
    label: 'Enojo',
    emoji: '😠',
  },

  cansancio: {
    label: 'Cansancio',
    emoji: '😴',
  },
};


function JourneyPage() {
  const navigate = useNavigate();


  /*
   * =========================================
   * REGISTROS EMOCIONALES
   * =========================================
   */

  const checkIns =
    getStoredCheckIns();


  /*
   * =========================================
   * ACTIVIDADES EXPLORADAS
   * =========================================
   */

  const completedActivities =
    getCompletedActivities();


  /*
   * =========================================
   * RACHA
   * =========================================
   */

  const currentStreak =
    calculateCurrentStreak(
      checkIns
    );


  /*
   * =========================================
   * CHECK-INS ORDENADOS
   * =========================================
   */

  const recentCheckIns =
    useMemo(() => {

      return [...checkIns]
        .sort((a, b) =>
          b.date.localeCompare(
            a.date
          )
        );

    }, [checkIns]);


  /*
   * =========================================
   * ACTIVIDADES ORDENADAS
   * =========================================
   */

  const recentActivities =
    useMemo(() => {

      return [...completedActivities]
        .sort((a, b) =>
          b.completedAt.localeCompare(
            a.completedAt
          )
        );

    }, [completedActivities]);


  /*
   * =========================================
   * ÚLTIMA EMOCIÓN
   * =========================================
   */

  const latestEmotion =
    recentCheckIns.length > 0
      ? emotionData[
          recentCheckIns[0].emotion
        ]
      : null;


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

        <button
          type="button"
          className={styles.backButton}
          onClick={() =>
            navigate(-1)
          }
        >

          <ChevronLeft
            size={20}
            aria-hidden="true"
          />

          Volver

        </button>


        <div
          className={
            styles.headerContent
          }
        >

          <div
            className={
              styles.headerIcon
            }
          >

            <Heart
              size={24}
              aria-hidden="true"
            />

          </div>


          <div>

            <p
              className={
                styles.eyebrow
              }
            >
              Mi recorrido
            </p>


            <h1>
              Un espacio para escucharte
            </h1>


            <p
              className={
                styles.description
              }
            >
              Aquí puedes mirar los momentos
              que has dedicado a reconocerte,
              explorar y descubrir cosas de ti.
            </p>

          </div>

        </div>

      </header>


      {/* ======================================
          RESUMEN
          ====================================== */}

      <section
        className={styles.summary}
      >

        <div
          className={
            styles.summaryItem
          }
        >

          <span
            className={
              styles.summaryNumber
            }
          >
            {currentStreak}
          </span>


          <span
            className={
              styles.summaryLabel
            }
          >
            {currentStreak === 1
              ? 'día de continuidad'
              : 'días de continuidad'}
          </span>

        </div>


        <div
          className={
            styles.summaryDivider
          }
        />


        <div
          className={
            styles.summaryItem
          }
        >

          <span
            className={
              styles.summaryNumber
            }
          >
            {checkIns.length}
          </span>


          <span
            className={
              styles.summaryLabel
            }
          >
            {checkIns.length === 1
              ? 'momento registrado'
              : 'momentos registrados'}
          </span>

        </div>


        <div
          className={
            styles.summaryDivider
          }
        />


        <div
          className={
            styles.summaryItem
          }
        >

          <span
            className={
              styles.summaryNumber
            }
          >
            {completedActivities.length}
          </span>


          <span
            className={
              styles.summaryLabel
            }
          >
            {completedActivities.length === 1
              ? 'experiencia explorada'
              : 'experiencias exploradas'}
          </span>

        </div>

      </section>


      {/* ======================================
          ÚLTIMA EMOCIÓN
          ====================================== */}

      {latestEmotion && (

        <section
          className={styles.section}
        >

          <div
            className={
              styles.sectionHeading
            }
          >

            <div>

              <p
                className={
                  styles.eyebrow
                }
              >
                Tu momento más reciente
              </p>


              <h2>
                Lo que reconociste en ti
              </h2>

            </div>

          </div>


          <article
            className={
              styles.latestCard
            }
          >

            <div
              className={
                styles.latestEmoji
              }
            >
              {latestEmotion.emoji}
            </div>


            <div>

              <h3>
                {latestEmotion.label}
              </h3>


              <p>
                {formatLongDate(
                  recentCheckIns[0].date
                )}
              </p>

            </div>

          </article>

        </section>

      )}


      {/* ======================================
          ACTIVIDADES EXPLORADAS
          ====================================== */}

      <section
        className={styles.section}
      >

        <div
          className={
            styles.sectionHeading
          }
        >

          <div>

            <p
              className={
                styles.eyebrow
              }
            >
              Lo que has explorado
            </p>


            <h2>
              Experiencias que forman parte
              de tu recorrido
            </h2>

          </div>

        </div>


        {recentActivities.length === 0 ? (

          <div
            className={
              styles.emptyState
            }
          >

            <Sparkles
              size={28}
              aria-hidden="true"
            />


            <h3>
              Tu recorrido está comenzando
            </h3>


            <p>
              Cuando explores una actividad,
              aparecerá aquí como parte de
              tu experiencia.
            </p>

          </div>

        ) : (

          <div
            className={
              styles.activityHistory
            }
          >

            {recentActivities.map(
              (activity) => (

                <article
                  key={activity.id}
                  className={
                    styles.activityHistoryItem
                  }
                >

                  <div
                    className={
                      styles.activityIcon
                    }
                  >

                    <CheckCircle2
                      size={20}
                      aria-hidden="true"
                    />

                  </div>


                  <div
                    className={
                      styles.activityContent
                    }
                  >

                    <h3>
                      {activity.title}
                    </h3>


                    <p>
                      Explorada el{' '}
                      {formatLongDate(
                        activity.completedAt
                      )}
                    </p>

                  </div>

                </article>

              )
            )}

          </div>

        )}

      </section>


      {/* ======================================
          HISTORIAL EMOCIONAL
          ====================================== */}

      <section
        className={styles.section}
      >

        <div
          className={
            styles.sectionHeading
          }
        >

          <div>

            <p
              className={
                styles.eyebrow
              }
            >
              Tu historia
            </p>


            <h2>
              Momentos que has compartido
              contigo
            </h2>

          </div>

        </div>


        {recentCheckIns.length === 0 ? (

          <div
            className={
              styles.emptyState
            }
          >

            <CalendarDays
              size={28}
              aria-hidden="true"
            />


            <h3>
              Todavía no hay registros
            </h3>


            <p>
              Cuando quieras, vuelve al inicio
              y dedica un momento a reconocer
              cómo te sientes.
            </p>

          </div>

        ) : (

          <div
            className={
              styles.history
            }
          >

            {recentCheckIns.map(
              (checkIn) => {

                const emotion =
                  emotionData[
                    checkIn.emotion
                  ];

                return (

                  <article
                    key={checkIn.id}
                    className={
                      styles.historyItem
                    }
                  >

                    <div
                      className={
                        styles.historyDate
                      }
                    >
                      {formatShortDate(
                        checkIn.date
                      )}
                    </div>


                    <div
                      className={
                        styles.historyEmoji
                      }
                    >
                      {emotion?.emoji || '•'}
                    </div>


                    <div
                      className={
                        styles.historyContent
                      }
                    >

                      <h3>
                        {emotion?.label ||
                          'Emoción registrada'}
                      </h3>


                      <p>
                        Reconociste cómo te
                        sentías en ese momento.
                      </p>

                    </div>

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
        className={
          styles.reflection
        }
      >

        <Heart
          size={20}
          aria-hidden="true"
        />


        <p>
          No necesitas sentir algo específico
          para que tu experiencia sea válida.
          Observarte también es parte de
          conocerte.
        </p>

      </section>

    </section>
  );
}


/*
 * =========================================
 * FECHA CORTA
 * =========================================
 */

function formatShortDate(
  dateString
) {

  const parts =
    dateString.split('-');

  const month =
    parts[1];

  const day =
    parts[2];

  return `${day}/${month}`;
}


/*
 * =========================================
 * FECHA LARGA
 * =========================================
 */

function formatLongDate(
  dateString
) {

  const [
    year,
    month,
    day,
  ] = dateString.split('-');


  const date = new Date(
    `${year}-${month}-${day}T12:00:00`
  );


  return date.toLocaleDateString(
    'es-CO',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );
}


export default JourneyPage;