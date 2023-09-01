import './App.css';
import React, { useState } from 'react';
import Countdown from "react-countdown";
import song from "./files/alert.wav";

const levels = [
  "25 / 50",
  "50 / 100",
  "100 / 200",
  "150 / 300",
  "200 / 400",
  "250 / 500"
]

const stopForce = 8;
const timeOfBlindsMinutes = 12;

function App() {
  const [level, setLevel] = useState(1);
  const [blind, setBlind] = useState(levels[0]);
  const [countdownStarted, setCountdownStarted] = useState(false); // Estado para controlar se a contagem já foi iniciada

  const playAudio = () => {
    // Reproduz o alerta de áudio
    const audio = new Audio(song);
    audio.play();
  };

  const toggleCountdown = () => {
    if (countdownStarted) {
      stopCountdown();
    } else {
      startCountdown();
    }
  };

  const startCountdown = () => {
    setCountdownStarted(true); // Inicia a contagem regressiva
  };

  const stopCountdown = () => {
    setCountdownStarted(false); // Para a contagem regressiva
  };

  const completeLevel = () => {
    playAudio();
    // Atualiza o nível
    if (levels[level + 1] === undefined) stopCountdown()
    setBlind(levels[level])
    if (level === stopForce) {
      stopCountdown()
    }
    setLevel(level + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <span>
          {`Nível ${level}`}
        </span>
        <span className='timer'>
          {/* Mostra a contagem regressiva somente se countdownStarted for verdadeiro */}
          {countdownStarted ? (
            <Countdown
              date={Date.now() + 1000 * 60 * timeOfBlindsMinutes}
              daysInHours
              onComplete={completeLevel}
              autoStart={true}
              overtime
            />
          ) :
            levels[level] === undefined ? "Fim de torneio!" : <span>00:00:00</span>
          }
        </span>
        <span className='blind'>{`${blind}`}</span>
        <span className='next-blind'>Próximo nível</span>
        {levels[level] !== undefined ? `${levels[level]}` : ""}
        <button className='button' onClick={toggleCountdown}>
          {countdownStarted ? 'Parar' : 'Iniciar Contagem'}
        </button>
      </header>
    </div>
  );
}

export default App;
