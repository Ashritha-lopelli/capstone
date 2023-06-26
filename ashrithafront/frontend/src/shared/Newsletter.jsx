import React from 'react'
import './newsletter.css'
import { Container, Row, Col } from 'reactstrap'
import maleTourist from '../assets/images/male-tourist.png'

const Newsletter = () => {
    return (
        <section className='newsletter'>
            <Container>
                <Row>
                    <Col>
                        <div className='newsletter_content'>
                            <h2>To get more useful traveling information Subscribe now! </h2>
                            <div className='newsletter-input'>
                                <input type="email" placeholder='Enter your email' />
                                <button className="btn newsletter__btn">Subscribe</button>
                            </div>
                            <p>
                                Moreover, the essence of travel resonates differently with each individual—some seek enlightenment, 
                                while others seek solace, all in pursuit of enriching experiences.</p>
                        </div>
                    </Col>
                    <Col lg='6'>
                        <div className="newsletter__img">
                            {/* <img src={maleTourist} alt="" /> */}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Newsletter