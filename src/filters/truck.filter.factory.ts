import { TruckInterface } from '../entities/interfaces/data/truck.interface'
import { queryTruckDTO } from '../entities/dtos/truck.dto'

class TruckFilterFactory {
	public filterer = {
		truck_id: (truck: TruckInterface, query: string) => {
			return truck.truck_id.toString() === query
		},
		license_number: (truck: TruckInterface, query: string) => {
			return truck.license_number === query
		},
		gasoline: (truck: TruckInterface, query: string) => {
			return truck.gasoline === query
		},
		registered_at: (truck: TruckInterface, query: string) => {
			return new Date(truck.registered_at).getTime() === new Date(query).getTime()
		},
		is_insure: (truck: TruckInterface, query: string) => {
			return truck.is_insure === (query === 'true')
		},
		'property.type': (truck: TruckInterface, query: string) => {
			return truck.property.type === query
		},
		'property.option': (truck: TruckInterface, query: string) => {
			return truck.property.option === query
		},
		'property.chassis': (truck: TruckInterface, query: string) => {
			return truck.property.chassis === parseInt(query, 10)
		},
		weight: (truck: TruckInterface, query: string) => {
			return truck.weight === query
		},
		status: (truck: TruckInterface, query: string) => {
			return truck.status === parseInt(query, 10)
		},
	} as any

	public async filterByQuery(trucks: TruckInterface[], query: queryTruckDTO): Promise<TruckInterface[]> {
		return JSON.parse(JSON.stringify(trucks)).filter((truck: TruckInterface) => {
			return Object.keys(query).every((key) => {
				return this.filterer[key](truck, query[key as keyof queryTruckDTO] as string)
			})
		})
	}
}

export default new TruckFilterFactory()
