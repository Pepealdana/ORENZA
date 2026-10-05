# Cierre del MVP — ORENZA

## Propósito

Este documento establece el cierre técnico y funcional del MVP de ORENZA después de atender las observaciones del instructor y consolidar el desarrollo en `main`.

El cierre se divide en tres frentes:

1. validación funcional desde la interfaz;
2. auditoría técnica del código y del backend;
3. preparación de la evidencia y documentación de entrega.

## Estado de las observaciones del instructor

| Observación | Estado |
|---|---|
| Filtro de actividades por competencia | Cerrada |
| Rama oficial de entrega | Cerrada — `main` |
| README actualizado | Cerrada |
| Perfil, configuración, orientador y administrador | Cerrada para el alcance MVP |
| Eliminación de archivos duplicados/no utilizados | Cerrada |
| Botones sin acción en los casos identificados | Cerrada |
| Pruebas básicas | Cerrada |

## Criterio de cierre

Una funcionalidad se considera cerrada cuando:

- tiene una interfaz funcional, cuando corresponde;
- consume la API o persistencia correspondiente;
- respeta autenticación y autorización;
- maneja estados de carga/error/vacío cuando aplica;
- tiene validación automatizada cuando resulta razonable;
- no introduce una nueva ampliación de alcance.

## Evidencia automatizada disponible

La integración continua debe validar en `main`:

- instalación de dependencias;
- ESLint;
- pruebas de utilidades frontend;
- build de producción;
- comprobaciones de sintaxis backend;
- smoke test de API y persistencia.

## Validación funcional manual

La ejecución manual pendiente de documentar debe recorrer estos flujos:

### Estudiante

1. Iniciar sesión.
2. Consultar dashboard.
3. Abrir competencias.
4. Filtrar actividades por cada competencia.
5. Abrir una actividad.
6. Iniciar/completar una actividad.
7. Verificar persistencia del progreso.
8. Registrar un check-in.
9. Consultar perfil.
10. Modificar los campos permitidos.
11. Abrir configuración.
12. Cambiar una preferencia.
13. Probar cambio de contraseña.
14. Cerrar sesión.
15. Iniciar sesión nuevamente y comprobar persistencia.

### Orientador

1. Iniciar sesión con rol orientador.
2. Consultar el dashboard.
3. Consultar estudiantes de su institución.
4. Abrir el seguimiento de un estudiante.
5. Verificar que la información sensible no expuesta por diseño no aparezca.
6. Comprobar que un estudiante de otra institución no sea accesible.

### Administrador

1. Iniciar sesión.
2. Consultar dashboard.
3. Crear/editar/desactivar una actividad.
4. Verificar que el cambio aparezca en el catálogo.
5. Crear/editar/desactivar una institución según las reglas del sistema.
6. Consultar auditoría.
7. Verificar restricciones de rol.

## Revisión técnica final

### Seguridad y autorización

- [ ] Rutas protegidas desde frontend.
- [ ] Autenticación validada por backend.
- [ ] Autorización por rol.
- [ ] Aislamiento por institución.
- [ ] Contraseñas protegidas en backend.
- [ ] Tokens de recuperación tratados de forma segura.
- [ ] Datos sensibles omitidos en DTOs de orientador.
- [ ] Variables sensibles fuera del repositorio.

### Calidad

- [ ] ESLint sin errores.
- [ ] Pruebas automatizadas verdes.
- [ ] Build verde.
- [ ] Smoke test verde.
- [ ] Sin archivos legacy conocidos.
- [ ] Sin botones conocidos sin acción.
- [ ] Sin imports legacy conocidos.

### Alcance

El MVP no incorpora como requisito de cierre:

- módulo completo para docentes;
- módulo de acudientes;
- inteligencia artificial;
- analítica avanzada;
- notificaciones productivas por correo;
- funcionalidades de negocio no definidas para el MVP.

Estas características pueden tratarse como evolución posterior.

## Resultado esperado

Al finalizar esta fase, ORENZA debe poder presentarse como un MVP funcional y verificable, con:

- frontend React/Vite;
- backend Node/Express;
- MongoDB;
- autenticación y roles;
- CRUD de las entidades previstas;
- seguimiento socioemocional;
- catálogo de actividades;
- persistencia de progreso;
- aislamiento institucional;
- auditoría administrativa;
- pruebas automatizadas;
- CI;
- documentación técnica.

El cierre del MVP no implica que el producto esté preparado para producción masiva. Implica que el alcance académico/funcional definido para esta versión está implementado, probado y documentado.
