import { HydratedDocument, Schema, model } from 'mongoose';

interface IUser  {
  name: string;
  points: number;
  rewards: number;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  points: {type: Number, required: true, default: 100},
  rewards: {type: Number, required: true, default: 0},
});

export const UserModel = model<IUser>('users' , userSchema);

export const buildUser = (user: IUser): HydratedDocument<IUser> => {
    return new UserModel(user);
} 