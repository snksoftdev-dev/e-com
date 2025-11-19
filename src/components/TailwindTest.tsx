'use client';

export default function TailwindTest() {
  return (
    <div className="p-4 m-4 bg-red-500 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2">Tailwind CSS Test</h2>
      <p className="text-sm">
        If you can see this with red background, white text, padding, margin, 
        rounded corners, and shadow, then Tailwind CSS is working properly.
      </p>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-blue-500 p-2 rounded">Blue</div>
        <div className="bg-green-500 p-2 rounded">Green</div>
        <div className="bg-yellow-500 p-2 rounded text-black">Yellow</div>
      </div>
    </div>
  );
}
