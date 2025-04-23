import { useState, useEffect } from 'react';

export default function Analogy() {
  const [quizzes, setQuizzes] = useState([]);
  const [userAnswers, setUserAnswers] = useState({}); // Store user-selected answers
  const [score, setScore] = useState(0); // Store the score
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch analogy-specific quizzes from the backend
    fetch('https://trainingwebsite-apot.onrender.com/api/get-quizzes-with-answer?category=analogy')
      .then((response) => response.json())
      .then((data) => {
        setQuizzes(data);
        setIsLoading(false); // Stop loading once data is fetched
      })
      .catch(() => setIsLoading(false)); // Stop loading even if there's an error
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

  if (isLoading) {
    return <div>Loading quizzes...</div>;
  }

  if (isSubmitted) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Your Final Score: {score}/{quizzes.length}</h1>
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="mb-4">
            <p className="text-lg font-bold">{quiz.question}</p>
            <p>
              Your Answer: {userAnswers[quiz.id]}{' '}
              {userAnswers[quiz.id] === quiz.answer ? (
                <span className="text-green-500">✔</span>
              ) : (
                <span className="text-red-500">✘</span>
              )}
            </p>
            <p>Correct Answer: {quiz.answer}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Analogy</h1>
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
