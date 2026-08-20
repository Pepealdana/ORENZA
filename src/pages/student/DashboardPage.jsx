import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import studentData from '../../data/studentData';

import EmotionalCheckIn from '../../components/dashboard/EmotionalCheckIn/EmotionalCheckIn';
import StreakCard from '../../components/dashboard/StreakCard/StreakCard';
import JourneyCard from '../../components/dashboard/JourneyCard/JourneyCard';
import ChallengeCard from '../../components/dashboard/ChallengeCard/ChallengeCard';

import CompetencyCard from '../../components/dashboard/CompetencyCard/CompetencyCard';
import ActivityCard from '../../components/dashboard/ActivityCard/ActivityCard';
import ResourceCard from '../../components/dashboard/ResourceCard/ResourceCard';

import {
  getStoredCheckIns,
  getTodayCheckIn,
  saveCheckIn,
} from '../../utils/emotionalStorage';

import {
  getLocalDateString,
} from '../../utils/dateUtils';

import {
  calculateCurrentStreak,
} from '../../utils/streakUtils';

import styles from './DashboardPage.module.css';

function DashboardPage() {
  const navigate = useNavigate();

  const {
    name,
    today,
    competencies,
    recentActivities,
    recommendedResources,
  } = studentData;


  /*
   * ========================================
   * REGISTROS EMOCIONALES
   * ========================================
   */

  const storedCheckIns =
    getStoredCheckIns();

  const storedTodayCheckIn =
    getTodayCheckIn();


  /*
   * Registro emocional del día actual.
   */

  const [todayCheckIn, setTodayCheckIn] =
    useState(
      storedTodayCheckIn
    );


  /*
   * Historial completo de check-ins.
   */

  const [checkIns, setCheckIns] =
    useState(
      storedCheckIns
    );


  /*
   * ========================================
   * RACHA ACTUAL
   * ========================================
   */

  const [currentStreak, setCurrentStreak] =
    useState(
      calculateCurrentStreak(
        storedCheckIns
      )
    );


  /*
   * ========================================
   * GUARDAR CHECK-IN EMOCIONAL
   * ========================================
   */

  const handleEmotionalCheckIn = ({
    mood,
    emotion,
  }) => {

    /*
     * Utilizamos la fecha local del dispositivo.
     *
     * No utilizamos toISOString(), porque
     * convertiría la fecha a UTC.
     */

    const today =
      getLocalDateString();


    /*
     * Creamos el nuevo registro.
     */

    const checkIn = {
      id: `checkin-${Date.now()}`,
      date: today,
      mood: mood.id,
      emotion: emotion.id,
      intensity: null,
    };


    /*
     * Guardamos el registro.
     */

    const savedCheckIns =
      saveCheckIn(
        checkIn
      );

    if (!savedCheckIns) {
      return;
    }


    /*
     * Actualizamos el registro del día.
     */

    setTodayCheckIn(
      checkIn
    );


    /*
     * Actualizamos el historial completo.
     */

    setCheckIns(
      savedCheckIns
    );


    /*
     * Recalculamos la racha.
     */

    const updatedStreak =
      calculateCurrentStreak(
        savedCheckIns
      );

    setCurrentStreak(
      updatedStreak
    );
  };


  return (
    <section className={styles.page}>


      {/* ========================================
          SALUDO
          ======================================== */}

      <header className={styles.header}>

        <p className={styles.greeting}>
          Hola, {name}
        </p>

        <h1 className={styles.title}>
          Este espacio es para ti
        </h1>

        <p className={styles.description}>
          Explora, conócete y descubre poco a poco todo
          lo que puedes desarrollar en ti.
        </p>

      </header>


      {/* ========================================
          CHECK-IN EMOCIONAL
          ======================================== */}

      <section className={styles.section}>

        <EmotionalCheckIn
          onSave={
            handleEmotionalCheckIn
          }

          completed={
            Boolean(
              todayCheckIn
            )
          }

          todayCheckIn={
            todayCheckIn
          }
        />

      </section>


      {/* ========================================
          RECORRIDO / RACHA
          ======================================== */}

      <section className={styles.section}>

        <StreakCard
          days={
            currentStreak
          }
        />

      </section>


      {/* ========================================
          MI RECORRIDO
          ======================================== */}

      <section className={styles.section}>

        <JourneyCard
          checkIns={
            checkIns
          }

          streak={
            currentStreak
          }

          onViewJourney={() => {
            navigate(
              '/estudiante/recorrido'
            );
          }}
        />

      </section>


      {/* ========================================
          RETO DE HOY
          ======================================== */}

      <section className={styles.section}>

        <ChallengeCard
          title={
            today.challenge.title
          }

          description={
            today.challenge.description
          }

          estimatedTime={
            today.challenge.estimatedTime
          }
        />

      </section>


      {/* ========================================
          ACTIVIDAD SUGERIDA
          ======================================== */}

      <section className={styles.section}>

        <div className={styles.sectionHeader}>

          <div>

            <p className={styles.eyebrow}>
              Para explorar hoy
            </p>

            <h2>
              Una experiencia para ti
            </h2>

          </div>

        </div>


        <ActivityCard
          title={
            today
              .suggestedActivity
              .title
          }

          status="recommended"

          date={
            today
              .suggestedActivity
              .estimatedTime
          }
        />

      </section>


      {/* ========================================
          MIS COMPETENCIAS
          ======================================== */}

      <section className={styles.section}>

        <div className={styles.sectionHeader}>

          <div>

            <p className={styles.eyebrow}>
              Tu recorrido
            </p>

            <h2>
              Explora tus competencias
            </h2>

          </div>

        </div>


        <div className={styles.grid}>

          {competencies.map(
            (competency) => (

              <CompetencyCard
                key={
                  competency.id
                }

                name={
                  competency.name
                }

                progress={
                  competency.progress
                }

                to={
                  `/estudiante/competencias/${competency.id}`
                }
              />

            )
          )}

        </div>

      </section>


      {/* ========================================
          ACTIVIDADES RECIENTES
          ======================================== */}

      <section className={styles.section}>

        <div className={styles.sectionHeader}>

          <div>

            <p className={styles.eyebrow}>
              Lo que has explorado
            </p>

            <h2>
              Actividades recientes
            </h2>

          </div>

        </div>


        <div className={styles.list}>

          {recentActivities.map(
            (activity) => (

              <ActivityCard
                key={
                  activity.id
                }

                title={
                  activity.title
                }

                status={
                  activity.status
                }

                date={
                  activity.date
                }
              />

            )
          )}

        </div>

      </section>


      {/* ========================================
          RECURSOS
          ======================================== */}

      <section className={styles.section}>

        <div className={styles.sectionHeader}>

          <div>

            <p className={styles.eyebrow}>
              Para seguir explorando
            </p>

            <h2>
              Recursos recomendados
            </h2>

          </div>

        </div>


        <div className={styles.list}>

          {recommendedResources.map(
            (resource) => (

              <ResourceCard
                key={
                  resource.id
                }

                title={
                  resource.title
                }

                type={
                  resource.type
                }
              />

            )
          )}

        </div>

      </section>

    </section>
  );
}

export default DashboardPage;