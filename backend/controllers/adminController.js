import User from '../models/User.js';
import DSA from '../models/DSA.js';
import Subject from '../models/Subject.js';

// GET USERS
export const getUsers = async (req, res) => {
    try {
        // Exclude passwords
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

// SYSTEM STATS
export const getStats = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const dsaTopics = await DSA.countDocuments();
        const subjectCount = await Subject.countDocuments();

        // Use aggregation to count total problems across all topics
        const problemsAggregation = await DSA.aggregate([
            {
                $project: {
                    problemCount: { $size: "$problems" }
                }
            },
            {
                $group: {
                    _id: null,
                    totalProblems: { $sum: "$problemCount" }
                }
            }
        ]);
        
        const totalProblems = problemsAggregation.length > 0 ? problemsAggregation[0].totalProblems : 0;

        res.json({
            totalUsers: userCount,
            dsaTopics: dsaTopics,
            totalProblems: totalProblems,
            subjects: subjectCount
        });
    } catch (error) {
        res.status(500).json({ message: "Error calculating stats", error: error.message });
    }
};
