import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ForgotPassword from '../forgot_password/ForgotPassword'
import Login from '../login/Login'
import Registration from '../registration/Registration'
import Styles from '../routes/snackBar.module.css'

const Routes = () => {
    const [state, setState] = useState({ isActive: false, status: ''})

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
                <Route path={'/'} component={Login} exact>
                    <Login openSnackBar={openSnackBar}/>
                </Route>
                <Route path={'/registration'} component={Registration}>
                    <Registration openSnackBar={openSnackBar}/>
                </Route>
                <Route path={'/forgot-password'} component={ForgotPassword}/>
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
