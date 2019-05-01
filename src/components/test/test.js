import React, { Component } from 'react';
import "./test.css";

class TestComponent extends Component {

    vibrate = () => {
        console.log("Vibrate");
        navigator.vibrate([100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100]);
    }

    render() {
        return (
            <div className="tap-me" onClick={() => this.vibrate()}>Tap me</div>
        )
    }
}

export default TestComponent;