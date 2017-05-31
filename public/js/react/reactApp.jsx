import React from 'react';
import ReactDOM from 'react-dom';
import postReq from '../lib/ajaxUtils.js';
import dateConvert from '../lib/dateConvert.js';

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
  },
  intro: {
    eng: (
      <p>This website has been build to complete the <a href='https://github.com/busbud/coding-challenge-frontend-b'>busbud coding challenge frontend b</a>. I have done this challenge as a training and to discover the react.js framework.<br />
      If you found this website and feel the need to contact me for any reasons, you can send me a mail at sylvain.gauthier.2012@gmail.com, you can also come and read (and eventually comment or improve) the source code of this webpage <a href='https://github.com/Syl-gauthier/coding-challenge-frontend-b'>here</a>. <br />
      Thanks for visiting !!</p>
    ),
    fr: (
      <p>Ce site web a été créé dans le but de faire le <a href='https://github.com/busbud/coding-challenge-frontend-b'>busbud coding challenge frontend b</a>. J'ai fait ce 'défi' dans le but de m'entrainer et de découvrir react.js.<br />
      Si vous avez trouvé cette page et souhaitez me contacter pour une quelconque raison, vous pouver m'envoyer un email à sylvain.gauthier.2012@gmail.com, vous pouvez aussi venir lire (et éventuellement commenter et améliorer) le code source de cette page  <a href='https://github.com/Syl-gauthier/coding-challenge-frontend-b'>ici</a>. <br />
      Merci de votre visite !!</p>
    )
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
          <Results strings={this.state.strings.results} results={this.state.results} lang={this.state.language}/>
        </section>
        ); 
    }
    
    return (
      <div>
        <section className='intro'>
          {this.state.strings.intro}
        </section>
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
          <td>{dateConvert.convert(result.departureTime, this.props.lang)}</td>
          <td>{result.arrivalLoc}</td>
          <td>{dateConvert.convert(result.arrivalTime, this.props.lang)}</td>
          <td>{result.price}</td>
        </tr>
      );
    }.bind(this))
    
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



