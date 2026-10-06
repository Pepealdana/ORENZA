# Cierre técnico y funcional del MVP — ORENZA

## 1. Propósito

Este documento establece el cierre técnico y funcional del MVP de ORENZA después de atender las observaciones de revisión y consolidar el desarrollo en la rama oficial `main`.

Su propósito es dejar una referencia única y clara para la revisión académica del instructor.

La documentación se organiza así:

- `README.md`: descripción general, instalación, arquitectura y alcance.
- `docs/GUIA_REVISION_INSTRUCTOR.md`: ruta recomendada de revisión.
- `docs/PRUEBAS_FUNCIONALES_MVP.md`: registro consolidado de pruebas funcionales y técnicas.
- `.github/workflows/ci.yml`: validaciones automáticas de integración continua.

---

## 2. Estado de las observaciones del instructor

| Observación | Estado |
|---|---|
| Filtro de actividades por competencia | **CERRADA** |
| Rama oficial de entrega | **CERRADA — `main`** |
| README y documentación | **CERRADA** |
| Perfil de estudiante | **CERRADA** |
| Configuración y preferencias contempladas en el MVP | **CERRADA** |
| Módulo de orientador | **CERRADA** |
| Módulo administrativo | **CERRADA** |
| Gestión de instituciones | **CERRADA** |
| Gestión de actividades | **CERRADA** |
| Auditoría administrativa | **CERRADA** |
| Botones sin acción identificados | **CERRADA** |
| Archivos duplicados/no utilizados identificados | **CERRADA** |
| Imports/código legacy identificados | **CERRADA** |
| Correcciones de sintaxis en módulos administrativos | **CERRADA** |
| Pruebas funcionales de los perfiles implementados | **CERRADA** |
| Pruebas automatizadas frontend | **CERRADA** |
| Validación técnica backend | **CERRADA** |
| Vulnerabilidad de `brace-expansion` | **CERRADA** |
| Logotipo ORENZA | **CERRADA** |
| Rol docente | **FUERA DEL ALCANCE DEL MVP** |

---

## 3. Alcance definitivo

El MVP implementa y valida los siguientes perfiles:

### Estudiante

- autenticación;
- dashboard;
- competencias;
- actividades;
- filtrado por competencia;
- ejecución y progreso;
- check-ins;
- perfil;
- configuración/preferencias contempladas;
- cambio de contraseña;
- cierre y nueva sesión.

### Orientador

- autenticación;
- dashboard;
- consulta de estudiantes;
- seguimiento preventivo;
- consulta de información permitida;
- protección de información privada;
- aislamiento institucional.

### Administrador

- autenticación;
- dashboard;
- estadísticas;
- usuarios;
- instituciones;
- actividades;
- activación/desactivación;
- filtros y paginación;
- auditoría.

### Fuera del alcance

El **rol docente no se implementa en este MVP**.

Tampoco forman parte de esta entrega:

- módulo de acudiente;
- inteligencia artificial;
- analítica avanzada;
- correo productivo para recuperación de contraseña;
- nuevas funcionalidades de negocio no definidas para el MVP.

Estas exclusiones son decisiones de alcance, no incidencias pendientes.

---

## 4. Registro de validación funcional

Las pruebas funcionales fueron realizadas sobre los perfiles implementados y consolidadas en `docs/PRUEBAS_FUNCIONALES_MVP.md`.

### Estudiante — resultado consolidado: PASS

| Área | Validación | Resultado |
|---|---|---|
| Autenticación | Inicio de sesión | **PASS** |
| Dashboard | Carga y navegación | **PASS** |
| Competencias | Consulta de competencias | **PASS** |
| Actividades | Consulta del catálogo | **PASS** |
| Filtros | Filtrado por competencia | **PASS** |
| Actividad | Apertura y ejecución | **PASS** |
| Progreso | Inicio y actualización | **PASS** |
| Progreso | Finalización y persistencia | **PASS** |
| Check-in | Registro emocional | **PASS** |
| Check-in | Consulta y gestión del registro | **PASS** |
| Perfil | Consulta y actualización de campos permitidos | **PASS** |
| Configuración | Controles y preferencias contempladas | **PASS** |
| Seguridad | Cambio de contraseña | **PASS** |
| Sesión | Cierre y nuevo inicio de sesión | **PASS** |

### Orientador — resultado consolidado: PASS

| Área | Validación | Resultado |
|---|---|---|
| Autenticación | Inicio de sesión como orientador | **PASS** |
| Dashboard | Consulta del panel | **PASS** |
| Estudiantes | Consulta de estudiantes de su institución | **PASS** |
| Seguimiento | Consulta del seguimiento preventivo | **PASS** |
| Privacidad | Exclusión de reflexiones privadas | **PASS** |
| Privacidad | Exclusión de respuestas privadas de actividades | **PASS** |
| Autorización | No puede modificar recursos exclusivos del estudiante | **PASS** |
| Aislamiento | No puede consultar estudiantes de otra institución | **PASS** |
| Aislamiento | No puede consultar progreso de otra institución | **PASS** |

### Administrador — resultado consolidado: PASS

| Área | Validación | Resultado |
|---|---|---|
| Autenticación | Inicio de sesión como administrador | **PASS** |
| Dashboard | Consulta de estadísticas | **PASS** |
| Usuarios | Consulta y gestión | **PASS** |
| Instituciones | Creación/edición/desactivación según reglas | **PASS** |
| Actividades | Creación/edición | **PASS** |
| Actividades | Activación/desactivación | **PASS** |
| Filtros | Filtros administrativos | **PASS** |
| Paginación | Paginación administrativa | **PASS** |
| Auditoría | Registro de operaciones administrativas | **PASS** |
| Autorización | Restricciones por rol | **PASS** |

---

## 5. Validación automatizada frontend

La suite frontend ejecutada mediante:

```bash
npm test
```

obtuvo:

```
tests 7
pass 7
fail 0
```

Casos cubiertos:

1. filtra actividades por competencia principal y secundaria;
2. normaliza relaciones positivas a relaciones;
3. calcula progreso sin duplicar una actividad repetida;
4. usa la competencia principal por defecto para filtros y progreso;
5. calcula una racha consecutiva desde hoy;
6. permite una racha que comienza ayer;
7. rompe la racha ante un día ausente.

Resultado:

**7/7 pruebas aprobadas.**

---

## 6. Validación técnica frontend

### ESLint

Comando:

```bash
npm run lint
```

Resultado final:

**PASS — sin errores de ESLint.**

### Build

Comando:

```bash
npm run build
```

Resultado final:

**PASS — build de producción generado correctamente por Vite.**

La compilación final también confirmó la incorporación del recurso actualizado del logotipo ORENZA.

---

## 7. Validación técnica backend

El CI comprueba mediante `node --check` la sintaxis de:

- servidor;
- rutas de autenticación;
- rutas de estudiante;
- rutas de orientador;
- rutas administrativas;
- rutas de actividades;
- configuración de base de datos;
- middleware de autenticación;
- modelos principales;
- utilidades de auditoría;
- seed;
- script de smoke test.

Resultado de la integración continua:

**PASS en la ejecución exitosa de CI sobre `main`.**

---

## 8. Smoke test de integración

El backend dispone de:

```bash
cd backend
npm run test:smoke
```

El smoke test valida de forma integrada:

- health check;
- registro y JWT;
- recuperación de contraseña en modo demo;
- consulta de usuario autenticado;
- perfil;
- check-ins;
- catálogo de 28 actividades;
- validación de actividades;
- CRUD de actividades;
- versionado;
- progreso;
- finalización;
- restricciones de actividades no repetibles;
- estadísticas administrativas;
- filtros y paginación;
- instituciones;
- aislamiento institucional;
- consulta del orientador;
- privacidad de check-ins;
- privacidad de respuestas de actividades;
- restricciones de autorización;
- auditoría;
- eliminación de progreso;
- desactivación de actividades;
- rechazo de nuevo progreso sobre actividades inactivas.

El smoke test es una prueba de integración independiente del workflow de CI actual.

---

## 9. Seguridad de dependencias

Durante la revisión se identificó una vulnerabilidad de severidad alta en `brace-expansion`.

La dependencia fue actualizada de:

```
brace-expansion@5.0.9
```

a:

```
brace-expansion@5.0.12
```

Validación final:

```bash
npm audit
```

Resultado:

```
found 0 vulnerabilities
```

La actualización quedó registrada en Git mediante un commit específico.

---

## 10. Integración continua

El workflow oficial es:

```
.github/workflows/ci.yml
```

### Frontend

Ejecuta:

```
npm ci
npm run lint
npm test
npm run build
```

### Backend

Ejecuta instalación y comprobaciones de sintaxis mediante `node --check`.

Cada ejecución queda registrada en GitHub Actions y puede consultarse desde la pestaña **Actions** del repositorio.

La evidencia de CI debe interpretarse como evidencia automática de las validaciones definidas en el workflow; las pruebas funcionales manuales se encuentran registradas en `docs/PRUEBAS_FUNCIONALES_MVP.md`.

---

## 11. Criterio de cierre

Una funcionalidad del MVP se considera cerrada cuando:

- está implementada;
- tiene el flujo funcional correspondiente;
- consume la API/persistencia cuando aplica;
- respeta autenticación y autorización;
- maneja los estados funcionales previstos;
- fue validada durante la revisión funcional;
- no introduce una ampliación de alcance.

Con este criterio, el MVP queda preparado para revisión académica.

---

## 12. Resultado final

**Estado: CERRADO PARA REVISIÓN DEL INSTRUCTOR.**

No se identifican incidencias funcionales abiertas dentro del alcance actual.

La única funcionalidad mencionada como no implementada de forma explícita es el **rol docente**, porque fue excluida deliberadamente del alcance de este MVP.

Cualquier evolución posterior —incluido el rol docente— debe tratarse como una nueva etapa del proyecto y no como una corrección pendiente de esta entrega.
