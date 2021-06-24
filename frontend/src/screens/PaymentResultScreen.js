import React from 'react'
import {Row,Col,Button} from 'react-bootstrap'

const PaymentResultScreen = ({history,location}) => {

    const result = location.search.split('=')[1]

    return (
        
        <div className='py-5 bg-light my-5'>
        <Row className='text-center p-4'>
            {result === 'true'? <> <h1 className='text-success'><i className="far fa-check-circle"></i> Payment Successful</h1>
            <p>Your order is being processed and you will get email soon .Thank You for choosing Mobyle Tech Shop.</p>
            <p>You can also view your transaction history.</p>
           <Row>
            <Col md={12}>
         <Button variant='outline-danger' onClick={()=> history.push('/')}>Shop More</Button>
         <Button className='mx-3' variant='outline-success' onClick={()=> history.push('/transactions')}>View Transactions</Button>
             </Col>
             </Row>
             <h4 className='mt-3'>&ldquo; Development is in you &rdquo;</h4>
             </>
             
            : 
            <>
            <h1 className='text-danger'><i className="far fa-times-circle"></i> Order Canceled</h1>
        <p>You have canceled your order. Maybe you needed to edit your purchase.
            You can come back any time soon. 
        </p>
         <Col className='d-flex justify-content-center'>
             <Button variant='outline-danger' onClick={()=> history.push('/cart')}>Go Back</Button></Col>
            </> 
            }
       
         
     </Row>
       </div>
    )
}

export default PaymentResultScreen
