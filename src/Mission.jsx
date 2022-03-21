import { Component } from "react";
import { Card, Tabs, Tab } from "react-bootstrap";
import MissionAdd from "./Mission/MissionAdd";
import MissionDone from "./Mission/MissionDone";
import MissionUndone from "./Mission/MissionUndone";

class Mission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: this.props.missionCollection[1].filter( item => item.mark === 'done' ),
            undone: this.props.missionCollection[1].filter( item => item.mark === 'undone' ),
        }
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

    // updateMissions = () => {
    //     const { missionCollection } = this.props;
        

    //     this.setState(()=>({ 
    //         done: missionCollection.filter( item => item.mark === 'done' ),
    //         undone: missionCollection.filter( item => item.mark === 'undone' )
    //     }))     

    //     this.props.setState(()=>({
    //         missionCollection: missionCollection
    //     }))
        
    // }

    // componentDidMount() {
    //     this.updateMissions()
    // }

    // componentDidUpdate(prevProps, prevState) {      
    //     if( prevProps.missionCollection !== this.props.missionCollection){
    //         // console.log(this.props.missionCollection)
    //         this.updateMissions()
    //     }
    // }

    // shouldComponentUpdate(nextProps, nextState) { }

    render() {
        const { missionCatgory, missionCollection, allMissions, arrangeBy, setState, currentMissionIndex } = this.props;
        const { undone, done } = this.state;

        
        return ( 
            <Card className="mission-card" style={{ height:'400px'}}>
                <Card.Header> { missionCollection[0] } </Card.Header>
                <Card.Body className="overflow-auto">
                    <Tabs       
                        defaultActiveKey="todo"
                        className="mb-3"
                    >

                        <Tab title="todo" eventKey="todo">
                        { missionCollection[1].length 
                            ?  <MissionUndone
                                    undone={undone}
                                    removeMission={this.removeMission}
                                    arrangeBy={arrangeBy}
                                    setState={setState}
                                    currentMissionIndex={currentMissionIndex}
                                    allMissions={allMissions}
                                />
                            : ''
                        }
                        </Tab>

                        <Tab title="done" eventKey="done">
                        { missionCollection[1].length 
                            ?  <MissionDone
                                    done={done}
                                    arrangeBy={arrangeBy}
                                />
                            : ''
                        }
                        </Tab>
                        
                        { arrangeBy === 'tag' &&
                        <Tab title="add tasks" eventKey="add"> 
                            <MissionAdd allMissions={allMissions} 
                                missionCatgory={missionCatgory} missionCollection ={missionCollection[1]} 
                                arrangeBy={arrangeBy} setState={setState}/>

                        </Tab>
                        }
                    </Tabs>
 

                </Card.Body>
            </Card>

        )
    }
}
export default Mission;