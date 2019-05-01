import React, { Component } from 'react';
import "./actionBox.css";

class ActionBox extends Component {


    render() {
        return (
            <div className="action-box" onClick={() => this.props.click()}>
                {this.props.children}
            </div>
        )
    }
}

export default ActionBox;