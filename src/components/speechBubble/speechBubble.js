import React, { Component } from 'react';
import "./speechBubble.css";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class SpeechBubble extends Component {


    render() {

        let speechBubble = (<div className={`speech-bubble ${this.props.right ? "speech-bubble-right" : null}`}>
            {this.props.children}
        </div>);

        return (
            <div className={`speech-bubble-container ${this.props.right ? "speech-bubble-container-right" : null}`}>
                <ReactCSSTransitionGroup
                    transitionName="button"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {speechBubble}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default SpeechBubble;