import React, { Component } from 'react';
import "./night.css";

//Components
import SpeechBubble from '../../components/speechBubble/speechBubble';
import ActionBox from '../../components/actionBox/actionBox';
import HealthBox from '../../components/healthBox/healthBox';
import conversation from './nightContent';

class Night extends Component {
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
        if (this.state.tapCount < conversation.length - 1) {
            this.setState({
                tapCount: ++tap,
            });
        } else if (this.state.tapCount === conversation.length - 1) {
            this.setState({
                isEndOfScene: true,
            });
        }
    }

    nextScene() {
        this.props.nextScene(9);
    }

    render() {
        let dialogue = conversation.map((dialogueObject, index) => {
            if (index <= this.state.tapCount) {
                return (
                    <SpeechBubble key={index} right={dialogueObject.type === "RIGHT" ? true : false}>
                        {dialogueObject.text}
                    </SpeechBubble>)
            }
        });
        return (
            <div className="night-container">
                <div className="speech-dialogue-container">
                    {dialogue}
                </div>
                <div className="interaction-box" onClick={() => this.onTap()} >
                    {this.state.isEndOfScene ? (<ActionBox className="button-white" click={() => this.nextScene()}>
                        Next
                    </ActionBox>) : null}
                </div>
            </div>
        )
    }
}

export default Night;