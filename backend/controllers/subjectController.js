import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '../data/subjects.json');

export const getAllSubjects = async (req, res) => {
    try {
        const data = await fs.readJson(dataPath);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error reading subjects data', error });
    }
};

export const getSubjectQuestions = async (req, res) => {
    try {
        const { subject } = req.params;
        const data = await fs.readJson(dataPath);

        const subjectKey = Object.keys(data).find(k => k.toLowerCase() === subject.toLowerCase());

        if (subjectKey && data[subjectKey]) {
            res.json(data[subjectKey]);
        } else {
            res.status(404).json({ message: `Subject ${subject} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error reading subjects data', error });
    }
};

export const addQuestion = async (req, res) => {
    try {
        const { subject, question, answer } = req.body;
        if (!subject || !question) {
            return res.status(400).json({ message: 'Subject and question are required' });
        }

        const data = await fs.readJson(dataPath);

        let subjectKey = Object.keys(data).find(k => k.toLowerCase() === subject.toLowerCase());

        if (!subjectKey) {
            subjectKey = subject;
            data[subjectKey] = [];
        }

        data[subjectKey].push({
            question,
            answer: answer || 'To be updated...'
        });

        await fs.writeJson(dataPath, data, { spaces: 2 });
        res.status(201).json({ message: 'Question added successfully', subject: subjectKey });
    } catch (error) {
        res.status(500).json({ message: 'Error updating subjects data', error });
    }
};
