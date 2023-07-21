import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  floating: true,
  initialMessages: [createChatBotMessage(`Hi! I'm Go Tour Bot! How can I help you today?`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#DB7093',
    },
    chatButton: {
        backgroundColor: '#DB7093',
      },
  },
  customComponents: {
  // Replaces the default header
  }
};

export default config;