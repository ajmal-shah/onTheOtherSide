import React, { Component } from 'react';
import "./morning.css";

//components
import ActionBox from '../../components/actionBox/actionBox'

class Morning extends Component {
    componentWillMount() {
        navigator.vibrate([500, 100, 500, 100,500, 100,500, 100,500, 100,500, 100,500, 100,500, 100,500, 100,500, 100]);
    }
    stopAlarm(){
        navigator.vibrate(0);
    }
    render() {
        return (
            <div className="morning-container">
                <div className="alarm-container">
                    <div className="time">07 : 30</div>
                    <div className="date">April 28, Tue</div>
                    <div className="action-buttons">
                        <ActionBox click={()=> this.stopAlarm()}>Snooze</ActionBox>
                        <ActionBox click={()=> this.stopAlarm()}>Turn Off</ActionBox>
                    </div>
                </div>
            </div>
        )
    }
}

export default Morning;