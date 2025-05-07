import { useState, useEffect } from 'react';

export default function ProblemSolving() {
  const [quizzes, setQuizzes] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://trainingwebsite-apot.onrender.com/api/get-quizzes-with-answer?category=ProblemSolving')
      .then((response) => response.json())
      .then((data) => {
        const filteredQuizzes = data.filter((quiz) => quiz.type === 'ProblemSolving');
        setQuizzes(filteredQuizzes);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleOptionChange = (quizId, selectedOption) => {
    setUserAnswers((prev) => {
      const updatedAnswers = { ...prev, [quizId]: selectedOption };
      return updatedAnswers;
    });
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Problem Solving</h1>
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="mb-6">
            <p className="text-lg font-semibold mb-4 text-center">{quiz.question}</p>
            <ul className="space-y-2">
              {quiz.options.map((option, index) => (
                <li key={index} className="relative">
                  <label
                    className={`block bg-gray-200 rounded-lg p-3 cursor-pointer transition ${
                      userAnswers[quiz.id] === option ? 'bg-yellow-300 border border-solid border-yellow-500' : 'hover:bg-yellow-100 hover:border hover:border-solid hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`quiz-${quiz.id}`}
                      value={option}
                      onChange={() => handleOptionChange(quiz.id, option)}
                      className="hidden"
                    />
                    {String.fromCharCode(97 + index)}) {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
