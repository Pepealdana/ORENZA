import styles from './IdentityVisual.module.css';

import inicio from '../../assets/illustrations/screens/inicio.png';
import dashboardWelcome from '../../assets/illustrations/screens/dashboard-welcome.png';
import login from '../../assets/illustrations/screens/login-illustration.png';
import register from '../../assets/illustrations/screens/register-illustration.png';
import recorrido from '../../assets/illustrations/screens/recorrido.png';
import competencias from '../../assets/illustrations/screens/competencias.png';
import actividades from '../../assets/illustrations/screens/actividades.png';
import recursos from '../../assets/illustrations/screens/recursos.png';
import perfil from '../../assets/illustrations/screens/perfil.png';

const images = {
  bienvenida: inicio,
  dashboard: dashboardWelcome,
  historia: login,
  inicio,
  recorrido,
  competencias,
  actividades,
  recursos,
  perfil,
  registro: register,
};

function IdentityVisual({ variant, size = 'hero', className = '' }) {
  const image = images[variant] || images.inicio;

  return (
    <div className={styles.wrapper + ' ' + (styles[size] || '') + ' ' + className}>
      <img src={image} alt="" aria-hidden="true" />
    </div>
  );
}

export default IdentityVisual;
