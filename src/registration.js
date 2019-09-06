import React from 'react';
import axios from './axios';
import { Link} from 'react-router-dom';

export default class Registration extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
    }

    handleChange (e) {
        // console.log("e.target.name: ", e.target.name);
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    register (e) {
        e.preventDefault();
        console.log("this.state: ", this.state);
        const user = {
            name : this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            password: this.state.password
        };
        // console.log(name, surname, email, password);
        console.log('user: ', user);
        axios
            .post('/register', user)
            .then(function(res) {
                console.log('/register, data of registered user: ', res.data);
                location.replace("/welcome#/login");
            })
            .catch(function(err){
                console.log('/register axios error: ', err);
            });
    }

    render(){
        return (
            <div>
                <form>
                    <label>Name:</label>
                    <input
                        type="text"
                        autoComplete="name"
                        name="name"
                        placeholder="name"
                        onChange={ this.handleChange }
                    />

                    <label>Surname:</label>
                    <input
                        type="text"
                        autoComplete="surname"
                        name="surname"
                        placeholder="surname"
                        onChange={ this.handleChange }
                    />

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
                        onClick={ this.register }
                    >Register</button>
                </form>
                <p>Already a member? <Link to="/login"> Login </Link></p>
            </div>
        );
    }
}
