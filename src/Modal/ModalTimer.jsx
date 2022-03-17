import { Component } from "react";
import { Badge, Modal, Button } from "react-bootstrap";
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

        this.setState(()=>({ 
            time: this.secondsToTime(seconds),
         }));

    }

    shouldComponentUpdate(nextProps, nextState) {
        
        if( !this.state.isCounterStop ) {

            if( nextState.seconds !== this.state.seconds ||
                nextState.isCounterPause !== this.state.isCounterPause 
            ) {
                this.setState({ time: this.secondsToTime( nextState.seconds )})
                return true
            }

        }
        
        if( this.props.allMissions !== nextProps.allMissions ) {
            return true
        }

        return false;
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

    addToMissionTotalTime = () => {
        const { allMissions, currentMissionIndex, setState } = this.props;

        const newAllMissions = allMissions.map((mission, i) => {
            if( i === currentMissionIndex ){ mission.timeSpan += 10 }
            return mission
        })

        setState({
            allMissions: newAllMissions
        })
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
            this.addToMissionTotalTime();
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
        const { allMissions, modal, currentMissionIndex } = this.props;

        return (
            
            <Modal
                show={modal ? true : false}
                onHide={() => this.props.setState({modal: null}) }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        { allMissions[currentMissionIndex].name } 
                    </Modal.Title>
                    <Modal.Body>
                    
                    <Badge className='m-1' pill bg="info"> 
                        {allMissions[currentMissionIndex].timeSpan}
                    </Badge>
                    
                    <div>
                    { isCounterStop &&  <Button onClick={this.startTimer}>Start</Button> }
                        m: {this.state.time.m} s: {this.state.time.s}
                    </div>

                    { isCounterPause  
                        ? 
                        <>
                            <Button onClick={this.clearTimer}> Reset </Button>
                            <Button onClick={this.resumeTimer}> Resume </Button>
                        </>
                        : !isCounterStop && <Button onClick={this.pauseTimer}> Pause </Button>
                    }

                    </Modal.Body>
                </Modal.Header>

            </Modal>












            // <div className="modal_timer">
            //     <h2> TIMER </h2>
            //     <h3> { thisMissionIndex!==null ? allMissions[thisMissionIndex].name : ''} </h3>
            //     <span> {thisMissionIndex!==null ? allMissions[thisMissionIndex].timeSpan : ''} </span>

            //     <button onClick={ this.exitMission}> exit </button>
            //     <div>
            //     { isCounterStop &&  <button onClick={this.startTimer}>Start</button> }
            //         m: {this.state.time.m} s: {this.state.time.s}
            //     </div>
            //     { isCounterPause  
            //     ? <>
            //         <button onClick={this.clearTimer}>Reset</button> 
            //         <button onClick={this.resumeTimer}>Resume</button> 
            //       </>
            //     : !isCounterStop && <button onClick={this.pauseTimer}>Pause</button>
            //     }
            // </div>

        )
    }
}
export default ModalTimer;