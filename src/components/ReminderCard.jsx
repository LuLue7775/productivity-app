import React, { Component } from 'react'

export default class ReminderCard extends Component {
  render() {
    const { text } = this.props;
    return (
        <div className='d-flex flex-column fillin-color m-2 shadow rounded-3' style={{height:'40%'}}> 
            <div className='d-flex '> 
                <div className='d-flex justify-content-center align-items-center reminder-circle primary-color rounded-pill' 
                    style={{ height:'60px', width:'60px'}}> 
                { text?.time } 
                </div>
                <div className='d-flex justify-content-center align-items-center reminder-text-title p-3'> { text?.title } </div>
            </div>
            {
                text?.reminders.map( (item, i) => 
                    <div className='reminder-text small p-1' key={i}> { item } </div>
                )
            }

        </div>
    )
  }
}
