import React, { Component } from 'react';
import "./layout.css";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import * as constants from './common/constants';

//Scenes
import Opening from "./scenes/opening/opening";
import FinallyAsleep from "./scenes/finallyAsleep/finallyAsleep";
import Morning from "./scenes/morning/morning";
import Angry from "./scenes/angry/angry";
import Boss from "./scenes/boss/boss";
import Work from "./scenes/work/work";
import KarenCall from "./scenes/karenCall/karenCall";
import SocialCircle from "./scenes/socialCircle/socialCircle";
import Fight from "./scenes/fight/fight";
import Dinner from "./scenes/dinner/dinner";
import Lost from "./scenes/lost/lost";
import Explain from "./scenes/explain/explain";
import JohnCall from "./scenes/johnCall/johnCall";
import Resolution from "./scenes/resolution/resolution";
import Judge from "./scenes/judge/judge";
import KarenCallAgain from "./scenes/karenCallAgain/karenCallAgain";
import Night from "./scenes/night/night";
import WorkAgain from "./scenes/workAgain/workAgain";
import Reveal from "./scenes/reveal/reveal";
import Slept from "./scenes/slept/slept";

class Layout extends Component {
    constructor() {
        super();
        this.state = {
            pageIndex: 0,
        };
    }

    componentWillMount() {

    }

    fetchPage() {
        switch (this.state.pageIndex) {
            case constants.PAGE_INDEX.OPENING: return (<Opening nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.FINALLY_ASLEEP: return (<FinallyAsleep nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.MORNING: return (<Morning nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.BOSS: return (<Boss nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.WORK: return (<Work nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.KAREN_CALL: return (<KarenCall nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.SOCIAL_CIRCLE: return (<SocialCircle nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.FIGHT: return (<Fight nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.DINNER: return (<Dinner nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.LOST: return (<Lost nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.EXPLAIN: return (<Explain nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.JOHN_CALL: return (<JohnCall nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.RESOLUTION: return (<Resolution nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.ANGRY: return (<Angry nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.JUDGE: return (<Judge nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.KAREN_CALL_AGAIN: return (<KarenCallAgain nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.NIGHT: return (<Night nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.WORK_AGAIN: return (<WorkAgain nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.SLEPT: return (<Slept nextScene={this.nextScene.bind(this)} />);
            case constants.PAGE_INDEX.REVEAL: return (<Reveal nextScene={this.nextScene.bind(this)} />);

            default: return null;
        }
    }

    nextScene(pageIndex) {
        this.setState({
            pageIndex
        })
    }

    render() {
        let page = this.fetchPage();
        return (
            <ReactCSSTransitionGroup
                key={this.state.pageIndex}
                transitionName="scene"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                {page}
            </ReactCSSTransitionGroup>
        )
    }
}

export default Layout;