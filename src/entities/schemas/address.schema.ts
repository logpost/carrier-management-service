import * as mongoose from 'mongoose'

const AddressSchema = new mongoose.Schema(
	{
		address: { type: String, default: '' },
		province: { type: String, default: '' },
		district: { type: String, default: '' },
		zipcode: { type: String, default: '' },
	},
	{
		_id: false,
		strict: false,
	},
)

export default AddressSchema
