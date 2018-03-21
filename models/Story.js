const mongoose = require('mongoose');

const { Schema } = mongoose;

const StorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'public'
  },
  allowedComment: {
    type: Boolean,
    default: true
  },
  comments: [{
    commentBody: {
      type: String,
      required: true
    },
    commentDate: {
      type: Date,
      default: Date.now,
      commentUser: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  }],
});

mongoose.model('stories', StorySchema, 'stories');
