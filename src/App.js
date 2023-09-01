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
  "250 / 500",
  "300 / 600",
  "400 / 800",
  "500 / 1000",
  "700 / 1500",
  "1K / 2k",
  "1.5K / 3K",
  "2K / 4K",
  "3K / 6K",
  "5K / 10K",
  "10K / 20K",
  "20K / 40K"
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
            <span>00:00:00</span>}
        </span>
        <span className='blind'>{`${blind}`}</span>
        <span className='next-blind'>Próximo nível</span>
        {`${levels[level]}`}
        <button className='button' onClick={toggleCountdown}>
          {countdownStarted ? 'Parar' : 'Iniciar Contagem'}
        </button>
      </header>
    </div>
  );
}

export default App;
