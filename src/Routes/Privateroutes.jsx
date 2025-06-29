import React, { use } from 'react';
import { AuthContext } from '../Firebase/Context/AuthContext';
import { Navigate } from "react-router";
const Privateroutes = ({children}) => {
    const {user} = use(AuthContext);
   
       if(user && user?.email){
        return children
       }
       return <Navigate to="/login"></Navigate>;
};

export default Privateroutes;