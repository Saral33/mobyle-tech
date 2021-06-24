import React from 'react'
import {Carousel,Row,Col,Image} from 'react-bootstrap'
import Samsung from '../Images/samsung.jpg'
import iphone from '../Images/MI.jpg'
import iphoneX from '../Images/iphonepsoter.png'
import MI from '../Images/Xiaomi.png'
import Vivo from '../Images/vivo.jpg'

const ProductCarousel = () => {

      return(
        <Row className='my-2 ads'>
          <Col md={8}>
          <Carousel>
        <Carousel.Item>
            <img src={Vivo} alt='poster'/>
          </Carousel.Item>
          <Carousel.Item>
            <img src={Samsung} alt='poster'/>
          </Carousel.Item>
          <Carousel.Item>
            <img src={iphone} alt='poster'/>
          </Carousel.Item>
          <Carousel.Item>
            <img src={MI} alt='poster'/>
          </Carousel.Item>
        
        </Carousel>
        </Col>
        <Col md={4}>
          <Image src = {iphoneX} alt='poster' fluid/>
        </Col>
        </Row>
      )
}

export default ProductCarousel
