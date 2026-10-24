# Guía de revisión para el instructor — ORENZA MVP

## 1. Objetivo de este documento

Este archivo es la **puerta de entrada recomendada para la revisión del repositorio**.

Su objetivo es evitar que la revisión dependa de buscar información entre múltiples archivos o interpretar como pendientes funcionalidades que fueron excluidas deliberadamente del MVP.

---

## 2. Orden recomendado de revisión

### Paso 1 — Alcance y estado

Leer:

```
README.md
```

En especial:

- Estado del proyecto.
- Alcance definitivo.
- Roles implementados.
- Elementos fuera del alcance.
- Pruebas y evidencia.

---

### Paso 2 — Cierre del MVP

Leer:

```
docs/MVP_CIERRE.md
```

Este documento contiene:

- observaciones atendidas;
- estado de cierre;
- alcance definitivo;
- validación por perfil;
- validación técnica;
- seguridad;
- integración continua;
- criterio de cierre.

---

### Paso 3 — Registro de pruebas

Leer:

```
docs/PRUEBAS_FUNCIONALES_MVP.md
```

Este es el documento que concentra los resultados de las pruebas.

Las pruebas están organizadas por:

1. estudiante;
2. orientador;
3. administrador;
4. frontend automatizado;
5. backend;
6. seguridad;
7. CI.

---

### Paso 4 — Evidencia automática

Abrir:

```
.github/workflows/ci.yml
```

Este archivo permite verificar qué validaciones ejecuta automáticamente GitHub Actions.

El workflow actual ejecuta:

### Frontend

```
npm ci
npm run lint
npm test
npm run build
```

### Backend

Comprobaciones de sintaxis mediante:

```
node --check
```

sobre los archivos críticos del backend.

Las ejecuciones reales se encuentran en:

**GitHub → Actions → ORENZA CI**

---

## 3. Perfiles implementados

La versión entregada implementa y valida:

### Estudiante

Flujos funcionales:

- autenticación;
- dashboard;
- competencias;
- actividades;
- filtros;
- progreso;
- check-ins;
- perfil;
- configuración;
- cambio de contraseña;
- sesión.

### Orientador

Flujos funcionales:

- autenticación;
- dashboard;
- consulta de estudiantes;
- seguimiento;
- privacidad;
- autorización;
- aislamiento institucional.

### Administrador

Flujos funcionales:

- autenticación;
- dashboard;
- estadísticas;
- usuarios;
- instituciones;
- actividades;
- filtros;
- paginación;
- auditoría;
- autorización.

---

## 4. Funcionalidad fuera del alcance

### Rol docente

El rol docente **no forma parte del MVP**.

No debe considerarse:

- un error;
- una prueba pendiente;
- una funcionalidad incompleta;
- una incidencia abierta.

Es una decisión explícita de alcance.

Tampoco forman parte de esta entrega:

- acudiente;
- inteligencia artificial;
- analítica avanzada;
- correo productivo para recuperación de contraseña;
- nuevas funcionalidades de negocio.

---

## 5. Resultado de la validación

### Funcional

| Perfil | Resultado |
|---|---|
| Estudiante | **PASS** |
| Orientador | **PASS** |
| Administrador | **PASS** |

### Automatizada

| Validación | Resultado |
|---|---|
| Tests frontend | **17 casos definidos en los archivos de prueba; job frontend PASS en CI reciente** |
| ESLint | **PASS** |
| Build frontend | **PASS** |
| Sintaxis backend | **PASS en CI** |
| Smoke test | **PASS — MongoDB efímero en CI de `main`** |
| Auditoría de dependencias | **PASS — sin hallazgos moderados o superiores** |

---

## 6. Diferencia entre CI y pruebas manuales

Para evitar una interpretación incorrecta:

### GitHub Actions

El CI demuestra automáticamente que el código cumple las validaciones definidas en:

```
.github/workflows/ci.yml
```

### Pruebas funcionales

Las pruebas funcionales de los perfiles se registran en:

```
docs/PRUEBAS_FUNCIONALES_MVP.md
```

La matriz funcional no es generada automáticamente por GitHub Actions; es el registro documental de la validación funcional realizada durante el cierre del MVP.

### Smoke test

El smoke test es una prueba de integración backend disponible mediante:

```bash
cd backend
npm run test:smoke
```

El workflow de CI sí ejecuta el smoke test en el job `backend-integration`, usando MongoDB efímero y credenciales generadas para esa ejecución. Evidencia: [CI en `main`](https://github.com/Pepealdana/ORENZA/actions/runs/38493213386).

---

## 7. Comprobación local rápida

Si se requiere reproducir la validación técnica:

### Frontend

Desde la raíz:

```bash
npm ci
npm run lint
npm test
npm run build
```

### Backend

Con MongoDB y las variables de entorno configuradas:

```bash
cd backend
npm install
npm run seed
npm run test:smoke
```

---

## 8. Estado de entrega

**ORENZA MVP está preparado para revisión técnica y funcional.**

La rama oficial es:

```
main
```

La documentación oficial de revisión es:

1. `README.md`
2. `docs/GUIA_REVISION_INSTRUCTOR.md`
3. `docs/MVP_CIERRE.md`
4. `docs/PRUEBAS_FUNCIONALES_MVP.md`
5. `.github/workflows/ci.yml`

No es necesario utilizar archivos de versiones anteriores para interpretar el estado actual del MVP.

---

## 9. Criterio de lectura

La regla para esta entrega es:

> **Lo que está marcado como PASS fue validado. Lo que está marcado como fuera del alcance no es una incidencia. Las pruebas automáticas deben verificarse en GitHub Actions y las pruebas funcionales deben consultarse en la matriz de pruebas.**

Este criterio busca que la revisión sea directa, reproducible y sin ambigüedades.


## 10. Estado remoto verificado — 24 de octubre de 2026

- Commit actual de `main`: `8fec4536c8c2d00915fa8328407a5ebf78c902b5`.
- [CI — PASS](https://github.com/Pepealdana/ORENZA/actions/runs/40050239517): los jobs frontend, backend y backend-integration aprobaron; el job de integración ejecutó el smoke test contra MongoDB efímero.
- [CodeQL — PASS](https://github.com/Pepealdana/ORENZA/actions/runs/40050239520).
- Protección de `main` activa con los checks requeridos `frontend`, `backend`, `backend-integration` y `Analizar JavaScript y TypeScript`.
- No hay PR abiertas. #19 y #21 se fusionaron; #9, #13, #20, #22 y #23 se cerraron sin fusionar.
- Los tres archivos de pruebas frontend contienen 17 casos (6 de competencias, 4 de fechas y 7 de rachas). La evidencia de CI valida el commit enlazado; las pruebas funcionales manuales por perfil se conservan como registro histórico y no deben presentarse como ejecutadas automáticamente.
- La revisión de código respalda la presencia de JWT y control por rol, validación de datos, límites de intentos independientes, aislamiento institucional y exclusión de notas privadas del orientador. El correo productivo para recuperación y las notificaciones reales siguen fuera de la implementación actual; el rol docente está fuera del alcance.
- El CI no certifica la experiencia visual en todos los dispositivos ni el despliegue productivo: esos puntos requieren evidencia del entorno real.


## 11. Corte definitivo de entrega — 24 de octubre de 2026

**Commit de `main`: [`4e85772bab414648516699ef5b557c40297284f7`](https://github.com/Pepealdana/ORENZA/commit/4e85772bab414648516699ef5b557c40297284f7).**

- [CI de la versión de entrega](https://github.com/Pepealdana/ORENZA/actions/runs/40059031698): **success** en los jobs `frontend`, `backend` y `backend-integration`.
- El job `frontend` ejecutó `npm ci`, ESLint, los tests declarados, build y `npm audit --audit-level=moderate`; todos los pasos terminaron correctamente.
- El job `backend` terminó correctamente las comprobaciones `node --check` de los archivos críticos.
- El job `backend-integration` levantó MongoDB efímero, preparó datos y ejecutó `npm run test:smoke`; todos los pasos terminaron correctamente.
- La rama `main` es la referencia académica. No se encontraron PR abiertas en la consulta remota realizada el 24 de octubre de 2026.
- Las pruebas manuales por perfil son evidencia documental histórica; CI no las repite automáticamente. No deben confundirse con los tests automáticos.
- Esta revisión no pudo leer directamente la configuración de protección de rama por limitaciones de permisos de la integración. Consultar GitHub → Settings → Branches / Rulesets para confirmarla.

### PR y cambios de dependencias

Usar el estado remoto de cada PR como fuente final. Una PR fusionada es parte de `main`; una PR cerrada sin fusión es un registro histórico y **no** debe citarse como cambio integrado. Consultar [Pull requests de ORENZA](https://github.com/Pepealdana/ORENZA/pulls?q=is%3Apr).

### Límites funcionales conocidos

- El rol docente está fuera del alcance del MVP.
- La recuperación de contraseña todavía requiere un proveedor de correo para uso productivo; en desarrollo existe un flujo demo.
- Las preferencias de notificaciones son locales y no envían avisos reales.
- Esta entrega es local/académica; no incluye publicación o despliegue en internet.
