import { Link, useLocation } from 'react-router-dom';
import { CircleUserRound } from 'lucide-react';

import orenzaLogo from '../../../assets/orenza_logo.png';
import styles from './Header.module.css';

function Header() {
  const location = useLocation();
  const isStudentArea = location.pathname.startsWith('/estudiante');

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={isStudentArea ? '/estudiante/inicio' : '/'} className={styles.logoLink} aria-label="Ir al inicio de ORENZA">
          <img src={orenzaLogo} alt="ORENZA" className={styles.logo} />
        </Link>

        {isStudentArea && (
          <Link to="/estudiante/perfil" className={styles.profileLink} aria-label="Ver mi perfil">
            <span>Mi espacio</span>
            <span className={styles.avatar} aria-hidden="true">
              <CircleUserRound size={21} strokeWidth={1.8} />
            </span>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
