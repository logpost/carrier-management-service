import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import JobUsecase from '../usecase/job.usecase'
import responseHandler from '../helper/response.handler'
// import { Payload } from '../entities/dtos/token.dto'
import { updateJobHistoryDTO, addJobHistoryDTO, getJobHistoryDTO } from '../entities/dtos/job.dto'

class JobRoutes {
	public prefix_route = '/job'

	async routes(fastify: FastifyInstance, opts: FastifyPluginOptions, done: any) {
		fastify.put(`/srv/history/add`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const { identifier, job_id } = request.body as addJobHistoryDTO
				await JobUsecase.addJobHistory(identifier, job_id)
				return `200 : Update job history success`
			}, reply)
			await reply
		})

		fastify.put(`/srv/history/delete`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const { identifier, job_id } = request.body as updateJobHistoryDTO
				await JobUsecase.deleteJobHistory(identifier, job_id)
				return `200 : Delete job history success`
			}, reply)
			await reply
		})

		fastify.post(`/srv/history/all`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const { identifier } = request.body as getJobHistoryDTO
				const data = await JobUsecase.getJobHistory(identifier)
				return data
			}, reply)
			await reply
		})

		done()
	}
}

export default JobRoutes
