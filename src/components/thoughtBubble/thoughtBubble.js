import React, { Component } from 'react';
import "./thoughtBubble.css";

class ThoughtBubble extends Component {


    render() {
        return (
            <div className="thought-bubble">
                {this.props.children}
            </div>
        )
    }
}

export default ThoughtBubble;