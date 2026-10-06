# ORENZA

Plataforma web para el acompañamiento y seguimiento socioemocional de adolescentes en entornos educativos.

> **Estado de entrega:** MVP académico en fase de revisión técnica y funcional por el instructor.  
> **Rama oficial:** `main`

ORENZA tiene un enfoque preventivo y educativo. Sus registros sirven como apoyo para el acompañamiento; no constituyen diagnóstico clínico ni sustituyen la atención profesional.

---

## 1. Guía rápida para la revisión

Si el objetivo es revisar el estado actual del proyecto, estos son los documentos oficiales de referencia:

| Documento | Propósito |
|---|---|
| `README.md` | Descripción general, arquitectura, instalación, alcance, pruebas y criterios de entrega |
| `docs/GUIA_REVISION_INSTRUCTOR.md` | Ruta recomendada para revisar el proyecto sin buscar información en archivos equivocados |
| `docs/MVP_CIERRE.md` | Cierre técnico y funcional del MVP, observaciones atendidas y alcance definitivo |
| `docs/PRUEBAS_FUNCIONALES_MVP.md` | Registro consolidado de pruebas funcionales realizadas por perfil y pruebas técnicas automatizadas |
| `.github/workflows/ci.yml` | Definición de las validaciones automáticas ejecutadas por GitHub Actions |

**Para revisar primero:** `docs/GUIA_REVISION_INSTRUCTOR.md`.

---

## 2. Estado del proyecto

El MVP integra:

- autenticación con JWT;
- roles de estudiante, orientador y administrador;
- gestión de usuarios;
- gestión de instituciones;
- aislamiento de estudiantes por institución para orientadores;
- catálogo de actividades socioemocionales;
- progreso de actividades;
- registros emocionales (check-ins);
- perfil del estudiante;
- configuración y preferencias contempladas por el MVP;
- auditoría de operaciones administrativas;
- validaciones de API;
- paginación y filtros en módulos administrativos;
- pruebas unitarias de reglas frontend;
- smoke test de integración disponible para backend;
- comprobaciones de sintaxis del backend;
- CI con GitHub Actions;
- build de producción del frontend.

### Fuera del alcance de este MVP

Para evitar confusiones durante la revisión, estas funcionalidades **no forman parte de esta entrega**:

- módulo completo para docente;
- módulo de acudiente;
- inteligencia artificial;
- analítica avanzada;
- notificaciones productivas por correo;
- nuevas funcionalidades de negocio no definidas para el MVP.

El **rol docente queda explícitamente fuera del alcance de esta versión** y no debe interpretarse como una funcionalidad pendiente o como un defecto de la entrega.

---

## 3. Arquitectura

```
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

---

## 4. Estructura principal

```
ORENZA/
├── .github/
│   └── workflows/
│       └── ci.yml
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
├── docs/
│   ├── GUIA_REVISION_INSTRUCTOR.md
│   ├── MVP_CIERRE.md
│   └── PRUEBAS_FUNCIONALES_MVP.md
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

---

## 5. Requisitos

- Node.js 20 o superior.
- MongoDB local o una instancia MongoDB accesible mediante URI.
- npm.

---

## 6. Configuración local

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

```
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

```
http://localhost:4000
```

Health check:

```
http://localhost:4000/api/health
```

---

## 7. Datos demo

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

---

## 8. Scripts

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm test
```

### Backend

```bash
npm run dev
npm start
npm run seed
npm run test:smoke
```

El smoke test requiere que el backend y MongoDB estén disponibles y que las variables de entorno estén configuradas.

---

## 9. Roles y funcionalidades validadas

### Estudiante

Puede:

- iniciar y cerrar sesión;
- consultar su dashboard;
- consultar competencias y actividades;
- filtrar actividades por competencia;
- abrir actividades;
- iniciar y completar actividades;
- consultar y mantener su progreso;
- registrar y consultar check-ins;
- editar/eliminar sus registros permitidos;
- consultar y actualizar su perfil;
- utilizar las opciones de configuración contempladas;
- cambiar su contraseña.

### Orientador

Puede:

- iniciar sesión con su rol;
- consultar el dashboard de orientación;
- consultar estudiantes de su institución;
- consultar seguimiento preventivo;
- consultar el resumen de check-ins y actividades permitido por diseño.

El sistema protege la información privada del estudiante y restringe el acceso a estudiantes pertenecientes a otras instituciones.

### Administrador

Puede:

- consultar estadísticas;
- gestionar usuarios;
- gestionar instituciones;
- gestionar actividades;
- activar/desactivar entidades según las reglas del sistema;
- consultar auditoría;
- utilizar filtros y paginación en los módulos administrativos.

---

## 10. API principal

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

---

## 11. Seguridad y datos

- Las contraseñas se almacenan mediante hash con bcrypt.
- Los tokens JWT se firman con secreto configurable mediante entorno.
- Las rutas protegidas validan autenticación y rol.
- Las consultas del orientador se restringen por institución.
- Las reflexiones privadas del estudiante no se incluyen en los DTO del orientador.
- Los archivos `.env` están excluidos de Git.
- El servidor establece encabezados HTTP básicos de seguridad.
- El catálogo de actividades usa desactivación lógica.
- La auditoría no bloquea una operación de negocio si su propio registro falla; el error queda registrado en el servidor.

---

## 12. Recuperación de contraseña

El flujo de recuperación está implementado a nivel de API.

En desarrollo, el endpoint devuelve un `demoToken` para permitir pruebas end-to-end. En producción todavía se requiere integrar un servicio de correo para entregar el token al usuario. Esta integración no forma parte del MVP actual.

---

## 13. Pruebas y evidencia

La validación del proyecto se divide en tres niveles:

### 13.1 Pruebas funcionales por perfil

El registro completo se encuentra en:

`docs/PRUEBAS_FUNCIONALES_MVP.md`

Incluye los flujos revisados para:

- estudiante;
- orientador;
- administrador.

También deja explícitamente registrado que el rol docente está fuera del alcance del MVP.

### 13.2 Pruebas automatizadas frontend

El comando:

```bash
npm test
```

ejecuta las pruebas de utilidades frontend. En la validación actual se obtuvieron **7 pruebas aprobadas y 0 fallidas**, cubriendo:

- filtrado por competencia principal y secundaria;
- normalización de relaciones;
- cálculo de progreso sin duplicados;
- uso de competencia principal por defecto;
- cálculo de rachas consecutivas;
- inicio de racha desde el día anterior;
- ruptura de racha ante un día ausente.

### 13.3 Validación técnica frontend

```bash
npm run lint
npm run build
```

Ambos comandos fueron ejecutados correctamente en la versión actual.

### 13.4 Validación técnica backend

GitHub Actions ejecuta comprobaciones de sintaxis sobre el servidor, rutas, modelos, configuración, middleware y scripts principales.

El smoke test de integración está disponible mediante:

```bash
cd backend
npm run test:smoke
```

El smoke test cubre autenticación, perfiles, check-ins, catálogo, progreso, administración, auditoría, privacidad del orientador, aislamiento institucional y reglas de actividades.

### 13.5 Seguridad de dependencias

La dependencia vulnerable `brace-expansion` fue actualizada de `5.0.9` a `5.0.12`.

La validación final realizada con:

```bash
npm audit
```

produjo:

```
found 0 vulnerabilities
```

### 13.6 Integración continua

El workflow `.github/workflows/ci.yml` valida automáticamente:

**Frontend**
- instalación de dependencias;
- ESLint;
- pruebas frontend;
- build de producción.

**Backend**
- instalación de dependencias;
- comprobaciones `node --check` sobre los archivos críticos.

La evidencia de cada ejecución queda conservada en **GitHub Actions** dentro del repositorio.

---

## 14. Correcciones relevantes de la revisión del instructor

Durante la fase de revisión se atendieron, entre otras, las siguientes observaciones:

- filtro de actividades por competencia;
- definición de la rama oficial de entrega;
- actualización de README y documentación;
- consolidación de módulos de perfil, configuración, orientador y administrador;
- eliminación de archivos duplicados/no utilizados identificados;
- corrección de botones sin acción en los casos identificados;
- corrección de imports y código legacy identificados;
- fortalecimiento de pruebas;
- correcciones de sintaxis detectadas en módulos administrativos;
- actualización de dependencia con vulnerabilidad de seguridad;
- corrección y verificación final del logotipo ORENZA.

---

## 15. Alcance definitivo del MVP

El MVP queda delimitado a:

1. autenticación y control de acceso;
2. usuarios y roles implementados;
3. instituciones;
4. actividades socioemocionales;
5. progreso;
6. registros emocionales;
7. consulta del orientador;
8. privacidad e aislamiento institucional;
9. administración;
10. auditoría;
11. validaciones automatizadas;
12. documentación técnica y funcional.

El **rol docente no se implementa en esta versión**. Su ausencia es una decisión de alcance y no una incidencia abierta.

Tampoco forman parte del cierre del MVP:

- acudientes;
- inteligencia artificial;
- analítica avanzada;
- correo productivo para recuperación;
- nuevas funcionalidades de negocio.

---

## 16. Criterio de entrega

La versión de `main` se considera la versión oficial para revisión académica.

El objetivo de esta documentación es que el instructor pueda:

1. identificar rápidamente el alcance;
2. saber qué perfiles están implementados;
3. consultar qué pruebas fueron realizadas;
4. diferenciar pruebas manuales de automatizadas;
5. consultar la evidencia del CI;
6. identificar claramente lo que está fuera del alcance;
7. reproducir localmente las pruebas técnicas.

La revisión del instructor debe tomar como referencia los documentos indicados al inicio de este README.

---

## 17. Estado final

**MVP preparado para revisión técnica y funcional.**

No se deben interpretar las funcionalidades fuera del alcance como defectos de esta versión.
