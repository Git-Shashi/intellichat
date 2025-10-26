import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import chatService from '../../services/api/chatService';

// Async thunks
export const fetchConversations = createAsyncThunk(
  'chat/fetchConversations',
  async () => {
    const response = await chatService.getConversations();
    return response.data;
  }
);

export const createConversation = createAsyncThunk(
  'chat/createConversation',
  async ({ title, aiProvider }) => {
    const response = await chatService.createConversation(title, aiProvider);
    return response.data;
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ conversationId, content, aiProvider }) => {
    const response = await chatService.sendMessage(conversationId, content, aiProvider);
    return response.data;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    conversations: [],
    currentConversation: null,
    messages: [],
    loading: false,
    error: null
  },
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Conversations
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload.conversations;
        state.error = null;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create Conversation
      .addCase(createConversation.fulfilled, (state, action) => {
        state.conversations.unshift(action.payload);
        state.currentConversation = action.payload;
      })
      // Send Message
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { userMessage, aiMessage } = action.payload;
        state.messages.push(userMessage, aiMessage);
      });
  }
});

export const { setCurrentConversation, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;