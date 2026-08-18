import { Link } from 'react-router-dom';
import styles from './Header.module.css';

import orenzaLogo from '../../../assets/orenza_logo.png';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link
          to="/"
          className={styles.logoLink}
          aria-label="Ir al inicio de ORENZA"
        >
          <img
            src={orenzaLogo}
            alt="ORENZA"
            className={styles.logo}
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;