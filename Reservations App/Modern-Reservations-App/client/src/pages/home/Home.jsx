import React from "react";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/featured";
import Propertylist from "../../components/propertylist/propertylist";
import Featuredproperties from '../../components/featuredproperties/fproperties';
import MailList from '../../components/maillist/maillist';
import Footer from '../../components/footer/footer';

const Home = () => {
  return (
    <>
      <div>
        <Navbar />
        <Header />

        <div className="homecontainer">
          <Featured />


          <h1 className="hometitle">Browse by property type</h1>

          <Propertylist/>

          <h1 className="hometitle">Home guests love</h1>

          <Featuredproperties/>

          <MailList/>

          <Footer/>
          


          

        </div>
      </div>
    </>
  );
};

export default Home;
