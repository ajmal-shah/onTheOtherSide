import React, { Component } from 'react';
import "./slept.css";
import thoughts from './sleptContent';

//components
import ActionBox from '../../components/actionBox/actionBox';
import ThoughtBubble from '../../components/thoughtBubble/thoughtBubble';

class Slept extends Component {
    constructor() {
        super();
        this.state = {
            tapCount: 0,
            isEndOfScene: false,
        };
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
        this.props.nextScene(12);
    }

    render() {
        let conversation = (<div>
            <div className="dialogue-container">
                <ThoughtBubble>{thoughts[this.state.tapCount]}</ThoughtBubble>
            </div>
            <div className="interaction-box" onClick={() => this.onTap()} >
                {this.state.isEndOfScene ? (<div className="action-buttons">
                    <ActionBox click={() => this.nextScene()}>Go to bed</ActionBox>
                </div>) : null}
            </div>
        </div>);

        return (
            <div className="slept-container">
                {conversation}
            </div>
        )
    }
}

export default Slept;