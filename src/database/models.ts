import mongoose, { Document, Schema } from 'mongoose';


interface User extends Document {
  password: string;
  email: string;
}


const userSchema = new Schema<User>({
  password: { type: String, required: true },
  email: { type: String, required: true },
});

// Create the User model
const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;