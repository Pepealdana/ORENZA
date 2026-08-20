import { Flame } from 'lucide-react';

import styles from './StreakCard.module.css';

function StreakCard({ days }) {
  const getMessage = () => {
    if (days === 0) {
      return {
        title: 'Puedes volver cuando quieras',
        description:
          'No tienes que hacerlo todos los días. Cuando quieras, puedes volver a dedicarte un momento.',
      };
    }

    if (days === 1) {
      return {
        title: 'Hoy hiciste un espacio para ti',
        description:
          'Reconocer cómo te sientes también es una forma de conocerte.',
      };
    }

    if (days < 7) {
      return {
        title: `${days} días conectando contigo`,
        description:
          'Has vuelto a dedicarte un momento. Los pequeños pasos también cuentan.',
      };
    }

    if (days === 7) {
      return {
        title: 'Una semana conectando contigo',
        description:
          'Siete días de pequeños momentos para escucharte y conocerte mejor.',
      };
    }

    return {
      title: `${days} días conectando contigo`,
      description:
        'Has construido una continuidad de pequeños momentos para ti.',
    };
  };

  const message = getMessage();

  return (
    <article className={styles.card}>

      <div className={styles.iconWrapper}>
        <Flame
          size={24}
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>

      <div className={styles.content}>

        <p className={styles.eyebrow}>
          Tu recorrido
        </p>

        <h2 className={styles.title}>
          {message.title}
        </h2>

        <p className={styles.description}>
          {message.description}
        </p>

      </div>

      {days > 0 && (
        <div
          className={styles.days}
          aria-label={`${days} ${
            days === 1 ? 'día' : 'días'
          } de continuidad`}
        >
          <strong>
            {days}
          </strong>

          <span>
            {days === 1 ? 'día' : 'días'}
          </span>
        </div>
      )}

    </article>
  );
}

export default StreakCard;