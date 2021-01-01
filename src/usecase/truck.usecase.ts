import AccountRepository from '../repositories/account.repository'
import { createTruckDTO, updateTruckDTO } from '../entities/dtos/truck.dto'
import { queryUpdateItemInArray } from '../helper/query.handler'
import { TruckInterface } from '../entities/interfaces/data/truck.interface'

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

async function updateTruck(username: string, truck: updateTruckDTO): Promise<string> {
	const accountRepository = AccountRepository.getInstance()
	const { truck_id, truckinfo } = truck
	const query = queryUpdateItemInArray(truckinfo, 'trucks')

	try {
		await accountRepository.updateTruckByTruckIdAndUsername(username, truck_id, query)
		return `200 : Update truck info is successfully`
	} catch (err) {
		console.log(err)
		throw new Error(`400 : Update truck info is not successfully`)
	}
}

async function deleteTruck(username: string, truck_id: string): Promise<string> {
	const accountRepository = AccountRepository.getInstance()
	try {
		await accountRepository.deleteTruckByTruckIdAndUsername(username, truck_id)
		return `200 : Delete truck is successfully`
	} catch (err) {
		console.log(err)
		throw new Error(`400 : Delete truck is not successfully`)
	}
}

async function findTrucks(username: string, status: string | undefined): Promise<TruckInterface[]> {
	const accountRepository = AccountRepository.getInstance()
	try {
		const trucks = await accountRepository.findTrucksByIdentifier({ username })
		if (status) {
			return trucks.filter((truck) => truck.status === parseInt(status, 10))
		}
		return trucks
	} catch (error) {
		console.log(error)
		throw new Error(`400 : Identifier is not valid`)
	}
}

export default {
	createTruck,
	updateTruck,
	deleteTruck,
	findTrucks,
}
