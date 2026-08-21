import { Link } from 'react-router-dom';

import studentData from '../../data/studentData';

import styles from './HomePage.module.css';

function HomePage() {
  const {
    name,
    today,
  } = studentData;

  return (
    <section className={styles.page}>

      {/* ========================================
          BIENVENIDA
          ======================================== */}

      <header className={styles.header}>

        <p className={styles.eyebrow}>
          Bienvenido a ORENZA
        </p>

        <h1 className={styles.title}>
          Hola, {name}
        </h1>

        <p className={styles.description}>
          Este es un espacio para conocerte,
          explorar lo que sientes y descubrir
          poco a poco todo lo que puedes desarrollar
          en ti.
        </p>

      </header>


      {/* ========================================
          CONTINUAR
          ======================================== */}

      <section className={styles.section}>

        <div className={styles.sectionHeader}>

          <p className={styles.eyebrow}>
            Para continuar
          </p>

          <h2>
            ¿Qué quieres explorar hoy?
          </h2>

        </div>


        <div className={styles.actions}>

          <Link
            to="/estudiante/dashboard"
            className={styles.actionCard}
          >

            <span className={styles.actionTitle}>
              Mi proceso
            </span>

            <span className={styles.actionDescription}>
              Revisa tu recorrido, tus emociones
              y tu progreso.
            </span>

            <span className={styles.actionLink}>
              Ver mi proceso →
            </span>

          </Link>


          <Link
            to="/estudiante/actividades"
            className={styles.actionCard}
          >

            <span className={styles.actionTitle}>
              Explorar actividades
            </span>

            <span className={styles.actionDescription}>
              Elige una experiencia y dedica
              unos minutos a conocerte mejor.
            </span>

            <span className={styles.actionLink}>
              Ver actividades →
            </span>

          </Link>


          <Link
            to="/estudiante/competencias"
            className={styles.actionCard}
          >

            <span className={styles.actionTitle}>
              Mis competencias
            </span>

            <span className={styles.actionDescription}>
              Conoce las habilidades socioemocionales
              que estás desarrollando.
            </span>

            <span className={styles.actionLink}>
              Ver competencias →
            </span>

          </Link>


          <Link
            to="/estudiante/recorrido"
            className={styles.actionCard}
          >

            <span className={styles.actionTitle}>
              Mi recorrido
            </span>

            <span className={styles.actionDescription}>
              Mira los momentos y experiencias
              que has ido registrando.
            </span>

            <span className={styles.actionLink}>
              Ver recorrido →
            </span>

          </Link>

        </div>

      </section>


      {/* ========================================
          SUGERENCIA DEL DÍA
          ======================================== */}

      <section className={styles.highlight}>

        <div>

          <p className={styles.eyebrow}>
            Una sugerencia para hoy
          </p>

          <h2>
            {today.suggestedActivity.title}
          </h2>

          <p className={styles.highlightDescription}>
            {today.suggestedActivity.description}
          </p>

          <p className={styles.highlightTime}>
            {today.suggestedActivity.estimatedTime}
          </p>

        </div>


        <Link
          to={`/estudiante/actividades/${today.suggestedActivity.id}`}
          className={styles.primaryButton}
        >
          Explorar actividad
        </Link>

      </section>


      {/* ========================================
          RETO
          ======================================== */}

      <section className={styles.challenge}>

        <div>

          <p className={styles.eyebrow}>
            Reto de hoy
          </p>

          <h2>
            {today.challenge.title}
          </h2>

          <p>
            {today.challenge.description}
          </p>

        </div>

        <span className={styles.challengeTime}>
          {today.challenge.estimatedTime}
        </span>

      </section>

    </section>
  );
}

export default HomePage;