import React, { useState, useMemo } from 'react';

interface Metrics {
  totalCharacters: number;
  wordsPerMinute: number;
  averageWordLength: number;
}

const calculateMetrics = (text: string): Metrics => {
const totalCharacters = text.length;
const words = text.trim().split(/\s+/).filter(word => word !== '');
const wordCount = words.length;
const wordsPerMinute = Math.round(wordCount / (1 / 200)) || 0;
const totalWordLength = words.reduce((sum, word) => sum + word.length, 0);
const averageWordLength = wordCount > 0 ? totalWordLength / wordCount : 0;

return {
totalCharacters,
wordsPerMinute,
averageWordLength,
};
};

const CharacterCounter: React.FC = () => {
const [text, setText] = useState('');

const metrics = useMemo(() => calculateMetrics(text), [text]);

const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
setText(event.target.value);
};

return (
<div className="bg-gray-100 p-6 rounded-md shadow-md">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Character Counter</h2>
    <div className="mb-4">
    <textarea
        rows={8}
        className="w-full p-3 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
        placeholder="Enter your text here..."
        value={text}
        onChange={handleTextChange}
    />
    </div>
    <hr className="my-4 border-gray-300" />
    <div className="mt-4 text-gray-700">
    <h3 className="text-lg font-semibold mb-2">Metrics:</h3>
    <p>
        <span className="font-medium">Total Characters:</span> {metrics.totalCharacters}
    </p>
    <p>
        <span className="font-medium">Estimated Reading Speed:</span> {metrics.wordsPerMinute} WPM
    </p>
    <p>
        <span className="font-medium">Average Word Length:</span> {metrics.averageWordLength.toFixed(2)}
    </p>
    </div>
    <div className="mt-6">
    <h4 className="text-md font-semibold mb-2 text-gray-800">Bonus: Resizable Textarea</h4>
    <textarea
        rows={4}
        className="w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-green-500 resize-both overflow-auto"
        placeholder="Try resizing this textarea..."
        style={{ minHeight: '80px' }}
    />
    <p className="text-sm text-gray-500 mt-1">
        Resizing this textarea won't re-calculate the metrics above because it doesn't change the main text input.
    </p>
    </div>
</div>
);
};

export default CharacterCounter;