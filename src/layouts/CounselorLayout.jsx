import { Outlet } from 'react-router-dom';

function CounselorLayout() {
  return (
    <div className="counselor-layout">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default CounselorLayout;