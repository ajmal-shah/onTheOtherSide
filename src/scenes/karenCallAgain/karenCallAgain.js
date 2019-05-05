import React, { Component } from 'react';
import "./karenCallAgain.css";

//Components
import SpeechBubble from '../../components/speechBubble/speechBubble';
import ActionBox from '../../components/actionBox/actionBox';
import HealthBox from '../../components/healthBox/healthBox';
import conversation from './karenCallAgainContent';

class KarenCallAgain extends Component {
    constructor() {
        super();
        this.state = {
            tapCount: 0,
            isEndOfScene: false,
            isHealthScreen: false,
            isNextVisible: false,
            healthData: {
                text: "Karen is fed up of you ignoring her all the time. The incessant finght is affecting your work. You lost composure",
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
        this.props.nextScene(6);
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
            <div className="karen-dialogue-container">
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

export default KarenCallAgain;