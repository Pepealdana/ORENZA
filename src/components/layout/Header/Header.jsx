import { Link, useLocation } from 'react-router-dom';
import { CircleUserRound, LogOut, Settings, UserRound } from 'lucide-react';

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
          <details className={styles.profileMenu}>
            <summary className={styles.profileLink} aria-label="Abrir menú de Mi espacio">
              <span>Mi espacio</span>
              <span className={styles.avatar} aria-hidden="true">
                <CircleUserRound size={21} strokeWidth={1.8} />
              </span>
            </summary>

            <div className={styles.menuPanel}>
              <div className={styles.menuHeader}>
                <span className={styles.menuAvatar} aria-hidden="true">
                  <UserRound size={20} strokeWidth={1.8} />
                </span>
                <div>
                  <strong>{user?.name || 'Mi espacio'}</strong>
                  <span>{user?.email || 'Cuenta personal'}</span>
                </div>
              </div>

              <Link to="/estudiante/perfil" className={styles.menuItem}>
                <UserRound size={18} strokeWidth={1.8} />
                <span>Mi perfil</span>
              </Link>

              <Link to="/estudiante/configuracion" className={styles.menuItem}>
                <Settings size={18} strokeWidth={1.8} />
                <span>Configuración</span>
              </Link>

              <button type="button" className={styles.logoutItem} onClick={logout}>
                <LogOut size={18} strokeWidth={1.8} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </details>
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
