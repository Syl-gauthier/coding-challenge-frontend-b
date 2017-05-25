import React from 'react';
import ReactDOM from 'react-dom';
import postReq from '../lib/ajaxUtils.js';

//as this is a demo I decided not to dive into the geotag part and just take the two given for the challenge
var geotags = {
  newyork: 'dr5reg',
  montreal: 'f25dvk'
}

var contend = {
  title: {en: 'OSHEAGA!!', fr:'OSHEAGA'},
  submitButton: {en: 'Start my search', fr:'Commencer ma recherche'}
}



class App extends React.Component {
  constructor() {
    super();
  }
  
  handleSubmission(data) {
    postReq('/query', data, function(response) {
      console.log(response);
    });
  }
  
  render() {
    return (
      <div>
        <Form onClick={(data)=>this.handleSubmission(data)}/>
        <Results />
      </div>
    );
  }
}

class Form extends React.Component {
  constructor() {
    super();
    this.state={
      start: 'newyork',
      arrival:'montreal'
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    console.log(event.target.value);
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }
  
  render() {
    return (
      <div>
        <select onChange={this.handleChange} id='start' name='start' value={this.state.start}>
        <option value='newyork'>New-york</option>
        <option value='montreal'>Montréal</option>
        </select>
        <select onChange={this.handleChange} id='arrival' name='arrival' value={this.state.arrival}>
        <option value='newyork'>New-york</option>
        <option value='montreal'>Montréal</option>
        </select>
        <button onClick={()=>this.props.onClick(this.state)}>Submit</button>
      </div>
      
    );
  }
}

class Results extends React.Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>Here stands the results</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);



