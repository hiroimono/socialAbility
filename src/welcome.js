import React from 'react';
import Registration from './registration';
import Login from './login';
import { HashRouter, Route, Link } from 'react-router-dom';

function Welcome() {
    return (
        <div>
            <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src="/assets/go.svg" width="112" height="28"/>
                    </a>

                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true">Home</span>
                        <span aria-hidden="true">Documentation</span>
                        <span aria-hidden="true">More</span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item">
                            Home
                        </a>

                        <a className="navbar-item">
                            Documentation
                        </a>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                More
                            </a>

                            <div className="navbar-dropdown">
                                <a className="navbar-item">
                                    About
                                </a>
                                <a className="navbar-item">
                                    Jobs
                                </a>
                                <a className="navbar-item">
                                    Contact
                                </a>
                                <hr className="navbar-divider"/>
                                <a className="navbar-item">
                                    Report an issue
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary">
                                    <strong></strong>
                                </a>
                                <a className="button is-light">
                                    <Link to="/login"> Login </Link>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <HashRouter>
                <h1>Welcome to <img src="/assets/go.svg" width="400" height="100"/></h1>
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
