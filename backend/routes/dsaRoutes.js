import express from 'express';
import { getAllTopics, getTopicProblems, addProblem } from '../controllers/dsaController.js';

const router = express.Router();

router.get('/', getAllTopics);
router.get('/:topic', getTopicProblems);
router.post('/add', addProblem);

export default router;
