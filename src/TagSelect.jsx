import { Component } from "react";
import { MissionsContext } from "./context/context";

class TagSelect extends Component {

    state = {
        selected:''
    }

    changeSelected = e => {
        // console.log( e.target.value )
        this.setState({ 
            selected: e.target.value 
        })


    }
    
    componentDidUpdate(prevProps, prevState) {   
        const { selected } = this.state;

        if(prevState.selected !== selected) {
            this.context.setState({
                arrangeBy: selected
            })
        }
        return false
    }

    render(){
        const { selected } = this.state;
        return(
            <MissionsContext.Consumer>
                {()=>
                    <select value={selected} onChange={this.changeSelected}>
                        <option key='date' value='date'> date </option>
                        <option key='tag' value='tag'> tag </option>
                        
                    </select>
                }

            </MissionsContext.Consumer>
        )
    }
}
TagSelect.contextType = MissionsContext;


export default TagSelect;