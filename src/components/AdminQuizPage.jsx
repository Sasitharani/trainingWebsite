import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminQuizPage() {
  const [bulkInput, setBulkInput] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [editedQuiz, setEditedQuiz] = useState({ question: '', options: ['', '', '', ''], answer: '' });
  const [formatErrors, setFormatErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);
  const test = async () => {
    try {
      const response = await axios.get('https://trainingwebsite-apot.onrender.com/api/test');
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('https://trainingwebsite-apot.onrender.com/api/get-quizzes');
      setQuizzes(response.data);
      console.log('Fetched quizzes:', response.data); // Log the fetched quizzes
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleBulkInputChange = (e) => {
    setBulkInput(e.target.value);
  };

  const validateFormat = (questions) => {
    const errors = [];

    questions.forEach((question, index) => {
      const rowErrors = { row: index + 1, yourFormat: {}, correctedFormat: {} };

      if (!question.question) {
        rowErrors.yourFormat.question = 'Missing';
        rowErrors.correctedFormat.question = 'Provide a valid question';
      } else {
        rowErrors.correctedFormat.question = question.question;
      }

      if (!Array.isArray(question.options) || question.options.length !== 4) {
        rowErrors.yourFormat.options = question.options || 'Invalid';
        rowErrors.correctedFormat.options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
      } else {
        rowErrors.correctedFormat.options = question.options;
      }

      if (!question.answer) {
        rowErrors.yourFormat.answer = 'Missing';
        rowErrors.correctedFormat.answer = 'Provide a valid answer';
      } else {
        rowErrors.correctedFormat.answer = question.answer;
      }

      if (Object.keys(rowErrors.yourFormat).length > 0) {
        errors.push(rowErrors);
      }
    });

    return errors;
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
        return {
          question: lines[0],
          options: lines.slice(1, 5).map((line) => line.split(') ')[1]),
          answer: lines[5]?.split('ans)')[1]?.trim(),
        };
      });

      const errors = validateFormat(questions);
      if (errors.length > 0) {
        setFormatErrors(errors);
        setShowModal(true);
        return;
      }

      // Send parsed questions to the backend using Axios
      await axios.post('https://trainingwebsite-apot.onrender.com/api/upload-quiz', questions);
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
      console.log('Attempting to delete quizzes with IDs:', selectedQuizzes); // Debugging log
      const response = await axios.post('https://trainingwebsite-apot.onrender.com/api/delete-quizzes', { ids: selectedQuizzes });
      console.log('Delete response:', response.data); // Debugging log
      alert('Selected quizzes deleted successfully!');
      fetchQuizzes(); // Refresh the quizzes list
    } catch (error) {
      console.error('Error deleting quizzes:', error); // Debugging log
    }
  };

  const handleDeleteSingle = async (id) => {
    try {
      console.log('ID received in handleDeleteSingle:', id, 'Type:', typeof id); // Debugging log
      const numericId = typeof id === 'string' ? id.replace('quiz-', '') : id; // Handle non-string IDs
      await axios.delete(`https://trainingwebsite-apot.onrender.com/api/delete-quiz/${numericId}`);
      alert('Quiz deleted successfully!');
      fetchQuizzes(); // Refresh the quizzes list
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const handleEditClick = (quiz) => {
    setEditingQuizId(quiz.id);
    setEditedQuiz({
      question: quiz.question,
      options: quiz.options,
      answer: quiz.answer,
    });
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`https://trainingwebsite-apot.onrender.com/api/edit-quiz/${editingQuizId}`, editedQuiz);
      alert('Quiz updated successfully!');
      setEditingQuizId(null);
      fetchQuizzes(); // Refresh the quizzes list
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedQuiz((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index, value) => {
    setEditedQuiz((prev) => {
      const updatedOptions = [...prev.options];
      updatedOptions[index] = value;
      return { ...prev, options: updatedOptions };
    });
  };

  const handleCheckboxChange = (id) => {
    console.log('Checkbox ID:', id); // Debugging log to check the ID
    alert(`Checkbox clicked! ID in fetched data: ${id}`); // Display alert with ID
    setSelectedQuizzes((prevSelected) => {
      const updatedSelection = prevSelected.includes(id)
        ? prevSelected.filter((quizId) => quizId !== id) // Remove if already selected
        : [...prevSelected, id]; // Add if not selected
      console.log('Updated selectedQuizzes:', updatedSelection); // Debugging log
      return updatedSelection;
    });
  };

  console.log('Current quizzes:', quizzes); // Log the quizzes state

  return (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Quiz Page</h1>
        <button
            onClick={test}
            className="bg-green-500 text-white px-4 py-2 mb-4"
        >
            Run Test API
        </button>
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
                <th className="border border-gray-300 p-2">
                    <input
                        type="checkbox"
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSelectedQuizzes(quizzes.map((quiz) => quiz.id || `quiz-${quizzes.indexOf(quiz)}`));
                            } else {
                                setSelectedQuizzes([]);
                            }
                        }}
                    />
                </th>
                <th className="border border-gray-300 p-2">S/N</th>
                <th className="border border-gray-300 p-2">Question</th>
                <th className="border border-gray-300 p-2">Options</th>
                <th className="border border-gray-300 p-2">Answer</th>
                <th className="border border-gray-300 p-2">Actions</th>
            </tr>
            </thead>
            <tbody>
                {quizzes.map((quiz, index) => (
                    <tr key={quiz.id}>
                        <td className="border border-gray-300 p-2">
                            <input
                                type="checkbox"
                                checked={selectedQuizzes.includes(quiz.id)}
                                onChange={() => handleCheckboxChange(quiz.id)}
                            />
                        </td>
                        <td className="border border-gray-300 p-2">{index + 1}</td> {/* Serial number */}
                        {editingQuizId === quiz.id ? (
                            <>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="text"
                                        value={editedQuiz.question}
                                        onChange={(e) => handleInputChange('question', e.target.value)}
                                        className="border p-1 w-full"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {editedQuiz.options.map((option, idx) => (
                                        <input
                                            key={idx}
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionChange(idx, e.target.value)}
                                            className="border p-1 w-full mb-1"
                                        />
                                    ))}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={handleSaveClick}
                                        className="bg-green-500 text-white px-2 py-1"
                                    >
                                        Save
                                    </button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="border border-gray-300 p-2">{quiz.question}</td>
                                <td className="border border-gray-300 p-2">{quiz.options.join(', ')}</td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={() => handleEditClick(quiz)}
                                        className="bg-yellow-500 text-white px-2 py-1 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteSingle(quiz.id)}
                                        className="bg-red-500 text-white px-2 py-1"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </>
                        )}
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

        {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-lg w-3/4">
                    <h2 className="text-xl font-bold mb-4">Format Errors</h2>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Row</th>
                                <th className="border border-gray-300 p-2">Your Format</th>
                                <th className="border border-gray-300 p-2">Corrected Format</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formatErrors.map((error, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 p-2">{error.row}</td>
                                    <td className="border border-gray-300 p-2">
                                        <pre>
                                            {error.yourFormat.question ? error.yourFormat.question : 'Missing Question'}
                                            {error.yourFormat.options ? error.yourFormat.options.map((opt, idx) => `\n${String.fromCharCode(97 + idx)}) ${opt}`) : '\nOptions Missing'}
                                            {error.yourFormat.answer ? `\nans) ${error.yourFormat.answer}` : '\nAnswer Missing'}
                                        </pre>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <pre>
                                            {error.correctedFormat.question}
                                            {error.correctedFormat.options.map((opt, idx) => `\n${String.fromCharCode(97 + idx)}) ${opt}`)}
                                            \nans) {error.correctedFormat.answer}
                                        </pre>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        onClick={() => setShowModal(false)}
                        className="bg-blue-500 text-white px-4 py-2 mt-4"
                    >
                        Close
                    </button>
                </div>
            </div>
        )}
    </div>
);
}
