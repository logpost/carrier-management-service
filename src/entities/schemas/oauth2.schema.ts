import * as mongoose from 'mongoose'

const OAuth2LINESchema = new mongoose.Schema(
	{
		user_id: { type: String, default: '', trim: true },
	},
	{
		_id: false,
		strict: false,
	},
)

const OAuth2Schema = new mongoose.Schema(
	{
		line: { type: OAuth2LINESchema, default: () => ({}) },
	},
	{
		_id: false,
		strict: false,
	},
)

export default OAuth2Schema
