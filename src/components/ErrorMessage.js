'use client';

export default function ErrorMessage({ message }) {
  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
      <p className="text-red-800">{message}</p>
    </div>
  );
}
