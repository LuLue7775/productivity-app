import  { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MissionsContext } from "./context/context";
import Mission from "./Mission";
import MissionAdd from "./Mission/MissionAdd";
import Management from "./components/Management";

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

    render() {
        const { groupedMissions, prev_allMissions } = this.state;
        const { allMissions } = this.context.state;

        return(
            <MissionsContext.Consumer>
            {
                ({ state, setState }) => {
                    const { allMissions, arrangeBy, currentMissionIndex } = state;
                    if (!allMissions) return null;
                    return (
                        <Container className="mission-panel">

                            <Management 
                                allMissions={allMissions} 
                                arrangeBy={arrangeBy} 
                                setState={setState}
                            />

                            
                            <Row xs={1} md={2} lg={3} className="g-4 my-4" >          
                                { groupedMissions.map(missionCollection => { 
                                    return (
                                        <Col className="" key={missionCollection[0]} >
                                            <Mission 
                                                missionCollection={missionCollection} 
                                                missionCatgory={missionCollection[0]} 
                                                arrangeBy={arrangeBy} 
                                                allMissions={allMissions} 
                                                setState={setState}
                                                currentMissionIndex={currentMissionIndex}
                                                />
                                        </Col>
                                        ) })
                                } 
                            </Row>
                        </Container>
                    )
                }
            }
            </MissionsContext.Consumer>
        )
    }
}

MissionPanel.contextType = MissionsContext;
export default MissionPanel;
