import React, { Component } from 'react';
import "./resolution.css";

// import { CSSTransition, TransitionGroup } from 'react-transition-group';

//Components
import ThoughtBubble from '../../components/thoughtBubble/thoughtBubble';
import ActionBox from '../../components/actionBox/actionBox';
import thoughts from './resolutionContent';

class Resolution extends Component {
    constructor() {
        super();
        this.state = {
            tapCount: 0,
            isEndOfScene: false,
        }
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
        }
    }


    nextScene() {
        this.props.nextScene(13);
    }

    render() {
        return (
            <div className="resolution-container">
                <div className="dialogue-container">
                    <ThoughtBubble>{thoughts[this.state.tapCount]}</ThoughtBubble>
                </div>
                <div className="interaction-box" onClick={() => this.onTap()} >
                    {this.state.isEndOfScene ? (<ActionBox click={() => this.nextScene()}>
                        Next
                    </ActionBox>) : null}
                </div>
            </div>
        )
    }
}

export default Resolution;