import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Home.css";
import hiring from "../assets/hiring.png";
import needJob from "../assets/needjob.jpg";

const Home = () => {
  return (
    <div>
      <Navbar className='bg-body-tertiary' sticky='top'>
        <Container>
          <Navbar.Brand href='/'>Online Job Portal</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>Designed by:Harsh vinayak</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Div>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant='top' src={hiring} />
          <Card.Body>
            <Card.Title>Hiring someone?</Card.Title>
            <Card.Text>
              If You are an Employer. Please click below to continue..
            </Card.Text>
            <Link to='/employer'>
              <Button variant='primary'>Employer</Button>
            </Link>
          </Card.Body>
        </Card>{" "}
        <Card style={{ width: "18rem" }}>
          <Card.Img variant='top' src={needJob} />
          <Card.Body>
            <Card.Title>Need a job?</Card.Title>
            <Card.Text>
              If you are searching for job or need a switch. click below to
              continue
            </Card.Text>
            <Link to='/seeker'>
              <Button variant='primary'>Seeker</Button>
            </Link>
          </Card.Body>
        </Card>
      </Div>
    </div>
  );
};

export default Home;

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  //   flex-direction: column;
  height: 90vh;
  color: red;
  justify-content: center;
  align-items: center;
`;
