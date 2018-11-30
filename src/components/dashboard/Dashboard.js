import React from 'react'
import Score from './Score'
import Timer from './Timer'
import CharacterSelect from './CharacterSelect'

const Dashboard = ({ score, reset, toggleGameStarted, changeCharacter, joji, john, sheff }) => {
  return (
    <div className='dashboard row'>
      <div className='col l6 m8 s8'>
        <Score score={score}/>
        <Timer reset={reset} score={score} toggleGameStarted={toggleGameStarted}/>
      </div>
      <div className='col l6 m4 s4'>
        <CharacterSelect changeCharacter={changeCharacter} joji={joji} john={john} sheff={sheff}/>
      </div>
    </div>
  )
}

export default Dashboard
