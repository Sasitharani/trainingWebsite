import React from 'react';

export default function ProfitLoss() {
  const handleSubmit = () => {
    const data = {
      question: 'Sample Question',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      answer: 'Option 1',
    };

    console.log('Data passed via API:', data);
    // Add API call here if needed
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profit and Loss</h1>
      <p>Welcome to the Profit and Loss page. Here you can learn and practice problems related to profit and loss.</p>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Submit
      </button>
    </div>
  );
}
