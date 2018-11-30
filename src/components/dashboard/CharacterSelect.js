import React from 'react'

const CharacterSelect = ( { changeCharacter, joji, john, sheff }) => {
  return (
    <div className='character-select'>
       <p>Character Select</p>
       <img id="joji" onClick={changeCharacter} src={joji} className='character'></img>
       <img id="john" onClick={changeCharacter} src={john} className='character'></img>
       <img id="sheff" onClick={changeCharacter} src={sheff} className='character'></img>
    </div>
  )
}

export default CharacterSelect;
