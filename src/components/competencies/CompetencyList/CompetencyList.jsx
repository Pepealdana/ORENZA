import CompetencyCard from '../../dashboard/CompetencyCard/CompetencyCard';

import styles from './CompetencyList.module.css';

function CompetencyList({ competencies }) {
  return (
    <div className={styles.list}>
      {competencies.map((competency) => (
        <CompetencyCard
          key={competency.id}
          name={competency.name}
          progress={competency.progress}
        />
      ))}
    </div>
  );
}

export default CompetencyList;