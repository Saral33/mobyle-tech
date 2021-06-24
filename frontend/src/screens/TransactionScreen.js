import React, {  Fragment, useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getTransaction} from '../actions/cartActions'
import Loader from '../components/Loader'
import AlertMessage from '../components/AlertMessage'
import { Row, Table,Button } from 'react-bootstrap'

const TransactionScreen = () => {

    const {transactions, error, loading} = useSelector(state=> state.transactionState)
    const dispatch = useDispatch()
     useEffect(()=>{
         dispatch(getTransaction())
     },[dispatch])
    return (
        <div className='p-4'>
        <h2>Transaction History</h2>
        {loading? <Loader/> : error? <AlertMessage>{error}</AlertMessage>: transactions.length>0 ?
        <Row className='p-4'>
            <Table  bordered  responsive>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Address</th>
                     <th>Amount</th>
                    <th>Paid</th>
                    <th>Aprroved</th>
                    <th>Date</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {transactions.map(el=> (
                        <Fragment key={el._id}>
                            <tr>
                                <td>{el._id}</td>
                                <td>{el.address}</td>
                                <td>{el.totalamount}</td>
                                <td>{el.isPaid ? <i className="fas fa-check text-success"></i> : 
                                <i className="fas fa-times text-danger"></i>
                                }</td>
                                <td>{el.isApproved ? <i className="fas fa-check text-success"></i> : 
                                <i className="fas fa-times text-danger"></i>
                                }</td>
                                <td>{el.updatedAt.split('T')[0]}</td>
                                <td>
                                    <Button variant='outline-dark'><i className="far fa-eye"></i></Button>
                                </td>
                            </tr>
                        </Fragment>
                    ))}
                </tbody>
            </Table>
        </Row> :
        <AlertMessage>Your transactions are empty. You havenot ordered anything from this shop</AlertMessage>
        }
        </div>
    )
}

export default TransactionScreen
