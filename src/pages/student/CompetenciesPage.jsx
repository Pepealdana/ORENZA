import studentData from '../../data/studentData';

import CompetencyList from '../../components/competencies/CompetencyList/CompetencyList';

import {
  getAllCompetencyStats,
} from '../../utils/competencyUtils';

import styles from './CompetenciesPage.module.css';

function CompetenciesPage() {
  const {
    name,
    competencies,
  } = studentData;


  /*
   * ========================================
   * ESTADÍSTICAS REALES
   * ========================================
   *
   * El progreso ya no depende del valor
   * estático de studentData.
   *
   * Se calcula a partir de las actividades
   * que el estudiante ha explorado.
   */

  const competencyStats =
    getAllCompetencyStats(
      competencies
    );


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

        <p
          className={styles.greeting}
        >
          Hola, {name}
        </p>


        <h1
          className={styles.title}
        >
          Mis competencias
        </h1>


        <p
          className={styles.description}
        >
          Conoce y fortalece tus habilidades
          socioemocionales mediante tu proceso
          de aprendizaje.
        </p>

      </header>


      {/* ======================================
          LISTA DE COMPETENCIAS
          ====================================== */}

      <CompetencyList
        competencies={
          competencyStats
        }
      />

    </section>
  );
}


export default CompetenciesPage;