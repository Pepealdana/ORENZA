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
import ProfilePage from '../pages/student/ProfilePage';
import SettingsPage from '../pages/student/SettingsPage';

import CounselorDashboardPage from '../pages/counselor/CounselorDashboardPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import ActivityPage from '../pages/student/ActivityPage';


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ========================================
            ZONA PÚBLICA
            ======================================== */}

        <Route element={<PublicLayout />}>

          <Route
            path="/"
            element={<SplashPage />}
          />

          <Route
            path="/conocer-orenza"
            element={<AboutPage />}
          />

        </Route>


        {/* ========================================
            AUTENTICACIÓN
            ======================================== */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/registro"
          element={<RegisterPage />}
        />

        <Route
          path="/recuperar-contrasena"
          element={<ForgotPasswordPage />}
        />


        {/* ========================================
            ESTUDIANTE
            ======================================== */}

        <Route
          path="/estudiante"
          element={<StudentLayout />}
        >

          {/* ======================================
              DASHBOARD
              ====================================== */}

          <Route
            path="dashboard"
            element={<DashboardPage />}
          />


          {/* ======================================
              INICIO
              ====================================== */}

          <Route
            path="inicio"
            element={<HomePage />}
          />


          {/* ======================================
              MI RECORRIDO
              ====================================== */}

          <Route
            path="recorrido"
            element={<JourneyPage />}
          />


          {/* ======================================
              COMPETENCIAS
              ====================================== */}

          <Route
            path="competencias"
            element={<CompetenciesPage />}
          />


          {/* Detalle de una competencia */}

          <Route
            path="competencias/:competencyId"
            element={<CompetencyDetailPage />}
          />


          {/* ======================================
              ACTIVIDADES
              ====================================== */}

          <Route
            path="actividades"
            element={<ActivitiesPage />}
          />

          <Route
            path="actividades/:activityId"
            element={<ActivityPage />}
          />


          {/* ======================================
              RECURSOS
              ====================================== */}

          <Route
            path="recursos"
            element={<ResourcesPage />}
          />


          {/* ======================================
              PERFIL
              ====================================== */}

          <Route
            path="perfil"
            element={<ProfilePage />}
          />


          {/* ======================================
              CONFIGURACIÓN
              ====================================== */}

          <Route
            path="configuracion"
            element={<SettingsPage />}
          />

        </Route>


        {/* ========================================
            ORIENTADOR
            ======================================== */}

        <Route
          path="/orientador"
          element={<CounselorLayout />}
        >

          <Route
            index
            element={<CounselorDashboardPage />}
          />

        </Route>


        {/* ========================================
            ADMINISTRADOR
            ======================================== */}

        <Route
          path="/administrador"
          element={<AdminLayout />}
        >

          <Route
            index
            element={<AdminDashboardPage />}
          />

        </Route>


        {/* ========================================
            RUTA DESCONOCIDA
            ======================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}


export default AppRoutes;