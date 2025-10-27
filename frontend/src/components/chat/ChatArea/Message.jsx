import React from 'react';

const Message = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default Message;