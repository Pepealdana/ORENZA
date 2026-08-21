import resources from '../../data/resources';

import ResourceCard from '../../components/dashboard/ResourceCard/ResourceCard';

import styles from './ResourcesPage.module.css';


function ResourcesPage() {
  return (
    <section className={styles.page}>

      {/* ========================================
          ENCABEZADO
          ======================================== */}

      <header className={styles.header}>

        <p className={styles.eyebrow}>
          Para seguir explorando
        </p>

        <h1 className={styles.title}>
          Recursos
        </h1>

        <p className={styles.description}>
          Encuentra recursos que pueden ayudarte
          a seguir reflexionando y fortaleciendo
          tus habilidades socioemocionales.
        </p>

      </header>


      {/* ========================================
          LISTA DE RECURSOS
          ======================================== */}

      <section className={styles.section}>

        <div className={styles.sectionHeader}>

          <h2>
            Recursos disponibles
          </h2>

          <p>
            Explora los contenidos disponibles
            cuando quieras continuar tu proceso.
          </p>

        </div>


        {resources.length === 0 ? (

          <div className={styles.emptyState}>

            <h3>
              Todavía no hay recursos
            </h3>

            <p>
              Pronto encontrarás nuevos contenidos
              para seguir explorando.
            </p>

          </div>

        ) : (

          <div className={styles.list}>

            {resources.map(
              (resource) => (

                <ResourceCard
                  key={resource.id}

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

        )}

      </section>

    </section>
  );
}


export default ResourcesPage;