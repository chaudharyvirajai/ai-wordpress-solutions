require('dotenv').config({path: '../../.env'});
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow requests from browser
app.use(express.json());

const apiKey = process.env.OPENROUTER_API_KEY;

const context = `
Remote work has transformed the global workforce... [use your full longText here]
`;

app.post('/ask', async (req, res) => {
  const userQuestion = req.body.question;

  const prompt = `
You are an AI assistant. Only use the following information to answer:

"""
${context}
"""

Question: ${userQuestion}
If the answer is not in the text, say: "Sorry, I don't have enough information. Please email or call for more details."
`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'anthropic/claude-3.7-sonnet',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const answer = response.data.choices[0].message.content;
    res.json({ reply: answer });
  } catch (err) {
    console.error('❌ API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
