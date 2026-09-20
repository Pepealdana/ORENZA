import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    activityId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
    },
    title: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, default: '', trim: true, maxlength: 500 },
    category: { type: String, default: 'general', trim: true, maxlength: 80 },
    instructions: { type: String, default: '', trim: true, maxlength: 3000 },
    estimatedTime: { type: Number, default: 10, min: 1, max: 180 },
    order: { type: Number, default: 0, min: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

activitySchema.index({ active: 1, order: 1 });

export default mongoose.model('Activity', activitySchema);
