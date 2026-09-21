# ORENZA

Plataforma web para el acompañamiento y seguimiento socioemocional de adolescentes en entornos educativos.

ORENZA tiene un enfoque preventivo y educativo. Sus registros sirven como apoyo para el acompañamiento; no constituyen diagnóstico clínico ni sustituyen la atención profesional.

## Estado del proyecto

Rama de trabajo actual: `feature/backend-mvp`

El MVP integra:

- autenticación con JWT;
- roles de estudiante, orientador, docente y administrador, con módulos funcionales para estudiante, orientador y administrador;
- gestión de usuarios;
- gestión de instituciones;
- aislamiento de estudiantes por institución para orientadores;
- catálogo de actividades socioemocionales;
- progreso de actividades;
- registros emocionales (check-ins);
- perfil del estudiante;
- auditoría de operaciones administrativas;
- validaciones de API;
- paginación y filtros en módulos administrativos;
- pruebas de integración mediante smoke test;
- CI con GitHub Actions.

La interfaz visual existente se mantiene como base del MVP. No forman parte del alcance actual módulos de acudiente, inteligencia artificial ni nuevas funcionalidades de negocio.

## Arquitectura

```text
                    ORENZA
                       |
          +------------+------------+
          |                         |
       FRONTEND                  BACKEND
       React/Vite              Node/Express
          |                         |
          |                    REST API + JWT
          |                         |
          +------------+------------+
                       |
                    MongoDB
```

### Frontend

- React
- Vite
- React Router
- CSS Modules
- Lucide React

### Backend

- Node.js 20+
- Express
- Mongoose
- MongoDB
- JWT
- bcryptjs

## Estructura principal

```text
ORENZA/
├── backend/
│   └── src/
│       ├── config/
│       ├── data/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── scripts/
│       ├── utils/
│       └── server.js
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── styles/
│   └── main.jsx
├── .env.example
└── README.md
```

## Requisitos

- Node.js 20 o superior.
- MongoDB local o una instancia MongoDB accesible mediante URI.
- npm.

## Configuración local

### Frontend

En la raíz del proyecto:

```bash
npm install
```

Crear `.env` a partir de `.env.example`:

```env
VITE_API_URL=http://localhost:4000/api
```

Ejecutar:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

### Backend

Entrar a `backend/`:

```bash
cd backend
npm install
```

Crear `backend/.env` a partir de `backend/.env.example`:

```env
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/orenza
JWT_SECRET=change_this_secret_to_a_long_random_value
JWT_EXPIRES_IN=1d
FRONTEND_URL=http://localhost:5173
```

Para desarrollo:

```bash
npm run dev
```

Para ejecutar el backend como proceso normal:

```bash
npm start
```

API:

```text
http://localhost:4000
```

Health check:

```text
http://localhost:4000/api/health
```

## Datos demo

Desde `backend/`:

```bash
npm run seed
```

El seed prepara:

- institución demo;
- usuarios demo;
- catálogo oficial de 28 actividades.

### Credenciales de acceso demo

Estas cuentas están destinadas exclusivamente a desarrollo, pruebas y demostración local:

| Rol | Correo | Contraseña |
|---|---|---|
| Estudiante | `estudiante@orenza.local` | `Estudiante1234!` |
| Orientador | `orientador@orenza.local` | `Orientador1234!` |
| Administrador | `admin@orenza.local` | `Admin1234!` |

Las credenciales anteriores corresponden al seed de demostración. No deben reutilizarse en un entorno público o de producción. En despliegues públicos deben utilizarse contraseñas propias y un `JWT_SECRET` seguro y diferente.

## Scripts

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Backend

```bash
npm run dev
npm start
npm run seed
npm run test:smoke
```

El smoke test requiere que el backend esté ejecutándose y que las variables de entorno estén configuradas.

## Roles

### Estudiante

Puede:

- consultar y actualizar su perfil permitido;
- registrar, consultar, editar y eliminar sus check-ins;
- consultar actividades activas;
- guardar, actualizar y eliminar su propio progreso.

La institución del estudiante es administrada desde el módulo administrativo.

### Orientador

Puede consultar información preventiva de estudiantes pertenecientes a su propia institución.

No recibe:

- notas privadas de los check-ins;
- respuestas privadas de las actividades.

Tampoco puede modificar los registros del estudiante mediante las rutas administrativas o del estudiante.

### Administrador

Puede gestionar:

- usuarios;
- instituciones;
- actividades;
- estados de acceso;
- auditoría.

Las operaciones administrativas relevantes generan registros de auditoría.

## API principal

### Autenticación

```text
POST  /api/auth/register
POST  /api/auth/login
POST  /api/auth/request-password-reset
POST  /api/auth/reset-password
PATCH /api/auth/change-password
GET   /api/auth/me
```

### Estudiante

```text
GET/PATCH /api/student/profile
GET       /api/student/check-ins
GET       /api/student/check-ins/:id
POST      /api/student/check-ins
PATCH     /api/student/check-ins/:id
DELETE    /api/student/check-ins/:id

GET       /api/student/activities/progress
GET       /api/student/activities/progress/:activityId
POST      /api/student/activities/progress
PATCH     /api/student/activities/progress/:activityId
DELETE    /api/student/activities/progress/:activityId
```

### Actividades

```text
GET    /api/activities
GET    /api/activities/:id
POST   /api/activities
PATCH  /api/activities/:id
DELETE /api/activities/:id
```

Las operaciones de escritura del catálogo requieren rol administrador.

### Orientador

```text
GET /api/counselor/overview
GET /api/counselor/students/:studentId
GET /api/counselor/students/:studentId/check-ins
GET /api/counselor/students/:studentId/activity-progress
```

### Administrador

```text
GET    /api/admin/stats
GET    /api/admin/users
GET    /api/admin/users/:id
POST   /api/admin/users
PATCH  /api/admin/users/:id
DELETE  /api/admin/users/:id

GET    /api/admin/institutions
POST   /api/admin/institutions
PATCH  /api/admin/institutions/:id
DELETE /api/admin/institutions/:id

GET    /api/admin/audit-logs
```

Los DELETE administrativos son eliminaciones lógicas mediante desactivación.

## Seguridad y datos

- Las contraseñas se almacenan mediante hash con bcrypt.
- Los tokens JWT se firman con secreto configurable mediante entorno.
- Las rutas protegidas validan autenticación y rol.
- Las consultas del orientador se restringen por institución.
- Las reflexiones privadas del estudiante no se incluyen en los DTO del orientador.
- Los archivos `.env` están excluidos de Git.
- El servidor establece encabezados HTTP básicos de seguridad.
- El catálogo de actividades usa desactivación lógica.
- La auditoría no bloquea una operación de negocio si su propio registro falla; el error queda registrado en el servidor.

## Recuperación de contraseña

El flujo de recuperación está implementado a nivel de API.

En desarrollo, el endpoint devuelve un `demoToken` para permitir pruebas end-to-end. En producción todavía se requiere integrar un servicio de correo para entregar el token al usuario. Esta integración no forma parte del MVP actual.

## Pruebas

El proyecto dispone de:

- build de producción del frontend;
- comprobaciones de sintaxis del backend mediante CI;
- smoke test de integración para autenticación, perfiles, check-ins, actividades, progreso, administración, auditoría, privacidad del orientador y aislamiento institucional.

Comando:

```bash
cd backend
npm run test:smoke
```

## Variables de entorno

### Frontend

```env
VITE_API_URL=
```

### Backend

```env
NODE_ENV=
PORT=
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
FRONTEND_URL=
SEED_ADMIN_EMAIL=
SEED_ADMIN_PASSWORD=
SEED_COUNSELOR_EMAIL=
SEED_COUNSELOR_PASSWORD=
SEED_STUDENT_EMAIL=
SEED_STUDENT_PASSWORD=
```

Las variables `SEED_*` permiten sustituir las credenciales demo durante pruebas controladas.

## Alcance del MVP

El MVP queda delimitado a la gestión y seguimiento preventivo de estudiantes mediante:

1. autenticación y control de acceso;
2. usuarios y roles;
3. instituciones;
4. actividades socioemocionales;
5. progreso;
6. registros emocionales;
7. consulta del orientador;
8. auditoría administrativa.

El MVP se encuentra en fase de revisión técnica y funcional. El despliegue público y la documentación técnica ampliada se realizarán posteriormente, una vez recibidas las observaciones de revisión.
