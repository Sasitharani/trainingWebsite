import React from 'react';

const colors = [
  { name: 'Light Purple', color: 'bg-customPalette-lightPurple' },
  { name: 'Light Blue', color: 'bg-customPalette-lightBlue' },
  { name: 'Light Green', color: 'bg-customPalette-lightGreen' },
  { name: 'Light Yellow', color: 'bg-customPalette-lightYellow' },
  { name: 'Light Pink', color: 'bg-customPalette-lightPink' },
];

export default function Palette() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Custom Color Palette</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {colors.map((color) => (
          <div key={color.name} className={`h-24 ${color.color} flex items-center justify-center rounded-lg shadow-md`}>
            <span className="text-white font-semibold">{color.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
