import { useDispatch } from 'react-redux';
import { setCurrentConversation } from '../../../redux/slices/chatSlice';

const ConversationItem = ({ conversation, isActive }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(setCurrentConversation(conversation))}
      className={`px-4 py-3 cursor-pointer transition-colors ${
        isActive 
          ? 'bg-gray-800 text-white' 
          : 'text-gray-300 hover:bg-gray-800'
      }`}
    >
      <div className="text-sm font-medium truncate">
        {conversation.title}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {new Date(conversation.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default ConversationItem;