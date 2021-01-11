import * as mongoose from 'mongoose'

const TruckPropertySchema = new mongoose.Schema(
	{
		type: { type: String, required: true },
		option: { type: String, required: true },
		chassis: { type: Number, default: 0 },
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
		is_insure: { type: Boolean, default: false },
		property: { type: TruckPropertySchema },
		weight: { type: TruckWeightSchema },
		status: { type: Number, default: 100, enum: [100, 200, 300], required: true },
		registered_at: { type: Date, required: true },
	},
	{
		_id: false,
		strict: false,
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	},
)

export default TruckSchema
