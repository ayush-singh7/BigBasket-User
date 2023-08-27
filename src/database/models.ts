import mongoose, { Document, Schema } from 'mongoose';


interface User extends Document {
  password: string;
  email: string;
  firstName: string;
  lastName:string;
  address:Array<Address>
}

interface Address extends Document{
  street:string;
  city:string;
  state:string;
  pinCode:string;
  country:string;
}


const addressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  country: { type: String, required: true }
})


const userSchema = new Schema<User>({
  password: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: {type: String, required: true},
  address:[addressSchema]
});

// Create the User model
const UserModel = mongoose.model<User>('User', userSchema);
export default UserModel;