# Política de seguridad — ORENZA

## Alcance

ORENZA es un MVP académico para acompañamiento socioemocional en entornos educativos. Maneja autenticación, perfiles, registros emocionales y datos de seguimiento; por tanto, la seguridad y la privacidad son requisitos de primer nivel.

## Reglas

- Nunca publicar `.env`, contraseñas, JWT secrets, cadenas de conexión o tokens.
- Las credenciales del seed deben configurarse por entorno y son exclusivamente para desarrollo/pruebas.
- `JWT_SECRET` debe ser largo, aleatorio y diferente entre entornos.
- Los datos privados de estudiantes no deben exponerse a roles que no los necesiten.
- Los cambios de autorización deben acompañarse de pruebas negativas.
- Los errores internos no deben devolverse al cliente con detalles de implementación.
- Las dependencias y GitHub Actions deben mantenerse actualizadas.

## Reporte

No publiques credenciales, datos de estudiantes ni información sensible en issues públicas. Reporta una vulnerabilidad al mantenedor mediante el canal de contacto disponible en el perfil de GitHub.

## Estado

La Fase 1 endurece configuración, rate limiting básico, cabeceras, límites de payload y manejo de credenciales demo. ORENZA sigue siendo un MVP académico y no debe tratarse como un sistema clínico ni como un servicio de producción sin una revisión de seguridad adicional.
