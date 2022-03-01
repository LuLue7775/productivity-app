import { Component } from "react";
import { ModalContext } from "../context/context";
import ModalTimer from "./ModalTimer";

class Modal extends Component {
    
    renderContent = (modal, setState) => {
        switch (modal){
            case 'timer':
                return <ModalTimer setState={setState}/>
            default:
                return null;
        }
    }

    render() {
        return(
            <ModalContext.Consumer>
            {
                ({ state, setState }) => {
                    const { modal } = state;
                    if (!modal) return null;
                    return (
                        <div className="modal">
                            <div className="modal_content"> { this.renderContent(modal, setState) } </div>
                        </div>
                    )
                }
            }
            </ModalContext.Consumer>
        )
    }
}

export default Modal;
