import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true, unique: true },
  questions: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }]
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
