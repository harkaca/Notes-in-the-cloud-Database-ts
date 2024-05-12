import { Schema, model } from 'mongoose';

const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const userSchema = new Schema({
	email: {
		type: Schema.Types.String,
		required: true,
		match: [emailRegex, 'Invalid email']
	},
	username: {
		type: Schema.Types.String,
		required: true
	},
	password: {
		type: Schema.Types.String,
		required: true,
		match: [passwordRegex, 'Invalid password! It must contain minimum eight characters, at least one letter and one number!']
	},
	id: Schema.Types.ObjectId
});

export const UserModel = model('User', userSchema);	