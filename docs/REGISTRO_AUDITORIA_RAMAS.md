# Registro de auditoría de ramas — ORENZA

**Fecha de revisión:** 2026-10-14  
**Rama oficial de entrega:** `main`  
**Commit de actualización del registro:** pendiente de confirmación por GitHub al guardar esta revisión.  
**Objetivo:** reducir la confusión durante la revisión del instructor, conservar `main` como única rama oficial y retirar ramas obsoletas sin perder cambios útiles ni interferir con solicitudes de integración abiertas.

## Criterios de decisión

- No integrar una rama solo porque tenga commits exclusivos.
- No eliminar ramas que tengan una PR abierta.
- Una rama con cero commits exclusivos respecto de `main`, sin PR abierta y cuyo contenido esté incluido en `main`, es candidata segura para eliminación tras la verificación final de ascendencia.
- Una rama con commits exclusivos solo se retira después de revisar sus diferencias y dejar registrada la decisión.
- No eliminar el README en una rama con PR abierta: podría convertir la eliminación del README en parte del cambio propuesto para integrar. La solución preferida es cerrar/revisar las PR y retirar ramas obsoletas, manteniendo el README oficial en `main`.

## Inventario de ramas

Estado comparativo consultado en GitHub el 2026-10-14, después de eliminar siete ramas descartadas. Los conteos indican commits exclusivos de la rama respecto de `main` según la comparación disponible; las ramas divergentes requieren cautela porque contienen historia posterior al punto común.

| Rama | Commits exclusivos | PR abierta | Decisión | Motivo |
|---|---:|---|---|---|
| `main` | — | No aplica | **CONSERVAR** | Única rama oficial de entrega; CI y CodeQL estaban en verde en el commit de referencia. |
| `chore/mvp-cierre` | 0 | No | **ELIMINADA** | Se verificó que su punta era ancestro de `origin/main`; GitHub confirmó la eliminación remota el 2026-10-13. |
| `feature/backend-mvp` | 0 | No | **ELIMINADA** | Se verificó que su punta era ancestro de `origin/main`; GitHub confirmó la eliminación remota el 2026-10-13. |
| `fix/activity-status-labels` | 0 | No | **ELIMINADA** | Se verificó que su punta era ancestro de `origin/main`; GitHub confirmó la eliminación remota el 2026-10-13. |
| `fix/mvp-progress-consistency` | 0 | No | **ELIMINADA** | Se verificó que su punta era ancestro de `origin/main`; GitHub confirmó la eliminación remota el 2026-10-13. |
| `dependabot/github_actions/actions/checkout-7` | 1 | PR #6 | **CONSERVAR TEMPORALMENTE** | Actualización automatizada pendiente de resolución. No editar su README ni borrar la rama mientras la PR siga abierta. |
| `dependabot/npm_and_yarn/eslint-plugin-react-refresh-0.5.7` | 1 | PR #7 | **CONSERVAR TEMPORALMENTE** | Actualización automatizada pendiente de resolución. |
| `dependabot/npm_and_yarn/backend/dotenv-18.0.5` | 1 | PR #8 | **CONSERVAR TEMPORALMENTE** | Actualización automatizada pendiente de resolución. |
| `dependabot/npm_and_yarn/react-router-dom-7.18.4` | 1 | PR #9 | **CONSERVAR TEMPORALMENTE** | Actualización automatizada pendiente de resolución. |
| `dependabot/npm_and_yarn/backend/mongoose-9.10.4` | 1 | PR #10 | **CONSERVAR TEMPORALMENTE** | Actualización automatizada pendiente de resolución. Revisar compatibilidad por ser una actualización mayor. |
| `dependabot/npm_and_yarn/vitejs/plugin-react-6.1.1` | 1 | PR #11 | **CONSERVAR TEMPORALMENTE** | Actualización automatizada pendiente de resolución. |
| `dependabot/npm_and_yarn/eslint-10.12.0` | 1 | PR #12 | **CONSERVAR TEMPORALMENTE** | Actualización automatizada pendiente de resolución. |
| `dependabot/npm_and_yarn/multi-de36fa8f59` | 1 | PR #13 | **CONSERVAR TEMPORALMENTE** | Actualización automatizada de dependencias pendiente de resolución. |
| `fix/phase1-auth-syntax` | 1 (antes de eliminarse) | No | **ELIMINADA** | Su cambio de autenticación introduce una limitación compartida entre operaciones en lugar de mantener limitadores separados. GitHub confirmó la eliminación remota el 2026-10-14. No integrar. |
| `security/phase1-hardening` | 9 (antes de eliminarse) | No | **ELIMINADA** | Revisión detectó regresiones: elimina la auditoría npm y el trabajo de integración/smoke del CI, cambia las rutas de limitación de autenticación y contiene errores de sintaxis en las rutas revisadas. GitHub confirmó la eliminación remota el 2026-10-14. No integrar. |
| `fix/instructor-october-review` | 36 (antes de eliminarse) | No | **ELIMINADA** | Comparación final de 16 archivos entre `main` y la rama: 13 archivos de código, pruebas, CI y dependencias eran idénticos; las diferencias restantes estaban en tres documentos y `main` contenía la documentación más reciente. Se eliminó el remoto el 2026-10-14 sin fusionar la rama. No se identificaron cambios funcionales exclusivos que debieran rescatarse. |

## PR abiertas que deben resolverse antes de limpiar sus ramas

- [PR #6 — actions/checkout](https://github.com/Pepealdana/ORENZA/pull/6)
- [PR #7 — eslint-plugin-react-refresh](https://github.com/Pepealdana/ORENZA/pull/7)
- [PR #8 — dotenv](https://github.com/Pepealdana/ORENZA/pull/8)
- [PR #9 — react-router-dom](https://github.com/Pepealdana/ORENZA/pull/9)
- [PR #10 — mongoose](https://github.com/Pepealdana/ORENZA/pull/10)
- [PR #11 — @vitejs/plugin-react](https://github.com/Pepealdana/ORENZA/pull/11)
- [PR #12 — eslint](https://github.com/Pepealdana/ORENZA/pull/12)
- [PR #13 — react-dom y @types/react-dom](https://github.com/Pepealdana/ORENZA/pull/13)

## Revisión de recursos visuales en `security/phase1-hardening`

- `screens/login-illustration.png` y `screens/autoregulacion.png` ya existen en `main`; no es necesario rescatarlos.
- `screens/autoregulacion.png.png` es un duplicado por nombre y no aparece en las importaciones examinadas.
- `frase_cuida_de_ti.png`, `login-illustration.webp`, `logo_orenza_diseño2.png`, `orenza_lema.png` y `orenza_hor.svg` no mostraron referencias en la búsqueda realizada. No se incorporan automáticamente.
- Los cambios de `SettingsPage.jsx` de esa rama ocultan que las notificaciones todavía no generan avisos reales; no rescatarlos sin implementar la función.

## Acciones de limpieza

1. **Completado:** siete ramas descartadas fueron eliminadas del remoto. Las primeras cuatro superaron `git merge-base --is-ancestor origin/<rama> origin/main`; las dos ramas de seguridad se eliminaron después de registrar sus regresiones; `fix/instructor-october-review` se eliminó tras comparar sus 16 archivos modificados contra `main`.
2. No modificar ni borrar las ocho ramas Dependabot mientras sus PR estén abiertas.
3. **Completado:** `fix/phase1-auth-syntax` y `security/phase1-hardening` fueron eliminadas del remoto el 2026-10-14.
4. **Completado:** `fix/instructor-october-review` fue eliminada el 2026-10-14 tras la revisión final de archivos.
5. Volver a consultar ramas y PR abiertas tras las siguientes acciones de limpieza.

**Nota de estado:** las siete ramas indicadas como `ELIMINADA` fueron retiradas del remoto. Las ocho ramas Dependabot asociadas a PR abiertas se conservan hasta resolver esas solicitudes.
