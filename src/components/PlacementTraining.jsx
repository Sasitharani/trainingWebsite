import { useState, useEffect } from 'react';

export default function PlacementTraining() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    // Fetch quizzes from the backend
    fetch('/api/get-quizzes')
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
        <p className="text-lg">{quiz.question}</p>
        {quiz.type === 'multiple-choice' ? (
          <ul>
            {quiz.options.map((option, index) => (
              <li key={index} className="mb-2">
                <label>
                  <input type="radio" name="quiz-option" value={option} /> {option}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <input type="text" className="border p-2 w-full" placeholder="Your answer" />
        )}
      </div>
      <div className="mb-4">Time Left: {formatTime(timeLeft)}</div>
      <button onClick={handleNextQuiz} className="bg-blue-500 text-white px-4 py-2">Next</button>
    </div>
  );
}
