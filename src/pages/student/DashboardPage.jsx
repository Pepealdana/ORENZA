import { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import studentData from '../../data/studentData';
import activities from '../../data/activities';
import resources from '../../data/resources';

import EmotionalCheckIn from '../../components/dashboard/EmotionalCheckIn/EmotionalCheckIn';
import StreakCard from '../../components/dashboard/StreakCard/StreakCard';
import JourneyCard from '../../components/dashboard/JourneyCard/JourneyCard';
import ChallengeCard from '../../components/dashboard/ChallengeCard/ChallengeCard';

import CompetencyCard from '../../components/dashboard/CompetencyCard/CompetencyCard';
import ActivityCard from '../../components/dashboard/ActivityCard/ActivityCard';
import ResourceCard from '../../components/dashboard/ResourceCard/ResourceCard';

import {
  getLocalDateString,
} from '../../utils/dateUtils';

import {
  calculateCurrentStreak,
} from '../../utils/streakUtils';

import {
  getAllCompetencyStats,
} from '../../utils/competencyUtils';

import { useStudentProgress } from '../../hooks/useStudentProgress';
import { api } from '../../services/api';

import styles from './DashboardPage.module.css';
import IdentityVisual from '../../components/visual/IdentityVisual';


function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    today,
    competencies,
  } = studentData;

  const name = user?.name || studentData.name;


  /*
   * ========================================
   * REGISTROS EMOCIONALES
   * ========================================
   */

  const {
    checkIns,
    completedActivities,
    setCheckIns,
  } = useStudentProgress();

  const todayCheckIn = useMemo(
    () => checkIns.find((item) => item.date === getLocalDateString()) || null,
    [checkIns]
  );

  /*
   * ========================================
   * RACHA ACTUAL
   * ========================================
   */

  const currentStreak = calculateCurrentStreak(checkIns);


  /*
   * ========================================
   * COMPETENCIAS
   * ========================================
   *
   * El progreso se calcula a partir de
   * las actividades realmente completadas.
   */

  const competencyStats =
    getAllCompetencyStats(
      competencies,
      completedActivities
    );


  /*
   * ========================================
   * ACTIVIDADES RECIENTES
   * ========================================
   *
   * La fuente de verdad es el progreso
   * persistido del estudiante.
   *
   * activities.js contiene el catálogo
   * de actividades.
   */


  /*
   * Ordenamos las experiencias por fecha
   * de finalización, de la más reciente
   * a la más antigua.
   */

  const recentActivities =
    [...completedActivities]
      .sort(
        (a, b) =>
          b.completedAt.localeCompare(
            a.completedAt
          )
      )
      .slice(0, 5)
      .map(
        (completedActivity) => {

          /*
           * Buscamos la actividad original
           * en el catálogo.
           */

          const activity =
            activities.find(
              (item) =>
                item.id ===
                completedActivity.activityId
            );


          /*
           * Si la actividad ya no existe
           * en activities.js, no mostramos
           * ese registro.
           */

          if (!activity) {
            return null;
          }


          /*
           * Construimos solamente los datos
           * que necesita ActivityCard.
           *
           * El título procede de activities.js,
           * NO de localStorage.
           */

          return {
            id:
              completedActivity.id,

            activityId:
              activity.id,

            title:
              activity.title,

            status:
              'completed',

            date:
              completedActivity.completedAt,

            competency:
              activity.competencies,
          };
        }
      )
      .filter(Boolean);


  /*
   * ========================================
   * GUARDAR CHECK-IN EMOCIONAL
   * ========================================
   */

  const handleEmotionalCheckIn = async ({
    mood,
    emotion,
    note = '',
  }) => {
    const date = getLocalDateString();

    const intensityByMood = {
      'very-good': 5,
      good: 4,
      neutral: 3,
      'not-good': 2,
      bad: 1,
    };

    const intensity = intensityByMood[mood.id] || 3;

    const optimisticCheckIn = {
      id: `checkin-${Date.now()}`,
      date,
      mood: mood.id,
      emotion: emotion.id,
      intensity,
      note,
    };

    setCheckIns((current) => [
      ...current.filter((item) => item.date !== date),
      optimisticCheckIn,
    ]);

    try {
      const response = await api.saveCheckIn({
        date,
        mood: mood.id,
        emotion: emotion.id,
        intensity,
        note,
      });

      const saved = {
        id: response.item._id || response.item.id,
        date: response.item.date,
        mood: response.item.mood,
        emotion: response.item.emotion,
        intensity: response.item.intensity,
        note: response.item.note || '',
      };

      setCheckIns((current) => [
        ...current.filter((item) => item.date !== date),
        saved,
      ]);
    } catch (error) {
      console.error('No fue posible sincronizar el registro emocional:', error);
    }
  };


  return (
    <section className={styles.page}>


      {/* ========================================
          SALUDO
          ======================================== */}

      <header className={styles.header}>
        <div className={styles.headerCopy}>
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
        </div>

        <div className={styles.headerVisual}>
          <IdentityVisual variant="dashboard" />
        </div>
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

          date={today.suggestedActivity.estimatedTime}
          activityId={today.suggestedActivity.id}
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

          {competencyStats.map(
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

                completedCount={
                  competency.completedCount
                }

                totalActivities={
                  competency.totalActivities
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

          {recentActivities.length > 0 ? (

            recentActivities.map(
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

                  date={activity.date}
                  activityId={activity.activityId}
                />

              )
            )

          ) : (

            <p>
              Todavía no has explorado
              ninguna actividad.
            </p>

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

          {resources.map(
            (resource) => (

              <ResourceCard
                key={resource.id}
                title={resource.title}
                type={resource.type}
                resourceId={resource.id}
              />

            )
          )}

        </div>

      </section>

    </section>
  );
}


export default DashboardPage;