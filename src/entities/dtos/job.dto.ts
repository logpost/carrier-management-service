import { identifierDTO as CarrierIdentifier } from './carrier.dto'

interface getJobHistoryDTO {
	identifier: CarrierIdentifier
}
interface addJobHistoryDTO {
	identifier: CarrierIdentifier
	job_id: string
}
interface updateJobHistoryDTO {
	identifier: CarrierIdentifier
	job_id: string
}

export { getJobHistoryDTO, addJobHistoryDTO, updateJobHistoryDTO }
