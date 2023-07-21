import axios from 'axios';

const gptHandler = async (message) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', 
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer <Replace with API key>'
        },
      }
    );

    const botResponse = response.data?.choices?.[0]?.message?.content;

    return botResponse;
  } catch (error) {
    console.error('Error while calling OpenAI API:', error);
    return 'We are encountering some technical difficulties. Please try again in a moment.';
  }
};

export default gptHandler