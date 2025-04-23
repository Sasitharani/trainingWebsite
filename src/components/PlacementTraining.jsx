import { useState, useEffect } from 'react';

export default function PlacementTraining() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    // Fetch quizzes from the backend
    fetch('https://trainingwebsite-apot.onrender.com/api/get-quizzes-no-answer')
      .then((response) => response.json())
      .then((data) => setQuizzes(data));

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNextQuiz = () => {
    if (currentQuiz < quizzes.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (quizzes.length === 0) {
    return <div>Loading quizzes...</div>;
  }

  const quiz = quizzes[currentQuiz];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Placement Training</h1>
      <div className="mb-4">
        <p className="text-lg">
          {quiz.id}) {quiz.question}
        </p>
        <ul>
          {quiz.options.map((option, index) => (
            <li key={index} className="mb-2">
              {String.fromCharCode(97 + index)}) {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">Time Left: {formatTime(timeLeft)}</div>
      {currentQuiz < quizzes.length - 1 ? (
        <button onClick={handleNextQuiz} className="bg-blue-500 text-white px-4 py-2">
          Next
        </button>
      ) : (
        <button className="bg-green-500 text-white px-4 py-2">Submit</button>
      )}
    </div>
  );
}
