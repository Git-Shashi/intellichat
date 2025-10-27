import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversations } from '../../../redux/slices/chatSlice';
import ConversationItem from './ConversationItem';
import NewChatButton from './NewChatButton';
import UserProfileButton from './UserProfileButton';

const ConversationList = () => {
  const dispatch = useDispatch();
  const conversations = useSelector(state => state.chat.conversations);
  const loading = useSelector(state => state.chat.loading);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* New Chat Button */}
      <div className="p-4 border-b border-gray-700">
        <NewChatButton />
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : conversations.length === 0 ? (
          <div className="text-gray-400 text-sm text-center p-4">
            No conversations yet
          </div>
        ) : (
          <div className="space-y-1">
            {conversations.map(conversation => (
              <ConversationItem 
                key={conversation._id} 
                conversation={conversation} 
              />
            ))}
          </div>
        )}
      </div>

      {/* User Profile Button at bottom */}
      <UserProfileButton />
    </div>
  );
};

export default ConversationList;