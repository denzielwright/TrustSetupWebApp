// ai/aiAssistant.js

const axios = require('axios');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

async function generateAIResponse(userInput, context = []) {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4', // or 'gpt-3.5-turbo' if you're using that
        messages: [
          ...context,
          { role: 'user', content: userInput }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    return reply;
  } catch (error) {
    console.error('AI Assistant Error:', error.response?.data || error.message);
    throw new Error('Failed to generate AI response');
  }
}

module.exports = { generateAIResponse };
