import React from 'react';
import ReactDOM from 'react-dom';
import postReq from '../lib/ajaxUtils.js';

//as this is a demo I decided not to dive into the geotag part and just take the two given for the challenge
var geotags = {
  newyork: 'dr5reg',
  montreal: 'f25dvk'
}

var content = {
  title: {eng: 'OSHEAGA!!', fr:'OSHEAGA'},
  submitButton: {eng: 'Start my search', fr:'Commencer ma recherche'}
}



class App extends React.Component {
  constructor() {
    super();
      var strings = Object.keys(content).reduce(function(object ,key) {
      object[key] = content[key]['fr'];
      return object;
    }, {});
    this.state = {
      language: 'fr',
      strings
    };
  }
    
  handleSubmission(data) {
    postReq('/query', data, function(response) {
      console.log(response);
    });
  }
  
  setLang(language) {
    console.log(language);
    var strings = Object.keys(content).reduce(function(object ,key) {
      object[key] = content[key][language];
      return object;
    }, {});
    this.setState({
      language,
      strings
    });    
  }
  
  render() {
    return (
      <div>
        <LangSelect setLang={(language)=>this.setLang(language)}></LangSelect>
        <Form onClick={(data)=>this.handleSubmission(data)} submitButton={this.state.strings.submitButton}/>
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
        <button onClick={()=>this.props.onClick(this.state)}>{this.props.submitButton}</button>
      </div>
      
    );
  }
}

class LangSelect extends React.Component {
  
  render() {
    return(
      <div className='lang-select'>
        <button onClick ={()=>this.props.setLang('fr')}>Fr</button>
        <button onClick ={()=>this.props.setLang('eng')}>Eng</button>
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



