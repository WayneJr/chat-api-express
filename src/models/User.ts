import mongoose from "mongoose";
import { IUser, UserModel} from '../interfaces/user';

const userSchema = new mongoose.Schema<IUser, UserModel>({
  firstName: String,
  lastName: String,
  type: String,
}, {
  timestamps: true,
  collection: 'users'
});

userSchema.statics.getUserByIds = async function(ids: string[]) {
  try {
    const users = await this.find({ _id: { $in: ids } });
    return users;
  } catch (error) {
    throw error;
  }
}

export default mongoose.model<IUser, UserModel>('User', userSchema);

