import { Link } from 'react-router-dom';

import activities from '../../data/activities';

function ActivitiesPage() {
  return (
    <section>
      <h1>Actividades</h1>

      <p>
        Actividades disponibles: {activities.length}
      </p>

      {activities.map((activity) => (
        <article key={activity.id}>

          <h2>
            {activity.title}
          </h2>

          <p>
            {activity.description}
          </p>

          <p>
            Tipo: {activity.type}
          </p>

          <p>
            Duración: {activity.estimatedTime} minutos
          </p>

          <Link
            to={`/estudiante/actividades/${activity.id}`}
          >
            Comenzar actividad
          </Link>

        </article>
      ))}
    </section>
  );
}

export default ActivitiesPage;