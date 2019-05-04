import React, { Component } from 'react';
import "./actionBox.css";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ActionBox extends Component {


    render() {
        let actionBox = (<div className="action-box" onClick={() => this.props.click()}>
            {this.props.children}
        </div>);
        return (
            <ReactCSSTransitionGroup
                transitionName="button"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                {actionBox}
            </ReactCSSTransitionGroup>
        )
    }
}

export default ActionBox;