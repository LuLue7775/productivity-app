import { Component } from "react";
import { Form, Button, } from "react-bootstrap";


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
        const { arrangeBy, allMissions } = this.props;

        if (arrangeBy === 'date') {
            this.props.setState(()=>
                ({ allMissions:  [...allMissions, 
                                    {   name: text, 
                                        date:this.getFormattedDate(), 
                                        tag:tag, 
                                        mark:'undone', 
                                        timeSpan:0, 
                                        id: new Date().toISOString(),
                                    } ],
               }) 
            )
        } else if (arrangeBy === 'tag'){ this.props.setState(()=>
            ({ allMissions:  [...allMissions, 
                                { name: text, 
                                  tag:this.props.missionCatgory, 
                                  mark:'undone', 
                                  date:this.getFormattedDate(),
                                  timeSpan:0, 
                                  id: new Date().toISOString() }] 
            }) 
        )}
        
        this.setState({ text:''});
    }

    // compareCollect = ( next, current ) => {
    //     const result = next.filter((nextItem) => !current.find(currentItem => nextItem.id === currentItem.id )) 
    
    //     if (result.length) return true;
    //     return false;
    // }
    
    // shouldComponentUpdate(nextProps, nextState) {
    //     const { tag } = this.state;
    //     const { missionCollection, allMissions } = this.props;
    //     const shouldUpdate =  this.compareCollect(nextProps.missionCollection, missionCollection ) ;

    //     if (nextState.text !== this.state.text ||
    //         nextState.tag !== this.state.tag
    //         ){
    //         return true;
    //     } 
    //     if ( shouldUpdate ) {            
    //         return true;
    //     }
    //     return false;
        
    // }

    render() {
        const { text, tag, tagOpts} = this.state;
        const { arrangeBy } = this.props;
        return (  
        <Form onSubmit={this.addMission}>
            <Form.Group >
                <Form.Control type="text" placeholder="Enter tasks" value={text} onChange={this.onTextInput }/>
                    { arrangeBy==='date'
                        ? (
                        <Form.Select value={tag} onChange={this.changeSelected} className='my-2'>
                            {tagOpts.map(opt => (
                                <option key={opt.id} value={opt.label} >
                                    {opt.label}
                                </option>
                            ))}
                        </Form.Select>
                        ) :''
                    }
                    <Button variant="dark" type="submit" className="my-2"> add task</Button>
            </Form.Group>
        </Form>

        )
    }
}

export default MissionAdd;