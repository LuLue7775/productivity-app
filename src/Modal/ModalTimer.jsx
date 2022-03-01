import { Component } from "react";

import { TimerContext } from "../context/context";

class ModalTimer extends Component {

    constructor() {
        super();
        this.state = { 
            time: { m:5, s:0}, 
            seconds: 300,
            startTime : null, // record timestamp  
            isCounterStop : false,
        };
        
      }
    
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

    componentDidMount() {
        const { seconds } = this.state;
        console.log(this.state.isCounterStop)

        this.setState({ time: this.secondsToTime(seconds) });
    }

    shouldComponentUpdate(nextProps, nextState) {

        if( nextState.seconds !== this.state.seconds ) {
            this.setState({ time: this.secondsToTime( nextState.seconds )})
            return true
        }
        return false;
    }
    
    startTimer = () => {

        this.setState(()=>({
            isCounterStop: false,
            startTime: new Date()
        }))

        setInterval(() => {
          this.getTimerTime()
        }, 1000)
    }

    getTimerTime = () =>  { 
        if ( !this.state.isCounterStop ) {
            this.setState(() => ({  
                seconds:  300 - Math.floor((new Date() - this.state.startTime) / 1000)  // new time - timestamp
            }));

        }
    }

    
    pauseTimer = () => {
        this.setState({
            isCounterStop: !this.state.isCounterStop,
        })
        
    }

    clearTimer = () => {
        this.setState({
            time: { m:5, s:0}, 
            seconds: 300,
            startTime : null, // record timestamp  
            isCounterStop: true,

        })
    }




    render() {
        console.log(this.state.isCounterStop)
        return (
            <div className="modal_timer">
                <h2> TIMER </h2>
                <button onClick={ this.exitMission}> exit </button>
                <div>
                    <button onClick={this.startTimer}>Start</button>
                    m: {this.state.time.m} s: {this.state.time.s}
                </div>
                <button onClick={this.clearTimer}>Reset</button>
                <button onClick={this.pauseTimer}>Pause</button>

            </div>

        )
    }
}
export default ModalTimer;