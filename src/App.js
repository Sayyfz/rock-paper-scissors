
import './App.css';
import { useState, useRef } from 'react'
import Triangle from './components-svg/Triangle';
import {Rock, Paper, Scissors} from './components-svg/GameIcons'
import Rules from './components-svg/Rules'
import Close from './components-svg/Close';

function App() {

  const CONTEST_DELAY_RESULT = 1500

  const gamePhase = {
    SELECTION_PHASE: 1,
    EVALUATION_PHASE: 2,
  }
  const [score, setScore] = useState(0);
  const [resultMarkup, setResultMarkup] = useState(<></>)
  const [currentPhase, setCurrentPhase] = useState(gamePhase.SELECTION_PHASE);
  const playerHand = useRef({});
  const computerHand = useRef({})
  
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
  
  const opposites = {
    'PAPER': 'SCISSORS',
    'SCISSORS': 'ROCK',
    'ROCK': 'PAPER',
  }

 


  const getComputerSelection = () => {
    const index = Math.floor(Math.random() * 2)

    if(index === 0) 
      return hands.PAPER
    else if(index === 1) 
      return hands.ROCK
    else if(index === 2)
      return hands.SCISSORS
  }

  const loadResult = (result) => {
    if(result === '')
      return <></>

    return (
      <>
        <h1>{result}</h1>
        <button onClick={() => {setCurrentPhase(gamePhase.SELECTION_PHASE); resetGame()}}>PLAY AGAIN</button>
      </>
      
    )
  }

  const resetGame = () => {
    playerHand.current = {}
    computerHand.current = {}
  }

  const evaluateSelection = (playerSelection, computerSelection) => {

    
    setCurrentPhase(gamePhase.EVALUATION_PHASE)
    
    playerHand.current = playerSelection;
    setResultMarkup(loadResult(''))
    setTimeout(() => {
      computerHand.current = computerSelection;

      if(computerSelection.name === opposites[playerSelection.name]) {
        setResultMarkup(loadResult("YOU LOSE"))
        score > 0 && setScore(score - 1)
      }
  
      else if (playerSelection.name === opposites[computerSelection.name]) {
        setResultMarkup(loadResult("YOU WIN"))
        setScore(score + 1)
      }
      else {
        setResultMarkup(loadResult("DRAW"))
      }
    },CONTEST_DELAY_RESULT)
  }

  const toggleRules = (show) => {
    
    if(show) {
      document.getElementById('rules').style.display = 'flex'
    }
    else {
      document.getElementById('rules').style.display = 'none'
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
                <div className="icon" id='paper' onClick={() => evaluateSelection(hands.PAPER, getComputerSelection())}>
                  <Paper /> 
                </div>
                <div className="icon" id='scissors' onClick={() => evaluateSelection(hands.SCISSORS, getComputerSelection())}>
                  <Scissors />
                </div>
              </div>
              <div className='row'>
                <div className="icon" id='rock'  onClick={() => evaluateSelection(hands.ROCK, getComputerSelection())}>
                  <Rock />
                </div>
              </div>
          </div>
        )
      }

      else if (currentPhase === gamePhase.EVALUATION_PHASE) {
        return (
          <div className="game container">
            <div className="evaluation-row">
              <div className="col">
                <p className="evaluation-title">
                  You Picked
                </p>
                <div className="icon" id={hands[playerHand.current.name].name.toLowerCase()}>
                  {
                    hands[playerHand.current.name].markup
                  }
                </div>
              </div>
              
              <div className="col result-markup">
                {resultMarkup}
              </div>

              <div className="col">
                <p className="evaluation-title">
                  The House Picked
                </p>
                {
                  <div className="icon" id={computerHand.current.name ? hands[computerHand.current.name].name.toLowerCase() : 'computer-hand'}>
                  {
                    computerHand.current.name && 
                    hands[computerHand.current.name].markup
                  }
                </div>
                }
              </div>
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

        <dialog className="rules-overlay" id='rules'>
          <div className='overlay-container'>
            <div className="row">
              <h2>RULES</h2>
              <button type='button' onClick={() => {toggleRules(false)}}>
                <Close />
              </button>
            </div>
            <Rules />
          </div>
        </dialog>

        <button className='rules' type='button' onClick={() => toggleRules(true)}> Rules </button>
      </div>
    </>
  );
}

export default App;
