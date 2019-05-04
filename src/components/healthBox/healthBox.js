import React, { Component } from 'react';
import "./healthBox.css";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { MDBProgress } from 'mdbreact';

class HealthBox extends Component {

    render() {
        let health = (<div>
            <div className="text-area">
                {this.props.text}
            </div>
            <div className="health-area">
                <div className="meter-container">
                    <div className="meter-label">
                        You
                </div>
                    <div className="health-bar">
                        <MDBProgress value={this.props.johnValue} height="12px" className="health-bar-custom" />
                    </div>
                </div>
                <div className="meter-container">
                    <div className="meter-label">
                        Karen
                </div>
                    <div className="health-bar">
                        <MDBProgress value={this.props.karenValue} height="12px" className="health-bar-custom" />
                    </div>
                </div>
                <div className="meter-container">
                    <div className="meter-label">
                        Social Acceptance
                </div>
                    <div className="health-bar">
                        <MDBProgress value={this.props.socialAcceptance} height="12px" className="health-bar-custom" />
                    </div>
                </div>
            </div>
            <div className="next-button-area">
                <div className="next-button" onClick={() => this.props.click()}>
                    Next
            </div>
            </div>
        </div>);
        return (
            <div className="health-box-container">
                <ReactCSSTransitionGroup
                    transitionName="scene"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {health}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default HealthBox;