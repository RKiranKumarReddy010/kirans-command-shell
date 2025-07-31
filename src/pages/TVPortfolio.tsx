import React, { useEffect } from 'react';

export default function TVPortfolio() {
  useEffect(() => {
    // Redirect back to main page
    window.location.href = '/';
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4 font-mono">Redirecting...</h1>
        <p className="text-xl">Going back to CLI Portfolio</p>
      </div>
    </div>
  );
} 