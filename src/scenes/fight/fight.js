import React, { Component } from 'react';
import "./fight.css";

//Components
import SpeechBubble from '../../components/speechBubble/speechBubble';
import ActionBox from '../../components/actionBox/actionBox';
import HealthBox from '../../components/healthBox/healthBox';

import conversation from './fightContent';

class Fight extends Component {
    constructor() {
        super();
        this.state = {
            tapCount: 0,
            isEndOfScene: false,
            isHealthScreen: false,
            healthData: {
                text: "Karen hates it when you stress more after a long day. She feels you don't take her seriously enough. The repeated fights are affecting you.",
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

    nextScene() {
        this.props.nextScene(17);
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
            <div className="fight-container">
                <div className="speech-dialogue-container">
                    {dialogue}
                </div>
                <div className="interaction-box" onClick={() => this.onTap()} >
                    {this.state.isEndOfScene ? (<div>
                        <ActionBox click={() => this.spawnHealthScreen()}>Next</ActionBox>
                    </div>) : null}
                </div>

                {this.state.isHealthScreen ?
                    (<HealthBox
                        text={this.state.healthData.text}
                        johnValue={true}
                        karenValue={true}
                        socialAcceptance={false}
                        click={() => this.nextScene()}
                    />) : null}
            </div>
        )
    }
}

export default Fight;