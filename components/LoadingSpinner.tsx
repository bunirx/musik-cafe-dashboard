import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
  inline?: boolean;
}

export default function LoadingSpinner({ 
  message = 'Loading...', 
  fullScreen = false,
  inline = false 
}: LoadingSpinnerProps) {
  if (inline) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-aqua/30 border-t-aqua rounded-full animate-spin" />
        <span className="text-gray-300">{message}</span>
      </div>
    );
  }

  if (fullScreen) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-aqua/30 border-t-aqua rounded-full animate-spin" />
          </div>
          <p className="text-aqua font-bold text-lg">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-500/20 border border-blue-500 rounded-2xl p-4 text-blue-300 flex items-center gap-3">
      <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-300 rounded-full animate-spin" />
      <span>{message}</span>
    </div>
  );
}
