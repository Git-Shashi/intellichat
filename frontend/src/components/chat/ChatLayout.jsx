import ConversationList from './Sidebar/ConversationList';
import MessageList from './ChatArea/MessageList';
import MessageInput from './ChatArea/MessageInput';
import { useSelector } from 'react-redux';

const ChatLayout = () => {
  const currentConversation = useSelector(state => state.chat.currentConversation);

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <ConversationList />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-gray-800 border-b border-gray-700 p-4">
              <h2 className="text-lg font-medium text-white">
                {currentConversation.title}
              </h2>
            </div>

            {/* Messages */}
            <MessageList />

            {/* Input Area */}
            <MessageInput />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <h3 className="text-xl font-medium mb-2">Welcome to IntelliChat</h3>
              <p>Select a conversation or create a new one to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;