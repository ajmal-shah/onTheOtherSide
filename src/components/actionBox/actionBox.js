import React, { Component } from 'react';
import "./actionBox.css";

class ActionBox extends Component {


    render() {
        return (
            <div className="action-box">
                {this.props.children}
            </div>
        )
    }
}

export default ActionBox;