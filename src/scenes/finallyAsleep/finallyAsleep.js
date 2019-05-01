import React, { Component } from 'react';
import "./finallyAsleep.css";

// import { CSSTransition, TransitionGroup } from 'react-transition-group';

//Components
import ThoughtBubble from '../../components/thoughtBubble/thoughtBubble'
import thoughts from './finallyAsleepContent';

class FinallyAsleep extends Component {
    constructor() {
        super();
        this.state = {
            tapCount: 0,
        }
    }

    onTap() {
        let tap = this.state.tapCount;
        if (this.state.tapCount < thoughts.length - 1) {
            this.setState({
                tapCount: ++tap,
            });
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
                <div className="interaction-box" onClick={() => this.onTap()} />
            </div>
        )
    }
}

export default FinallyAsleep;