import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ForgotPassword from '../forgot_password/ForgotPassword'
import Login from '../login/Login'
import Registration from '../registration/Registration'

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
            <Switch>
                <Route path={'/'} component={Login} exact>
                    <Login/>
                </Route>
                <Route path={'/registration'} component={Registration}>
                    <Registration/>
                </Route>
                <Route path={'/forgot-password'} component={ForgotPassword}/>
            </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes
