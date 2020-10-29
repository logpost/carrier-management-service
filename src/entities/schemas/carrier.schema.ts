import * as mongoose from 'mongoose'
import Truck from './truck.schema'
import Driver from './driver.schema'

export const CarrierSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		name: { type: String, required: true, unique: true },
		display_name: { type: String, default: null },
		account_description: { type: String, default: null },
		address: { type: String, default: null },
		verified: { type: Boolean, default: false },
		account_type: { type: String, required: true, default: 'personal' , trim: true, lowercase: true},
		email: { type: String, default: 'not_confirm', trim: true },
		tel: { type: String, default: null, trim: true },
		juristic_id: { type: String, default: null, trim: true },
		trucks: { type: [ Truck ]},
		driver: { type: [ Driver ]}
	},
	{
		versionKey: false,
		timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } 
	},
)