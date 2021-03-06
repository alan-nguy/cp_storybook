const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  googleID: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },
});

mongoose.model('users', UserSchema);
