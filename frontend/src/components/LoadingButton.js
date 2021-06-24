import React from 'react'
import {Button,Spinner} from 'react-bootstrap'

const LoadingButton = ({children,variant}) => {
    return (
        <Button className='my-3 p-2' variant={variant} disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
       {children}
      </Button>
    )
}

LoadingButton.defaultProps ={
    variant: 'danger'
}

export default LoadingButton
