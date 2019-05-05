import React, { Component } from 'react';
import "./workAgain.css";

import { MDBProgress } from 'mdbreact';

//Components
import SpeechBubble from '../../components/speechBubble/speechBubble';
import ActionBox from '../../components/actionBox/actionBox';

class WorkAgain extends Component {
    constructor() {
        super();
        this.state = {
            tapCount: 0,
            isEndOfScene: false,
        }
    }

    componentWillMount() {

    }

    onTap() {
        let tap = this.state.tapCount;
        navigator.vibrate(30);
        if (this.state.tapCount < 5) {
            this.setState({
                tapCount: ++tap,
            });
        } else if (this.state.tapCount === 5) {
            this.setState({
                isEndOfScene: true,
            });
        }
    }


    nextScene() {
        this.props.nextScene(10);
    }

    render() {
        const workContent = (<div>
            <div className="dialogue-container">
                <div className="work-progress-section">
                    <div>Tap to work</div>
                    <div className="work-progress-container">
                        <MDBProgress value={this.state.tapCount * 20} height="12px" className="work-bar-custom" />
                    </div>
                </div>

            </div>
            <div className="interaction-box" onClick={() => this.onTap()} >
                {this.state.isEndOfScene ? (<ActionBox click={() => this.nextScene()}>
                    Next
                </ActionBox>) : null}
            </div>
        </div>);

        return (
            <div className="work-again-container">
                {workContent}
            </div>
        )
    }
}

export default WorkAgain;