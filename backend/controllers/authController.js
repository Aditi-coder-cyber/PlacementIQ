import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const usersFile = path.join(__dirname, '../data/users.json');

// SIGNUP
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const users = await fs.readJson(usersFile);

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const newUser = {
            id: "USER_" + (users.length + 1),
            name,
            email,
            password
        };

        users.push(newUser);
        await fs.writeJson(usersFile, users, { spaces: 2 });

        res.json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error during signup", error });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const users = await fs.readJson(usersFile);

        const user = users.find(
            user => user.email === email && user.password === password
        );

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Error during login", error });
    }
};
