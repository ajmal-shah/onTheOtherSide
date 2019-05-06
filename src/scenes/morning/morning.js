import React, { Component } from 'react';
import "./morning.css";

import { MDBProgress } from 'mdbreact';

//components
import ActionBox from '../../components/actionBox/actionBox';
import ThoughtBubble from '../../components/thoughtBubble/thoughtBubble';
import HealthBox from '../../components/healthBox/healthBox';
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
            routineProgressCount: 1,
            isEndOfScene: false,
            isKarenRoutine: false,
            isHealthScreen: false,
            isNextVisible: false,
            healthData: {
                text: "Performing the routine has consumed a lot of time. You are late to work again. Your colleagues doubt your committment.",
                johnValue: 80,
                karenValue: 100,
                socialAcceptance: 80
            }
        };
        this.url = require('../../sound/alarm.mp3');
        this.audio = new Audio(this.url);
        this.devicemotionListener = this.devicemotionListener.bind(this);
    }
    componentWillMount() {
        this.startAlarm();
        // window.johnValue = window.johnValue - 20;
        // window.socialAcceptance = window.socialAcceptance - 20;
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

    morningRoutine() {
        this.setState({
            isKarenRoutine: true,
        });
        window.addEventListener('devicemotion', this.devicemotionListener);
    }

    devicemotionListener(event) {
        // console.log(event.acceleration.x);
        if (event.acceleration.x > 10 && event.acceleration.x < 20) {
            this.setRoutineProgress();
        }
    }

    setRoutineProgress() {
        let routineCount = this.state.routineProgressCount;
        if (this.state.routineProgressCount < 20) {
            this.setState({
                routineProgressCount: ++routineCount,
            });
        } else if (this.state.routineProgressCount === 20) {
            this.setState({
                isNextVisible: true,
            });
            window.removeEventListener('devicemotion', this.devicemotionListener);
        }
    }

    spawnHealthScreen() {
        this.setState({
            isHealthScreen: true,
            isKarenRoutine: false,
        });
    }

    nextScene(routine) {
        if (routine) {
            this.props.nextScene(3);
        } else {
            this.props.nextScene(14);
        }
    }

    render() {
        const alarm = (<div className="alarm-container">
            <div className="time">{this.state.alarmTime[this.state.alarmCount - 1]}</div>
            <div className="date">April 28, Thu</div>
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
                    <ActionBox click={() => this.morningRoutine()}>Do Karen's morning routine</ActionBox>
                    <ActionBox click={() => this.nextScene(false)}>Spring out of bed</ActionBox>
                </div>) : null}
            </div>
        </div>);

        let routine = (<div className="routine-container">
            <div className="text-area">Karen is obsessive about health and insists that while getting up, you stretch, roll onto your side and push yourself to sitting before you stand.</div>
            <div className="action-area">
                <div className="routine-progress-text">Shake phone slowly to do the routine</div>
                <div className="routine-progress-bar">
                    <MDBProgress value={this.state.routineProgressCount * 5} height="12px" className="health-bar-custom" />
                </div>
            </div>
            <div className="next-button-area">
                {this.state.isNextVisible ? (<div className="next-button" onClick={() => this.spawnHealthScreen()}>
                    Next
                </div>) : null}
            </div>
        </div>);

        return (
            <div className="morning-container">
                {!this.state.alarmDone ? alarmScreen : conversation}
                {this.state.isKarenRoutine ? routine : null}
                {this.state.isHealthScreen ?
                    (<HealthBox
                        text={this.state.healthData.text}
                        johnValue={true}
                        karenValue={false}
                        socialAcceptance={true}
                        click={() => this.nextScene(true)}
                    />) : null}
            </div>
        )
    }
}

export default Morning;