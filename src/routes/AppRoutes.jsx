import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import PublicLayout from '../layouts/PublicLayout';
import StudentLayout from '../layouts/StudentLayout';
import CounselorLayout from '../layouts/CounselorLayout';
import AdminLayout from '../layouts/AdminLayout';

import ProtectedRoute from './ProtectedRoute';

import SplashPage from '../pages/public/SplashPage';
import AboutPage from '../pages/public/AboutPage';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';

import DashboardPage from '../pages/student/DashboardPage';
import HomePage from '../pages/student/HomePage';
import JourneyPage from '../pages/student/JourneyPage';
import CompetenciesPage from '../pages/student/CompetenciesPage';
import CompetencyDetailPage from '../pages/student/CompetencyDetailPage';
import ActivitiesPage from '../pages/student/ActivitiesPage';
import ResourcesPage from '../pages/student/ResourcesPage';
import ResourceDetailPage from '../pages/student/ResourceDetailPage';
import ProfilePage from '../pages/student/ProfilePage';
import SettingsPage from '../pages/student/SettingsPage';

import CounselorDashboardPage from '../pages/counselor/CounselorDashboardPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminActivitiesPage from '../pages/admin/AdminActivitiesPage';
import ActivityPage from '../pages/student/ActivityPage';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<SplashPage />} />
          <Route path="/conocer-orenza" element={<AboutPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/recuperar-contrasena" element={<ForgotPasswordPage />} />

        <Route
          path="/estudiante"
          element={
            <ProtectedRoute roles={['student']}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="inicio" element={<HomePage />} />
          <Route path="recorrido" element={<JourneyPage />} />
          <Route path="competencias" element={<CompetenciesPage />} />
          <Route path="competencias/:competencyId" element={<CompetencyDetailPage />} />
          <Route path="actividades" element={<ActivitiesPage />} />
          <Route path="actividades/:activityId" element={<ActivityPage />} />
          <Route path="recursos" element={<ResourcesPage />} />
          <Route path="recursos/:resourceId" element={<ResourceDetailPage />} />
          <Route path="perfil" element={<ProfilePage />} />
          <Route path="configuracion" element={<SettingsPage />} />
        </Route>

        <Route
          path="/orientador"
          element={
            <ProtectedRoute roles={['counselor']}>
              <CounselorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CounselorDashboardPage />} />
        </Route>

        <Route
          path="/administrador"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="contenidos" element={<AdminActivitiesPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
