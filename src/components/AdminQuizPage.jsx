import React, { useState } from 'react';
import axios from 'axios';

export default function AdminQuizPage() {
  const [bulkInput, setBulkInput] = useState('');

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
      alert('Quizzes uploaded successfully!');
      setBulkInput('');
    } catch (error) {
      console.error('Error parsing or uploading quizzes:', error);
      alert(error.message || 'Failed to upload quizzes.');
    }
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
    </div>
  );
}
