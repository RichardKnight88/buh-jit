/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Container, Card, Col, Row } from 'react-bootstrap'
import dashboardScreenshot from '../images/dashboardScreenshot.png'
import Register from './auth/Register'

const Home = () => {

  const screenshot = dashboardScreenshot

  return (

    <Container className="homeAlignment">
      <Row>
        <Col sm={10} lg={7}>
          <Card className="screenshotCard">
            <Card.Header as="h2">Need a budgeting App?</Card.Header>
            <Card.Body>
              <Card.Img variant="top" src={screenshot} alt="dashboard screenshot" />
              <Card.Title as="h4">Keeping track of your finances is the first step to financial freedom</Card.Title>
              <Card.Text>
                So sign up and let's Buh Jit!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={7} lg={5}>
          <Register />
        </Col>


      </Row>
    </Container>

  )
}
export default Home