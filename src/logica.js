import React, { useState, useEffect } from 'react';
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
  const goToNext = () =>
    setQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);

  return (
    <div className='container'>
      <div>
        <h1>{questionIndex}</h1>
        <button onClick={goBack}>
          Reset
        </button>
        <button onClick={goToNext}>
          +
        </button>
      </div>
    </div>
  );
}