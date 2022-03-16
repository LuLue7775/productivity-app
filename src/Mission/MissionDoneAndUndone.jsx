import { Component } from "react";
import { ModalContext } from "../context/context";


class MissionDoneAndUndone extends Component {
    
    state = {
        done:[],
        undone:[]
    }


    removeMission = e => {
        const { undone, done } = this.state;
        const toRemove = e.target.value;
        
        const doneMissionIndex = undone.findIndex( (mission, i) => (mission.id).toString() === toRemove  )
        
        undone[doneMissionIndex].mark = 'done';
        done.push( undone[doneMissionIndex] )
        undone.splice( doneMissionIndex, 1  )

        this.setState({
            done: done,
            undone: undone,
        })
    }

    updateMissions = () => {
        const { missionCollection } = this.props;

        this.setState(()=>({ 
            done: missionCollection.filter( item => item.mark === 'done' ),
            undone: missionCollection.filter( item => item.mark === 'undone' )
        }))     
        
    }

    componentDidMount() {
        this.updateMissions()
    }

    componentDidUpdate(prevProps, prevState) {      
          
        if( prevProps.missionCollection !== this.props.missionCollection){
            // console.log(this.props.missionCollection)
            this.updateMissions()
        }
    }

    startTimer = e => {
        e.preventDefault();
        const { now_mission_state, setState } = this.props;
        // console.log(e.target.value)
        // setState(()=>({
        //     now_mission_state: missionName
        // }))
    }

    renderModal = e => {
        e.preventDefault();
        console.log(e.target.value)
        this.context.setState({
            modal: 'timer', 
            now_mission_state: ''
        
        })  

      }

    render() {
        const { arrangeBy  } = this.props;
        const { done, undone } = this.state;
        // console.log([ done, undone])

        return (
        <ModalContext.Consumer>
            {
            ({ state, setState }) => {

                return(
                    <>
                    <h3> Todos </h3>
                    <ul className="missions">
                        <h3>TODO</h3>
                        { undone.length &&  
                            undone.map( mission => (                    
                                <li key={mission.id} >
                                    <input value={mission.id} onChange={this.removeMission} type='checkbox'  /> 
                                    <span> {mission.name} </span>
                                    <span> {arrangeBy==='tag' ? mission.date : mission.tag } </span>
                                    <button onClick={ this.renderModal } value={mission.id}> {`>`} </button> 
                                    <span>{mission.timeSpan}</span>
                                </li>
                            ))
                        }
                        <h3>DONE</h3>
                        { done.length &&  
                            done.map( mission => (                    
                                <li key={mission.id} >
                                    {mission.name} 
                                </li>
                            ))
                        }
                    </ul>
                </>
                )
                    
            }}
        </ModalContext.Consumer>
        )
    }
}
MissionDoneAndUndone.contextType = ModalContext;
export default MissionDoneAndUndone;