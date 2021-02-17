import { JobInterface } from '../interfaces/data/job.interface'
import { AddressInterface } from '../interfaces/data/address.interface'
import { OAuth2Interface } from '../interfaces/data/oauth2.interface'
interface createDTO {
	username: string
	password: string
	email?: string
	oauth2?: OAuth2Interface
	name: string
	display_name?: string
	tel?: string
	address?: AddressInterface
	role?: string
	account_type: string
	account_description?: string
	juristic_id?: string
	is_email_confirmed?: boolean
	is_verified?: boolean
	job_history?: JobInterface[]
	create_at?: Date
}

interface identifierDTO {
	carrier_id?: string
	username?: string
	email?: string
}

interface confirmedEmailDTO {
	identifier: identifierDTO
	email: string
}

interface deleteDTO {
	identifier: identifierDTO
	password: string
}

interface updateProfileDTO {
	identifier: identifierDTO
	profile: whitelistUpdateAccountProfileDTO
}
interface whitelistUpdateProfileForSrvDTO {
	username?: string
	password?: string
	email?: string
	is_email_confirmed?: boolean
	is_verified?: boolean
	account_type?: string
}
interface whitelistUpdateProfileForCarrierDTO {
	name?: string
	display_name?: string
	tel?: string
	address?: AddressInterface
	account_description?: string
	juristic_id?: string
}

type whitelistUpdateAccountProfileDTO = whitelistUpdateProfileForCarrierDTO | whitelistUpdateProfileForSrvDTO

export {
	createDTO,
	updateProfileDTO,
	whitelistUpdateProfileForCarrierDTO,
	whitelistUpdateProfileForSrvDTO,
	whitelistUpdateAccountProfileDTO,
	deleteDTO,
	confirmedEmailDTO,
	identifierDTO,
}
