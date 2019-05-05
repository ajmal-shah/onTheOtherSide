import React, { Component } from 'react';
import "./explain.css";

//Components
import SpeechBubble from '../../components/speechBubble/speechBubble';
import ActionBox from '../../components/actionBox/actionBox';
import conversation from './explainContent';

class Explain extends Component {
    constructor() {
        super();
        this.state = {
            tapCount: 0,
            isEndOfScene: false,
            isExplainPrompt: false,
            isExplain: false,
            isGo: false,
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
        this.setState({
            isExplainPrompt: false,
            isExplain: true,
            tapCount: 0
        })
    }

    letsGo() {
        this.setState({
            isGo: true,
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

        return (
            <div className="explain-container">
                <div className="speech-dialogue-container">
                    {this.state.isExplain ? explanation : dialogue}
                </div>
                <div className="interaction-box" onClick={() => this.onTap()} >
                    {this.state.isExplainPrompt && !this.state.isExplain ? (<div>
                        <ActionBox click={() => this.explain()}>Try to explain</ActionBox>
                        <ActionBox click={() => this.letsGo()}>Let's go</ActionBox>
                    </div>) : null}
                    {this.state.isEndOfScene ? (<div>
                        <ActionBox click={() => this.nextScene()}>Next</ActionBox>
                    </div>) : null}
                </div>
            </div>
        )
    }
}

export default Explain;