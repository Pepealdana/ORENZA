import { NavLink } from 'react-router-dom';
import {
  Home,
  Target,
  ClipboardCheck,
  BookOpen,
  User,
  Settings,
} from 'lucide-react';

import styles from './Sidebar.module.css';

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
  {
    label: 'Configuración',
    path: '/estudiante/configuracion',
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav
        className={styles.navigation}
        aria-label="Navegación principal del estudiante"
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
    </aside>
  );
}

export default Sidebar;