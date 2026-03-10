import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '../data/dsa.json');

export const getAllTopics = async (req, res) => {
  try {
    const data = await fs.readJson(dataPath);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error reading DSA data', error });
  }
};

export const getTopicProblems = async (req, res) => {
  try {
    const { topic } = req.params;
    const data = await fs.readJson(dataPath);
    
    // Case insensitive search for topic
    const topicKey = Object.keys(data).find(k => k.toLowerCase() === topic.toLowerCase());
    
    if (topicKey && data[topicKey]) {
      res.json(data[topicKey]);
    } else {
      res.status(404).json({ message: `Topic ${topic} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error reading DSA data', error });
  }
};

export const addProblem = async (req, res) => {
  try {
    const { topic, title, difficulty, link } = req.body;
    if (!topic || !title) {
      return res.status(400).json({ message: 'Topic and title are required' });
    }

    const data = await fs.readJson(dataPath);
    
    // Find topic key (case insensitive) or create new
    let topicKey = Object.keys(data).find(k => k.toLowerCase() === topic.toLowerCase());
    
    if (!topicKey) {
      topicKey = topic;
      data[topicKey] = [];
    }

    data[topicKey].push({
      title,
      difficulty: difficulty || 'Medium',
      link: link || '#'
    });

    await fs.writeJson(dataPath, data, { spaces: 2 });
    res.status(201).json({ message: 'Problem added successfully', topic: topicKey });
  } catch (error) {
    res.status(500).json({ message: 'Error updating DSA data', error });
  }
};
