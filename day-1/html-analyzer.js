// html-analyzer.js

require('dotenv').config({ path: '../.env' });
const axios = require('axios');

const apiKey = process.env.OPENROUTER_API_KEY;

const htmlCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test Page</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Welcome</h1>
  <img src="image.jpg">
  <script src="app.js"></script>
</body>
</html>
`;

const prompt = `
You are an expert in website optimization, SEO, and accessibility.

Please review the following HTML code and provide detailed suggestions to:
1. Improve page speed and performance
2. Enhance accessibility
3. Optimize SEO

Provide your response in clear bullet points.

"""
${htmlCode}
"""
`;

async function analyzeHTML() {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'anthropic/claude-3.7-sonnet',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 800
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("🔍 AI Suggestions:\n", response.data.choices[0].message.content);
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
}

analyzeHTML();
