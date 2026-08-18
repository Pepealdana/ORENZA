import { Outlet } from 'react-router-dom';

import Header from '../components/layout/Header/Header';
import Sidebar from '../components/layout/Sidebar/Sidebar';
import BottomNavigation from '../components/layout/BottomNavigation/BottomNavigation';

import styles from './StudentLayout.module.css';

function StudentLayout() {
  return (
    <div className={styles.layout}>
      <Header />

      <div className={styles.body}>
        <Sidebar />

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default StudentLayout;