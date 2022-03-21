import { Badge, Button } from "react-bootstrap";
import { Component } from "react";

class MissionUndone extends Component {
    
    renderModal = e => {
        e.preventDefault();
        const { allMissions }  = this.props
        
        let thisMission = e.target.value;
        const foundMissionIndex = allMissions.findIndex( mission => mission.id === thisMission )

        this.props.setState({
            modal: 'timer', 
            currentMissionIndex: foundMissionIndex
        
        })  

      }

    render() {
        const { arrangeBy, undone } = this.props;

        return(
        <>
        { undone?.length ?  
            undone?.map( mission => (                    
                <div key={mission.id} className="">
                    <input value={mission.id} onChange={this.props.removeMission} type='checkbox'  /> 
                    <span> {mission.name} </span>
                    <span>  </span>

                    <Badge className='m-1' pill bg="info"> {arrangeBy==='tag' ? mission.date : mission.tag }  </Badge>
                    <Badge className='m-1' pill bg="info"> {mission.timeSpan} </Badge>
                    <Button className='m-1' onClick={ this.renderModal } value={mission.id} size="sm">  start </Button>
                </div>
            )) : ''
        }

        </>
        )
            
    }
}
export default MissionUndone;