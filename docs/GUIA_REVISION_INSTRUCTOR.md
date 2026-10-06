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
| Tests frontend | **7/7 PASS** |
| ESLint | **PASS** |
| Build frontend | **PASS** |
| Sintaxis backend | **PASS en CI** |
| Smoke test | **PASS en las validaciones realizadas** |
| Auditoría de dependencias | **0 vulnerabilidades** |

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

El workflow actual no lo ejecuta automáticamente. Esto está documentado deliberadamente para que no exista discrepancia entre la documentación y el comportamiento real del CI.

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
