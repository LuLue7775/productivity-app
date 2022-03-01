import { Component } from "react";


class MissionAdd extends Component {
    state = {
        tagOpts:[ 
            {label:'work', id:'0'},
            {label:'soft skill', id:'1'},
            {label:'health', id:'2'},
            {label:'social life', id:'3'}
        ],
        tag:'work', //default
        text:'',
    }

    changeSelected = e => {
        this.setState({
            tag:  e.target.value
        })
    }

    onTextInput = e => {
        this.setState({
            text:  e.target.value
        })
    }

    getFormattedDate = () => {
        let date = new Date().toISOString();

        return date.slice(0, date.indexOf('T'))
    }

    addMission = e => {
        e.preventDefault();
        const { text, tag } = this.state;
        const { arrangeBy, missionCatgory } = this.props;

        if (arrangeBy === 'date') this.props.setState((state)=>
            ({ allMissions:  [...state.allMissions, {name: text, tag:tag, mark:'undone', date:this.getFormattedDate(), id: new Date().toISOString() }] }) )
        else if (arrangeBy === 'tag') this.props.setState((state)=>
            ({ allMissions:  [...state.allMissions, {name: text, tag:missionCatgory, mark:'undone', date:this.getFormattedDate(), id: new Date().toISOString() }] }) )
        
        this.setState({ text:''});
    }

    compareCollect = ( next, current ) => {
        const result = next.filter((nextItem) => !current.find(currentItem => nextItem.name === currentItem.name )) 
        if (result.length) return true;
        return false;
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        const { missionCollection } = this.props;
        const shouldUpdate =  this.compareCollect(nextProps.missionCollection, missionCollection ) ;

        if (nextState.text !== this.state.text){
            return true;
        } 
        if ( shouldUpdate ) {
            return true;
        }
        return false;

    }

    render() {
        const { text, tag, tagOpts} = this.state;
        const { arrangeBy, allMissions, missionCatgory } = this.props;

        return (  
        <form onSubmit={this.addMission}>
            <input type='text' value={text} onChange={this.onTextInput }/>

            { arrangeBy==='date'
                ? 
                    <select value={tag} onChange={this.changeSelected}> 
                    {tagOpts.map(opt => (
                            <option key={opt.id} value={opt.label} >
                                {opt.label}
                            </option>
                    ))}
                    </select>
                : ''
            }
            <button type='submit' > Submit </button>
        </form>

        )
    }
}

export default MissionAdd;