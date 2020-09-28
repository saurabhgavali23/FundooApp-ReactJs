import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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
            </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes
