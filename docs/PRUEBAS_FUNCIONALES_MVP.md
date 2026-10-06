# Registro de pruebas — ORENZA MVP

## 1. Propósito

Este documento es el **registro consolidado de validación** del MVP de ORENZA.

Su finalidad es que la revisión académica pueda identificar claramente:

- qué perfiles fueron probados;
- qué flujos fueron revisados;
- qué pruebas automatizadas existen;
- qué validaciones técnicas se ejecutaron;
- cuáles fueron los resultados;
- qué elementos están fuera del alcance.

**Corte de documentación:** 2026-10-05  
**Rama oficial:** `main`

---

# 2. Resumen de resultados

| Tipo de prueba | Resultado |
|---|---|
| Estudiante — pruebas funcionales | **PASS** |
| Orientador — pruebas funcionales | **PASS** |
| Administrador — pruebas funcionales | **PASS** |
| Pruebas unitarias frontend | **PASS — 7/7** |
| ESLint frontend | **PASS** |
| Build frontend | **PASS** |
| Comprobaciones de sintaxis backend | **PASS en CI** |
| Smoke test de integración backend | **PASS en las validaciones realizadas** |
| Seguridad de dependencias | **PASS — 0 vulnerabilidades** |
| Integración continua | **PASS en la ejecución exitosa sobre `main`** |
| Rol docente | **FUERA DEL ALCANCE** |

---

# 3. Pruebas funcionales por perfil

## 3.1 Perfil estudiante

### Autenticación y sesión

| ID | Prueba | Resultado esperado | Estado |
|---|---|---|---|
| EST-01 | Inicio de sesión | El estudiante accede a su espacio | **PASS** |
| EST-02 | Dashboard | El dashboard carga correctamente | **PASS** |
| EST-03 | Cerrar sesión | La sesión termina correctamente | **PASS** |
| EST-04 | Nuevo inicio de sesión | El estudiante puede volver a autenticarse | **PASS** |

### Competencias y actividades

| ID | Prueba | Resultado esperado | Estado |
|---|---|---|---|
| EST-05 | Consultar competencias | Las competencias se muestran correctamente | **PASS** |
| EST-06 | Consultar actividades | El catálogo se carga correctamente | **PASS** |
| EST-07 | Filtrar por competencia | El catálogo responde al filtro seleccionado | **PASS** |
| EST-08 | Abrir actividad | La actividad seleccionada se carga correctamente | **PASS** |
| EST-09 | Iniciar actividad | El progreso inicial queda registrado | **PASS** |
| EST-10 | Completar actividad | El estado final queda registrado | **PASS** |
| EST-11 | Consultar progreso | El progreso guardado puede recuperarse | **PASS** |

### Registros emocionales

| ID | Prueba | Resultado esperado | Estado |
|---|---|---|---|
| EST-12 | Registrar check-in | El registro emocional se guarda | **PASS** |
| EST-13 | Consultar check-in | El registro puede recuperarse | **PASS** |
| EST-14 | Editar check-in | Los campos permitidos se actualizan | **PASS** |
| EST-15 | Eliminar check-in | El registro puede eliminarse según las reglas del sistema | **PASS** |

### Perfil y configuración

| ID | Prueba | Resultado esperado | Estado |
|---|---|---|---|
| EST-16 | Consultar perfil | La información permitida se muestra | **PASS** |
| EST-17 | Actualizar perfil | Los campos permitidos se actualizan | **PASS** |
| EST-18 | Configuración | Las preferencias contempladas responden correctamente | **PASS** |
| EST-19 | Cambio de contraseña | La contraseña válida puede cambiarse | **PASS** |

**Resultado del perfil estudiante: PASS.**

---

# 4. Perfil orientador

| ID | Prueba | Resultado esperado | Estado |
|---|---|---|---|
| ORI-01 | Inicio de sesión | El orientador accede a su panel | **PASS** |
| ORI-02 | Dashboard | Se muestran los datos correspondientes | **PASS** |
| ORI-03 | Consulta de estudiantes | Se consultan estudiantes de su institución | **PASS** |
| ORI-04 | Seguimiento | Se consulta el seguimiento preventivo | **PASS** |
| ORI-05 | Check-ins del estudiante | Se muestra la información permitida | **PASS** |
| ORI-06 | Privacidad de check-in | No se expone la reflexión privada | **PASS** |
| ORI-07 | Actividades del estudiante | Se muestra el resumen permitido | **PASS** |
| ORI-08 | Privacidad de respuestas | No se exponen respuestas privadas | **PASS** |
| ORI-09 | Restricción de escritura | No puede modificar recursos exclusivos del estudiante | **PASS** |
| ORI-10 | Aislamiento institucional | No puede consultar estudiantes de otra institución | **PASS** |
| ORI-11 | Aislamiento de progreso | No puede consultar progreso de otra institución | **PASS** |

**Resultado del perfil orientador: PASS.**

---

# 5. Perfil administrador

| ID | Prueba | Resultado esperado | Estado |
|---|---|---|---|
| ADM-01 | Inicio de sesión | El administrador accede al panel | **PASS** |
| ADM-02 | Dashboard | Las estadísticas se cargan | **PASS** |
| ADM-03 | Usuarios | El módulo de usuarios funciona | **PASS** |
| ADM-04 | Filtros de usuarios | Los filtros responden correctamente | **PASS** |
| ADM-05 | Paginación | La paginación funciona correctamente | **PASS** |
| ADM-06 | Instituciones | El módulo de instituciones funciona | **PASS** |
| ADM-07 | Crear/editar institución | La operación se procesa correctamente | **PASS** |
| ADM-08 | Activar/desactivar institución | La regla de estado funciona | **PASS** |
| ADM-09 | Actividades | El módulo de actividades funciona | **PASS** |
| ADM-10 | Crear actividad | La actividad válida puede crearse | **PASS** |
| ADM-11 | Editar actividad | La actividad puede actualizarse | **PASS** |
| ADM-12 | Activar/desactivar actividad | La actividad puede desactivarse | **PASS** |
| ADM-13 | Auditoría | Las operaciones administrativas generan registros | **PASS** |
| ADM-14 | Restricciones de rol | Las acciones protegidas respetan autorización | **PASS** |

**Resultado del perfil administrador: PASS.**

---

# 6. Pruebas automatizadas frontend

Comando ejecutado:

```bash
npm test
```

Resultado final:

```
tests 7
pass 7
fail 0
cancelled 0
skipped 0
```

### Casos

| ID | Caso | Estado |
|---|---|---|
| FE-01 | Filtra actividades por competencia principal y secundaria | **PASS** |
| FE-02 | Normaliza relaciones positivas a relaciones | **PASS** |
| FE-03 | Calcula progreso sin duplicar una actividad repetida | **PASS** |
| FE-04 | Filtros y progreso usan la competencia principal por defecto | **PASS** |
| FE-05 | Calcula una racha consecutiva desde hoy | **PASS** |
| FE-06 | Permite una racha que comienza ayer | **PASS** |
| FE-07 | Rompe la racha ante un día ausente | **PASS** |

**Resultado: 7/7 PASS.**

---

# 7. Lint y build frontend

## 7.1 ESLint

Comando:

```bash
npm run lint
```

Resultado:

**PASS — sin errores.**

## 7.2 Build

Comando:

```bash
npm run build
```

Resultado:

**PASS — Vite generó correctamente el build de producción.**

La compilación final incluyó el recurso actualizado:

```
orenza_hor-*.png
```

correspondiente al logotipo ORENZA utilizado en la interfaz.

---

# 8. Smoke test de integración backend

Comando:

```bash
cd backend
npm run test:smoke
```

El smoke test valida, en una ejecución integrada:

### Autenticación

- health check;
- registro;
- JWT;
- consulta `/auth/me`;
- recuperación de contraseña en modo demo.

### Estudiante

- perfil;
- actualización de perfil;
- creación de check-in;
- consulta de check-in individual;
- actualización de check-in;
- consulta de check-ins;
- consulta del catálogo;
- validación del catálogo de 28 actividades;
- creación de progreso;
- consulta de progreso;
- actualización del progreso;
- finalización;
- historial;
- eliminación del progreso.

### Actividades

- consulta del catálogo;
- validación de pasos;
- competencias;
- creación;
- consulta individual;
- actualización;
- versionado;
- desactivación;
- rechazo de progreso sobre actividad inactiva;
- restricción de actividad no repetible.

### Administración

- autenticación administrativa;
- instituciones;
- creación de institución;
- usuarios;
- estadísticas;
- filtros;
- paginación;
- auditoría.

### Orientador

- dashboard;
- consulta de estudiantes;
- seguimiento;
- privacidad de notas;
- privacidad de respuestas;
- restricciones de escritura;
- aislamiento institucional;
- aislamiento del progreso.

**Resultado de las validaciones de integración realizadas: PASS.**

---

# 9. Comprobaciones de sintaxis backend en CI

El workflow de GitHub Actions comprueba con `node --check` los archivos críticos del backend:

- `src/server.js`;
- rutas de autenticación;
- rutas de estudiante;
- rutas de orientador;
- rutas administrativas;
- rutas de actividades;
- configuración de base de datos;
- middleware de autenticación;
- modelos;
- auditoría;
- seed;
- script de smoke test.

**Resultado: PASS en la ejecución exitosa de CI.**

---

# 10. Seguridad de dependencias

Durante la revisión se identificó una vulnerabilidad de alta severidad en:

```
brace-expansion
```

La dependencia fue actualizada a:

```
brace-expansion@5.0.12
```

Comando final:

```bash
npm audit
```

Resultado:

```
found 0 vulnerabilities
```

**Estado: PASS.**

---

# 11. Integración continua

Archivo:

```
.github/workflows/ci.yml
```

### Frontend

El CI ejecuta:

```bash
npm ci
npm run lint
npm test
npm run build
```

### Backend

El CI ejecuta:

- instalación de dependencias;
- comprobaciones de sintaxis mediante `node --check`.

Las ejecuciones quedan almacenadas en GitHub Actions.

**Resultado de la ejecución exitosa sobre `main`: PASS.**

> Nota: el smoke test está disponible como prueba de integración del backend, pero el workflow actual no lo ejecuta automáticamente. La comprobación automática del backend en CI es sintáctica; el smoke test se ejecuta de forma independiente.

---

# 12. Validaciones de seguridad y autorización

También se verificaron:

- autenticación obligatoria en rutas protegidas;
- autorización por rol;
- protección de operaciones administrativas;
- aislamiento institucional;
- exclusión de información privada del orientador;
- protección de respuestas privadas de actividades;
- protección de variables de entorno;
- hash de contraseñas;
- JWT;
- auditoría administrativa.

**Resultado consolidado: PASS.**

---

# 13. Correcciones finales verificadas

Como parte del cierre se verificaron las siguientes correcciones:

| Corrección | Resultado |
|---|---|
| Filtro por competencia | **PASS** |
| Código de módulos administrativos | **PASS** |
| Sintaxis frontend | **PASS** |
| Lint | **PASS** |
| Tests frontend | **PASS** |
| Build | **PASS** |
| Vulnerabilidad de dependencia | **CORREGIDA** |
| Logo ORENZA | **PASS** |
| Sincronización de `main` | **PASS** |
| Working tree final | **LIMPIO** |

---

# 14. Elementos fuera del alcance

El siguiente elemento no debe marcarse como prueba pendiente:

### Rol docente

**Estado: FUERA DEL ALCANCE DEL MVP.**

El MVP se entrega con los perfiles:

- estudiante;
- orientador;
- administrador.

La implementación del rol docente queda para una posible evolución posterior y no forma parte de los criterios de aprobación de esta versión.

---

# 15. Criterio de cierre de pruebas

Con base en las validaciones funcionales, automatizadas y técnicas registradas en este documento:

**ORENZA MVP queda preparado para revisión del instructor.**

No se registran incidencias funcionales abiertas dentro del alcance definido para esta versión.

La revisión posterior debe concentrarse en verificar la implementación y la evidencia aquí documentada, sin interpretar las funcionalidades explícitamente excluidas del MVP como defectos.
