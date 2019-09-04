import React from 'react';
import Greetee from './greetee';
import GreeteeChanger from './greeteeChanger';

export default class Hello extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            greetee : this.props.greetee
        };
    }

    changeGreetee(greetee){
        this.setState({
            greetee : greetee
        });
    }

    render () {
        const isGoodDay = true;
        return (
            <div style={{
                color: this.props.color,
                fontSize: '30px'
            }}>
				Hello <Greetee greetee = {this.state.greetee}/>!
                <ul>
                    <li>Batman</li>
                    <li>Hello Kitty!!!</li>
                    <li>{
                        Math.random >= .5 ?
                            <span>Leonardo DiCaprio</span> :
                            <span>Jennifer Lawrence</span>
                    }</li>
                </ul>
                <p>
                    {isGoodDay && <span>Today, whether is good!!!</span>}
                </p>
                <GreeteeChanger changeGreetee={ greetee => this.changeGreetee(greetee)}/>
            </div>
        );
    }
}
