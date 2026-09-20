import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    action: { type: String, required: true, trim: true, maxlength: 80, index: true },
    entity: { type: String, required: true, trim: true, maxlength: 80, index: true },
    entityId: { type: String, default: '', trim: true, maxlength: 120, index: true },
    summary: { type: String, default: '', trim: true, maxlength: 300 },
    changes: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

auditLogSchema.index({ createdAt: -1 });

export default mongoose.model('AuditLog', auditLogSchema);
