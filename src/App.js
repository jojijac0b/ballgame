import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import john from './john.png';
import sheff from './sheff.png';

class App extends Component {
  state = {
    x:0,
    y:0,
    foodX: 50,
    foodY: 50,
    score: 0,
    gameStarted: false,
    character: john,
  }

  componentWillMount() {
      document.addEventListener("keydown", this.onKeyPressed.bind(this));
  }

  componentWillUnmount() {
      document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  }

  onKeyPressed(e) {
    e.preventDefault();
    if(!this.state.gameStarted)return;
    switch (e.keyCode) {
      case 39:
        if(this.state.x+5 <= 460){
          this.setState({
            x: this.state.x+5,
          })
        }
        else{
          this.setState({
            x: 0,
          })
        }
        break;
      case 40:
        if(this.state.y+5 <= 260){
          this.setState({
            y: this.state.y+5,
          })
        }
        else{
          this.setState({
            y: 0,
          })
        }
        break;
      case 37:
        if(this.state.x-5 >= 0){
          this.setState({
            x: this.state.x-5,
          })
        }
        else{
          this.setState({
            x: 460,
          })
        }
        break;
      case 38:
        if(this.state.y-5 >= 0){
          this.setState({
            y: this.state.y-5,
          })
        }
        else{
          this.setState({
            y: 260,
          })
        }
        break;
      default:
    }

    if(this.state.x >= this.state.foodX-35 && this.state.x <= this.state.foodX+5 && this.state.y >= this.state.foodY+10 && this.state.y <= this.state.foodY+50){
      var x = 10+(Math.floor(Math.random() * 90))*5;
      var y = 10+(Math.floor(Math.random() * 43))*5;
      this.setState({
        score: this.state.score+10,
        foodX: x,
        foodY: y,
      })
    }
  }

  reset = () => {
    this.setState({
      score: 0,
    });
  }

  toggleGameStarted = () => {
    this.setState({
      gameStarted: !this.state.gameStarted,
    })
  }

  changeCharacter = (e) => {
    switch (e.target.src) {
      case sheff:
        this.setState({
          character: sheff,
        })
        break;
      case john:
        this.setState({
          character: john,
        })
        break;
      default:

    }
  }

  render() {
    var ballStyle = {
      width: '40px',
      height: '40px',
      borderRadius: '100px',
      position: 'relative',
      left: this.state.x,
      top: this.state.y,

    }

    var foodStyle = {
      width: '10px',
      height: '10px',
      backgroundColor: 'white',
      borderRadius: '100px',
      position: 'relative',
      left: this.state.foodX,
      top: this.state.foodY,
    }
    const cursor = <img src={this.state.character} className='ball' style={ballStyle}></img>
    const highscore = (localStorage.getItem('score'))? JSON.parse(localStorage.getItem('score')) : 0;

    return (
      <div className='container'>
        <header>
          <h3>Ball Guzzlerz</h3>
          <span>Press start and use the arrow keys to collect as many balls as you can in 30 seconds</span>
        </header>
        <div>
          High Score: {highscore}
        </div>
        <div className='board'>
          {cursor}
          <div className='food' style={foodStyle}></div>
        </div>
        <div className='dashboard'>
          <div className='score'>
            <label>Score: {this.state.score}</label>
          </div>
          <div className='timer'>
            <Timer reset={this.reset} score={this.state.score} toggleGameStarted={this.toggleGameStarted}/>
          </div>
          <div className='character-select'>
             <p>Character Select</p>
             <img onClick={this.changeCharacter} src={john} className='character'></img>
             <img onClick={this.changeCharacter} src={sheff} className='character'></img>
          </div>
        </div>
      </div>
    );
  }
}

class Timer extends React.Component {
  state = {
    time: 0,
  }


  startGame = () => {
    this.setState({
      gameStarted: true,
    })
    this.props.toggleGameStarted();
    window.start = setInterval(this.changeTime, 1000);
    document.getElementById('start-button').disabled = 'true';
  }


  changeTime = () => {
    if(this.state.time === 30){
      clearInterval(window.start);
      if(!(localStorage.getItem('score')) || this.props.score > JSON.parse(localStorage.getItem('score'))){
        window.alert('New High Score!!! ' + this.props.score)
        localStorage.setItem('score', JSON.stringify(this.props.score));
      }
      else {
        window.alert('Times up. You scored ' + this.props.score);
      }

      this.props.reset();
      this.props.toggleGameStarted();
      this.setState({
        time: 0,
      })
      document.getElementById('start-button').disabled = false;
    }
    else{
      this.setState({
        time: this.state.time+1,
      })
    }
  }

  render() {
    return (
      <div className='timer'>
        <div>Time: {this.state.time}</div>
        <button id='start-button' onClick={this.startGame}>Start</button>
      </div>
    )
  }
}



export default App;
