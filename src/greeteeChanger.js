import React from 'react';

export default function GreeteeChanger (probs) {
    return (
        <input
            type="text"
            onChange = {
                e => probs.changeGreetee( e.target.value )
            }
        />

    );
}
