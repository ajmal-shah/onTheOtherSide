import React, { Component } from 'react';
import "./finallyAsleep.css";
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

//Components
import ThoughtBubble from '../../components/thoughtBubble/thoughtBubble';
import ActionBox from '../../components/actionBox/actionBox';
import thoughts from './finallyAsleepContent';

class FinallyAsleep extends Component {
    constructor() {
        super();
        this.state = {
            tapCount: 0,
            isEndOfScene: false,
        }
        this.deviceOrientationListener = this.deviceOrientationListener.bind(this);
    }

    onTap() {
        let tap = this.state.tapCount;
        navigator.vibrate(30);
        if (this.state.tapCount < thoughts.length - 1) {
            this.setState({
                tapCount: ++tap,
            });
        } else if (this.state.tapCount === thoughts.length - 1) {
            this.setState({
                isEndOfScene: true,
            });
            window.addEventListener('deviceorientation', this.deviceOrientationListener);
        }
    }

    deviceOrientationListener(event) {
        if (event.beta < -160 || event.beta > 160) {
            // navigator.vibrate([100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100]);
            this.nextScene();
        }
    }

    nextScene() {
        this.props.nextScene(2);
    }

    componentWillUnmount() {
        window.removeEventListener('deviceorientation', this.deviceOrientationListener);
    }

    render() {

        return (
            <div className="container">
                
                <div className="dialogue-container">
                    <ThoughtBubble>{thoughts[this.state.tapCount]}</ThoughtBubble>
                </div>
                <div className="interaction-box" onClick={() => this.onTap()} >
                    {this.state.isEndOfScene ? (<ActionBox click={() => this.nextScene()}>
                        Turn the phone over to sleep
                    </ActionBox>) : null}
                </div>
            </div>
        )
    }
}

export default FinallyAsleep;