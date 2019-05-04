import React, { Component } from 'react';
import "./thoughtBubble.css";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ThoughtBubble extends Component {


    render() {
        let thoughtBubble = (<div className="thought-bubble">
            {this.props.children}
        </div>);
        return (
            <ReactCSSTransitionGroup
                transitionName="button"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                {thoughtBubble}
            </ReactCSSTransitionGroup>
        )
    }
}

export default ThoughtBubble;