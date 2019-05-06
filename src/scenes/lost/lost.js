import React, { Component } from 'react';
import "./lost.css";

// import { CSSTransition, TransitionGroup } from 'react-transition-group';

//Components
import ThoughtBubble from '../../components/thoughtBubble/thoughtBubble';
import ActionBox from '../../components/actionBox/actionBox';
import HealthBox from '../../components/healthBox/healthBox';

import thoughts from './lostContent';

class Lost extends Component {
    constructor() {
        super();
        this.state = {
            tapCount: 0,
            isEndOfScene: false,
            isHealthScreen: false,
            healthData: {
                text: "The added exhaustion of having to argue with Karen after an intense day at work, has left you drained. You are late for work again. Your colleagues doubt your sense of responsibility.",
            }
        }
    }

    onTap() {
        let tap = this.state.tapCount;
        navigator.vibrate(30);
        if (this.state.tapCount < thoughts.length - 1) {
            this.setState({
                tapCount: ++tap,
            });
        } else if (this.state.tapCount === thoughts.length - 1) {
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
        window.johnValue = window.johnValuePreLost;
        window.karenValue = window.karenValuePreLost;
        window.socialAcceptance = window.socialAcceptancePreLost;
        this.props.nextScene(6);
    }

    render() {

        return (
            <div className="lost-container">
                <div className="dialogue-container">
                    <ThoughtBubble>{thoughts[this.state.tapCount]}</ThoughtBubble>
                </div>
                <div className="interaction-box" onClick={() => this.onTap()} >
                    {this.state.isEndOfScene ? (<ActionBox click={() => this.spawnHealthScreen()}>
                        Next
                    </ActionBox>) : null}
                </div>
                {this.state.isHealthScreen ?
                    (<HealthBox
                        text={this.state.healthData.text}
                        johnValue={true}
                        karenValue={false}
                        socialAcceptance={true}
                        isLost={true}
                        click={() => this.nextScene()}
                    />) : null}
            </div>
        )
    }
}

export default Lost;