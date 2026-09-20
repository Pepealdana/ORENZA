import mongoose from 'mongoose';

const checkInSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    mood: { type: String, required: true, trim: true, maxlength: 40 },
    emotion: { type: String, required: true, trim: true, maxlength: 60 },
    intensity: { type: Number, min: 1, max: 5, required: true },
    note: { type: String, default: '', trim: true, maxlength: 1000 },
  },
  { timestamps: true }
);

checkInSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model('CheckIn', checkInSchema);
