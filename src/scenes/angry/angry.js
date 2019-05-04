import React, { Component } from 'react';
import "./angry.css";

//Components
import SpeechBubble from '../../components/speechBubble/speechBubble';
import ActionBox from '../../components/actionBox/actionBox';
import conversation from './angryContent';
import HealthBox from '../../components/healthBox/healthBox';

class Angry extends Component {
    constructor() {
        super();
        this.state = {
            tapCount: 0,
            isEndOfScene: false,
            healthData: {
                text: " Karen is upset that you have not done the morning routine. Karen's composure has gone down",
                johnValue: 80,
                karenValue: 80,
                socialAcceptance: 100
            }
        }
    }

    onTap() {
        let tap = this.state.tapCount;
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
        this.props.nextScene(3);
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
            <div className="angry-container">
                <div className="speech-dialogue-container">
                    {dialogue}
                </div>
                <div className="interaction-box" onClick={() => this.onTap()} >
                    {this.state.isEndOfScene ?
                        (<HealthBox
                            text={this.state.healthData.text}
                            johnValue={this.state.healthData.johnValue}
                            karenValue={this.state.healthData.karenValue}
                            socialAcceptance={this.state.healthData.socialAcceptance}
                            click={() => this.nextScene()}
                        />) : null}
                </div>
            </div>
        )
    }
}

export default Angry;