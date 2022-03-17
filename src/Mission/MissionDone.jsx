import { Component } from "react";
import { Badge } from "react-bootstrap";

class MissionDone extends Component {


    render() {
        const { arrangeBy , done } = this.props;
        return(
            <>
            { done?.length ?  
                done?.map( mission => (  
                                        
                    <div key={mission.id} >
                        {mission.name} 
                        <Badge className='m-1' pill bg="info"> {arrangeBy==='tag' ? mission.date : mission.tag }  </Badge>
                        <Badge className='m-1' pill bg="info"> {mission.timeSpan} </Badge>
                    </div>
                ))
                : ''
            }
            </>
        )
                
    }
}
export default MissionDone;