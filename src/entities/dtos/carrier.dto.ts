import { JobInterface } from '../interfaces/data/job.interface'
interface createDTO {
	username: string
	password: string
	email?: string
	name: string
	display_name?: string
	tel?: string
	address?: string
	role?: string
	account_type: string
	account_description?: string
	juristic_id?: string
	verified?: boolean
	job_history?: JobInterface[]
	create_at?: Date
}

interface identifierDTO {
	carrier_id?: string
	username?: string
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
	verified?: boolean
	account_type?: string
}
interface whitelistUpdateProfileForCarrierDTO {
	name?: string
	display_name?: string
	tel?: string
	address?: string
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
