import { NavLink } from 'react-router-dom';
import {
  Home,
  Target,
  ClipboardCheck,
  BookOpen,
  User,
} from 'lucide-react';

import styles from './BottomNavigation.module.css';

const navigationItems = [
  {
    label: 'Inicio',
    path: '/estudiante/inicio',
    icon: Home,
  },
  {
    label: 'Competencias',
    path: '/estudiante/competencias',
    icon: Target,
  },
  {
    label: 'Actividades',
    path: '/estudiante/actividades',
    icon: ClipboardCheck,
  },
  {
    label: 'Recursos',
    path: '/estudiante/recursos',
    icon: BookOpen,
  },
  {
    label: 'Perfil',
    path: '/estudiante/perfil',
    icon: User,
  },
];

function BottomNavigation() {
  return (
    <nav
      className={styles.navigation}
      aria-label="Navegación principal móvil"
    >
      {navigationItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <Icon
              size={22}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default BottomNavigation;