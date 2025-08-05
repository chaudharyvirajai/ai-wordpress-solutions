require('dotenv').config({ path: '../.env' });

const apiKey = process.env.OPENROUTER_API_KEY;
console.log("Key is:", apiKey);