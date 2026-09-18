import { Link, useLocation } from 'react-router-dom';
import { CircleUserRound, LogOut } from 'lucide-react';

import orenzaLogo from '../../../assets/orenza_hor.png';
import { useAuth } from '../../../context/AuthContext';
import styles from './Header.module.css';

function Header() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isStudentArea = location.pathname.startsWith('/estudiante');

  const homePath = isStudentArea
    ? '/estudiante/inicio'
    : user?.role === 'admin'
      ? '/administrador'
      : user?.role === 'counselor'
        ? '/orientador'
        : '/';

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={homePath} className={styles.logoLink} aria-label="Ir al inicio de ORENZA">
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

        {!isStudentArea && user && (
          <button
            type="button"
            className={styles.profileLink}
            onClick={logout}
            aria-label="Cerrar sesión"
          >
            <span>Cerrar sesión</span>
            <span className={styles.avatar} aria-hidden="true">
              <LogOut size={19} strokeWidth={1.8} />
            </span>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
