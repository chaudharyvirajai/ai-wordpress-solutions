// openrouter-test.js

require('dotenv').config({ path: '../.env' }); // Load .env variables
const axios = require('axios');

// Get API key from environment
const apiKey = process.env.OPENROUTER_API_KEY;

if (!apiKey) {
    console.error("❌ OPENROUTER_API_KEY is missing from .env");
    process.exit(1);
}
// conts
const longText = `
Remote work has transformed the global workforce in recent years, offering a wide range of benefits for both employees and employers. One of the most significant advantages is flexibility. Employees are no longer restricted by geographical boundaries and can tailor their work schedules to align with their peak productivity hours. This leads to better work-life balance, reduced commuting stress, and increased job satisfaction. With remote work, individuals can reclaim hours previously lost in traffic, which they can now spend with family or on personal interests.

Companies also benefit financially by saving on operational costs such as rent, electricity, and office supplies. Many organizations have reported increased productivity due to fewer in-office distractions and better employee morale. Moreover, businesses can tap into a global talent pool, hiring skilled professionals from anywhere in the world. This diversity can lead to more creative solutions and innovative thinking.

Environmentally, remote work helps reduce the carbon footprint. With fewer people commuting and less office space being used, there is a noticeable drop in greenhouse gas emissions. It supports sustainable development goals and encourages a greener way of working.

However, remote work is not without challenges. Communication gaps can occur, especially across different time zones. Employees may feel isolated without the social interactions of an office environment. To counter this, companies must invest in strong digital infrastructure and foster a culture of communication and inclusion.

In conclusion, while remote work comes with certain hurdles, its advantages far outweigh the drawbacks when managed correctly. It promotes flexibility, cost-efficiency, global talent access, and sustainability. As technology continues to evolve, the remote work model is expected to become a long-term norm rather than a temporary trend.
`;

const prompt = `
Summarize the following article in around 10 words. Keep the summary clear, informative, and suitable for someone looking to understand the key points quickly:

""" 
${longText}
"""
`;

// conts
// Make a request to OpenRouter API
async function callOpenRouter() {
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'openai/gpt-4.1-mini',
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                max_tokens: 500 // 👈 limit to 500 tokens or less
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const reply = response.data.choices[0].message.content;
        console.log('🤖 AI Reply:', reply);
    } catch (error) {
        console.error('❌ Error calling OpenRouter:', error.response?.data || error.message);
    }
}

callOpenRouter();
