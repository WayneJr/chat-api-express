import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  type: String,
}, {
  timestamps: true,
  collection: 'users'
});

export default mongoose.model('User', userSchema);

