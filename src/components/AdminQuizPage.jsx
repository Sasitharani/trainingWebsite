import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminQuizPage() {
  const [bulkInput, setBulkInput] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [selectedType, setSelectedType] = useState('Analogy'); // Default type
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [editedQuiz, setEditedQuiz] = useState({ question: '', options: ['', '', '', ''], answer: '' });
  const [formatErrors, setFormatErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('https://trainingwebsite-apot.onrender.com/api/get-quizzes');
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
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
      const questions = bulkInput.split('\n\n').map((block) => {
        const lines = block.split('\n');
        console.log('Parsed lines:', lines); // Debugging log to inspect parsed lines

        return {
          question: lines[0],
          options: [
            lines[1]?.split(') ')[1] || 'No option provided',
            lines[2]?.split(') ')[1] || 'No option provided',
            lines[3]?.split(') ')[1] || 'No option provided',
            lines[4]?.split(') ')[1] || 'No option provided',
          ],
          answer: lines[5]?.split('ans)')[1]?.trim() || 'No answer provided', // Handle missing or incorrect format
          type: selectedType, // Include the selected type
        };
      });

      console.log('Data passed via API:', questions); // Log the data being sent to the API

      await axios.post('https://trainingwebsite-apot.onrender.com/api/upload-quiz', questions);
      alert('Quizzes uploaded successfully!');
      setBulkInput('');
    } catch (error) {
      console.error('Error uploading quizzes:', error);
      alert('Failed to upload quizzes.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Quiz Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Select Type of Question:</label>
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="border p-2 w-full"
          >
            <option value="Analogy">Analogy</option>
            <option value="NumberSeries">Number Series</option>
            <option value="Meanings">Meanings</option>
            <option value="Opposites">Opposites</option>
            <option value="AlphanumericLetters">Alphanumeric Letters</option>
            <option value="ProfitLoss">Profit and Loss</option>
            <option value="Cost">Cost</option>
            <option value="WordsRearrangement">Words Rearrangement</option>
            <option value="Calendar">Calendar</option>
          </select>
        </div>
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
    </div>
  );
}
