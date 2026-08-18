import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="admin-layout">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;