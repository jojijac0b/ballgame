import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/Header';
import john from './pics/john.png';
import sheff from './pics/sheff.png';
import joji from './pics/joji.png';

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
    switch (e.target.id) {
      case 'sheff':
        this.setState({
          character: sheff,
        })
        break;
      case 'john':
        this.setState({
          character: john,
        })
        break;
      case 'joji':
        this.setState({
          character: joji,
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
        <Header highscore={highscore}/>
        <Board cursor={cursor} foodStyle={foodStyle}/>
        <Dashboard
          reset={this.reset}
          score={this.state.score}
          toggleGameStarted={this.toggleGameStarted}
          changeCharacter={this.changeCharacter}
          joji={joji}
          john={john}
          sheff={sheff}
        />

      </div>
    );
  }
}






export default App;
