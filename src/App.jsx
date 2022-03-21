import { Component } from 'react';
import Dashboard from './components/Dashboard';

import { ModalContext, MissionsContext } from './context/context';
import MissionPanel from './MissonPanel';
import Modal from './Modal/Modal';

class App extends Component {

  state = {
    modal: null, // can be 'theme' or 'timer' or 'login'
    timer: 'timer', 
    currentMissionIndex:'',
    arrangeBy: 'date',  // date or tag(work,soft skill,health,social life)
    allMissions: [
      {name:'clean up', date:'2022/02/23', tag:'health', mark:'undone', timeSpan:25, id:'11' },
      {name:'jogging', date:'2022/02/24', tag:'health', mark:'undone', timeSpan:0, id:'12' },
      {name:'make ceramics', date:'2022/02/25', tag:'social life', mark:'done', timeSpan:0, id:'13' },
      {name:'call Kate', date:'2022/02/25', tag:'social life', mark:'undone', timeSpan:0, id:'14' },
      {name:'walk cat', date:'2022/02/25', tag:'social life', mark:'undone', timeSpan:0, id:'15' },
      {name:'finish app', date:'2022/02/26', tag:'work', mark:'undone', timeSpan:0, id:'16' },
      {name:'leetcode', date:'2022/02/26', tag:'work', mark:'undone', timeSpan:0, id:'17' },
      {name:'review notes', date:'2022/02/26', tag:'work', mark:'done', timeSpan:0, id:'18' },
      {name:'algorithm', date:'2022/02/27', tag:'work', mark:'done', timeSpan:0, id:'19' },
      {name:'practice with Elsa app', date:'2022/02/28', tag:'soft skill', mark:'undone', timeSpan:0, id:'20' },
    ],
    
  }
  
  renderModal = e => {
    e.preventDefault();
    this.setState({modal: 'timer'})  
  }

  shouldComponentUpdate(nextProps, nextState) {

    if(nextState.arrangeBy !== this.state.arrangeBy ||
      nextState.allMissions !== this.state.allMissions ||
      nextState.currentMissionIndex !== this.state.currentMissionIndex ||
        nextState.modal !== this.state.modal
      ){
      
      return true;
    }
    return false
    return true;
  }

  render() {
    const { timer, arrangeBy } = this.state;
    const contextValue = {state: this.state, setState: this.setState.bind(this) }

    return (
      <ModalContext.Provider value={contextValue}>
        <MissionsContext.Provider value={contextValue}>
          <div className='app'>
            <Dashboard/> 
            
            <MissionPanel arrangeBy={arrangeBy} />

            <Modal/>
          </div>

        </MissionsContext.Provider>
      </ModalContext.Provider>
    )
  }
}
export default App;