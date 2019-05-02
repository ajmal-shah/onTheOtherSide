import React, { Component } from 'react';
import "./work.css";

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
        }
    }

    onTap() {
        let tap = this.state.tapCount;
        if (this.state.tapCount < 5) {
            this.setState({
                tapCount: ++tap,
            });
        } else if (this.state.tapCount === 5) {
            this.setState({
                isKarenCall: true,
            });
        }
        // if (this.state.tapCount < conversation.length - 1) {
        //     this.setState({
        //         tapCount: ++tap,
        //     });
        // } else if (this.state.tapCount === conversation.length - 1) {
        //     this.setState({
        //         isEndOfScene: true,
        //     });
        // }
    }

    ignoreCall() {

    }

    nextScene() {
        this.props.nextScene(5);
    }

    render() {
        const workContent = (<div>
            <div className="dialogue-container"></div>
            <div className="interaction-box" onClick={() => this.onTap()} >
                {this.state.isEndOfScene ? (<ActionBox click={() => this.nextScene()}>

                </ActionBox>) : null}
            </div>
        </div>);

        const karenCall = (<div className="karen-call-container">
            <div className="caller-name">Karen</div>
            <div className="calling-label">calling</div>
            <div className="action-buttons">
                <ActionBox click={() => this.nextScene()}>Pick up</ActionBox>
                <ActionBox click={() => this.ignoreCall()}>Ignore</ActionBox>
            </div>
        </div>);

        return (
            <div className="work-container">
                {this.state.isKarenCall ? karenCall : workContent}
            </div>
        )
    }
}

export default Work;