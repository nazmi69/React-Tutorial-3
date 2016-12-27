import React, { Component } from 'react';
import './App.css';

var uuid = require('uuid');
var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyD8Ge6Is2-AyL_tJnDFv97zUx2b4dnCidQ",
  authDomain: "react-app-3864c.firebaseapp.com",
  databaseURL: "https://react-app-3864c.firebaseio.com",
  storageBucket: "react-app-3864c.appspot.com",
  messagingSenderId: "86359649773"
};

firebase.initializeApp(config);

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      "id" : uuid.v1(),
      "name" : "",
      "answers" : {
        "q1" : ""
      },
      "submitted" : false
    }

    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  handleNameSubmit (event) {
    var name = this.refs.name.value;
    this.setState({ name : name }, function () {
      console.log(this.state);
    });
    
    event.preventDefault();
  }

  handleQuestionSubmit (event) {

    firebase.database().ref('surveys/' + this.state.id).set({
      name: this.state.name,
      answers: this.state.answers
    });

    this.setState({ submitted: true}, function () {
      console.log(this.state);
      console.log("Questions Submitted...");
    });

    event.preventDefault();
  }

  handleQuestionChange (event) {
    var answer = this.state.answers;
    if ( event.target.name == "q1") {
      answer.q1 = event.target.value;
    }

    this.setState({answers : answer}, function () {
      console.log(this.state);
    });
  }

  render() {

    var user;
    var questions;

    if (this.state.name && this.state.submitted === false) {
      user = 
        <span>
          <h2>Welcome, { this.state.name } </h2>
        </span>;

      questions = 
        <span>
          <form onSubmit={ this.handleQuestionSubmit.bind(this) }>
            <div>
              <label>What is your favourite operating system? </label> <br />
              <input type="radio" name="q1" value="windows" onChange={ this.handleQuestionChange } />Windows <br />
              <input type="radio" name="q1" value="linux" onChange={ this.handleQuestionChange } />Linux <br />
              <input type="radio" name="q1" value="unix" onChange={ this.handleQuestionChange } />Unix <br />
              <input type="radio" name="q1" value="osx" onChange={ this.handleQuestionChange } />OSX <br />
              <input type="radio" name="q1" value="solaris" onChange={ this.handleQuestionChange } />Solaris <br />
              <input type="radio" name="q1" value="other" onChange={ this.handleQuestionChange } />Other <br />
            </div>
            <input type="submit" onClick={ this.handleQuestionSubmit.bind(this) } value="Submit" />
          </form>
        </span>;
    } else if (!this.state.name && this.state.submitted === false) {
      user = 
        <span>
          <h2>Please enter your name to continue: </h2>
          <form onSubmit={ this.handleNameSubmit.bind(this) }>
            <input type="text" placeholder="Your name..." ref="name" />
          </form>
        </span>;

      questions = '';
    } else if (this.state.submitted === true) {
      user = 
        <span>
          <h2>Thank you, { this.state.name }</h2>
        </span>;
    }

    return (
      <div className="App">
        <div className="App-header text-center">
          <h2>Simple Survey</h2>
        </div>
        <div className="text-center">
          { user }
        </div>
        <div className="container">
          { questions }
        </div>
      </div>
    );
  }
}

export default App;
