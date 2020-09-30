import React, { useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Styles from '../routes/snackBar.module.css'
import ProtectedRoute from '../config/ProtectedRoute'
import DashBoard from '../dash_board/DashBoard'
import config from '../config/config'
import Login from '../login/Login'
import Registration from '../registration/Registration'
import SendEmail from '../send_email/SendEmail'
import ResetPassword from '../reset_password/ResetPassword'

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
                <Route path={'/login'} exact>
                    <Login openSnackBar={openSnackBar}/>
                </Route>
                <Route path={'/registration'}>
                    <Registration openSnackBar={openSnackBar}/>
                </Route>
                <Route path={'/send-email'}>
                    <SendEmail openSnackBar={openSnackBar}/>
                </Route>
                <Route path={'/resetpassword/:token'}>
                    <ResetPassword openSnackBar={openSnackBar}/>
                </Route>
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
