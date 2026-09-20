import AuditLog from '../models/AuditLog.js';

export async function writeAudit({ actor, action, entity, entityId = '', summary = '', changes = {} }) {
  try {
    await AuditLog.create({
      actor,
      action,
      entity,
      entityId: String(entityId || ''),
      summary,
      changes,
    });
  } catch (error) {
    // La auditoría no debe interrumpir una operación de negocio exitosa.
    console.error('No fue posible registrar auditoría:', error.message);
  }
}
