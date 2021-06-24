import React from 'react'
import {Button, Col, Row} from 'react-bootstrap'


const ErrorScreen = ({history}) => {
    return (
        <div className='py-5 bg-light my-5'>
            <Row className='text-center p-4'>
            <h1 className='text-danger'><i className="fas fa-exclamation-circle"></i> 404 Not found</h1>
             <p>Page you have requested doesnot exist</p>
             <Col className='d-flex justify-content-center'>
                 <Button variant='outline-danger' onClick={()=> history.push('/')}>Go Back</Button></Col>
             
         </Row>
           </div>
    )
}

export default ErrorScreen
