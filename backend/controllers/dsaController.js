import DSA from '../models/DSA.js';

export const getAllTopics = async (req, res) => {
  try {
    const data = await DSA.find();
    
    // Transform data to match previous JSON structure { "Topic": [problems] }
    const formattedData = {};
    data.forEach(item => {
      formattedData[item.topic] = item.problems;
    });

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching DSA data', error: error.message });
  }
};

export const getTopicProblems = async (req, res) => {
  try {
    const { topic } = req.params;
    // Case insensitive search for topic
    const topicData = await DSA.findOne({ topic: new RegExp('^' + topic + '$', 'i') });
    
    if (topicData) {
      res.json(topicData.problems);
    } else {
      res.status(404).json({ message: `Topic ${topic} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching topic data', error: error.message });
  }
};

export const addProblem = async (req, res) => {
  try {
    const { topic, title, difficulty, link } = req.body;
    if (!topic || !title) {
      return res.status(400).json({ message: 'Topic and title are required' });
    }

    let topicData = await DSA.findOne({ topic: new RegExp('^' + topic + '$', 'i') });
    
    if (!topicData) {
      // Create new topic if it doesn't exist
      topicData = new DSA({
        topic,
        problems: []
      });
    }

    topicData.problems.push({
      title,
      difficulty: difficulty || 'Medium',
      link: link || '#'
    });

    await topicData.save();
    res.status(201).json({ message: 'Problem added successfully', topic: topicData.topic });
  } catch (error) {
    res.status(500).json({ message: 'Error updating DSA data', error: error.message });
  }
};
