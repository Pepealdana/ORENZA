# Pruebas funcionales de aceptación — ORENZA MVP

## Registro de ejecución

**Rama objetivo:** `main`  
**Tipo:** prueba funcional manual desde interfaz  
**Estado inicial:** pendiente de ejecución en navegador con frontend y backend activos

### Criterio

- **PASS:** flujo completo y persistencia comprobada.
- **FAIL:** error funcional reproducible.
- **N/A:** no aplica al escenario.
- **PENDIENTE:** aún no ejecutado.

## Matriz

| ID | Rol | Flujo | Resultado esperado | Estado |
|---|---|---|---|---|
| EST-01 | Estudiante | Inicio de sesión | Acceso al espacio de estudiante | PENDIENTE |
| EST-02 | Estudiante | Dashboard | Datos y acciones cargan correctamente | PENDIENTE |
| EST-03 | Estudiante | Competencias | Las competencias se muestran correctamente | PENDIENTE |
| EST-04 | Estudiante | Filtro por competencia | Cada filtro muestra el catálogo correspondiente | PENDIENTE |
| EST-05 | Estudiante | Abrir actividad | Se carga la actividad seleccionada | PENDIENTE |
| EST-06 | Estudiante | Iniciar actividad | El progreso queda registrado | PENDIENTE |
| EST-07 | Estudiante | Completar actividad | El estado queda persistido | PENDIENTE |
| EST-08 | Estudiante | Check-in | El registro se guarda y puede recuperarse | PENDIENTE |
| EST-09 | Estudiante | Perfil | Los campos permitidos se pueden actualizar | PENDIENTE |
| EST-10 | Estudiante | Configuración | Las preferencias responden a los controles | PENDIENTE |
| EST-11 | Estudiante | Cambio de contraseña | La API acepta el cambio válido y rechaza datos inválidos | PENDIENTE |
| EST-12 | Estudiante | Cerrar/reiniciar sesión | La sesión termina y puede iniciarse nuevamente | PENDIENTE |
| ORI-01 | Orientador | Inicio de sesión | Acceso al panel de orientador | PENDIENTE |
| ORI-02 | Orientador | Dashboard | Se muestran datos de su institución | PENDIENTE |
| ORI-03 | Orientador | Seguimiento | Puede consultar estudiantes autorizados | PENDIENTE |
| ORI-04 | Orientador | Privacidad | No aparecen campos restringidos por diseño | PENDIENTE |
| ORI-05 | Orientador | Aislamiento | No puede consultar otra institución | PENDIENTE |
| ADM-01 | Administrador | Inicio de sesión | Acceso al panel administrativo | PENDIENTE |
| ADM-02 | Administrador | Actividades | Crear, editar y activar/desactivar funciona | PENDIENTE |
| ADM-03 | Administrador | Instituciones | Crear, editar y activar/desactivar funciona | PENDIENTE |
| ADM-04 | Administrador | Auditoría | Los eventos administrativos son visibles | PENDIENTE |
| ADM-05 | Administrador | Restricciones | Las acciones protegidas respetan el rol | PENDIENTE |

## Registro de incidencias

Las incidencias encontradas durante esta prueba deben registrarse aquí antes de modificar el código.

| ID | Flujo | Incidencia | Severidad | Acción |
|---|---|---|---|---|
| — | — | Sin ejecutar | — | — |

## Regla de cierre

La fase funcional se considera aprobada cuando todos los casos aplicables estén en PASS o exista una justificación explícita para cualquier PENDIENTE/N/A.

No se deben incorporar nuevas funcionalidades durante esta prueba salvo que una incidencia revele un defecto que impida cumplir el alcance ya definido.
