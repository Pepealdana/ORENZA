import mongoose from 'mongoose';

const checkInSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    date: { type: String, required: true },
    mood: { type: String, required: true },
    emotion: { type: String, required: true },
    intensity: { type: Number, min: 1, max: 5, required: true },
    note: { type: String, default: '' },
  },
  { timestamps: true }
);

checkInSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model('CheckIn', checkInSchema);
