import React, { Component } from 'react';
import "./boss.css";

//Components
import ThoughtBubble from '../../components/thoughtBubble/thoughtBubble';
import ActionBox from '../../components/actionBox/actionBox';
import conversation from './bossContent';

class Boss extends Component {
    constructor() {
        super();
        this.state = {
            tapCount: 0,
            isEndOfScene: false,
        }
    }
  
    onTap() {
        let tap = this.state.tapCount;
        // if (this.state.tapCount < thoughts.length - 1) {
        //     this.setState({
        //         tapCount: ++tap,
        //     });
        // } else if (this.state.tapCount === thoughts.length - 1) {
        //     this.setState({
        //         isEndOfScene: true,
        //     });
        // }
    }

    nextScene() {
        this.props.nextScene(4);
    }

    render() {
        return (
            <div className="boss-container">
                <div className="dialogue-container">
                    <ThoughtBubble>{}</ThoughtBubble>
                </div>
                <div className="interaction-box" onClick={() => this.onTap()} >
                    {this.state.isEndOfScene ? (<ActionBox click={() => this.nextScene()}>
                        Turn the phone over to sleep
                    </ActionBox>) : null}
                </div>
            </div>
        )
    }
}

export default Boss;