import studentData from '../../data/studentData';

import ProgressCard from '../../components/dashboard/ProgressCard/ProgressCard';
import CompetencyCard from '../../components/dashboard/CompetencyCard/CompetencyCard';
import ActivityCard from '../../components/dashboard/ActivityCard/ActivityCard';
import ResourceCard from '../../components/dashboard/ResourceCard/ResourceCard';

import styles from './DashboardPage.module.css';

function DashboardPage() {
  const {
    name,
    progress,
    competencies,
    recentActivities,
    recommendedResources,
  } = studentData;

  return (
    <section className={styles.page}>
      <header className={styles.welcome}>
        <p className={styles.greeting}>
          Hola, {name}
        </p>

        <h1 className={styles.title}>
          Descubre tu potencial
        </h1>

        <p className={styles.description}>
          Continúa avanzando en tu proceso de crecimiento personal.
        </p>
      </header>

      <div className={styles.dashboardGrid}>

        <section
          className={`${styles.section} ${styles.progressSection}`}
        >
          <ProgressCard
            progress={progress.overall}
            completedActivities={progress.completedActivities}
            totalActivities={progress.totalActivities}
          />
        </section>

        <section
          className={`${styles.section} ${styles.competenciesSection}`}
        >
          <h2 className={styles.sectionTitle}>
            Mis competencias
          </h2>

          <div className={styles.competencies}>
            {competencies.map((competency) => (
              <CompetencyCard
                key={competency.id}
                name={competency.name}
                progress={competency.progress}
              />
            ))}
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.activitiesSection}`}
        >
          <h2 className={styles.sectionTitle}>
            Actividades recientes
          </h2>

          <div className={styles.activities}>
            {recentActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                status={activity.status}
                date={activity.date}
              />
            ))}
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.resourcesSection}`}
        >
          <h2 className={styles.sectionTitle}>
            Recursos recomendados
          </h2>

          <div className={styles.resources}>
            {recommendedResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                type={resource.type}
              />
            ))}
          </div>
        </section>

      </div>
    </section>
  );
}

export default DashboardPage;