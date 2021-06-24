import React, { useEffect } from 'react'
import {Row,Col,Card} from 'react-bootstrap'
import "react-multi-carousel/lib/styles.css";
import { getCategories } from '../actions/productActions'
import {Link} from 'react-router-dom'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {useDispatch, useSelector} from 'react-redux'
import Loader from './Loader'
import AlertMessage from './AlertMessage'

const Categories = () => {

    const dispatch = useDispatch()
    const {loading,categories,error} = useSelector(state=> state.categories)

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 4 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          slidesToSlide: 2// optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 550, min: 0 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        },
        small:{
          breakpoint:{max : 315, min: 0},
          items:1,
          slidesToSlide:1
        }
      };
    
   
    useEffect(()=>{
       dispatch(getCategories()) 
    },[dispatch])

    return (
        <>
        <h2 className="text-center my-3">Brands</h2>
        
        <Row className='my-3'>
            {loading? <Loader/> : error? <AlertMessage>{error}</AlertMessage> :

            <Carousel
            additionalTransfrom={0}
             swipeable={true}
            draggable={true}
            showDots={true}
            ssr={true}
            responsive={responsive}
            infinite={false}
            autoPlay={false}
            keyBoardControl={true}
            containerClass="carousel-container"
            sliderClass=""
            >
            {categories.map(el=>  (
                
                <Col className="d-flex align-items-stretch" key={el.brand} md={10} sm={12}>
                <Card className='my-4 p-2'>
                <Link className='link' to={`/brands/${el.brand}`}> 
                        <Card.Img className='card-image' src={el.image} />
                </Link>
                        <Card.Body>
                            <Card.Title className='text-center'>
                                <Link className='link' to={`/brands/${el.brand}`}> 
                                {el.brand}
                                </Link>
                               
                                </Card.Title>
                        </Card.Body>
                         </Card>
                </Col>
            
            ) )
           }
            </Carousel>
           }
        </Row>
        
        </>
    )
}

export default Categories
