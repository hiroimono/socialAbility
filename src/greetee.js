import React from 'react';

export default function Greetee (probs){
    return (
        <span>{ probs.greetee || 'Hello!' }</span>
    );
}
