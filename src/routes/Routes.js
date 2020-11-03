import React, { useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Styles from '../routes/snackBar.module.css'
import ProtectedRoute from '../config/ProtectedRoute'
import DashBoard from '../components/dash_board/DashBoard'
import config from '../config/config'
import Login from '../pages/login/Login'
import Registration from '../pages/registration/Registration'
import SendEmail from '../pages/send_email/SendEmail'
import ResetPassword from '../pages/reset_password/ResetPassword'
import UserAuthorization from '../pages/user_authorization/UserAuthorization'

const Routes = () => {
    const [state, setState] = useState({ isActive: false, status: ''})
    const { isAuthenticated } = config();

    const openSnackBar = (data) =>{
        setState({status: data, isActive: true})
        setTimeout(()=>{
            setState({status: '', isActive: false})
        },3000)
    }
    return (
        <div>
            <BrowserRouter>
            <Switch>
                <Redirect path='/' exact to={'/dash-board'}/>
                <ProtectedRoute exact path="/dash-board" component={DashBoard} isAuthenticated={isAuthenticated}/>
                <Route exact path='/login'
                    component={(props)=> <Login openSnackBar={openSnackBar} {...props}/>}/>
                <Route path={'/registration'}>
                    <Registration openSnackBar={openSnackBar}/>
                </Route>
                <Route path={'/send-email'}>
                    <SendEmail openSnackBar={openSnackBar}/>
                </Route>
                <Route path={'/resetpassword/:token'}>
                    <ResetPassword openSnackBar={openSnackBar}/>
                </Route>
                <Route path={'/home'} component={UserAuthorization}/>
            </Switch>
            </BrowserRouter>
            <div className={
                state.isActive?
                [Styles.snackbar, Styles.show].join(" ")
                : Styles.snackbar
            }>
                {state.status}
            </div>
        </div>
    )
}

export default Routes
