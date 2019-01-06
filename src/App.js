import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import TaskList from './components/TaskList';
import TaskHistory from './components/TaskHistory';
import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCej1LusZIBdl1xe_wVF0spyhn1nCLpSbI",
  authDomain: "blocitoff-1234.firebaseapp.com",
  databaseURL: "https://blocitoff-1234.firebaseio.com",
  projectId: "blocitoff-1234",
  storageBucket: "blocitoff-1234.appspot.com",
  messagingSenderId: "524945328528"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
              <ul className="nav justify-content-end">
                <li className="nav-item">
                  <a href="/taskhistory" className="nav-link">Task History </a>
                </li>
                <li className="nav-item">
                  <a href="/tasklist" className="nav-link">Active Tasks </a>
                </li>
              </ul>
            <header>
              <h1>Blocitoff</h1>
            </header>
            <main>
              <div className="container">
                <Route exact path="/" component={() => <TaskList firebase={firebase} />} />
                <Route path="/taskhistory" component={() => <TaskHistory firebase={firebase} />} />
                <Route path="/tasklist" component={() => <TaskList firebase={firebase} />} />
              </div>
            </main>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
