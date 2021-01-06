import { Document } from 'mongoose'
import { TruckInterface } from './truck.interface'
import { DriverInterface } from './driver.interface'
import { JobInterface } from './job.interface'

interface CarrierDocument extends Document {
	readonly carrier_id: string
	readonly username: string
	readonly password: string
	readonly email: string
	readonly name: string
	readonly display_name: string
	readonly tel: string
	readonly address: string
	readonly role: string
	readonly account_type: string
	readonly account_description: string
	readonly juristic_id: string
	readonly verified: boolean
	readonly trucks: TruckInterface[]
	readonly drivers: DriverInterface[]
	readonly job_history: JobInterface[]
	readonly create_at: Date
	readonly updated_at: Date
}

type CarrierInterface = CarrierDocument

export { CarrierInterface }
