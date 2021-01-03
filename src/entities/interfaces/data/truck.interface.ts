export interface TruckPropertyInterface {
	type: string
	option: string
	chassis?: number
}

export interface TruckWeightInterface {
	max?: number
	min?: number
}

export interface TruckInterface {
	truck_id: string
	license_number: string
	gasoline: string
	age: number
	is_insure: boolean
	status: number
	property: TruckPropertyInterface
	weight: TruckWeightInterface
	created_at: Date
	updated_at: Date
}
