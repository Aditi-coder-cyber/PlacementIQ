import Subject from '../models/Subject.js';

export const getAllSubjects = async (req, res) => {
    try {
        const data = await Subject.find();
        
        // Transform data to match previous JSON structure { "Subject": [questions] }
        const formattedData = {};
        data.forEach(item => {
            formattedData[item.subjectName] = item.questions;
        });

        res.json(formattedData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subjects data', error: error.message });
    }
};

export const getSubjectQuestions = async (req, res) => {
    try {
        const { subject } = req.params;
        const subjectData = await Subject.findOne({ subjectName: new RegExp('^' + subject + '$', 'i') });

        if (subjectData) {
            res.json(subjectData.questions);
        } else {
            res.status(404).json({ message: `Subject ${subject} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subject questions', error: error.message });
    }
};

export const addQuestion = async (req, res) => {
    try {
        const { subject, question, answer } = req.body;
        if (!subject || !question) {
            return res.status(400).json({ message: 'Subject and question are required' });
        }

        let subjectData = await Subject.findOne({ subjectName: new RegExp('^' + subject + '$', 'i') });

        if (!subjectData) {
            subjectData = new Subject({
                subjectName: subject,
                questions: []
            });
        }

        subjectData.questions.push({
            question,
            answer: answer || 'To be updated...'
        });

        await subjectData.save();
        res.status(201).json({ message: 'Question added successfully', subject: subjectData.subjectName });
    } catch (error) {
        res.status(500).json({ message: 'Error updating subjects data', error: error.message });
    }
};
