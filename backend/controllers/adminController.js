import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const usersFile = path.join(__dirname, '../data/users.json');
const dsaFile = path.join(__dirname, '../data/dsa.json');
const subjectsFile = path.join(__dirname, '../data/subjects.json');

// GET USERS
export const getUsers = async (req, res) => {
    try {
        const users = await fs.readJson(usersFile);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// SYSTEM STATS
export const getStats = async (req, res) => {
    try {
        const users = await fs.readJson(usersFile);
        const dsa = await fs.readJson(dsaFile);
        const subjects = await fs.readJson(subjectsFile);

        const totalTopics = Object.keys(dsa).length;

        let totalProblems = 0;
        Object.values(dsa).forEach(arr => {
            totalProblems += arr.length;
        });

        const totalSubjects = Object.keys(subjects).length;

        res.json({
            totalUsers: users.length,
            dsaTopics: totalTopics,
            totalProblems,
            subjects: totalSubjects
        });
    } catch (error) {
        res.status(500).json({ message: "Error calculating stats", error });
    }
};
