import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// SIGNUP
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: { id: newUser._id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Error during signup", error: error.message });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 2FA Flow (Optional)
        if (user.is2FAEnabled) {
            // Generate simple OTP for now
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            user.otp = otp;
            user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry
            await user.save();

            // In a real app, send an email here. For now we will just simulate it by sending it in the response (for testing purposes only)
            console.log(`[SIMULATED EMAIL] OTP for ${user.email} is ${otp}`);

            return res.json({ requiresOTP: true, message: "OTP sent to email", tempOTP_for_testing: otp });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error during login", error: error.message });
    }
};

// VERIFY OTP
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.otp === otp && user.otpExpiry > Date.now()) {
            // Clear OTP
            user.otp = undefined;
            user.otpExpiry = undefined;
            await user.save();

            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.json({ message: "OTP verified successfully", token, user: { id: user._id, name: user.name, email: user.email } });
        } else {
            res.status(400).json({ message: "Invalid or expired OTP" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error verifying OTP", error: error.message });
    }
};

// ENABLE 2FA
export const enable2FA = async (req, res) => {
    try {
        // req.user comes from authMiddleware
        const user = await User.findById(req.user);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.is2FAEnabled = true;
        await user.save();

        res.json({ message: "2FA enabled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error enabling 2FA", error: error.message });
    }
};
