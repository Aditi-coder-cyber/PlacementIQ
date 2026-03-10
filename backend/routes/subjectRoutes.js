import express from 'express';
import { getAllSubjects, getSubjectQuestions, addQuestion } from '../controllers/subjectController.js';

const router = express.Router();

router.get('/', getAllSubjects);
router.get('/:subject', getSubjectQuestions);
router.post('/add-question', addQuestion);

export default router;
