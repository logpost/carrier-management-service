import { identifierDTO as CarrierIdentifier } from './carrier.dto'

interface identifierDTO {
	driver_id: string
}
interface createDriverDTO {
	name: string
	age: number
	tel: string
	driver_license: string
	driver_license_type: string
	identification_number: string
}
interface deleteDriverDTO {
	driver_id: string
}
interface whitelistUpdateDriverDTO {
	name?: string
	age?: string | number
	tel?: string
	driver_license?: string
	driver_license_type?: string
	identification_number?: string
	status?: string | number
}
interface updateDriverByCarrierDTO {
	driver_id: string
	driverinfo: whitelistUpdateDriverDTO
}
interface updateDriverBySrvDTO {
	identifier: CarrierIdentifier
	driver_id: string
	driverinfo: whitelistUpdateDriverDTO
}
interface queryDriverDTO {
	driver_id?: string
	name?: string
	age?: number | string
	tel?: string
	driver_license?: string
	driver_license_type?: string
	identification_number?: string
	status?: number | string
}
interface filterDriverDTO {
	identifier: CarrierIdentifier
	query: queryDriverDTO
}
type updateDriverDTO = updateDriverByCarrierDTO | updateDriverBySrvDTO

export {
	identifierDTO,
	createDriverDTO,
	updateDriverDTO,
	whitelistUpdateDriverDTO,
	deleteDriverDTO,
	queryDriverDTO,
	filterDriverDTO,
	updateDriverBySrvDTO,
}
