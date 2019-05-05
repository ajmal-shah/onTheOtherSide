import React, { Component } from 'react';
import "./karenCall.css";

import { MDBProgress } from 'mdbreact';

//Components
import SpeechBubble from '../../components/speechBubble/speechBubble';
import ActionBox from '../../components/actionBox/actionBox';
import conversation from './karenCallContent';

class KarenCall extends Component {
    constructor() {
        super();
        this.state = {
            tapCount: 0,
            isEndOfScene: false,
            isWalk: false,
            walkProgressCount: 0,
            isNextVisible: false,
        }
        this.devicemotionListener = this.devicemotionListener.bind(this);
        this.dynamicCoversation = [];
        this.ignoreContent = [{
            type: "LEFT",
            text: "Why wont you pick up the damn thing?!Why did you igonre my call?",
        },
        {
            type: "RIGHT",
            text: "I am working!",
        },];
    }
    componentWillMount() {
        if (window.karenCallIgnored) {
            Array.prototype.push.apply(this.ignoreContent, conversation)
            this.dynamicCoversation = this.ignoreContent;
        } else {
            this.dynamicCoversation = conversation;
        }
    }
    onTap() {
        let tap = this.state.tapCount;
        navigator.vibrate(30);
        if (this.state.tapCount < this.dynamicCoversation.length - 1) {
            this.setState({
                tapCount: ++tap,
            });
        } else if (this.state.tapCount === this.dynamicCoversation.length - 1) {
            this.setState({
                isEndOfScene: true,
            });
        }
    }

    walk() {
        this.setState({
            isWalk: true
        });
        window.addEventListener('devicemotion', this.devicemotionListener);
    }

    devicemotionListener(event) {
        if (event.acceleration.x > 1 && event.acceleration.x < 2) {
            this.setWalkProgress();
        }
    }

    setWalkProgress() {
        let walkCount = this.state.walkProgressCount;
        if (this.state.walkProgressCount < 50) {
            this.setState({
                walkProgressCount: ++walkCount,
            });
        } else if (this.state.walkProgressCount === 50) {
            this.setState({
                isNextVisible: true,
            });
            window.removeEventListener('devicemotion', this.devicemotionListener);
        }
    }

    nextScene(isWalk) {
        if (isWalk) {
            this.props.nextScene(15);
        }else{
            window.isKarenCallAgain = true;
            this.props.nextScene(4);
        }
    }

    render() {
        let dialogue = this.dynamicCoversation.map((dialogueObject, index) => {
            if (index <= this.state.tapCount) {
                return (
                    <SpeechBubble key={index} right={dialogueObject.type === "RIGHT" ? true : false}>
                        {dialogueObject.text}
                    </SpeechBubble>)
            }
        });

        let walkScreen = (<div className="walk-container">
            <div className="text-area">Karen insists you stretch and take a walk every hour while you are at your desk.</div>
            <div className="action-area">
                <div className="routine-progress-text">Take a walk</div>
                <div className="routine-progress-bar">
                    <MDBProgress value={this.state.walkProgressCount * 2} height="12px" className="health-bar-custom" />
                </div>
            </div>
            <div className="next-button-area">
                {this.state.isNextVisible ? (<div className="next-button" onClick={() => this.nextScene(true)}>
                    Next
            </div>) : null}
            </div>
        </div>);

        return (
            <div className="karen-dialogue-container">
                <div className="speech-dialogue-container">
                    {dialogue}
                </div>
                <div className="interaction-box" onClick={() => this.onTap()} >
                    {this.state.isEndOfScene ? (<div>
                        <ActionBox click={() => this.walk()}>Take a walk</ActionBox>
                        <ActionBox click={() => this.nextScene(false)}>Get back to work</ActionBox>
                    </div>) : null}
                </div>

                {this.state.isWalk ? walkScreen : null}
            </div>
        )
    }
}

export default KarenCall;