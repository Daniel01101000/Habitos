import sonido from './sonido.wav';
import confetti from 'canvas-confetti';
import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

export default function QuizNavBar() {
  const [questionIndex, setQuestionIndex] = useState(() => {
    const savedIndex = localStorage.getItem('questionIndex');
    return savedIndex !== null ? JSON.parse(savedIndex) : 0;
  });

  useEffect(() => {
    localStorage.setItem('questionIndex', questionIndex);
  }, [questionIndex]);

  const goBack = () =>
    setQuestionIndex((prevQuestionIndex) => prevQuestionIndex = 0);

  const audioRef = useRef(null);

  const handleClick = () => {

    const goToNext = () =>
      setQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);

    if (audioRef.current) {
      audioRef.current.play().then(() => {
        console.log("Audio reproducido correctamente");
        goToNext();
      }).catch(error => {
        console.error("Error al reproducir el audio:", error);
      });
    } else {
      console.error("Referencia de audio no encontrada");
    }

    // Disparar el confeti
    confetti({
      particleCount: 100,  // Número de piezas de confeti
      spread: 70,          // Ángulo de dispersión
      origin: { y: 0.6 },  // Desde dónde se dispara el confeti (posición vertical)
      colors: ['#ff0', '#ff6347', '#00f', '#0f0', '#ff1493'],  // Colores del confeti
    });
  }

  return (
    <div className='container'>
      <div>
        <h1>{questionIndex}</h1>
        <button onClick={goBack}>
          Reset
        </button>
        <audio ref={audioRef} src={sonido} />
        <button onClick={handleClick}>
          +
        </button>
      </div>
    </div>
  );
}