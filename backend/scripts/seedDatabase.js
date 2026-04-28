import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import DSA from '../models/DSA.js';
import Subject from '../models/Subject.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const usersFile = path.join(__dirname, '../data/users.json');
const dsaFile = path.join(__dirname, '../data/dsa.json');
const subjectsFile = path.join(__dirname, '../data/subjects.json');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected for Seeding ✅");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

const seedDatabase = async () => {
    try {
        await connectDB();

        // 1. Seed Users
        if (await fs.pathExists(usersFile)) {
            console.log("Seeding Users...");
            const users = await fs.readJson(usersFile);
            for (const user of users) {
                const existingUser = await User.findOne({ email: user.email });
                if (!existingUser) {
                    const hashedPassword = await bcrypt.hash(user.password, 10);
                    const newUser = new User({
                        name: user.name,
                        email: user.email,
                        password: hashedPassword,
                    });
                    await newUser.save();
                }
            }
            console.log("Users seeded.");
        }

        // 2. Seed DSA
        if (await fs.pathExists(dsaFile)) {
            console.log("Seeding DSA...");
            const dsaData = await fs.readJson(dsaFile);
            for (const [topic, problems] of Object.entries(dsaData)) {
                const existingTopic = await DSA.findOne({ topic });
                if (!existingTopic) {
                    const newDSA = new DSA({
                        topic,
                        problems
                    });
                    await newDSA.save();
                }
            }
            console.log("DSA seeded.");
        }

        // 3. Seed Subjects
        if (await fs.pathExists(subjectsFile)) {
            console.log("Seeding Subjects...");
            const subjectsData = await fs.readJson(subjectsFile);
            for (const [subjectName, questions] of Object.entries(subjectsData)) {
                const existingSubject = await Subject.findOne({ subjectName });
                if (!existingSubject) {
                    const newSubject = new Subject({
                        subjectName,
                        questions
                    });
                    await newSubject.save();
                }
            }
            console.log("Subjects seeded.");
        }

        console.log("Database Seeding Completed Successfully! 🎉");
        process.exit(0);
    } catch (error) {
        console.error("Error during database seeding:", error);
        process.exit(1);
    }
};

seedDatabase();
