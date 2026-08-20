import {
  CalendarDays,
  ChevronRight,
} from 'lucide-react';

import styles from './JourneyCard.module.css';

function JourneyCard({
  checkIns,
  streak,
  onViewJourney,
}) {
  const recentCheckIns = [...checkIns]
    .sort((a, b) =>
      b.date.localeCompare(a.date)
    )
    .slice(0, 7);

  return (
    <article className={styles.card}>

      {/* ========================================
          ENCABEZADO
          ======================================== */}

      <div className={styles.header}>

        <div>
          <p className={styles.eyebrow}>
            Tu recorrido
          </p>

          <h2 className={styles.title}>
            Conoce lo que has estado sintiendo
          </h2>
        </div>

        <div className={styles.calendarIcon}>
          <CalendarDays
            size={22}
            aria-hidden="true"
          />
        </div>

      </div>


      {/* ========================================
          CONTINUIDAD
          ======================================== */}

      <div className={styles.summary}>

        <strong>
          {streak}
        </strong>

        <div>
          <span>
            {streak === 1
              ? 'día de continuidad'
              : 'días de continuidad'}
          </span>

          <p>
            Cada registro es una oportunidad
            para escucharte.
          </p>
        </div>

      </div>


      {/* ========================================
          REGISTROS RECIENTES
          ======================================== */}

      {recentCheckIns.length > 0 && (
        <div className={styles.history}>

          <p className={styles.historyTitle}>
            Últimos momentos
          </p>

          <div className={styles.dates}>

            {recentCheckIns.map(
              (checkIn) => (
                <div
                  key={checkIn.id}
                  className={styles.dateItem}
                >
                  <span className={styles.date}>
                    {formatDate(
                      checkIn.date
                    )}
                  </span>

                  <span className={styles.dot}>
                    •
                  </span>
                </div>
              )
            )}

          </div>

        </div>
      )}


      {/* ========================================
          ACCESO AL RECORRIDO
          ======================================== */}

      <button
        type="button"
        className={styles.button}
        onClick={onViewJourney}
      >
        Ver mi recorrido

        <ChevronRight
          size={18}
          aria-hidden="true"
        />
      </button>

    </article>
  );
}


function formatDate(dateString) {
  const parts = dateString.split('-');

  const month = parts[1];
  const day = parts[2];

  return `${day}/${month}`;
}


export default JourneyCard;