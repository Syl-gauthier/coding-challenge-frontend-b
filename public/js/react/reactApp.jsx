import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
  }
  
  render() {
    return (<div>Belly</div>);
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


