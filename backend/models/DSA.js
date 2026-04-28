import mongoose from 'mongoose';

const dsaSchema = new mongoose.Schema({
  topic: { type: String, required: true, unique: true },
  problems: [{
    title: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
    link: { type: String, required: true }
  }]
}, { timestamps: true });

const DSA = mongoose.model('DSA', dsaSchema);
export default DSA;
