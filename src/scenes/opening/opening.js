import React, { Component } from 'react';
import "./opening.css";

//Components
import HealthBox from '../../components/healthBox/healthBox';

class Opening extends Component {
    playGame() {
        //Going fullscreen
        // document.documentElement.requestFullscreen();
        //Switch to next scene
        this.props.nextScene(1);
    }

    render() {
        return (
            <div className="openingContainer">
                <div className="playButton" onClick={() => this.playGame()}>Play</div>
                <HealthBox />
            </div>
        )
    }
}

export default Opening;