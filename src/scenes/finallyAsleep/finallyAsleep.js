import React, { Component } from 'react';
import "./finallyAsleep.css";

// import { CSSTransition, TransitionGroup } from 'react-transition-group';

//Components
import ThoughtBubble from '../../components/thoughtBubble/thoughtBubble';
import ActionBox from '../../components/actionBox/actionBox'
import thoughts from './finallyAsleepContent';

class FinallyAsleep extends Component {
    constructor() {
        super();
        this.state = {
            tapCount: 0,
            isEndOfScene: false,
        }
    }

    onTap() {
        let tap = this.state.tapCount;
        if (this.state.tapCount < thoughts.length - 1) {
            this.setState({
                tapCount: ++tap,
            });
        } else if (this.state.tapCount == thoughts.length - 1) {
            this.setState({
                isEndOfScene: true,
            });
            window.addEventListener('deviceorientation', this.deviceOrientationListener);
        }
    }

    deviceOrientationListener(event) {
        let z = event.gamma;
        console.log(event.alpha, event.beta, event.gamma);
        if (event.beta < -160 || event.beta > 160) {
            navigator.vibrate([100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100]);
        }
    }
    
    render() {

        return (
            <div className="container">
                {/* <TransitionGroup className="dialogue-container">
                    <CSSTransition
                        key={this.state.tapCount}
                        classNames="thoughts"
                        timeout={1000}
                        >
                        <ThoughtBubble>{thoughts[this.state.tapCount]}</ThoughtBubble>
                    </CSSTransition>
                </TransitionGroup> */}
                <div className="dialogue-container">
                    <ThoughtBubble>{thoughts[this.state.tapCount]}</ThoughtBubble>
                </div>
                <div className="interaction-box" onClick={() => this.onTap()} >
                    {this.state.isEndOfScene ? (<ActionBox>
                        Turn the phone over to sleep
                    </ActionBox>) : null}
                </div>
            </div>
        )
    }
}

export default FinallyAsleep;