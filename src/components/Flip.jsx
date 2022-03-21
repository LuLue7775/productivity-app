import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import Tick from "@pqina/flip";
import "@pqina/flip/dist/flip.min.css";

export default class Flip extends Component {
    constructor(props) {
        super(props);
        this.secRef = React.createRef();
        this.minRef = React.createRef();
    }

    componentDidMount() {
        const { minutes, seconds } = this.props;
        
        this._secTickInstance = Tick.DOM.create(this.secRef.current, {
            value: seconds
        });

        this._minTickInstance = Tick.DOM.create(this.minRef.current, {
            value: minutes
        });
    }

    componentDidUpdate() {
        const { minutes, seconds } = this.props;

        if (!this._secTickInstance ) return;
        if (!this._minTickInstance ) return;
        this._secTickInstance.value = seconds;
        this._minTickInstance.value = minutes;
    }

    componentWillUnmount() {
        if (!this._secTickInstance) return;
        if (!this._minTickInstance ) return;

        Tick.DOM.destroy(this.secRef.current);
        Tick.DOM.destroy(this.minRef.current);
    }




  render() {
    const { minutes, seconds } = this.props;
    // console.log(minutes, seconds)

    return (
        <div className='tick-container container d-flex align-items-center' style={{width:'300px'}}>
            <div>
                <Row className='justify-content-center'>
                    <Col ref={this.minRef} className="tick justify-content-center" style={{fontSize:'3em'}} >
                        <div data-repeat="true" aria-hidden="true" data-transform="pad(00) -> split -> delay">
                            <span data-view="flip">min</span>
                        </div>
                    </Col>   

                    <Col ref={this.secRef} className="tick justify-content-center" style={{fontSize:'3em'}}>
                        <div data-repeat="true" aria-hidden="true" data-transform="pad(00) -> split -> delay">
                            <span data-view="flip">sec</span>
                        </div>
                    </Col>  
                </Row>
                
                <Row className='justify-content-center'>
                    <Col className='text-end'> min </Col>
                    <Col className='text-end'> sec </Col>
                </Row>
            </div>
        </div>
      )
  }
}
