import { Component } from "react";


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
// console.log(missionCollection)
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

    render() {
        const { missionCollection, arrangeBy, setState  } = this.props;
        const { done, undone } = this.state;
        // console.log([ done, undone])

        return (
        <>
            <h3> Todos </h3>
            <ul className="missions">
                <h3>TODO</h3>
                { undone.length &&  
                    undone.map( mission => (                    
                        <li key={mission.id} >
                            <input value={mission.id} onChange={this.removeMission} type='checkbox'  /> 
                            {mission.name} 
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
    }
}

export default MissionDoneAndUndone;