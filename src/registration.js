import React from 'react';
import { HashRouter } from 'react-router-dom';

export default function Greetee (props){
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}>
            <h1>Welcome to!</h1>
            <p><img src="/assets/logo.png" width="700px" height="200px"/></p>
            <form style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <label>
                    <i className="fas fa-sign-in-alt"></i>
					Name:
                    <input
                        type="text"
                        autoComplete="name"
                        name="name"
                        placeholder="name"
                        onChange={ props.handleChange }
                    />
                </label>
                <label>
					Surname:
                    <input
                        type="text"
                        autoComplete="surname"
                        name="surname"
                        placeholder="surname"
                        onChange={ props.handleChange }
                    />
                </label>
                <label>
					E-mail:
                    <input
                        type="email"
                        autoComplete="email"
                        name="email"
                        placeholder="email"
                        onChange={ props.handleChange }
                    />
                </label>
                <label>
					Password:
                    <input
                        type="password"
                        autoComplete="current-password"
                        name="password"
                        placeholder="password"
                        onChange={ props.handleChange }
                    />
                </label>
                <button
                    onClick={ props.register }
                >Register</button>
            </form>
            <p>Already a memeber? <a href="/signin"> Sign in now!</a></p>
        </div>
    );
}
