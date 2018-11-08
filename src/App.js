import React, { Component } from 'react';
import './App.css';
import TaskList from './components/TaskList';
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
      <div className="App">
        <TaskList firebase = {firebase} />
      </div>
    );
  }
}

export default App;
