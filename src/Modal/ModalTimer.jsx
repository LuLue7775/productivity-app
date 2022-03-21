import { Component } from "react";
import { Badge, Modal, Button } from "react-bootstrap";
import { TimerContext } from "../context/context";
import Flip from "../components/Flip";

class ModalTimer extends Component {

    constructor() {
        super();
        this.state = { 
            
            time: { m:0, s:10 }, 
            seconds: 10,
            startTime : null, // record timestamp  
            isCounterStop : true,
            isCounterPause : false,      
            temp:10      
        };
        this.timer = null;
      }


    
    componentDidMount() {
        const { seconds } = this.state;

        this.setState(()=>({ 
            time: this.secondsToTime(seconds),
         }));

    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(this.state.isCounterStop)
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
    
    componentWillUnmount(){
        clearInterval(this.timer); 
    }

    exitMission = () => {
        this.props.setState({ modal: null })
    }

    /**
     * Formatting seconds to mins and secs for UI.
     */
    secondsToTime = (secs) => {
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
        const { isCounterPause, seconds, isCounterStop, startTime } = this.state;
        if (isCounterStop) return
        if (isCounterPause) {
            // this.setState(() => ({
            //     startTime: new Date()
            // }))
            return
        }

        this.setState(() => ({  
            seconds:  this.state.temp - Math.floor((new Date() - this.state.startTime) / 1000)  // new time - timestamp
        }));
    
        if ( seconds <= 0 ) {
            this.clearTimer();
            this.addToMissionTotalTime();
            return
        }
    }

    /**
     * start timer when button's pressed, also keep getting time from WebAPI in 1sec interval.
     * (rather than count with setInterval itselve) 
     */
    startTimer = () => {
        const { isCounterPause } = this.state;

        this.setState(() => ({
            isCounterStop: false,
            startTime: new Date()
        }))
        this.timer = setInterval(() => {
            this.getTimerTime()
        }, 1000)
        
    }

    pauseTimer = () => {
        this.setState(()=>({ 
            isCounterPause: true, 
            temp: this.state.seconds 
        }))
    }

    resumeTimer = () => {
        this.setState(()=>({ 
            isCounterPause: false,
            startTime: new Date() 
        }))
    }

    clearTimer = () => {
        clearInterval(this.timer); 

        this.setState(() => ({
            time: { m:0, s:10 }, 
            seconds: 10,
            startTime : null, // record timestamp  
            isCounterStop: true,
            isCounterPause : false,
            temp: 10
        }))
    }

    render() {
        const { isCounterPause, isCounterStop } = this.state;
        const { allMissions, modal, currentMissionIndex } = this.props;

        return (
            
            <Modal
                show={modal ? true : false}
                onHide={() => this.props.setState({modal: null}) }
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="d-flex align-items-center" id="contained-modal-title-vcenter">
                        <h4>{ allMissions[currentMissionIndex].name } </h4>
                        <span className='mx-4 fs-6' > total spent:{` ${allMissions[currentMissionIndex].timeSpan}`} </span>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="container">
                    <Flip minutes={this.state.time.m} seconds={this.state.time.s} ></Flip>
 
                    <div className="d-flex justify-content-center">

                    { isCounterStop &&  <Button className="m-2" onClick={this.startTimer}>Start</Button> }
                    { isCounterPause  
                        ? 
                        <>
                            <Button className="m-2" onClick={this.clearTimer}> Reset </Button>
                            <Button className="m-2" onClick={this.resumeTimer}> Resume </Button>
                        </>
                        : !isCounterStop && <Button onClick={this.pauseTimer}> Pause </Button>
                    }
                    </div>
                </Modal.Body>
            </Modal>

        )
    }
}
export default ModalTimer;