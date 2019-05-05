import React, { Component } from 'react';
import "./work.css";

import { MDBProgress } from 'mdbreact';

//Components
import SpeechBubble from '../../components/speechBubble/speechBubble';
import ActionBox from '../../components/actionBox/actionBox';

class Work extends Component {
    constructor() {
        super();
        this.state = {
            tapCount: 0,
            isEndOfScene: false,
            isKarenCall: false,
            spawnKarenCallAgain: false,
        }
    }

    componentWillMount() {
        if (window.isKarenCallAgain) {
            this.setState({
                tapCount: 12
            });
        }
    }

    onTap() {
        let tap = this.state.tapCount;
        navigator.vibrate(30);
        if (this.state.tapCount < 15) {
            this.setState({
                tapCount: ++tap,
            });
        } else if (this.state.tapCount === 15) {
            if (window.isKarenCallAgain) {
                this.setState({
                    spawnKarenCallAgain: true,
                });
            } else {
                this.setState({
                    isKarenCall: true,
                });
            }
            this.startCall();
        }
    }

    startCall() {
        navigator.vibrate([500, 100, 500, 100, 500, 100, 500, 100, 500, 100, 500, 100, 500, 100, 500, 100, 500, 100, 500, 100]);
        // this.audio.play();
    }

    stopCall(){
        navigator.vibrate(0);
    }

    ignoreCall() {
        this.stopCall();
        this.setState({
            isKarenCall: false,
            tapCount: 13,
        });
        window.karenCallIgnored = true;
    }

    nextScene(isFirstCall) {
        this.stopCall();
        if (isFirstCall) {
            this.props.nextScene(5);
        } else {
            this.props.nextScene(16);
        }
    }

    render() {
        const workContent = (<div>
            <div className="dialogue-container">
                <div className="work-progress-section">
                    <div>Tap to work</div>
                    <div className="work-progress-container">
                        <MDBProgress value={this.state.tapCount * 5} height="12px" className="work-bar-custom" />
                    </div>
                </div>

            </div>
            <div className="interaction-box" onClick={() => this.onTap()} >
                {this.state.isEndOfScene ? (<ActionBox click={() => this.nextScene()}>

                </ActionBox>) : null}
            </div>
        </div>);

        const karenCall = (<div className="karen-call-container">
            <div className="caller-name">Karen</div>
            <div className="calling-label">calling</div>
            <div className="action-buttons">
                <ActionBox click={() => this.nextScene(true)}>Pick up</ActionBox>
                <ActionBox click={() => this.ignoreCall()}>Ignore</ActionBox>
            </div>
        </div>);

        const karenCallAgain = (<div className="karen-call-again-container">
            <div className="caller-name">Karen</div>
            <div className="calling-label">calling</div>
            <div className="action-buttons">
                <ActionBox click={() => this.nextScene(false)}>Pick up</ActionBox>
                {/* <ActionBox click={() => this.ignoreCall()}>Ignore</ActionBox> */}
            </div>
        </div>);

        return (
            <div className="work-container">
                {this.state.isKarenCall ? karenCall : workContent}
                {this.state.spawnKarenCallAgain ? karenCallAgain : null}
            </div>
        )
    }
}

export default Work;