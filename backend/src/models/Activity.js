import mongoose from 'mongoose';

const activityStepOptionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true, maxlength: 120 },
    label: { type: String, required: true, trim: true, maxlength: 500 },
  },
  { _id: false }
);

const activityStepSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true, maxlength: 120 },
    type: { type: String, required: true, trim: true, maxlength: 40 },
    question: { type: String, required: true, trim: true, maxlength: 1000 },
    responseType: { type: String, required: true, trim: true, maxlength: 40 },
    options: { type: [activityStepOptionSchema], default: [] },
  },
  { _id: false }
);

const ageRangeSchema = new mongoose.Schema(
  {
    min: { type: Number, required: true, min: 0, max: 100 },
    max: { type: Number, required: true, min: 0, max: 100 },
  },
  { _id: false }
);

const competencySchema = new mongoose.Schema(
  {
    primary: { type: String, required: true, trim: true, maxlength: 80 },
    secondary: { type: [String], default: [] },
  },
  { _id: false }
);

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
    purpose: { type: String, default: '', trim: true, maxlength: 500 },
    type: { type: String, default: 'exploration', trim: true, maxlength: 40 },
    category: { type: String, default: 'general', trim: true, maxlength: 80 },
    instructions: { type: String, default: '', trim: true, maxlength: 3000 },
    estimatedTime: { type: Number, default: 10, min: 1, max: 180 },
    ageRange: { type: ageRangeSchema, default: () => ({ min: 13, max: 18 }) },
    competencies: {
      type: competencySchema,
      default: () => ({ primary: 'general', secondary: [] }),
    },
    emotions: { type: [String], default: [] },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'easy',
    },
    repeatable: { type: Boolean, default: true },
    steps: { type: [activityStepSchema], default: [] },
    order: { type: Number, default: 0, min: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

activitySchema.index({ active: 1, order: 1 });

export default mongoose.model('Activity', activitySchema);
