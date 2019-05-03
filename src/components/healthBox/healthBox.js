import React, { Component } from 'react';
import "./healthBox.css";

import { MDBProgress } from 'mdbreact';

class HealthBox extends Component {

    render() {
        return (
            <div className="health-box-container">
                <div className="text-area">
                    Karen is upset that you have not done the morning routine. Karen's composure has gone down
                </div>
                <div className="health-area">
                    <div className="meter-container">
                        <div className="meter-label">
                            You
                        </div>
                        <div className="health-bar">
                            <MDBProgress value={80} height="12px" className="health-bar-custom" />
                        </div>
                    </div>
                    <div className="meter-container">
                        <div className="meter-label">
                            Karen
                        </div>
                        <div className="health-bar">
                            <MDBProgress value={80} height="12px" className="health-bar-custom" />
                        </div>
                    </div>
                    <div className="meter-container">
                        <div className="meter-label">
                            Social Acceptance
                        </div>
                        <div className="health-bar">
                            <MDBProgress value={100} height="12px" className="health-bar-custom" />
                        </div>
                    </div>
                </div>
                <div className="next-button-area">
                    <div className="next-button">
                        Next
                    </div>
                </div>
            </div>
        )
    }
}

export default HealthBox;