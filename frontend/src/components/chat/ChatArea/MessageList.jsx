import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';

const MessageList = () => {
  const messages = useSelector(state => state.chat.messages);
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageList;