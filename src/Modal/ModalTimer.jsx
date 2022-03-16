import { Component } from "react";

import { TimerContext } from "../context/context";

class ModalTimer extends Component {

    constructor() {
        super();
        this.state = { 
            time: { m:0, s:10 }, 
            seconds: 10,
            startTime : null, // record timestamp  
            isCounterStop : true,
            isCounterPause : false,
            
        };
        
      }
    
    componentDidMount() {
        const { seconds } = this.state;

        this.setState({ time: this.secondsToTime(seconds) });
    }

    shouldComponentUpdate(nextProps, nextState) {
        // if( !this.state.isCounterStop ) {

        //     if( nextState.seconds !== this.state.seconds ||
        //         nextState.isCounterPause !== this.state.isCounterPause 
        //     ) {
        //         this.setState({ time: this.secondsToTime( nextState.seconds )})
        //         return true
        //     }

        // }
        
        // return false;
        return true;
    }
    
    exitMission = () => {
        this.props.setState({ modal: null})
    }
    /**
     * Formatting seconds to mins and secs for UI.
     */
    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    /**
     * To get time from WebAPI, storing into state. 
     */
    getTimerTime = () =>  { 
        const { isCounterPause, seconds } = this.state;

        if ( !isCounterPause ) {
            this.setState(() => ({  
                seconds:  10 - Math.floor((new Date() - this.state.startTime) / 1000)  // new time - timestamp
            }));
        }

        if ( seconds === 0 ) {
            this.clearTimer();
            
        }
    }

    /**
     * start timer when button's pressed, also keep getting time from WebAPI in 1sec interval.
     * (rather than count with setInterval itselve) 
     */
    startTimer = () => {

        this.setState(() => ({
            isCounterStop: false,
            startTime: new Date()
        }))

        setInterval(() => {
          this.getTimerTime()
        }, 1000)
    }

    pauseTimer = () => {
        this.setState(()=>({ isCounterPause: true }))
    }

    resumeTimer = () => {
        this.setState(()=>({ isCounterPause: false }))
    }

    clearTimer = () => {
        this.setState(() => ({
            time: { m:0, s:10 }, 
            seconds: 10,
            startTime : null, // record timestamp  
            isCounterStop: true,
            isCounterPause : false,
        }))
    }


    render() {
        const { isCounterPause, isCounterStop } = this.state;
        const { allMissions, now_mission_state } = this.props;
console.log(allMissions)
        return (
            <div className="modal_timer">
                <h2> TIMER </h2>
                <button onClick={ this.exitMission}> exit </button>
                <div>
                { isCounterStop &&  <button onClick={this.startTimer}>Start</button> }
                    m: {this.state.time.m} s: {this.state.time.s}
                </div>
                { isCounterPause  
                ? <>
                    <button onClick={this.clearTimer}>Reset</button> 
                    <button onClick={this.resumeTimer}>Resume</button> 
                  </>
                : !isCounterStop && <button onClick={this.pauseTimer}>Pause</button>
                }


            </div>

        )
    }
}
export default ModalTimer;