import { CarrierInterface } from '../entities/interfaces/data/carrier.interface'
import AccountRepository from '../repositories/account.repository'
import { hashing, compareHashed } from '../helper/hashing.handler'
import {
	createDTO,
	confirmedEmailDTO,
	identifierDTO,
	updateProfileDTO,
	deleteDTO,
	whitelistUpdateProfileForSrvDTO,
} from '../entities/dtos/carrier.dto'

async function srvFindCarrierByIdentifier(identifier: identifierDTO): Promise<CarrierInterface> {
	try {
		const accountRepository = AccountRepository.getInstance()
		const data = await accountRepository.srvFindCarrierByIdentifier(identifier)
		if (data) return data
	} catch (error) {
		throw new Error(`400 : Save data is not successfully`)
	}
	throw new Error(`404 : username is not exist in database`)
}

async function findProfileCarrierAccountByUsername(identifier: identifierDTO): Promise<CarrierInterface> {
	try {
		const accountRepository = AccountRepository.getInstance()
		const data = await accountRepository.findCarrierByIdentifier(identifier)
		if (data) return data
	} catch (error) {
		throw new Error(`400 : Save data is not successfully`)
	}
	throw new Error(`404 : username is not exist in database`)
}

async function createCarrierAccount(carrier_account: createDTO): Promise<identifierDTO> {
	const accountRepository = AccountRepository.getInstance()
	let { username, password } = carrier_account
	const account = await accountRepository.findCarrierByIdentifier({ username })

	if (!account) {
		if (password) carrier_account.password = await hashing(password)
		else throw new Error(`400 : Invalid input, Please input field password`)
		try {
			const carrier_id = await accountRepository.createCarrierAccount(carrier_account)
			console.log('Create carrier account success: carrier_id is', carrier_id)
			return { carrier_id }
		} catch (err) {
			console.error(err)
			throw new Error(`400 : Save data is not successfully`)
		}
	}
	throw new Error(`400 : Account is existing, create account didn't successfully`)
}

async function confirmedWithEmail(req: confirmedEmailDTO): Promise<string> {
	const accountRepository = AccountRepository.getInstance()
	let { identifier, email } = req
	const account = await accountRepository.findCarrierByIdentifier(identifier)

	if (account) {
		try {
			await accountRepository.updateEmailByIdentifier(identifier, email)
			return `204 : Comfirmed, Email is update successfully`
		} catch (error) {
			console.error(error)
			throw new Error(`400 : Save data is not successfully`)
		}
	}
	throw new Error(`404 : your username is not exist in database.`)
}

async function updateProfileCarrierAccount(req: updateProfileDTO): Promise<string> {
	const accountRepository = AccountRepository.getInstance()
	const { identifier, profile } = req

	if ((profile as whitelistUpdateProfileForSrvDTO)?.password) {
		const { password } = profile as whitelistUpdateProfileForSrvDTO
		;(profile as whitelistUpdateProfileForSrvDTO).password = await hashing(password as string)
	}
	try {
		const n = await accountRepository.updateProfileCarrierAccountByIdentifier(identifier, profile)
		if (n && n > 0) return `204 : Updated, Profile is update successfully`
		else throw new Error(`400 : Update profile is not successfully`)
	} catch (error) {
		console.error(error)
		throw new Error(`400 : Update profile is not successfully`)
	}
}

async function deleteCarrierAccount(req: deleteDTO): Promise<string> {
	const accountRepository = AccountRepository.getInstance()
	let { identifier, password } = req
	let hash: string | null

	try {
		hash = await accountRepository.findPasswordHashedByIdentifier(identifier)
	} catch (error) {
		console.error(error)
		throw new Error(`404 : Invalid input, Your identifier is not exist`)
	}

	if (hash) {
		const match = await compareHashed(password, hash)
		if (match) {
			const deleteResult: number = await accountRepository.deleteCarrierAccount(identifier)
			if (deleteResult) return `204 : Delete account is successfully`
			throw new Error(`404 : Delete data is not successfully, don't have data in Database`)
		}
		throw new Error(`400 : Invalid input, Your password is not match`)
	}
	throw new Error(`404 : Invalid input, Your identifier is not exist`)
}

async function deActivateCarrierAccount(req: deleteDTO): Promise<string> {
	const bias: string = '_deactivete'
	const accountRepository = AccountRepository.getInstance()
	let { identifier, password } = req
	let hash: string | null

	try {
		hash = await accountRepository.findPasswordHashedByIdentifier(identifier)
	} catch (error) {
		console.log(error)
		throw new Error(`404 : Invalid input, Your identifier is not exist`)
	}

	if (hash) {
		const match = await compareHashed(password, hash)
		if (match) {
			try {
				const shipprt_account = (await accountRepository.findCarrierByIdentifier(
					identifier,
				)) as CarrierInterface
				const { username } = shipprt_account
				const nModified = await accountRepository.deActivateCarrierAccount(identifier, username, bias)
				if (nModified >= 1) return `200 : DeActivate account is successfully`
			} catch (err) {
				throw new Error(`400 : DeActivate account is not successfully`)
			}
			throw new Error(`404 : Some profile information is not exist in database`)
		}
		throw new Error(`400 : Invalid input, Your password is not match`)
	}
	throw new Error(`404 : Invalid input, Your identifier is not exist`)
}

export default {
	srvFindCarrierByIdentifier,
	updateProfileCarrierAccount,
	findProfileCarrierAccountByUsername,
	createCarrierAccount,
	confirmedWithEmail,
	deleteCarrierAccount,
	deActivateCarrierAccount,
}
