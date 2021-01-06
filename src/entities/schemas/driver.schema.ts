import * as mongoose from 'mongoose'

const DriverSchema = new mongoose.Schema(
	{
		driver_id: { type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true },
		name: { type: String, required: true },
		age: { type: Number, max: 100, min: 18, required: true },
		tel: { type: String, required: true },
		driver_license: { type: String, required: true, trim: true },
		driver_license_type: { type: String, required: true, trim: true },
		identification_number: { type: String, required: true, trim: true },
		status: { type: Number, default: 100, enum: [100, 200, 300], required: true },
	},
	{
		_id: false,
		strict: false,
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	},
)

export default DriverSchema
