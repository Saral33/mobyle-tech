import React from 'react'
import {Spinner} from 'react-bootstrap'

const Loader = ({variant}) => {
    return (
        <>
           <Spinner animation="border" variant={variant} style={{width:'100px',height:'100px',display:'block',margin:'auto'}}  > 
           <span className="sr-only">Loading...</span>
           </Spinner>
        </>
    )
}


Loader.defaultProps ={
    variant : 'dark'
}

export default Loader
