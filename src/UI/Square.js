import React from 'react';

function Square(props) {
    return (
        <button disabled={props.disabled || props.value} className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    )
}
export default Square;