import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'


const ActivateAccountScreen = ({ match, history }) => {

    const id = match.params.id
    const token = match.params.token
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { pending } = useSelector(state => state.authState)
    const dispatch = useDispatch()

    useEffect(() => {

        const fetchApi = async () => {
            try {
                
                    setLoading(true)
                    const res = await axios.get(`/api/users/verify/${id}/${token}`)
                    setLoading(false)
                    setMessage(res.data.message)
                   
                }

            catch (error) {
                setLoading(false)
                setError(error.response && error.response.data.message ? error.response.data.message : error.message)
            }
        }
        if(pending){
            fetchApi()
        }
        else{
            history.push('/')
        }
       

    }, [id, token,history,pending,dispatch])
    return (
        <div className='py-5 bg-light my-5 text-center'>
            {loading ? <h3>Verifying......</h3> :
                error ? <>
                    <h3><i className="fas fa-times text-danger"></i> {error}</h3>
                    <Button variant='outline-success' onClick={() => history.push('/register')}>Register</Button>
                </> : message && <>
                    <h3><i className="fas fa-check text-success"></i> {message}</h3>
                    <Button variant='outline-success' onClick={() => history.push('/login')}>Login</Button>
                </>
            }
        </div>
    )
}

export default ActivateAccountScreen
