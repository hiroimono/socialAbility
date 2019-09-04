import React from 'react';
import axios from 'axios';
import Registration from './registration';

export default class Welcome extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
    }

    handleChange(e){
        // console.log('handleChange is running!!!');
        // console.log("e.target.value: ", e.target.value);
        console.log("e.target.name: ", e.target.name);
        this.setState({
            [e.target.name]: e.target.value,
            registered : false
        }, () => console.log("welcome.js, this.state: ", this.state));
    }

    register(e){
        e.preventDefault();
        // console.log('handleChange is running!!!');
        // console.log("e.target.value: ", e.target.value);
        console.log("this.state: ", this.state);
        // let { name, surname, email, password} = this.state;
        // console.log('name, surname, email, password: ', name, surname, email, password);
        const user = {
            name : this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            password: this.state.password
        };

        console.log('user: ', user);
        axios
            .post('/register', user)
            .then(function(res) {
                console.log('/register, data of registered user: ', res.data);
                this.location.replace('/');
            })
            .catch(function(err){
                console.log('/register axios error: ', err);
            });
    }

    render () {
        return (
            <Registration handleChange={this.handleChange} register={this.register}/>
        );
    }
}
