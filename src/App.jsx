import { Component } from 'react';

import { ModalContext, MissionsContext } from './context/context';
import MissionPanel from './MissonPanel';
import Modal from './Modal/Modal';
import TagSelect from './TagSelect';

class App extends Component {

  state = {
    modal: null, // can be 'theme' or 'timer' or 'login'
    timer: '25:00', 
    arrangeBy: 'date',  // date or tag(work,soft skill,health,social life)
    allMissions: [
                  {name:'clean up', date:'2022/02/23', tag:'health', mark:'undone', timeSpan:'', id:'11' },
                  {name:'jogging', date:'2022/02/24', tag:'health', mark:'undone', timeSpan:'', id:'12' },
                  {name:'make ceramics', date:'2022/02/25', tag:'social life', mark:'undone', timeSpan:'', id:'13' },
                  {name:'call Kate', date:'2022/02/25', tag:'social life', mark:'undone', timeSpan:'', id:'14' },
                  {name:'walk cat', date:'2022/02/25', tag:'social life', mark:'undone', timeSpan:'', id:'15' },
                  {name:'finish app', date:'2022/02/26', tag:'work', mark:'undone', timeSpan:'', id:'16' },
                  {name:'leetcode', date:'2022/02/26', tag:'work', mark:'undone', timeSpan:'', id:'17' },
                  {name:'review notes', date:'2022/02/26', tag:'work', mark:'done', timeSpan:'', id:'18' },
                  {name:'algorithm', date:'2022/02/27', tag:'work', mark:'done', timeSpan:'', id:'19' },
                  {name:'practice with Elsa app', date:'2022/02/28', tag:'soft skill', mark:'undone', timeSpan:'', id:'20' },
                ]
    
  }
  
  renderModal = e => {
    e.preventDefault();
    this.setState({modal: 'timer'})  
  }

  shouldComponentUpdate(nextProps, nextState) {

    if(nextState.arrangeBy !== this.state.arrangeBy ||
        nextState.modal !== this.state.modal
      ){
      
      return true;
    }
    return false
  }

  render() {
    const { timer, arrangeBy } = this.state;
    const contextValue = {state: this.state, setState: this.setState.bind(this) }

    return (
      <ModalContext.Provider value={contextValue}>
        <MissionsContext.Provider value={contextValue}>
          <div className='app'>
            <button onClick={this.renderModal}> {timer} </button>
            <Modal/>
            <TagSelect arrangeBy={arrangeBy}/>
            
            
            <MissionPanel arrangeBy={arrangeBy} />
          </div>

        </MissionsContext.Provider>
      </ModalContext.Provider>
    )
  }
}
export default App;