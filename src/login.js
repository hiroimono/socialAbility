import React from 'react';
import axios from './axios';
import { Link} from 'react-router-dom';

export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange (e) {
        console.log("e.target.name: ", e.target.name);
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    login (e) {
        // console.log('This is login button!!!');
        e.preventDefault();
        console.log("this.state: ", this.state);
        const userLoginInfo = {
            email: this.state.email,
            password: this.state.password
        };
        // console.log(name, surname, email, password);
        console.log('user: ', userLoginInfo);
        axios
            .post('/login', userLoginInfo)
            .then(function(res) {
                console.log('/login, data of loggedin user: ', res.data);
                location.replace("/");
            })
            .catch(function(err){
                console.log('/login axios error: ', err);
            });
    }


    render(){
        return (
            <div>
                <form>
                    <label>E-mail:</label>
                    <input
                        type="email"
                        autoComplete="email"
                        name="email"
                        placeholder="email"
                        onChange={ this.handleChange }
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        autoComplete="current-password"
                        name="password"
                        placeholder="password"
                        onChange={ this.handleChange }
                    />
                    <button
                        onClick={ this.login }
                    >Login</button>
                </form>
                <p>Have not you registered yet? <Link to="/"> Register </Link></p>
            </div>
        );
    }
}
