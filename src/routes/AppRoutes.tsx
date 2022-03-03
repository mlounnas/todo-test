import React from "react";
import { Route } from "react-router-dom";

 
 
const AppRoutes : React.FC<{component : any,path : string, isPrivate : boolean}> = ({ component: Component, path, isPrivate, ...rest }) => {
 
    return (
        <Route
            path={path}
            render={(props : any) =>
               
                        <Component {...props} />
                    
            }
            {...rest}
        />
    )
}
export default AppRoutes