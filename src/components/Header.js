import React from 'react'

const Header = ({ highscore }) => {
  return (
    <div>
      <header>
        <h5>Ball Game</h5>
        <label>Press start and use the arrow keys to collect as many balls as you can in 30 seconds</label>
      </header>
      <div className="highscore">
        High Score: {highscore}
      </div>
    </div>
  )
}

export default Header
