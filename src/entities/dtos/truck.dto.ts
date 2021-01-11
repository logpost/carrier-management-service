import { TruckPropertyInterface, TruckWeightInterface } from '../interfaces/data/truck.interface'
import { identifierDTO as CarrierIdentifier } from './carrier.dto'

interface createTruckDTO {
	license_number: string
	gasoline: string
	registered_at: Date
	is_insure: boolean
	property: TruckPropertyInterface
	weight: TruckWeightInterface
}

interface deleteTruckDTO {
	truck_id: string
}
interface whitelistUpdateTruckDTO {
	license_number?: string
	gasoline?: string
	registered_at?: Date
	is_insure?: boolean
	status?: number
	property?: TruckPropertyInterface
	weight?: TruckWeightInterface
}

interface updateTruckByCarrierDTO {
	truck_id: string
	truckinfo: whitelistUpdateTruckDTO
}
interface updateTruckBySrvDTO {
	identifier: CarrierIdentifier
	truck_id: string
	truckinfo: whitelistUpdateTruckDTO
}
interface queryTruckDTO {
	truck_id?: string
	license_number?: string
	gasoline?: string | string
	registered_at?: Date
	is_insure?: boolean | string
	property?: TruckPropertyInterface
	weight?: TruckWeightInterface
	status?: number | string
}
interface filterTruckDTO {
	identifier: CarrierIdentifier
	query: queryTruckDTO
}

type updateTruckDTO = updateTruckByCarrierDTO | updateTruckBySrvDTO

export {
	createTruckDTO,
	updateTruckDTO,
	whitelistUpdateTruckDTO,
	deleteTruckDTO,
	filterTruckDTO,
	queryTruckDTO,
	updateTruckBySrvDTO,
}
