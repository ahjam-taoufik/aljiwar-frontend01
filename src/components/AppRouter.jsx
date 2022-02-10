import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useLocation } from "react-router-dom";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import NotfoundPage from "../pages/NotfoundPage";
import Profilepage from "../pages/Profilepage";
import ProtectedPage from "../pages/ProtectedPage";
import Registerpage from "../pages/Registerpage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import { useAuth } from "./../contexts/AuthContext";

export default function AppRouter(props) {

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <ProtectedRoute exact path="/login" component={Loginpage} />
          <ProtectedRoute exact path="/register" component={Registerpage} />
          <ProtectedRoute exact path="/profile" component={Profilepage} />
          <ProtectedRouteAdmin exact path="/protected-page" component={ProtectedPage} />
          <ProtectedRoute exact path="/forgot-password" component={ForgotPasswordPage} />
          <ProtectedRoute exact path="/reset-password" component={ResetPasswordPage} />
          <Route exact path="*" component={NotfoundPage} />
        </Switch>
      </Router>
    </>
  );
}

function ProtectedRoute(props) {
  const { currentUser } = useAuth();
  const { path } = props;
  const location=useLocation()
  
  if(
    path==='/login' ||
    path==='/register' ||
    path==='/forgot-password' ||
    path==='/reset-password' 
  ){
    return currentUser ? (
         <Redirect to={location.state?.from ?? '/profile'}/>
    ):(
       <Route {...props} />
    )
  }
  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: path },
      }}
    />
  );
}




function ProtectedRouteAdmin(props) {
  const { userInformation } = useAuth();
  const { path } = props;
  const location=useLocation()
  //console.log(currentUser);
  //console.log(userInformation.role);


  if(path==='/protected-page' ){
    // console.log('okok',userInfo);
       //console.log('okok2',currentUser);

    return userInformation?.role!=='admin'? (
         <Redirect to={location.state?.from ?? '/'}/>
    ):(
       <Route {...props} />
    )
  }


  return userInformation?.role==='admin'? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: path },
      }}
    />
  );
}
