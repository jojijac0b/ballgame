import React from 'react'

const Board = ({ cursor, foodStyle }) => {
  return (
    <div className='board'>
      {cursor}
      <div className='food' style={foodStyle}></div>
    </div>
  )
}


export default Board;
