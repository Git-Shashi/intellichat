import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  aiProvider: {
    type: String,
    required: true,
    default: 'groq'
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  messageCount: {
    type: Number,
    default: 0
  },
  isPinned: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Add compound index for efficient querying
conversationSchema.index({ userId: 1, updatedAt: -1 });

// Instance methods
conversationSchema.methods.updateLastMessage = function(messageId) {
    this.lastMessage = messageId;
    this.updatedAt = new Date();
    return this.save();
};

conversationSchema.methods.incrementMessageCount = function() {
    this.messageCount += 1;
    return this.save();
};

// Static methods
conversationSchema.statics.createConversation = function(userId, title, aiProvider = 'groq') {
    return this.create({
        userId,
        title: title || "New Conversation",
        aiProvider
    });
};

conversationSchema.statics.getUserConversations = function(userId, page = 1, limit = 10) {
    return this.find({ userId })
        .sort({ updatedAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate('lastMessage')
        .exec();
};

export const Conversation = mongoose.model('Conversation', conversationSchema);