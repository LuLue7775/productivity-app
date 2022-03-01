import { Component } from "react";
import MissionAdd from "./Mission/MissionAdd";
import MissionDoneAndUndone from "./Mission/MissionDoneAndUndone";


class Mission extends Component {


    render() {
        const { missionCatgory, missionCollection, allMissions, arrangeBy, setState } = this.props;
        // console.log(missionCollection)
        return (
            <div className="mission_container">
                <h2> { missionCollection[0] } </h2> 
                <MissionAdd allMissions={allMissions} missionCatgory={missionCatgory} missionCollection ={missionCollection[1]} 
                    arrangeBy={arrangeBy} setState={setState}/>

                { missionCollection[1].length 
                    ?  <MissionDoneAndUndone 
                            missionCollection ={missionCollection[1]} 
                            arrangeBy={arrangeBy}
                            setState={setState}
                        />
                    : ''
                }

            </div>

        )
    }
}
export default Mission;