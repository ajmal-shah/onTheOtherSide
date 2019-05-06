import React, { Component } from 'react';
import "./reveal.css";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

//Components
import thoughts from './revealContent';

class Reveal extends Component {
    constructor() {
        super();
        this.state = {
            tapCount: 0,
            isEndOfScene: false,
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

    render() {
        return (
            <div className="reveal-container" onClick={() => this.onTap()}>
                {/* This is a hack for animation. Bad code. */}
                {this.state.tapCount === 0 ? (<ReactCSSTransitionGroup
                    transitionName="scene"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {/* <div key={this.state.tapCount}>{thoughts[this.state.tapCount]}</div> */}
                    <div key="key">{thoughts[0]}</div>
                </ReactCSSTransitionGroup>) : null}

                {this.state.tapCount === 1 ? <ReactCSSTransitionGroup
                    transitionName="scene"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {/* <div key={this.state.tapCount}>{thoughts[this.state.tapCount]}</div> */}
                    <div key="key"> {thoughts[1]}</div>
                </ReactCSSTransitionGroup> : null}

                {this.state.tapCount === 2 ? <ReactCSSTransitionGroup
                    transitionName="scene"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {/* <div key={this.state.tapCount}>{thoughts[this.state.tapCount]}</div> */}
                    <div key="key"> {thoughts[2]}</div>
                </ReactCSSTransitionGroup> : null}
            </div>
        )
    }
}

export default Reveal;