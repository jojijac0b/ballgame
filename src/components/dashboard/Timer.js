import React, { Component } from 'react'

class Timer extends Component {
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
        <p>Time: {this.state.time}</p>
        <button className="btn" id='start-button' onClick={this.startGame}>Start</button>
      </div>
    )
  }
}

export default Timer;
