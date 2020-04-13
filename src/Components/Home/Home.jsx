import React from "react";
import "./Home.css";
import Header from "../Header/Header";

// Antd
import { Carousel } from "antd";

const Home = () => {
  return (
    <div className="home">
      <Header />

        
      <Carousel effect="fade" autoplay autoplaySpeed="10"> 
        <div>
          <h3>FCT Project Manager</h3>
        </div>
        <div>
          <h3>Una gestión centralizada</h3>
        </div>
        <div>
          <h3>Tecnologias, Kanban y Evaluación</h3>
        </div>
        <div>
          <h3>Powered by DAW</h3>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
