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
        // console.log([this.state.prev_allMissions, mission_context.allMissions])

        if( this.state.prev_allMissions !== mission_context.allMissions 
            ||
             prevProps.arrangeBy !== this.props.arrangeBy
            ){
            this.renderContentWithFilter(mission_context.allMissions, mission_context.arrangeBy)

        }
    }
    
    // shouldComponentUpdate(nextProps, nextState) {
    //     let mission_context = this.context.state;
    //     const { allMissions } = this.context.state;
    //     console.log( allMissions)

    // //     if( this.state.prev_allMissions !== mission_context.allMissions ||
    // //         nextProps.arrangeBy !== this.props.arrangeBy
    // //        ){
    // //        this.renderContentWithFilter(mission_context.allMissions, mission_context.arrangeBy)
    // //        return true
    // //    }

    // //    return false
    //    return true
    // }

    add = () => {
        const { allMissions } = this.context.state;

        this.context.setState(()=>({ 
            allMissions:  [...allMissions, 
                {name: 'text', tag:'tag', mark:'undone', date:'2022/02/23', id: new Date().toISOString() }],
        }))
    }

    render() {
        const { groupedMissions, prev_allMissions } = this.state;
        const { allMissions } = this.context.state;
        // console.log( allMissions)


        return(
            <MissionsContext.Consumer>
            {
                ({ state, setState }) => {
                    const { allMissions, arrangeBy, now_mission_state } = state;
                    if (!allMissions) return null;
                    return (
                        <div className="mission_panel">
                            <div className=""> 
                            <button onClick={this.add}> ADD </button>

                            { groupedMissions.map(missionCollection => { 
                                // console.log(missionCollection)
                                return <Mission key={missionCollection[0]} missionCatgory={missionCollection[0]} 
                                    arrangeBy={arrangeBy} missionCollection={missionCollection} allMissions={allMissions} setState={setState}
                                    now_mission_state={now_mission_state}
                                    />
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
