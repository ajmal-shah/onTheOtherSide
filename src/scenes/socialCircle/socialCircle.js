import React, { Component } from 'react';
import "./socialCircle.css";

//Components
import SpeechBubble from '../../components/speechBubble/speechBubble';
import ActionBox from '../../components/actionBox/actionBox';
import HealthBox from '../../components/healthBox/healthBox';

import conversation from './socialCircleContent';

class SocialCircle extends Component {
    constructor() {
        super();
        this.state = {
            tapCount: 0,
            isEndOfScene: false,
            isHealthScreen: false,
            isNextVisible: false,
            healthData: {
                text: "You always decline your colleagues’ invitations to any activity outside of work without any relevant reasons. Your colleagues think you have become a boring and dull person.",
            }
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

    spawnHealthScreen() {
        this.setState({
            isHealthScreen: true,
        });
    }

    nextScene(isPub) {
        if (isPub) {
            this.props.nextScene(7);
        } else {
            this.props.nextScene(8);
        }
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
            <div className="social-circle-container">
                <div className="speech-dialogue-container">
                    {dialogue}
                </div>
                <div className="interaction-box" onClick={() => this.onTap()} >
                    {this.state.isEndOfScene ? (<div>
                        <ActionBox click={() => this.nextScene(true)}>Okay! Let's go</ActionBox>
                        <ActionBox click={() => this.spawnHealthScreen()}>No, I don't think so</ActionBox>
                    </div>) : null}
                </div>
                {this.state.isHealthScreen ?
                    (<HealthBox
                        text={this.state.healthData.text}
                        johnValue={true}
                        karenValue={false}
                        socialAcceptance={true}
                        click={() => this.nextScene(false)}
                    />) : null}
            </div>
        )
    }
}

export default SocialCircle;