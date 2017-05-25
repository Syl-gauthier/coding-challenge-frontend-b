import React from 'react';
import ReactDOM from 'react-dom';


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
  
  handleSubmission() {
    console.log('submissionHandled');
  }
  
  render() {
    return (
      <div>
        <Form onSubmit={()=>this.handleSubmission()}/>
        <Results />
      </div>
    );
  }
}

class Form extends React.Component {
  constructor() {
    super();
    this.state={
      start: '',
      arrival:''
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
      <form action='/query' method='post' onSubmit={() => this.props.onSubmit()}>
        <select onChange={this.handleChange} id='start' value={this.state.start}>
          <option value='newyork'>New-york</option>
          <option value='montreal'>Montréal</option>
         </select>
        <select onChange={this.handleChange} id='arrival' value={this.state.arrival}>
          <option value='newyork'>New-york</option>
          <option value='montreal'>Montréal</option>
         </select>
        <input type='submit' value='Submit' ></input>
      </form>
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



