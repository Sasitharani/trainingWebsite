import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminQuizPage() {
  const [bulkInput, setBulkInput] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('https://newtrainingwebsite.onrender.com/api/get-quizzes');
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleBulkInputChange = (e) => {
    setBulkInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bulkInput.trim()) {
      alert('Input cannot be empty. Please paste the questions in the correct format.');
      return;
    }

    try {
      // Parse the bulk input into individual questions
      const questions = bulkInput.split('\n\n').map((block) => {
        const lines = block.split('\n');
        if (lines.length < 6) {
          throw new Error('Invalid format. Each question must have 4 options and an answer.');
        }

        const question = lines[0];
        const options = lines.slice(1, 5).map((line) => {
          const option = line.split(') ')[1];
          if (!option) {
            throw new Error('Invalid option format. Ensure options are labeled as a), b), c), d).');
          }
          return option;
        });
        const answer = lines[5].split('ans)')[1]?.trim();
        if (!answer) {
          throw new Error('Invalid answer format. Ensure the answer is labeled as ans).');
        }

        return { question, options, answer };
      });

      // Send parsed questions to the backend using Axios
      await axios.post('https://newtrainingwebsite.onrender.com/api/upload-quiz', questions);
      console.log('Questions uploaded successfully:', questions);
      alert('Quizzes uploaded successfully!');
      setBulkInput('');
    } catch (error) {
      console.error('Error parsing or uploading quizzes:', error);
      alert(error.message || 'Failed to upload quizzes.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.post('https://newtrainingwebsite.onrender.com/api/delete-quizzes', { ids: selectedQuizzes });
      alert('Selected quizzes deleted successfully!');
      fetchQuizzes();
    } catch (error) {
      console.error('Error deleting quizzes:', error);
    }
  };

  const handleEdit = async (id, updatedQuiz) => {
    try {
      await axios.put(`https://newtrainingwebsite.onrender.com/api/edit-quiz/${id}`, updatedQuiz);
      alert('Quiz updated successfully!');
      fetchQuizzes();
    } catch (error) {
      console.error('Error editing quiz:', error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedQuizzes((prev) =>
      prev.includes(id) ? prev.filter((quizId) => quizId !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Quiz Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Paste Questions, Options, and Answers:</label>
          <textarea
            value={bulkInput}
            onChange={handleBulkInputChange}
            rows="10"
            className="border p-2 w-full"
            placeholder="Paste questions in the specified format here..."
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Upload Quizzes</button>
      </form>

      <h2 className="text-xl font-bold mt-8 mb-4">View Quizzes</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Select</th>
            <th className="border border-gray-300 p-2">Question</th>
            <th className="border border-gray-300 p-2">Options</th>
            <th className="border border-gray-300 p-2">Answer</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id}>
              <td className="border border-gray-300 p-2">
                <input
                  type="checkbox"
                  checked={selectedQuizzes.includes(quiz.id)}
                  onChange={() => handleCheckboxChange(quiz.id)}
                />
              </td>
              <td className="border border-gray-300 p-2">{quiz.question}</td>
              <td className="border border-gray-300 p-2">
                {quiz.options.join(', ')}
              </td>
              <td className="border border-gray-300 p-2">{quiz.answer}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEdit(quiz.id, { question: 'Updated Question', options: quiz.options, answer: quiz.answer })}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 mt-4"
      >
        Delete Selected
      </button>
    </div>
  );
}
