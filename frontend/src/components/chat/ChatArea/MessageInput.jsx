import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../../redux/slices/chatSlice';

const MessageInput = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const currentConversation = useSelector(state => state.chat.currentConversation);
  const isLoading = useSelector(state => state.chat.messageLoading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !currentConversation) return;

    try {
      await dispatch(sendMessage({
        conversationId: currentConversation._id,
        content: content.trim(),
        aiProvider: currentConversation.aiProvider
      })).unwrap();
      setContent('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="border-t border-gray-700 bg-gray-800 p-4"
    >
      <div className="flex gap-4 max-w-4xl mx-auto">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Type a message..."
          className="flex-1 min-h-[44px] max-h-32 p-2 bg-gray-700 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !content.trim()}
          className={`px-4 py-2 rounded-lg font-medium ${
            isLoading || !content.trim()
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;