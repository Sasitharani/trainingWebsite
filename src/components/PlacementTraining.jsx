import { useState, useEffect } from 'react';

export default function PlacementTraining() {
  const [quizzes, setQuizzes] = useState([]);
  const [userAnswers, setUserAnswers] = useState({}); // Store user-selected answers
  const [score, setScore] = useState(0); // Store the score
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status

  useEffect(() => {
    // Fetch quizzes with answers from the backend
    fetch('https://trainingwebsite-apot.onrender.com/api/get-quizzes-with-answer')
      .then((response) => response.json())
      .then((data) => setQuizzes(data));
  }, []);

  const handleOptionChange = (quizId, selectedOption) => {
    setUserAnswers((prev) => ({ ...prev, [quizId]: selectedOption }));
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    quizzes.forEach((quiz) => {
      if (userAnswers[quiz.id] === quiz.answer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setIsSubmitted(true);
  };

  if (quizzes.length === 0) {
    return <div>Loading quizzes...</div>;
  }

  if (isSubmitted) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Your Final Score: {score}</h1>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Placement Training</h1>
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="mb-4">
          <p className="text-lg">{quiz.question}</p>
          <ul>
            {quiz.options.map((option, index) => (
              <li key={index} className="mb-2">
                <label>
                  <input
                    type="radio"
                    name={`quiz-${quiz.id}`}
                    value={option}
                    onChange={() => handleOptionChange(quiz.id, option)}
                  />{' '}
                  {String.fromCharCode(97 + index)}) {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2">
        Submit
      </button>
    </div>
  );
}
