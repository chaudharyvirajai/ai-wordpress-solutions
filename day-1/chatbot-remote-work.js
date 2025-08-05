// chatbot-remote-work.js

require('dotenv').config({path: '../.env'});
const axios = require('axios');
const readline = require('readline');

// Define the knowledge source
const longText = `
Remote work has transformed the global workforce in recent years, offering a wide range of benefits for both employees and employers. One of the most significant advantages is flexibility. Employees are no longer restricted by geographical boundaries and can tailor their work schedules to align with their peak productivity hours. This leads to better work-life balance, reduced commuting stress, and increased job satisfaction. With remote work, individuals can reclaim hours previously lost in traffic, which they can now spend with family or on personal interests.

Companies also benefit financially by saving on operational costs such as rent, electricity, and office supplies. Many organizations have reported increased productivity due to fewer in-office distractions and better employee morale. Moreover, businesses can tap into a global talent pool, hiring skilled professionals from anywhere in the world. This diversity can lead to more creative solutions and innovative thinking.

Environmentally, remote work helps reduce the carbon footprint. With fewer people commuting and less office space being used, there is a noticeable drop in greenhouse gas emissions. It supports sustainable development goals and encourages a greener way of working.

However, remote work is not without challenges. Communication gaps can occur, especially across different time zones. Employees may feel isolated without the social interactions of an office environment. To counter this, companies must invest in strong digital infrastructure and foster a culture of communication and inclusion.

In conclusion, while remote work comes with certain hurdles, its advantages far outweigh the drawbacks when managed correctly. It promotes flexibility, cost-efficiency, global talent access, and sustainability. As technology continues to evolve, the remote work model is expected to become a long-term norm rather than a temporary trend.
`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion() {
  rl.question('❓ Ask the AI (about remote work only): ', async (userInput) => {
    const prompt = `
You are an AI assistant. Only use the information provided below to answer the user's question. If the answer is not present in the text, respond with: 
"Sorry, I don’t have enough information to answer that. You can email or call us for more details."

TEXT:
"""
${longText}
"""

Question: ${userInput}
`;

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model:"perplexity/sonar",
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 700,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const reply = response.data.choices[0].message.content;
      console.log('🤖 AI:', reply);
    } catch (err) {
      console.error('❌ Error:', err.response?.data || err.message);
    }

    askQuestion(); // Loop again
  });
}

askQuestion();
