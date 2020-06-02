import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
//import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
//import { Nav} from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap-theme.css';
import "./css/style.css";
import Image from "../images/innovation.png";
class Home extends Component {
  render() {
    var styleImage = {
      width: "700px",
      height: "400px",
    };

    return (
      <div id="wrap" className="">
        <br />
        <br />
        <div className="container align-items-center">
          <h1>Ideas Record Database</h1>
          <p>
            This App uses REST API to Create, Read, Update, Search and Delete
            <br /> UI based on React.
          </p>

          <img
            className="img-thumbnail"
            src={Image}
            alt="filing"
            style={styleImage}
          ></img>
        </div>
      </div>
    );
  }
}

export default Home;
