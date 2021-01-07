import { JobInterface } from '../entities/interfaces/data/job.interface'
import AccountRepository from '../repositories/account.repository'
import { identifierDTO } from '../entities/dtos/carrier.dto'

async function addJobHistory(identifier: identifierDTO, job_id: string): Promise<string> {
	const accountRepository = AccountRepository.getInstance()
	try {
		await accountRepository.addJobHistory(identifier, { job_id })
		return `201 : Update job history is successfully`
	} catch (err) {
		throw new Error(`400 : Update job history is not successfully`)
	}
}

async function deleteJobHistory(identifier: identifierDTO, job_id: string): Promise<string> {
	const accountRepository = AccountRepository.getInstance()
	try {
		await accountRepository.deleteJobHistory(identifier, job_id)
		return `204 : Delete job history history is successfully`
	} catch (err) {
		console.log(err)
		throw new Error(`400 : Delete job history is not successfully`)
	}
}

async function getJobHistory(identifier: identifierDTO): Promise<JobInterface[]> {
	const accountRepository = AccountRepository.getInstance()
	try {
		const jobs = await accountRepository.getJobHistory(identifier)
		return jobs
	} catch (err) {
		console.log(err)
		throw new Error(`400 : Get job history is not successfully`)
	}
}

export default {
	addJobHistory,
	deleteJobHistory,
	getJobHistory,
}
