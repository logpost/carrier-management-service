import * as mongoose from 'mongoose'

const TruckTypeSchema = new mongoose.Schema(
    {
        wheel: { type: Number, require: true, default: 4 },
        is_container: { type: Boolean, require: true, default: false},
    },
    {
        _id: false,
        strict: false
    }
)

const TruckWeightSchema = new mongoose.Schema(
    {
        max: { type: Number, require: true },
        min: { type: Number, required: true }
    },
    {
        _id: false,
        strict: false
    }
)

const TruckSchema = new mongoose.Schema(
    {
        truck_id: { type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true},
        license_number: { type: String, default: null, trim: true },
        gasoline: { type: String, default: null, trim: true },
        age: { type: Number, max: 10, default: 0 } ,
        is_insure: { type: Boolean, default: false },
        type: { type: TruckTypeSchema },
        weight: { type:  TruckWeightSchema }
    },
    {
        _id: false,
        strict: false,
        timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } 
    }
)

export default TruckSchema


