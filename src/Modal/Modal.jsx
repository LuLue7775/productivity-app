import { Component } from "react";
import { ModalContext } from "../context/context";
import ModalTimer from "./ModalTimer";

class Modal extends Component {
    
    renderContent = (state, setState) => {
        const { modal, allMissions, currentMissionIndex } = state;

        switch (modal){
            case 'timer':
                return <ModalTimer 
                            modal={modal} 
                            allMissions={allMissions} 
                            currentMissionIndex={currentMissionIndex} 
                            setState={setState}
                        />
            default:
                return null;
        }
    }

    render() {

        return(
            <ModalContext.Consumer>
            {
                ({ state, setState }) => {
                    
                    
                    return (
                        state.modal ?
                        <div className="modal">
                            <div className="modal_content"> { this.renderContent(state, setState) } </div>
                        </div>
                        : ''
                    )
                }
            }
            </ModalContext.Consumer>
        )
    }
}

export default Modal;
