import CompetencyCard from '../../dashboard/CompetencyCard/CompetencyCard';

import styles from './CompetencyList.module.css';

function CompetencyList({
  competencies,
  iconMap = {},
  iconFallbackMap = {},
}) {
  return (
    <div className={styles.list}>

      {competencies.map(
        (competency) => (

          <CompetencyCard
            key={competency.id}

            icon={iconMap[competency.id]}
            iconFallback={iconFallbackMap[competency.id]}

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
  );
}

export default CompetencyList;