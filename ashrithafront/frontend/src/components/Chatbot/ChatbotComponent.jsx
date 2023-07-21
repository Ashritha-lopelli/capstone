import React, { useState } from 'react';
import { Chatbot, Message } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css'
import './chatbot.css';

import config from './botDependencies/config'
import MessageParser from './botDependencies/MessageParser';
import ActionProvider from './botDependencies/ActionProvider';

const ChatbotComponent = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot((prevShowChatbot) => !prevShowChatbot);
  };

  return (
    <div>
      {showChatbot && (
        <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        />
      )}

      <button className="chatbot-button" onClick={toggleChatbot}/>
    </div>
  );
};

export default ChatbotComponent;
