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

**Corte de documentación:** 2026-10-13  
**Rama oficial:** `main`

---

# 2. Resumen de resultados

| Tipo de prueba | Resultado |
|---|---|
| Estudiante — pruebas funcionales | **PASS** |
| Orientador — pruebas funcionales | **PASS** |
| Administrador — pruebas funcionales | **PASS** |
| Pruebas unitarias frontend | **PASS — 12/12** |
| ESLint frontend | **PASS** |
| Build frontend | **PASS** |
| Comprobaciones de sintaxis backend | **PASS en CI** |
| Smoke test de integración backend | **PASS — CI en `main`, MongoDB efímero** |
| Seguridad de dependencias | **PASS — `npm audit --audit-level=moderate`, sin hallazgos moderados o superiores** |
| Integración continua | **PASS en `main`** |
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

**Las 7 pruebas de esta tabla corresponden a la suite base histórica. La suite actual ampliada aprobó 12/17 pruebas en CI sobre `main`: [ver ejecución](https://github.com/Pepealdana/ORENZA/actions/runs/38496427613).**

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

**Resultado de CI sobre el commit `57959103627f7a74648842c1f5ee525fca2dcab1`: PASS.** [CI](https://github.com/Pepealdana/ORENZA/actions/runs/38496427613) · [CodeQL](https://github.com/Pepealdana/ORENZA/actions/runs/38496427610).

El workflow ejecuta el smoke test en el job `backend-integration` con MongoDB efímero y credenciales generadas para CI. La ejecución de CI sobre el commit `57959103627f7a74648842c1f5ee525fca2dcab1` está disponible [aquí](https://github.com/Pepealdana/ORENZA/actions/runs/38496427613). La base local del desarrollador no se utiliza.

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

**Resultado actualizado: PASS. Los escenarios de autorización e independencia de límites se ejecutaron en el smoke test de integración de CI con MongoDB efímero.**

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
| Build | **PASS — CI** |
| Avisos de seguridad Vite/source-map-js | **PASS — `npm audit --audit-level=moderate` sin hallazgos moderados o superiores** |
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

La implementación del rol docente queda para una posible evolución posterior y no forma parte de los criterios de aprobación de esta versión. Además, no puede asignarse desde el panel administrativo actual.

---

# 15. Criterio de cierre de pruebas

Con base en las validaciones funcionales, automatizadas y técnicas registradas en este documento:

**PASS — CI de frontend, comprobaciones de sintaxis del backend y smoke test de integración.** El [workflow de GitHub Actions](https://github.com/Pepealdana/ORENZA/actions/runs/38493213386) ejecutó el smoke test con MongoDB efímero y terminó con `Smoke test ORENZA: OK`. La [ejecución de CodeQL](https://github.com/Pepealdana/ORENZA/actions/runs/38496427610) también pasó.

Esta evidencia valida el entorno de pruebas aislado del workflow; no afirma que se haya ejecutado el smoke test contra la base local del desarrollador.

La revisión posterior debe concentrarse en verificar la implementación y la evidencia aquí documentada, sin interpretar las funcionalidades explícitamente excluidas del MVP como defectos.


## 10. Correcciones de la revisión del instructor (2026-10-13)

### Dependencia frontend

La revisión identificó el aviso **GHSA-rq7h-c2jc-7f22** en Vite y la auditoría CI encontró además **GHSA-68fv-2mgg-jv7q** en `source-map-js 1.2.1`. Se actualizó Vite a **8.2.4** y se fijó `source-map-js` en **1.2.2**, versión corregida para el segundo aviso: https://github.com/vitejs/vite/security/advisories/GHSA-rq7h-c2jc-7f22 y https://github.com/advisories/GHSA-68fv-2mgg-jv7q.

**Resultado confirmado en `main`:** [CI de ORENZA](https://github.com/Pepealdana/ORENZA/actions/runs/38493213386) pasó instalación, lint, 17 pruebas frontend, build, `npm audit --audit-level=moderate`, sintaxis del backend y smoke test. [CodeQL](https://github.com/Pepealdana/ORENZA/actions/runs/38493213364) también pasó.

### Nuevos escenarios de prueba

Se añadieron casos automatizados para:
- competencia sin actividades: progreso de 0 %;
- alias histórico `relaciones-positivas`: identificador visible normalizado a `relaciones`;
- ausencia de registros emocionales: racha en cero;
- registros/acciones duplicadas en la misma fecha: no inflan la racha;
- varios días sin registrar: la racha actual se reinicia;
- smoke test de backend: la recuperación de contraseña no agota el límite de ingreso;
- smoke test de backend: un estudiante recibe 403 al solicitar estadísticas administrativas;
- smoke test de backend: el administrador recibe 400 al intentar crear un usuario con rol docente;
- smoke test de backend: no se admite crear un segundo registro de progreso para la misma actividad.

El smoke test se ejecuta automáticamente en CI con una instancia efímera de MongoDB y credenciales generadas en el job. Resultado confirmado en `main`: [`Smoke test ORENZA: OK`](https://github.com/Pepealdana/ORENZA/actions/runs/38493213386). Para repetirlo localmente se requieren API, MongoDB y credenciales válidas en `backend/.env`; esta ejecución local es independiente de la evidencia CI.

### Alcance y preferencias

El rol docente queda deshabilitado para nuevas asignaciones en el backend. Las preferencias de apariencia, movimiento y notificaciones se almacenan en el navegador; la opción de notificaciones no emite avisos reales en esta versión.


---

# 16. Referencia oficial de entrega y alcance de auditoría

La única rama oficial para revisión y evaluación es `main`. El commit comprobado en este corte es [`57959103627f7a74648842c1f5ee525fca2dcab1`](https://github.com/Pepealdana/ORENZA/commit/57959103627f7a74648842c1f5ee525fca2dcab1). La ejecución de [CI](https://github.com/Pepealdana/ORENZA/actions/runs/38496427613) y la de [CodeQL](https://github.com/Pepealdana/ORENZA/actions/runs/38496427610) finalizaron con `success` sobre ese mismo commit.

**Alcance de esta evidencia:** CI y CodeQL verifican el commit indicado; no sustituyen la auditoría estática completa de referencias ni la revisión de ramas auxiliares. La auditoría de imports y recursos de `src/` permanece abierta hasta completar el mapa de referencias. Solo se elimina un archivo cuando la ausencia de referencias está comprobada.

El repositorio conserva ramas auxiliares y solicitudes de Dependabot. No son ramas oficiales de entrega. Su eliminación requiere confirmar que no contienen cambios exclusivos pendientes de integrar; por tanto, no se afirma aquí que `main` sea la única rama existente.


---

## Estado de auditoría — 24 de octubre de 2026

**Rama:** `main`  
**Commit remoto verificado:** `8fec4536c8c2d00915fa8328407a5ebf78c902b5`

- [CI — PASS](https://github.com/Pepealdana/ORENZA/actions/runs/40050239517): frontend, backend y `backend-integration` completados correctamente. La integración ejecutó el smoke test con MongoDB efímero.
- [CodeQL — PASS](https://github.com/Pepealdana/ORENZA/actions/runs/40050239520).
- Protección de `main`: **activa**. GitHub confirma los checks requeridos `frontend`, `backend`, `backend-integration` y `Analizar JavaScript y TypeScript`.
- PR abiertas: **ninguna**. PR #19 (`dotenv`) y #21 (ESLint) se fusionaron tras checks aprobados. PR #9, #13, #20, #22 y #23 se cerraron sin fusionar; no deben describirse como cambios integrados.
- Las pruebas automatizadas frontend están definidas en tres archivos de test con **17 casos** en total (6 competencia, 4 fecha y 7 racha). El CI reciente aprobó el job frontend; los checks de integración también aprobaron.
- Las pruebas funcionales por perfil son registros manuales previos documentados, no pruebas que GitHub Actions vuelva a ejecutar. No se solicita repetirlas si la implementación relevante no cambió.
- La inspección de código confirma la presencia de middleware JWT/roles, validaciones de payload, límites de intentos separados, aislamiento institucional y exclusión de notas privadas en respuestas del orientador. Estas observaciones por inspección no deben etiquetarse como una prueba dinámica individual salvo cuando estén cubiertas por el smoke test.
- Recuperación de contraseña en producción: sigue pendiente integrar el proveedor de correo. Las preferencias de notificación se guardan localmente y no envían avisos reales. El rol docente está fuera del alcance del MVP.

**Límite de la evidencia:** CI y CodeQL respaldan el commit indicado, pero no certifican por sí solos la apariencia visual en todos los tamaños de pantalla ni la configuración de producción del proveedor de despliegue. Esos puntos se registran como evidencia manual/de entorno, no como PASS automático.


---

# 17. Evidencia del último corte de entrega — 24 de octubre de 2026

**Commit:** [`4e85772bab414648516699ef5b557c40297284f7`](https://github.com/Pepealdana/ORENZA/commit/4e85772bab414648516699ef5b557c40297284f7)  
**Ejecución CI:** [ORENZA CI #310 — success](https://github.com/Pepealdana/ORENZA/actions/runs/40059031698)

| Nivel | Qué se ejecutó | Resultado observado en GitHub Actions |
|---|---|---|
| Frontend | `npm ci` | PASS |
| Frontend | `npm run lint` | PASS |
| Frontend | `npm test` | PASS — 17 tests, 17 aprobados, 0 fallidos en la ejecución posterior del commit documental `7450630` |
| Frontend | `npm run build` | PASS |
| Seguridad de dependencias | `npm audit --audit-level=moderate` | PASS; no se reportó fallo que detuviera el job |
| Backend | Instalación de dependencias | PASS |
| Backend | `node --check` en servidor, rutas, configuración, middleware, modelos y scripts listados en `.github/workflows/ci.yml` | PASS |
| Integración backend | Inicio de MongoDB 7 efímero, seed con credenciales generadas, espera de health check y `npm run test:smoke` | PASS |

### Interpretación de resultados

1. **CI automático:** los pasos de los tres jobs finalizaron con éxito. La evidencia es reproducible desde la ejecución vinculada arriba.
2. **Pruebas frontend:** los archivos de test incluyen casos de competencia, fechas y rachas. Para reportar un número ejecutado, prevalece el output del paso `npm test` del commit correspondiente; no mezclar los recuentos de cortes históricos.
3. **Pruebas de integración:** el smoke test usa MongoDB efímero del workflow; no modifica la base local del desarrollador.
4. **Pruebas funcionales manuales:** las matrices de estudiante, orientador y administrador documentan la validación manual anterior. No se han convertido en tests automáticos por aparecer en esta tabla.
5. **Seguridad por inspección:** la existencia de JWT, roles, controles de entrada y aislamiento institucional se verifica mediante código y los escenarios cubiertos por el smoke test; no equivale a una auditoría de penetración independiente.

### Pendientes que no bloquean el alcance del MVP

- Integrar proveedor de correo para recuperación de contraseña productiva.
- Implementar notificaciones reales, si se decide incluirlas en una versión futura.
- Implementar el rol docente solo si se aprueba una ampliación del alcance.
- Las pruebas visuales multiplataforma y el despliegue productivo no forman parte de este corte local.

### Correcciones y PR

El registro de cambios debe considerar fusionada una corrección únicamente cuando el PR remoto figure como `merged`. Las PR cerradas sin fusión no representan código incluido en el commit de entrega. El estado consolidado puede consultarse en [Pull requests de ORENZA](https://github.com/Pepealdana/ORENZA/pulls?q=is%3Apr) y el historial en [commits de `main`](https://github.com/Pepealdana/ORENZA/commits/main/).


## 18. Resultado final de CI y CodeQL — 24 de octubre de 2026

- [CI — commit `7450630`](https://github.com/Pepealdana/ORENZA/actions/runs/40102158039): `success` en `frontend`, `backend` y `backend-integration`.
- [CodeQL — commit `7450630`](https://github.com/Pepealdana/ORENZA/actions/runs/40102157950): `success`.
- Log de `npm test`: `# tests 17`, `# pass 17`, `# fail 0`.
- API de GitHub para la rama `main`: `protected: true`. El detalle de las reglas no pudo leerse con los permisos disponibles, por lo que no se certifican sus parámetros exactos en este informe.
