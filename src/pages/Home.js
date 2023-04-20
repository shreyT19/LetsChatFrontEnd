import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import chattingImage from "../assets/chattingImage.jpg";
import { Link } from "react-router-dom";

function Home() {
  return (
    // <Row>
    //   <Col
    //     md={6}
    //     className="d-flex flex-direction-column align-items-center justify-content-center"
    //   >
    //     <div>
    //       <h1>Share the world with your friends</h1>
    //       <p>Chat App lets you connect with the world</p>
    //       <LinkContainer to="/chat">
    //         <Button variant="success">
    //           Get Started <i className="fas fa-comments home-message-icon"></i>
    //         </Button>
    //       </LinkContainer>
    //     </div>
    //   </Col>
    //   <Col md={6} className="home__bg"></Col>
    // </Row>
    <div className=" home">
      <div className="flex flex-col flex-1 items-center  justify-center px-4 gap-10">
        <h1 className="heading">Connect with the world!!</h1>
        <Link to="/chat">
          <button className="text-slate-50 text-xl bg-[#198754] w-fit  px-6 py-4 rounded-lg">
            Let's Connect <i className="fas fa-comments home-message-icon"></i>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
