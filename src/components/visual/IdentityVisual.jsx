import styles from './IdentityVisual.module.css';
import visualsSprite from '../../assets/orenza-visuals.webp';

const positions = {
  bienvenida: '0% 0%',
  historia: '50% 0%',
  inicio: '100% 0%',
  conocete: '0% 50%',
  recorrido: '50% 50%',
  competencias: '100% 50%',
  actividades: '0% 100%',
  recursos: '50% 100%',
  perfil: '100% 100%',
};

function IdentityVisual({ variant, size = 'hero', className = '' }) {
  const position = positions[variant] || positions.inicio;

  return (
    <div
      className={styles.visual + ' ' + (styles[size] || '') + ' ' + className}
      style={{ backgroundImage: 'url(' + visualsSprite + ')', backgroundPosition: position }}
      aria-hidden="true"
    />
  );
}

export default IdentityVisual;
