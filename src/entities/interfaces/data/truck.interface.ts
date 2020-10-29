export interface TruckTypeInterface {
    wheel?: number
    is_container?: boolean
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
    type: TruckTypeInterface
    weight: TruckWeightInterface
    created_at: Date
    updated_at: Date
}