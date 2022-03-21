import React, { Component } from 'react'
import { Badge, Container } from 'react-bootstrap'
import GragientButton from './GragientButton';
import ReminderCard from './ReminderCard'

export default class Dashboard extends Component {
    constructor(){
        super();
        this.fakeReminder1 = { time:'2hrs', title:'started work late', reminders:['Best start working 1hr after you wake up, when you have a refresing mind.']};
        this.fakeReminder2 = { time:'6hrs', title:'overtime work', reminders:['Probably dwell on decision making to much?', 'Probably need more exercise.']};
        this.modeArr = ['PRODUCTION', 'SOCIAL', 'MEDITATION']
        this.state = { modeText: 0 }
    }

    handleClick = e => {
        e.preventDefault();

        const newMode = this.state.modeText<2 ? this.state.modeText+1: 0;

        this.setState({ modeText: newMode })
    }

  render() {
    return (
    <Container className="dashboard d-flex justify-content-center">
        <div className='d-flex flex-column '> 
            <h4 className='p-5'> How's it going Lu? </h4>
            <div className='dashboard-item d-flex flex-grow-1 justify-content-center align-items-center m-2'>
                <div className='d-flex flex-column justify-content-center align-items-start primary-color m-2 p-4 shadow rounded-3' style={{width:'350px', height:'350px'}}> 
                    <span className='minor-text'> In the past 2 weeks, you spent </span>
                    
                    <div className='text-white' style={{ fontSize:'5em' }}> 80% </div>
                    <Badge> 50hrs </Badge>

                    <div className='main-task' > on working </div>
                </div>
                <div className=' m-2 shadow rounded-3' style={{width:'350px', height:'350px'}}> 
                    <div className='text-muted p-2'> Just a friendly reminder </div>
                    <ReminderCard text={this.fakeReminder1}/>
                    <ReminderCard text={this.fakeReminder2}/>

                </div>
            </div>
        </div>

        <div  className='dashboard-item d-flex justify-content-center align-items-center m-4 ' style={{ width:'20vw'}} >
            <div className='d-flex flex-column justify-content-center align-items-center p-5'> 
                <div className='text-muted small p-3'> Select your mode for the next 2 weeks</div>

                    <GragientButton text={this.modeArr[this.state.modeText]} handleClick={this.handleClick} />
                <div className='text-muted small p-3'> Once you decided, we will help you evaluate your time management strategy. Enjoy your day!</div>

            </div>
        </div>
    </Container>
      
    )
  }
}
