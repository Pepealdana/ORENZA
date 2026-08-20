import studentData from '../../data/studentData';

import CompetencyList from '../../components/competencies/CompetencyList/CompetencyList';

import styles from './CompetenciesPage.module.css';

function CompetenciesPage() {
  const { name, competencies } = studentData;

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.greeting}>
          Hola, {name}
        </p>

        <h1 className={styles.title}>
          Mis competencias
        </h1>

        <p className={styles.description}>
          Conoce y fortalece tus habilidades socioemocionales
          mediante tu proceso de aprendizaje.
        </p>
      </header>

      <CompetencyList
        competencies={competencies}
      />
    </section>
  );
}

export default CompetenciesPage;