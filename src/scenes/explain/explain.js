import React, { Component } from 'react';
import "./explain.css";

//Components
import SpeechBubble from '../../components/speechBubble/speechBubble';
import ActionBox from '../../components/actionBox/actionBox';
import HealthBox from '../../components/healthBox/healthBox';

import conversation from './explainContent';

class Explain extends Component {
    constructor() {
        super();
        this.state = {
            tapCount: 0,
            isEndOfScene: false,
            isExplainPrompt: false,
            isExplain: false,
            isNextVisible: true,
            isGo: false,
            isHealthScreen: false,
            healthData: {
                text: "Your friends now realise that you are not just making excuses. They understand your situation and no longer think you are a loser. Moreover, Karen’s state of mind has improved now that you have checked on her and she feels that she is important to you.",
            },
            explanation: [
                {
                    type: "RIGHT",
                    text: "Umm. I would love to but I don’t think I can confirm now. I just have more responsibilities since I moved in with karen. Let me just check on them and I’ll let you know?",
                },
                {
                    type: "LEFT",
                    text: "Sure! No problem man.",
                },
            ],

        }
    }

    onTap() {
        let tap = this.state.tapCount;
        navigator.vibrate(30);
        if (!this.state.isExplain) {
            if (this.state.tapCount < conversation.length - 1) {
                this.setState({
                    tapCount: ++tap,
                });
            } else if (this.state.tapCount === conversation.length - 1) {
                this.setState({
                    isExplainPrompt: true,
                });
            }
        } else {
            if (this.state.tapCount < this.state.explanation.length - 1) {
                this.setState({
                    tapCount: ++tap,
                });
            } else if (this.state.tapCount === this.state.explanation.length - 1) {
                this.setState({
                    isEndOfScene: true,
                });
            }
        }
    }

    nextScene() {
        this.props.nextScene(11);
    }

    explain() {
        Array.prototype.push.apply(conversation, this.explanation);
        window.isPositive = true;
        this.setState({
            isExplainPrompt: false,
            isExplain: true,
            tapCount: 0
        })
    }

    letsGo(isGo) {
        if (isGo) {
            this.setState({
                isGo: true,
            });
        } else {
            this.setState({
                isGo: false,
            });
        }
    }

    spawnHealthScreen() {
        this.setState({
            isHealthScreen: true,
        });
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

        let explanation = this.state.explanation.map((dialogueObject, index) => {
            if (index <= this.state.tapCount) {
                return (
                    <SpeechBubble key={index} right={dialogueObject.type === "RIGHT" ? true : false}>
                        {dialogueObject.text}
                    </SpeechBubble>)
            }
        });

        let modal = (<div className="walk-container">
            <div className="text-area">Are you sure you want to hurt Karen again? Let’s try explaining to them this time.</div>
            <div className="action-area">

            </div>
            <div className="next-button-area">
                {this.state.isNextVisible ? (<div className="next-button" onClick={() => this.letsGo(false)}>
                    Back
            </div>) : null}
            </div>
        </div>);


        return (
            <div className="explain-container">
                <div className="speech-dialogue-container">
                    {this.state.isExplain ? explanation : dialogue}
                </div>
                <div className="interaction-box" onClick={() => this.onTap()} >
                    {this.state.isExplainPrompt && !this.state.isExplain ? (<div>
                        <ActionBox click={() => this.explain()}>Try to explain</ActionBox>
                        <ActionBox click={() => this.letsGo(true)}>Let's go</ActionBox>
                    </div>) : null}
                    {this.state.isEndOfScene ? (<div>
                        {/* <ActionBox click={() => this.spawnHealthScreen()}>Next</ActionBox> */}
                        <ActionBox click={() => this.nextScene()}>Next</ActionBox>
                    </div>) : null}
                </div>
                {this.state.isGo ? modal : null}
                {/* {this.state.isHealthScreen ?
                    (<HealthBox
                        text={this.state.healthData.text}
                        johnValue={true}
                        karenValue={false}
                        socialAcceptance={true}
                        click={() => this.nextScene()}
                    />) : null} */}
            </div>
        )
    }
}

export default Explain;