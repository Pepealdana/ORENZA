import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header/Header';
import styles from './RoleLayout.module.css';

function AdminLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}><Outlet /></main>
    </div>
  );
}
export default AdminLayout;
