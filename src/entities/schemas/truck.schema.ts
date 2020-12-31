import * as mongoose from 'mongoose'

const TruckTypeSchema = new mongoose.Schema(
	{
		wheel: { type: Number, require: true, default: 4 },
		options: { type: String, default: '' },
	},
	{
		_id: false,
		strict: false,
	},
)

const TruckWeightSchema = new mongoose.Schema(
	{
		max: { type: Number, require: true },
		min: { type: Number, required: true },
	},
	{
		_id: false,
		strict: false,
	},
)

const TruckSchema = new mongoose.Schema(
	{
		truck_id: { type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true },
		license_number: { type: String, default: null, trim: true },
		gasoline: { type: String, default: null, trim: true },
		age: { type: Number, max: 10, default: 0 },
		is_insure: { type: Boolean, default: false },
		type: { type: TruckTypeSchema },
		weight: { type: TruckWeightSchema },
		status: { type: Number, default: 100, enum: [100, 200, 300], required: true },
	},
	{
		_id: false,
		strict: false,
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	},
)

export default TruckSchema
