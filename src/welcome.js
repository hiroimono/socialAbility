import React from 'react';
import Registration from './registration';
import Login from './login';
import { HashRouter, Route } from 'react-router-dom';

function Welcome() {
    return (
        <div>
            <HashRouter>
                <h1>Welcome to!</h1>
                <p><img src="/assets/logo.png" width="700px" height="200px"/></p>
                <div>
                    <Route exact path="/" component={Registration}/>
                    <Route path="/login" component={Login}/>
                </div>

            </HashRouter>
        </div>
    );
}

export default Welcome;
// <div>
//     <Route exact path="/" component={Registration}/>
//     <Route exact path="/login" component={Login}/>
//     <Route component={Registration} />
// </div>
