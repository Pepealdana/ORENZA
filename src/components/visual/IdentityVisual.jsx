import styles from './IdentityVisual.module.css';
import SafeImage from '../../components/ui/SafeImage/SafeImage';

import bienvenida from '../../assets/illustrations/screens/dashboard-welcome.png';
import historia from '../../assets/illustrations/screens/login-illustration.png';
import inicio from '../../assets/illustrations/screens/inicio.png';
import recorrido from '../../assets/illustrations/screens/recorrido.png';
import competencias from '../../assets/illustrations/screens/competencias.png';
import actividades from '../../assets/illustrations/screens/actividades.png';
import recursos from '../../assets/illustrations/screens/recursos.png';
import perfil from '../../assets/illustrations/screens/perfil.png';

import bienvenidaFallback from '../../assets/illustrations/dashboard-welcome.svg';
import historiaFallback from '../../assets/illustrations/login-illustration.svg';
import inicioFallback from '../../assets/illustrations/inicio.svg';
import recorridoFallback from '../../assets/illustrations/recorrido.svg';
import competenciasFallback from '../../assets/illustrations/competencias.svg';
import actividadesFallback from '../../assets/illustrations/actividades.svg';
import recursosFallback from '../../assets/illustrations/recursos.svg';
import perfilFallback from '../../assets/illustrations/perfil.svg';

const visuals = {
  bienvenida: [bienvenida, bienvenidaFallback],
  historia: [historia, historiaFallback],
  inicio: [inicio, inicioFallback],
  conocete: [inicio, inicioFallback],
  recorrido: [recorrido, recorridoFallback],
  competencias: [competencias, competenciasFallback],
  actividades: [actividades, actividadesFallback],
  recursos: [recursos, recursosFallback],
  perfil: [perfil, perfilFallback],
};

function IdentityVisual({ variant, size = 'hero', className = '' }) {
  const [source, fallback] = visuals[variant] || visuals.inicio;

  return (
    <div className={[styles.visual, styles[size] || '', className].join(' ')}>
      <SafeImage
        src={source}
        fallback={fallback}
        alt=""
        className={styles.image}
        decoding="async"
      />
    </div>
  );
}

export default IdentityVisual;
