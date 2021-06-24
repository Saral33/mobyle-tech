import React from 'react'
import {Redirect,Route} from 'react-router-dom'
const PrivateRoute = ({component: Component, ...rest}) => {

    const isAuth = localStorage.getItem('authenticated') ? JSON.parse(localStorage.getItem('authenticated')) : false
    return (
        <Route
        {...rest}
        render={props =>
            isAuth ? (
                <Component {...props} {...rest} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {
                              from: props.location
                            }
                        }}
                    />
                )
            }
    />
    )
}

export default PrivateRoute
