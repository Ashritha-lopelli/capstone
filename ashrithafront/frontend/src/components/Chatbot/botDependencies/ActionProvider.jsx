import React from 'react';
import gptHandler from '../../../utils/gptHandler';
const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  // const handleMessage = () => {
  //   const botMessage = createChatBotMessage('Hello. Nice to meet you.');

  //   setState((prev) => ({
  //     ...prev,
  //     messages: [...prev.messages, botMessage],
  //   }));
  // };
  const handleMessage = async (message) => {
    try {
      const botMessage = await gptHandler(message);
      const replyMessage = createChatBotMessage(botMessage);

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, replyMessage],
      }));
    } catch (error) {
      const errorMessage = "We are encountering some technical issues. Please try again in a moment!"
      console.error('Error while processing the message:', error);
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };
  
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleMessage,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;