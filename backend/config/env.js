// This module MUST be the very first import in server.js
// ES module imports are hoisted, so dotenv.config() placed between
// imports in server.js runs AFTER all modules are loaded.
// Putting it here guarantees it runs before passport.js reads process.env.
import dotenv from 'dotenv';
dotenv.config();
