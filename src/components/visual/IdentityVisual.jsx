import styles from './IdentityVisual.module.css';

import bienvenida from '../../assets/illustrations/screens/dashboard-welcome.png';
import historia from '../../assets/illustrations/screens/login-illustration.png';
import inicio from '../../assets/illustrations/screens/inicio.png';
import conocete from '../../assets/illustrations/screens/inicio.png';
import recorrido from '../../assets/illustrations/screens/recorrido.png';
import competencias from '../../assets/illustrations/screens/competencias.png';
import actividades from '../../assets/illustrations/screens/actividades.png';
import recursos from '../../assets/illustrations/screens/recursos.png';
import perfil from '../../assets/illustrations/screens/perfil.png';

const visuals = {
  bienvenida,
  historia,
  inicio,
  conocete,
  recorrido,
  competencias,
  actividades,
  recursos,
  perfil,
};

function IdentityVisual({
  variant,
  size = 'hero',
  className = '',
}) {
  const source = visuals[variant] || visuals.inicio;

  return (
    <div
      className={[
        styles.visual,
        styles[size] || '',
        className,
      ].join(' ')}
      aria-hidden="true"
    >
      <img
        src={source}
        alt=""
        className={styles.image}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export default IdentityVisual;
