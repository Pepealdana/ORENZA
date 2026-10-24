# Auditoría de cierre del repositorio — ORENZA

**Fecha:** 16 de octubre de 2026  
**Rama oficial de entrega:** `main`  
**Commit de código revisado:** [`5d45bfee9f2bac6df96aeed6582c643e9bbfe398`](https://github.com/Pepealdana/ORENZA/commit/5d45bfee9f2bac6df96aeed6582c643e9bbfe398)

## 1. CI y análisis estático

En el commit de código revisado:

- [ORENZA CI](https://github.com/Pepealdana/ORENZA/actions/runs/38828015947): **success**. Frontend: instalación, lint, 12 pruebas, build y `npm audit --audit-level=moderate`; backend: comprobaciones de sintaxis; integración: smoke test con MongoDB 7 efímero y credenciales generadas en el job.
- [CodeQL](https://github.com/Pepealdana/ORENZA/actions/runs/38828016001): **success**.

La limpieza de módulos y la actualización documental de este informe generan una nueva ejecución de CI. Debe comprobarse su resultado antes de dar por validado el nuevo commit.

## 2. Imports, componentes y rutas

Se revisó el mapa de imports estáticos del código JavaScript/JSX de entrada, rutas, layouts, páginas, componentes, hooks, servicios, datos, utilidades y pruebas.

- Las rutas de `src/routes/AppRoutes.jsx` apuntan a páginas presentes en el árbol de `src/`.
- Los imports relativos de los módulos inspeccionados resuelven a archivos existentes; no se identificaron imports relativos rotos.
- Los CSS Modules referenciados por páginas y componentes existen.
- Se inspeccionaron imports estáticos y usos de `import()` en los módulos revisados antes de retirar los candidatos huérfanos descritos en la sección 4.

## 3. Recursos gráficos

- `public/favicon.png` está referenciado en `index.html`.
- `src/assets/orenza_logo.png` se usa en páginas de autenticación y presentación.
- `src/assets/orenza_hor.png` se usa en el encabezado y la pantalla inicial.
- Los ocho iconos de competencias se referencian desde `CompetenciesPage.jsx`.
- Las trece ilustraciones de pantallas se referencian desde `IdentityVisual.jsx` o `CompetencyDetailPage.jsx`.

Se revisaron las hojas CSS de `src/` buscando `url(...)` y `@import`. No se encontraron referencias CSS a imágenes locales; la única importación externa identificada corresponde a Google Fonts en `src/styles/globals.css`.

**Resultado:** no se identificaron imágenes locales sin referencia en el inventario revisado.

## 4. Módulos sin referencias de entrada

El mapa de imports no encontró referencias estáticas ni dinámicas desde las rutas, páginas, componentes, utilidades o pruebas revisadas a:

- `src/components/dashboard/ProgressCard/ProgressCard.jsx`
- `src/components/dashboard/ProgressCard/ProgressCard.module.css`
- `src/utils/emotionalStorage.js`

Se retiraron en el commit de limpieza por no formar parte del grafo de módulos utilizado por la aplicación actual. Se conservaron `ProgressBar` y `dateUtils` porque sí tienen referencias activas en otros módulos. No se eliminaron otros archivos por mera apariencia de no uso.

## 5. Revisión histórica de las solicitudes de Dependabot (corte anterior al 24 de octubre)

| PR | Actualización | Decisión |
|---|---|---|
| [#16](https://github.com/Pepealdana/ORENZA/pull/16) | `dotenv` 18.0.7 | **Fusionada**; checks aprobados. |
| [#6](https://github.com/Pepealdana/ORENZA/pull/6) | `actions/checkout` v7 | **Fusionada**; checks aprobados. |
| [#12](https://github.com/Pepealdana/ORENZA/pull/12) | ESLint 10.12.0 | **Fusionada**; checks aprobados. |
| [#7](https://github.com/Pepealdana/ORENZA/pull/7) | `eslint-plugin-react-refresh` 0.5.7 | **Fusionada**; checks aprobados. |
| [#18](https://github.com/Pepealdana/ORENZA/pull/18) | Mongoose 9.11.1 | **Fusionada**; checks aprobados, incluido el smoke test. |
| [#17](https://github.com/Pepealdana/ORENZA/pull/17) | Express 5.3.0 | **Fusionada** después del rebase y de aprobar CI, integración y CodeQL. |
| [#13](https://github.com/Pepealdana/ORENZA/pull/13) | React DOM y tipos | **Pendiente**: el head rebasado aprobó los checks, pero volvió a quedar desactualizado frente a `main` y GitHub informa conflicto/no mergeable. Requiere nueva actualización y checks sobre la base actual. |
| [#11](https://github.com/Pepealdana/ORENZA/pull/11) | `@vitejs/plugin-react` 6.1.2 | **Fusionada** después del rebase y de aprobar CI, integración y CodeQL. |
| [#9](https://github.com/Pepealdana/ORENZA/pull/9) | `react-router-dom` 7.18.4 | **Pendiente**: el head sigue antiguo, sus checks de frontend/backend fallan y GitHub informa conflicto/no mergeable. El rebase solicitado aún no produjo un head validable. |

Los fallos históricos de #13, #11 y #9 mostraron un error de análisis de sintaxis (`Unexpected token ,`) en código de ramas antiguas y un hallazgo de alta severidad en la instalación de esa revisión. #11 se rebasó, actualizó a `@vitejs/plugin-react` 6.1.2 y pasó los checks antes de fusionarse. #13 aprobó checks en su head rebasado, pero quedó desactualizada frente a `main` y ahora tiene conflicto; #9 continúa con el head antiguo y checks fallidos. Ninguno de esos resultados históricos debe interpretarse como un fallo de `main`.

Las siete fusiones aprobadas se realizaron individualmente: #16, #6, #12, #7, #18, #17 y #11. No se fusionaron #13 ni #9 porque no están integrables y validados sobre el estado actual de `main`.

## 6. Protección de `main` — estado histórico al 16 de octubre de 2026

GitHub informó que la rama principal aún no está protegida (`protected: false`). Se intentó consultar la configuración de protección mediante la integración disponible, pero GitHub devolvió **403 Resource not accessible by integration**. Por esta limitación no fue posible activar ni verificar reglas de protección desde esta sesión.

Pendiente desde **GitHub → Settings → Branches / Rulesets**:

- objetivo de la regla: `main`;
- exigir Pull Request para integrar cambios;
- exigir los checks `frontend`, `backend`, `backend-integration` y `Analizar JavaScript y TypeScript`;
- no exigir aprobación obligatoria si no hay un segundo revisor disponible;
- conservar un método de merge permitido, preferiblemente squash para actualizaciones de Dependabot.

Después de crear la regla, comprobar que los checks aparecen con esos nombres exactos y que un PR de prueba dirigido a `main` puede completarse cuando todos pasan.

## 7. Criterio de cierre

La única rama oficial de entrega sigue siendo `main`. La auditoría estática y de recursos se documenta con las evidencias descritas, y los tres módulos sin referencias identificados fueron retirados. Quedan por cerrar la validación de las dos solicitudes de Dependabot aún abiertas (#13 y #9) y la activación de la protección de `main` con permisos suficientes.


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
