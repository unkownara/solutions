import React, { Component } from 'react';
import NavBar from './Components/NavBar';
import "semantic-ui-css/semantic.css";
import './App.css';
import MainFeed from './Components/MainFeed';

class App extends Component {
  render() {
    return (
      <div className="root"> 
        <div className="content">
          <NavBar />
          <MainFeed />
        </div>
      </div>
    );
  }
}

export default App;
