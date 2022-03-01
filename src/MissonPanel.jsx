import  { Component } from "react";
import { MissionsContext } from "./context/context";
import Mission from "./Mission";


class MissionPanel extends Component {
    
    state = {
        groupedMissions: [], //split allMission by arrangeBy
        prev_allMissions: [] // for componentDidUpdate to check rerender
    }

    /**
     *  This is ran on both componentDidMount and componentDidUpdate to get filtered mission. 
     * @param {*} allMissions 
     * @param {*} arrangeBy 
     */
    renderContentWithFilter = (allMissions, arrangeBy) => {   

        const filteredResult =  allMissions.reduce((result, item) => ({
            ...result, 
            [item[arrangeBy]]: [...(result[item[arrangeBy]] || [] ), item ]
        })
        , {} ) 

        const filteredArr =  Object.entries( filteredResult ).map(([key,value]) => {
            return( [key,value] )
        })


        let mission_context = this.context.state;

        this.setState({ 
            groupedMissions: filteredArr,
            prev_allMissions: mission_context.allMissions    
        })
        // console.log(filteredArr)
    }

    componentDidMount() {
        let mission_context = this.context.state;
        this.renderContentWithFilter(mission_context.allMissions, mission_context.arrangeBy)

    }

    componentDidUpdate(prevProps, prevState) {
        let mission_context = this.context.state;
 
        if( this.state.prev_allMissions !== mission_context.allMissions ||
             prevProps.arrangeBy !== this.props.arrangeBy
            ){
            this.renderContentWithFilter(mission_context.allMissions, mission_context.arrangeBy)
        }
    }

    render() {
        const { groupedMissions } = this.state;
        
        // console.log(prev_allMissions)
        return(
            <MissionsContext.Consumer>
            {
                ({ state, setState }) => {
                    const { allMissions, arrangeBy } = state;
                    if (!allMissions) return null;
                    return (
                        <div className="mission_panel">
                            <div className=""> 

                            { groupedMissions.map(missionCollection => { 
                                // console.log(missionCollection)
                                return <Mission key={missionCollection[0]} missionCatgory={missionCollection[0]} 
                                    arrangeBy={arrangeBy} missionCollection={missionCollection} allMissions={allMissions} setState={setState}/>

                            })
                            
                            } 

                            </div>
                        </div>
                    )
                }
            }
            </MissionsContext.Consumer>
        )
    }
}

MissionPanel.contextType = MissionsContext;
export default MissionPanel;
