const Message = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-3 ${
          isUser
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-700 text-gray-100'
        }`}
      >
        <pre className="whitespace-pre-wrap font-sans text-sm">
          {message.content}
        </pre>
        <div className="mt-1 text-xs opacity-70">
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default Message;