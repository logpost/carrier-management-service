import AccountRepository from '../repositories/account.repository'
import { queryUpdateItemInArray } from '../helper/query.handler'
import { identifierDTO as CarrierIdentifier } from '../entities/dtos/carrier.dto'
import { createDriverDTO, updateDriverDTO, queryDriverDTO } from '../entities/dtos/driver.dto'
import { DriverInterface } from '../entities/interfaces/data/driver.interface'
import DriverFilterFactory from '../filters/driver.filter.factory'

async function createDriver(username: string, driverinfo: createDriverDTO): Promise<string> {
	const accountRepository = AccountRepository.getInstance()
	const { driver_license } = driverinfo
	const drivers = await accountRepository.findDriverExistOnUsernameByLicenseNumber(username, driver_license)

	if (!drivers) {
		try {
			await accountRepository.createDriverByUsername(username, driverinfo)
			return `201 : Create driver is successfully`
		} catch (err) {
			console.log(err)
			throw new Error(`400 : Create driver is not successfully`)
		}
	}
	throw new Error(`400 : Driver is existing, create driver didn't successfully`)
}

async function updateDriver(identifier: CarrierIdentifier, driver: updateDriverDTO): Promise<string> {
	const accountRepository = AccountRepository.getInstance()
	const { driver_id, driverinfo } = driver
	const query = queryUpdateItemInArray(driverinfo, 'drivers')

	try {
		await accountRepository.updateDriverByDriverIdAndUsername(identifier, driver_id, query)
		return `204 : Update driver info is successfully`
	} catch (err) {
		console.log(err)
		throw new Error(`400 : Update driver info is not successfully`)
	}
}

async function deleteDriver(username: string, driver_id: string): Promise<string> {
	const accountRepository = AccountRepository.getInstance()
	try {
		await accountRepository.deleteDriverByDriverIdAndUsername(username, driver_id)
		return `204 : Delete driver is successfully`
	} catch (err) {
		console.log(err)
		throw new Error(`400 : Delete driver is not successfully`)
	}
}

async function findAllDrivers(username: string): Promise<DriverInterface[]> {
	const accountRepository = AccountRepository.getInstance()
	try {
		const drivers = await accountRepository.findDriversByIdentifier({ username })
		return drivers
	} catch (error) {
		console.log(error)
		throw new Error(`400 : Identifier is not valid`)
	}
}

async function queryDriver(identifier: CarrierIdentifier, query: queryDriverDTO): Promise<DriverInterface[]> {
	const accountRepository = AccountRepository.getInstance()
	const drivers = await accountRepository.findDriversByIdentifier(identifier)
	if (drivers) {
		const data = await DriverFilterFactory.filterByQuery(drivers, query)
		return data
	}
	throw new Error(`404 : Identifier is not exist in database`)
}

export default {
	createDriver,
	updateDriver,
	deleteDriver,
	findAllDrivers,
	queryDriver,
}
