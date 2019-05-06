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
            isHealthScreen: false,
            isNextVisible: false,
            healthData: {
                text: "Karen is obsessed with healthy living and insists on you following a fixed morning routine after waking up every day. Karen is upset that you disregard her healthy lifestyle choice and suggestions.",
                johnValue: 80,
                karenValue: 80,
                socialAcceptance: 100
            }
        }
    }
    componentWillMount() {
        // window.johnValue = window.johnValue - 20; 
        // window.karenValue = window.karenValue - 20;
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
                    {this.state.isEndOfScene ? (<div>
                        <ActionBox click={() => this.spawnHealthScreen()}>Next</ActionBox>
                    </div>) : null}
                    {this.state.isHealthScreen ?
                        (<HealthBox
                            text={this.state.healthData.text}
                            johnValue={true}
                            karenValue={true}
                            socialAcceptance={false}
                            click={() => this.nextScene()}
                        />) : null}
                </div>
            </div>
        )
    }
}

export default Angry;