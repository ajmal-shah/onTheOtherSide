import React, { Component } from 'react';
import "./healthBox.css";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { MDBProgress } from 'mdbreact';

class HealthBox extends Component {
    componentWillMount(){
        if(this.props.johnValue){
            window.johnValue = window.johnValue - 20;
        }
        if(this.props.karenValue){
            window.karenValue = window.karenValue - 20;
        }
        if(this.props.socialAcceptance){
            window.socialAcceptance = window.socialAcceptance - 20;
        }
    }

    render() {
        let health = (<div>
            <div className="text-area">
                {this.props.text}
            </div>
            <div className="health-area">
                <div className="meter-container">
                    <div className="meter-label">
                        Your Composure
                </div>
                    <div className="health-bar">
                        <MDBProgress value={window.johnValue} height="12px" className="health-bar-custom" />
                    </div>
                </div>
                <div className="meter-container">
                    <div className="meter-label">
                        Karen's Composure
                </div>
                    <div className="health-bar">
                        <MDBProgress value={window.karenValue} height="12px" className="health-bar-custom" />
                    </div>
                </div>
                <div className="meter-container">
                    <div className="meter-label">
                        Social Acceptance
                </div>
                    <div className="health-bar">
                        <MDBProgress value={window.socialAcceptance} height="12px" className="health-bar-custom" />
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