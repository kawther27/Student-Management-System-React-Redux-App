import React from 'react'
import {useSelector} from "react-redux"
import {Navigate,Outlet} from "react-router-dom"

const NonProtectedRoute = () => {
    const token = useSelector((state) => state.auth.token);
    return(
        token ? <Navigate to="/" />: <Outlet/> 
    )
}

export default NonProtectedRoute;
