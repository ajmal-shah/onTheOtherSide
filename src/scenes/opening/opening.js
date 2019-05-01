import React, { Component } from 'react';
import "./opening.css";

//Components


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
            </div>
        )
    }
}

export default Opening;