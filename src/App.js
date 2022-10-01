
import './App.css';
import { useState, useRef } from 'react'
import Triangle from './components-svg/Triangle';
import {Rock, Paper, Scissors} from './components-svg/GameIcons'

function App() {

  const [score, setScore] = useState(12);
  const playerHand = useRef({});
  
  const hands = {
    PAPER: {
      name: 'PAPER',
      markup: <Paper />
    },
    ROCK: {
      name: 'ROCK',
      markup: <Rock />
    },
    SCISSORS: {
      name:'SCISSORS',
      markup: <Scissors />
    }
  }
  const [computerSelection, setComputerSelection] = useState(hands.PAPER)
  
  const opposites = {
    'PAPER': 'SCISSORS',
    'SCISSORS': 'ROCK',
    'ROCK': 'PAPER',
  }

  const gamePhase = {
    SELECTION_PHASE: 1,
    EVALUATION_PHASE: 2,
    ENDING_PHASE: 3,
  }

  const [currentPhase, setCurrentPhase] = useState(gamePhase.SELECTION_PHASE);

  const evaluateSelection = (playerSelection) => {

    
      playerHand.current = playerSelection;
      setCurrentPhase(gamePhase.EVALUATION_PHASE)
      
    

    if(computerSelection.name === opposites[playerSelection.name]) {
      console.log('computer wins')
    }

    else if (playerSelection.name === opposites[computerSelection.name]) {
      console.log('player wins')
    }
    else {
      // console.log('')
    }
  }


  const loadGame = () => {
      if(currentPhase === gamePhase.SELECTION_PHASE) {
        return (
          
          <div className="game container">
              <div className="game-background">
                <Triangle />
              </div>

              <div className="row">
                <div className="icon" id='paper' onClick={() => evaluateSelection(hands.PAPER)}>
                  <Paper /> 
                </div>
                <div className="icon" id='scissors' onClick={() => evaluateSelection(hands.SCISSORS)}>
                  <Scissors />
                </div>
              </div>
              <div className='row'>
                <div className="icon" id='rock'  onClick={() => evaluateSelection(hands.ROCK)}>
                  <Rock />
                </div>
              </div>
          </div>
        )
      }

      else if (currentPhase === gamePhase.EVALUATION_PHASE) {
        return (
          <div className="game container">
            <div className="icon" id={hands[playerHand.current.name].name.toLowerCase()}>
              {
                hands[playerHand.current.name].markup
                // console.log(hands[playerHand.current.name].markup)
              }          
            </div>
          </div>
        )
      }
    
  }

  return (
    <>
      <div className="page">

        <div className="title container">
          <div className="names">
            <h1>Rock</h1>
            <h1>Paper</h1>
            <h1>Scissors</h1>
          </div>
        
          <div className="score">
            <h3>Score</h3>
            <h1>{score}</h1>
          </div>
        </div>

          {
            loadGame()
          }
        
        <button className='rules' type='button' onClick={() => {}}>Rules</button>
      </div>
    </>
  );
}

export default App;
