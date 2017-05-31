import React from 'react';
import ReactDOM from 'react-dom';
import postReq from '../lib/ajaxUtils.js';

//as this is a demo I decided not to dive into the geotag part and just take the two given for the challenge
var geotags = {
  newyork: 'dr5reg',
  montreal: 'f25dvk'
}

var content = {
  title: {eng: 'OSHEAGA!!', fr:'OSHEAGA!!'},
  submitButton: {eng: 'Start my search', fr:'Commencer ma recherche'},
  language: {eng: 'Language', fr:'Langue'},
  form: {
    submitButton: {eng: 'Start my search', fr:'Commencer ma recherche'},
    from: {eng: 'from', fr:'depuis'},
    to: {eng:'to', fr:'vers'}
  },
  results:{
    departureLoc: {eng: 'from', fr: 'de'},
    departureTime: {eng: 'departur time', fr: 'heure de départ'},
    arrivalLoc: {eng: 'at', fr: 'à'},
    arrivalTime: {eng: 'arrival time', fr: 'heure d\'arrivée'},
    price: {eng: 'price', fr: 'prix'}
  }
}



class App extends React.Component {
  constructor() {
    super();
    var strings = {};
    for (var key in content) {
      if (content[key]['fr']) strings[key] = content[key]['fr'];
      else {
        strings[key] = {};
        for (var entry in content[key]) {
          strings[key][entry] = content[key][entry]['fr'];
        }
      }
    }
    this.state = {
      language: 'fr',
      strings,
      results: null
    };
  }
    
  handleSubmission(data) {
    postReq('/query', data, function(response) {
      console.log(response);
      this.setState({results: JSON.parse(response)});
    }.bind(this));
  }
  
  setLang(language) {
    console.log(language);
    var strings = {};
    for (var key in content) {
      if (content[key][language]) strings[key] = content[key][language];
      else {
        strings[key] = {};
        for (var entry in content[key]) {
          strings[key][entry] = content[key][entry][language];
        }
      }
    }
    this.setState({
      language,
      strings
    });    
  }  
  
  render() {
    
    let results = null;
    if(this.state.results) {
      results = (
        <section className='results'>
          <Results strings={this.state.strings.results} results={this.state.results}/>
        </section>
        ); 
    }
    
    return (
      <div>
        <section className='input'>
          <LangSelect setLang={(language)=>this.setLang(language)} languageString={this.state.strings.language}></LangSelect>
          <Form onClick={(data)=>this.handleSubmission(data)} strings={this.state.strings.form}/>
        </section>
        {results}
      </div>
    );
  }
}

class Form extends React.Component {
  constructor() {
    super();
    this.state={
      start: geotags.newyork ,
      arrival: geotags.montreal
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }
  
  render() {
    return (
      <div className='form'>
        <label htmlFor='start'>{this.props.strings.from}:</label>
        <select onChange={this.handleChange} id='start' name='start' value={this.state.start}>
        <option value={geotags.newyork}>New-york</option>
        <option value={geotags.montreal}>Montréal</option>
        </select>
        <label htmlFor='arrival'>{this.props.strings.to}:</label>
        <select onChange={this.handleChange} id='arrival' name='arrival' value={this.state.arrival}>
        <option value={geotags.newyork}>New-york</option>
        <option value={geotags.montreal}>Montréal</option>
        </select>
        <button onClick={()=>this.props.onClick(this.state)}>{this.props.strings.submitButton}</button>
      </div>
      
    );
  }
}

class LangSelect extends React.Component {
  
  render() {
    return(
      <div className='lang-select'>
        <span>{this.props.languageString}: </span>
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
    let results = this.props.results.map(function(result) {
      return (
        <tr key={result.key}>
          <td>{result.departureLoc}</td>
          <td>{result.departureTime}</td>
          <td>{result.arrivalLoc}</td>
          <td>{result.arrivalTime}</td>
          <td>{result.price}</td>
        </tr>
      );
    })
    
    return (
      <table>
        <thead>
          <tr>
            <th>{this.props.strings.departureLoc}</th>
            <th>{this.props.strings.departureTime}</th>
            <th>{this.props.strings.arrivalLoc}</th>
            <th>{this.props.strings.arrivalTime}</th>
            <th>{this.props.strings.price}</th>
          </tr>
        </thead>
        <tbody>
            {results}
        </tbody>
      </table>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);



