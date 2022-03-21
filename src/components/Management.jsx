import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import TagSelect from '../TagSelect'
import MissionPanel from '../MissonPanel'
import MissionAdd from '../Mission/MissionAdd'

export default class Management extends Component {

  render() {
    const { arrangeBy, allMissions, setState } = this.props;
    return (
      <>
        <Container className="management" >
            <div className='border-top border-1 rounded p-4 d-flex'>
              
              <div className='d-flex flex-column flex-grow-1 m-4'>
                <span className='py-1 text-muted small' > Have reached your work-life balance? <br/>Create a new task for evaluation!</span>
                { arrangeBy === 'date' &&
                    <MissionAdd 
                      allMissions={allMissions} 
                      arrangeBy={arrangeBy} 
                      setState={setState}/>
                  }
              </div>

              <div  className='d-flex flex-column m-4 ' style={{ width:'200px'}} >
                <span className='py-1 text-muted small'> Arrange by </span>
                <TagSelect arrangeBy={arrangeBy} />
              </div>
            </div>
        </Container>
      
        
      </>
    )
  }
}
