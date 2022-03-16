import { Component } from "react";
import { ModalContext } from "../context/context";
import ModalTimer from "./ModalTimer";

class Modal extends Component {
    
    renderContent = (state, setState) => {
        const { modal, allMissions, now_mission_state } = state;
console.log(allMissions)
        switch (modal){
            case 'timer':
                return <ModalTimer allMissions={allMissions} now_mission_state={now_mission_state} setState={setState}/>
            default:
                return null;
        }
    }

    render() {

        return(
            <ModalContext.Consumer>
            {
                ({ state, setState }) => {
                    
                    if (!state.modal) return null;
                    return (
                        <div className="modal">
                            <div className="modal_content"> { this.renderContent(state, setState) } </div>
                        </div>
                    )
                }
            }
            </ModalContext.Consumer>
        )
    }
}

export default Modal;
