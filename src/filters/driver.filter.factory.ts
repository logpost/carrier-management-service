import { DriverInterface } from '../entities/interfaces/data/driver.interface'
import { queryDriverDTO } from '../entities/dtos/driver.dto'
import { TruckInterface } from 'src/entities/interfaces/data/truck.interface'

class DriverFilterFactory {
	private filterer = {
		driver_id: (driver: DriverInterface, query: string) => {
			return driver.driver_id.toString() === query
		},
		name: (driver: DriverInterface, query: string) => {
			return driver.name === query
		},
		age: (driver: DriverInterface, query: string) => {
			return driver.age === parseInt(query, 10)
		},
		tel: (driver: DriverInterface, query: string) => {
			return driver.tel === query
		},
		driver_license: (driver: DriverInterface, query: string) => {
			return driver.driver_license === query
		},
		driver_license_type: (driver: DriverInterface, query: string) => {
			return driver.driver_license_type === query
		},
		identification_number: (driver: DriverInterface, query: string) => {
			return driver.identification_number === query
		},
		status: (driver: DriverInterface, query: string) => {
			return driver.status === parseInt(query, 10)
		},
	} as any

	public async filterByQuery(drivers: DriverInterface[], query: queryDriverDTO): Promise<DriverInterface[]> {
		return JSON.parse(JSON.stringify(drivers)).filter((driver: TruckInterface) => {
			return Object.keys(query).every((key) => {
				return this.filterer[key](driver, query[key as keyof queryDriverDTO] as string)
			})
		})
	}
}

export default new DriverFilterFactory()
