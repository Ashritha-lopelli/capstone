import React from 'react';
import Header from './../Header/Header';
import Routers from '../../router/Routers';
import Footer from './../Footer/Footer';
import ChatbotComponent from '../Chatbot/ChatbotComponent';
const Layout = () => {
  return (
    <>
      <Header/>
      <Routers/>
      <Footer/>
      <ChatbotComponent />
    </>
  )
}

export default Layout