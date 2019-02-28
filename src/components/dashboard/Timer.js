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
      
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');      
      
      fbq('trackCustom', 'PlayGame', { score: this.props.score });

      
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
