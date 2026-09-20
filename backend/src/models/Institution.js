import mongoose from 'mongoose';

const institutionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true, maxlength: 150 },
    code: { type: String, required: true, unique: true, trim: true, uppercase: true, maxlength: 30 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

institutionSchema.index({ active: 1, name: 1 });

export default mongoose.model('Institution', institutionSchema);
