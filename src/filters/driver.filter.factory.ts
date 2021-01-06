import { DriverInterface } from '../entities/interfaces/data/driver.interface'
import { queryDriverDTO } from '../entities/dtos/driver.dto'

class DriverFilterFactory {
	private filterer = {
		driver_id: (drivers: DriverInterface[], query: string) => {
			return drivers.filter((driver) => driver.driver_id.toString() === query)
		},
		name: (drivers: DriverInterface[], query: string) => {
			return drivers.filter((driver) => driver.name === query)
		},
		age: (drivers: DriverInterface[], query: string) => {
			return drivers.filter((driver) => driver.age === parseInt(query, 10))
		},
		tel: (drivers: DriverInterface[], query: string) => {
			return drivers.filter((driver) => driver.tel === query)
		},
		driver_license: (drivers: DriverInterface[], query: string) => {
			return drivers.filter((driver) => driver.driver_license === query)
		},
		driver_license_type: (drivers: DriverInterface[], query: string) => {
			return drivers.filter((driver) => driver.driver_license_type === query)
		},
		identification_number: (drivers: DriverInterface[], query: string) => {
			return drivers.filter((driver) => driver.identification_number === query)
		},
		status: (drivers: DriverInterface[], query: string) => {
			return drivers.filter((driver) => driver.status === parseInt(query, 10))
		},
	}

	public async filterByQuery(drivers: DriverInterface[], query: queryDriverDTO): Promise<DriverInterface[]> {
		const promises = Object.keys(query).map(async (key) => {
			drivers = await JSON.parse(
				JSON.stringify(
					this.filterer[key as keyof queryDriverDTO](drivers, query[key as keyof queryDriverDTO] as string),
				),
			)
		})
		await Promise.all(promises)

		return drivers
	}
}

export default new DriverFilterFactory()
