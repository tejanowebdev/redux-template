import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../shared/Header';
import { Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ContactUs() { 

    return (
        <div>
            <Header/>
            <Container>
                <Row className="text-center text-white align-items-center" style={{height: "90vh"}}>
                    <Col>
                        <h1>Contact Us</h1>
                        <p>coming soon...</p>
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}

export default ContactUs
