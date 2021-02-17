import * as mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

import AddressSchema from './address.schema'
import DriverSchema from './driver.schema'
import JobSchema from './job.schema'
import OAuth2Schema from './oauth2.schema'
import TruckSchema from './truck.schema'

export const CarrierSchema = new mongoose.Schema(
	{
		carrier_id: { type: String, default: uuidv4, index: true },
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, index: true, trim: true },
		oauth2: { type: OAuth2Schema, default: () => ({}) },
		password: { type: String, required: true },
		name: { type: String, required: true },
		display_name: { type: String, default: null },
		account_description: { type: String, default: null },
		address: { type: AddressSchema, default: null },
		is_email_confirmed: { type: Boolean, default: false },
		is_verified: { type: Boolean, default: false },
		role: { type: String, default: 'carrier' },
		account_type: {
			type: String,
			required: true,
			enum: ['personal', 'business'],
			default: 'personal',
			trim: true,
			lowercase: true,
		},
		tel: { type: String, default: null, trim: true },
		juristic_id: { type: String, default: null, trim: true },
		job_history: { type: [JobSchema], default: null },
		trucks: { type: [TruckSchema], default: [] },
		drivers: { type: [DriverSchema], default: [] },
	},
	{
		versionKey: false,
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	},
)
