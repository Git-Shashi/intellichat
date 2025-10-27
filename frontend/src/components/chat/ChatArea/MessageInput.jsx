import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../../redux/slices/chatSlice';

const MessageInput = () => {
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const dispatch = useDispatch();
  const currentConversation = useSelector(state => state.chat.currentConversation);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting message...'); // Debug log
    
    if (!content.trim() || !currentConversation) {
      console.log('No content or conversation'); // Debug log
      return;
    }

    try {
      setIsSending(true);
      console.log('Sending message to conversation:', currentConversation._id); // Debug log
      
      const result = await dispatch(sendMessage({
        conversationId: currentConversation._id,
        content: content.trim(),
        aiProvider: currentConversation.aiProvider
      })).unwrap();

      console.log('Message sent successfully:', result); // Debug log
      setContent('');
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
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
          onKeyDown={handleKeyDown}
          placeholder={currentConversation ? "Type a message..." : "Select a conversation to start chatting"}
          className="flex-1 min-h-[44px] max-h-32 p-3 bg-gray-700 text-white rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
          disabled={!currentConversation || isSending}
        />
        <button
          type="submit"
          disabled={!currentConversation || isSending || !content.trim()}
          className={`px-4 py-2 rounded-lg font-medium flex items-center justify-center min-w-[80px]
            ${(!currentConversation || isSending || !content.trim())
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 transition-colors'
            }`}
        >
          {isSending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            'Send'
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;