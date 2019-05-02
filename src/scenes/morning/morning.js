import React, { Component } from 'react';
import "./morning.css";

//components
import ActionBox from '../../components/actionBox/actionBox';
import ThoughtBubble from '../../components/thoughtBubble/thoughtBubble';
import thoughts from './morningContent';

class Morning extends Component {
    constructor() {
        super();
        this.state = {
            alarmCount: 1,
            alarmDone: false,
            interstitialScreen: false,
            alarmTime: ["07 : 30", "07 : 50", "08 : 10"],
            tapCount: 0,
            isEndOfScene: false,
        };
        this.url = require('../../sound/alarm.mp3');
        this.audio = new Audio(this.url);
    }
    componentWillMount() {
        this.startAlarm();
    }

    startAlarm() {
        navigator.vibrate([500, 100, 500, 100, 500, 100, 500, 100, 500, 100, 500, 100, 500, 100, 500, 100, 500, 100, 500, 100]);
        this.audio.play();
    }

    stopAlarm() {
        navigator.vibrate(0);
        this.audio.pause();
        this.audio.currentTime = 0;
        let count = this.state.alarmCount;
        this.setState({
            alarmCount: ++count,
            interstitialScreen: true,
        });
        this.handleInterstitial();
    }

    handleInterstitial() {
        if (this.state.alarmCount < 3) {
            setTimeout(
                function () {
                    this.setState({
                        interstitialScreen: false,
                    });
                    this.startAlarm();
                }
                    .bind(this),
                1500
            );
        } else {
            this.setState({
                alarmDone: true,
            });
        }
    }

    onTap() {
        let tap = this.state.tapCount;
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

    nextScene() {
        this.props.nextScene(3);
    }

    render() {
        const alarm = (<div className="alarm-container">
            <div className="time">{this.state.alarmTime[this.state.alarmCount - 1]}</div>
            <div className="date">April 28, Tue</div>
            <div className="action-buttons">
                <ActionBox click={() => this.stopAlarm()}>Snooze</ActionBox>
                <ActionBox click={() => this.stopAlarm()}>Turn Off</ActionBox>
            </div>
        </div>);

        const interstitial = (<div className="interstitial" />);

        let alarmScreen = (<div>{this.state.interstitialScreen ? interstitial : alarm}</div>);

        let conversation = (<div>
            <div className="dialogue-container">
                <ThoughtBubble>{thoughts[this.state.tapCount]}</ThoughtBubble>
            </div>
            <div className="interaction-box" onClick={() => this.onTap()} >
                {this.state.isEndOfScene ? (<div className="action-buttons">
                    <ActionBox click={() => this.nextScene()}>Do Karen's morning routine</ActionBox>
                    <ActionBox click={() => this.nextScene()}>Spring out of bed</ActionBox>
                </div>) : null}
            </div>
        </div>);

        return (
            <div className="morning-container">
                {!this.state.alarmDone ? alarmScreen : conversation}
            </div>
        )
    }
}

export default Morning;