import React        from 'react';
import ReactDOM     from 'react-dom';
import App          from './app';
import Welcome      from './welcome';

var elem;

if (location.pathname === '/welcome'){
    //if user is on it means user not LOGGED IN
    elem = <Welcome />;
} else {
    //this means user logged in
    elem = <App />;
}
//or
// location.pathname === '/welcome' ? elem = <Hello /> : elem = <p>This is my LOGO!!</p> ;
ReactDOM.render(
    elem,
    document.querySelector('main')
);
