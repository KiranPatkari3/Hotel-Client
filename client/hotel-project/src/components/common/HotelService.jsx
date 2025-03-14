import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import Header from "./Header"
import {
    FaClock,
    FaCocktail,
    FaParking,
    FaSnowflake,
    FaTshirt,
    FaUtensils,
    FaWifi
} from "react-icons/fa"
import './HotelService.css' // Import the custom CSS file

const HotelService = () => {
    return (
        <Container className="hotel-service-container">
            <Header title={"Our Services"} />

            <Row className="mt-4">
                <h4 className="text-center service-title">
                    Services at <span className="hotel-color">lakeSide - </span>Hotel
                </h4>
            </Row>
            <hr />

            <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                <Col>
                    <Card className="service-card">
                        <Card.Body>
                            <Card.Title className="hotel-color">
                                <FaWifi /> WiFi
                            </Card.Title>
                            <Card.Text>Stay connected with high-speed internet access.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="service-card">
                        <Card.Body>
                            <Card.Title className="hotel-color">
                                <FaUtensils /> Breakfast
                            </Card.Title>
                            <Card.Text>Start your day with a delicious breakfast buffet.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="service-card">
                        <Card.Body>
                            <Card.Title className="hotel-color">
                                <FaTshirt /> Laundry
                            </Card.Title>
                            <Card.Text>Keep your clothes clean and fresh with our laundry service.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="service-card">
                        <Card.Body>
                            <Card.Title className="hotel-color">
                                <FaCocktail /> Mini-bar
                            </Card.Title>
                            <Card.Text>Enjoy a refreshing drink or snack from our in-room mini-bar.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="service-card">
                        <Card.Body>
                            <Card.Title className="hotel-color">
                                <FaParking /> Parking
                            </Card.Title>
                            <Card.Text>Park your car conveniently in our on-site parking lot.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="service-card">
                        <Card.Body>
                            <Card.Title className="hotel-color">
                                <FaSnowflake /> Air conditioning
                            </Card.Title>
                            <Card.Text>Stay cool and comfortable with our air conditioning system.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <hr />
        </Container>
    )
}

export default HotelService
