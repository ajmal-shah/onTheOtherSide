import React, { Component } from 'react';
import "./speechBubble.css";

class SpeechBubble extends Component {


    render() {

        return (
            <div className={`speech-bubble-container ${this.props.right ? "speech-bubble-container-right" : null}`}>
                <div className={`speech-bubble ${this.props.right ? "speech-bubble-right" : null}`}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default SpeechBubble;