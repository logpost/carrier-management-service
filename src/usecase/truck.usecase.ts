import AccountRepository from '../repositories/account.repository'
import { identifierDTO as CarrierIdentifier } from '../entities/dtos/carrier.dto'
import { createTruckDTO, updateTruckDTO, queryTruckDTO } from '../entities/dtos/truck.dto'
import { queryUpdateItemInArray } from '../helper/query.handler'
import { TruckInterface } from '../entities/interfaces/data/truck.interface'
import TruckFilterFactory from '../filters/truck.filter.factory'

async function createTruck(username: string, truckinfo: createTruckDTO): Promise<string> {
	const accountRepository = AccountRepository.getInstance()
	const { license_number } = truckinfo
	const trucks = await accountRepository.findTruckExistOnUsernameByLicenseNumber(username, license_number)
	if (!trucks) {
		try {
			await accountRepository.createTruckByUsername(username, truckinfo)
			return `201 : Create truck is successfully`
		} catch (err) {
			console.log(err)
			throw new Error(`400 : Save data is not successfully`)
		}
	}
	throw new Error(`400 : Truck is existing, create truck didn't successfully`)
}

async function updateTruck(identifier: CarrierIdentifier, truck: updateTruckDTO): Promise<string> {
	const accountRepository = AccountRepository.getInstance()
	const { truck_id, truckinfo } = truck
	const query = queryUpdateItemInArray(truckinfo, 'trucks')

	try {
		await accountRepository.updateTruckByTruckIdAndUsername(identifier, truck_id, query)
		return `204 : Update truck info is successfully`
	} catch (err) {
		console.log(err)
		throw new Error(`400 : Update truck info is not successfully`)
	}
}

async function deleteTruck(username: string, truck_id: string): Promise<string> {
	const accountRepository = AccountRepository.getInstance()
	try {
		await accountRepository.deleteTruckByTruckIdAndUsername(username, truck_id)
		return `204 : Delete truck is successfully`
	} catch (err) {
		console.log(err)
		throw new Error(`400 : Delete truck is not successfully`)
	}
}

async function findAllTrucks(username: string): Promise<TruckInterface[]> {
	const accountRepository = AccountRepository.getInstance()
	try {
		const trucks = await accountRepository.findTrucksByIdentifier({ username })
		return trucks
	} catch (error) {
		console.log(error)
		throw new Error(`400 : Identifier is not valid`)
	}
}

async function queryTruck(identifier: CarrierIdentifier, query: queryTruckDTO): Promise<TruckInterface[]> {
	const accountRepository = AccountRepository.getInstance()
	const trucks = await accountRepository.findTrucksByIdentifier(identifier)
	if (trucks) {
		const data = await TruckFilterFactory.filterByQuery(trucks, query)
		return data
	}
	throw new Error(`404 : Identifier is not exist in database`)
}

export default {
	createTruck,
	updateTruck,
	deleteTruck,
	findAllTrucks,
	queryTruck,
}
