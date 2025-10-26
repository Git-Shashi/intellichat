const BASE_URL = '/api/v1';

export const chatService = {
  // Create a new conversation
  createConversation: async (title, aiProvider = 'groq') => {
    try {
      const response = await fetch(`${BASE_URL}/chat/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title, aiProvider })
      });
      
      if (!response.ok) throw new Error('Failed to create conversation');
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Get all conversations
  getConversations: async (page = 1, limit = 10) => {
    try {
      const response = await fetch(
        `${BASE_URL}/chat/conversations?page=${page}&limit=${limit}`,
        {
          credentials: 'include'
        }
      );
      
      if (!response.ok) throw new Error('Failed to fetch conversations');
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Get a specific conversation with messages
  getConversation: async (conversationId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/chat/conversations/${conversationId}`,
        {
          credentials: 'include'
        }
      );
      
      if (!response.ok) throw new Error('Failed to fetch conversation');
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Send a message
  sendMessage: async (conversationId, content, aiProvider) => {
    try {
      const response = await fetch(
        `${BASE_URL}/chat/conversations/${conversationId}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ content, aiProvider })
        }
      );
      
      if (!response.ok) throw new Error('Failed to send message');
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Delete a conversation
  deleteConversation: async (conversationId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/chat/conversations/${conversationId}`,
        {
          method: 'DELETE',
          credentials: 'include'
        }
      );
      
      if (!response.ok) throw new Error('Failed to delete conversation');
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default chatService;