import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Message from './Message';
import { clearError } from '../../../redux/slices/chatSlice';

const MessageList = () => {
    const dispatch = useDispatch();
    const messages = useSelector(state => state.chat.messages);
    const loading = useSelector(state => state.chat.loading);
    const error = useSelector(state => state.chat.error);
    const currentConversation = useSelector(state => state.chat.currentConversation);
    const messageEndRef = useRef(null);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Clear error after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    if (!currentConversation) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a conversation to view messages
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
                <div className="text-center text-gray-500">
                    No messages in this conversation yet
                </div>
            ) : (
                <>
                    {messages.map((message) => (
                        <Message key={message._id} message={message} />
                    ))}
                    <div ref={messageEndRef} />
                </>
            )}
        </div>
    );
};

export default MessageList;