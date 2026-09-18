import mongoose from 'mongoose';

const activityProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    activityId: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'completed'],
      default: 'in-progress',
    },
    answers: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

activityProgressSchema.index({ user: 1, activityId: 1 }, { unique: true });

export default mongoose.model('ActivityProgress', activityProgressSchema);
