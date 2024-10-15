import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: false,
  },
  authSource: {
    type: String,
    enum: ['self', 'google'],
    default: 'self',
  },
  settings: {
    type: [
      {
        key: { type: String, required: true },
        value: { type: mongoose.Schema.Types.Mixed, required: true },
      },
    ],
    default: [
      { key: 'theme', value: 'light' },
      { key: 'bgColor', value: '#ffffff' },
      { key: 'font', value: 'Arial' },
    ],
  },
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
