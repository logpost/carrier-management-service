import * as mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
	{
		job_id: { type: String, required: true, index: true, unique: true },
		type: { type: String, default: 'single', enum: ['single', 'group'] },
	},
	{
		_id: false,
		strict: false,
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	},
)

export default JobSchema
