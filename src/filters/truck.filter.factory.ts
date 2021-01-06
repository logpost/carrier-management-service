import { TruckInterface } from '../entities/interfaces/data/truck.interface'
import { queryTruckDTO } from '../entities/dtos/truck.dto'

class TruckFilterFactory {
	public filterer = {
		truck_id: (trucks: TruckInterface[], query: string) => {
			return trucks.filter((truck) => truck.truck_id.toString() === query)
		},
		license_number: (trucks: TruckInterface[], query: string) => {
			return trucks.filter((truck) => truck.license_number === query)
		},
		gasoline: (trucks: TruckInterface[], query: string) => {
			return trucks.filter((truck) => truck.gasoline === query)
		},
		age: (trucks: TruckInterface[], query: string) => {
			return trucks.filter((truck) => truck.age === parseInt(query, 10))
		},
		is_insure: (trucks: TruckInterface[], query: string) => {
			return trucks.filter((truck) => truck.is_insure === (query === 'true'))
		},
		'property.type': (trucks: TruckInterface[], query: string) => {
			return trucks.filter((truck) => truck.property.type === query)
		},
		'property.option': (trucks: TruckInterface[], query: string) => {
			return trucks.filter((truck) => truck.property.option === query)
		},
		'property.chassis': (trucks: TruckInterface[], query: string) => {
			return trucks.filter((truck) => truck.property.chassis === parseInt(query, 10))
		},
		weight: (trucks: TruckInterface[], query: string) => {
			return trucks.filter((truck) => truck.weight === query)
		},
		status: (trucks: TruckInterface[], query: string) => {
			return trucks.filter((truck) => truck.status === parseInt(query, 10))
		},
	} as any

	public async filterByQuery(trucks: TruckInterface[], query: queryTruckDTO): Promise<TruckInterface[]> {
		const promises = Object.keys(query).map(async (key: any) => {
			trucks = await JSON.parse(
				JSON.stringify(this.filterer[key](trucks, query[key as keyof queryTruckDTO] as string)),
			)
		})
		await Promise.all(promises)

		return trucks
	}
}

export default new TruckFilterFactory()
