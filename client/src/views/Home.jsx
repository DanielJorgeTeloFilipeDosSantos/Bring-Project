import React, { Component } from "react";
import people from "../assets/People.svg";
import Container from "react-bootstrap/Container";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default class HomeView extends Component {
  render() {
    return (
      <div>
        <Container>
          <img
            src={people}
            style={{ margin: "5vh", marginTop: "15vh" }}
            alt="Logo"
          />
        </Container>

        <Container>
          <h2>Help us give to who has less</h2>
        </Container>
        <Link to="/register">
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "2vh", marginTop: "4vh" }}
          >
            I have something to Donate
          </Button>
        </Link>
        <Container>
          <Button variant="contained" color="primary" style={{ margin: "2vh" }}>
            I want to do Volunteering
          </Button>
        </Container>
      </div>
    );
  }
}
