import { TruckPropertyInterface, TruckWeightInterface } from '../interfaces/data/truck.interface'

interface createTruckDTO {
	license_number: string
	gasoline: string
	age: number
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
	age?: number
	is_insure?: boolean
	status?: number
	property?: TruckPropertyInterface
	weight?: TruckWeightInterface
}

interface updateTruckDTO {
	truck_id: string
	truckinfo: whitelistUpdateTruckDTO
}

interface QueryReqTruckDTO {
	status?: string
}

export { createTruckDTO, updateTruckDTO, whitelistUpdateTruckDTO, deleteTruckDTO, QueryReqTruckDTO }
