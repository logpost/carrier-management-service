import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { Payload } from '../entities/dtos/token.dto'
import {
	createDriverDTO,
	updateDriverDTO,
	deleteDriverDTO,
	// queryDriverDTO,
	// identifierDTO,
	filterDriverDTO,
	updateDriverBySrvDTO,
} from '../entities/dtos/driver.dto'
import responseHandler from '../helper/response.handler'
import DriverUsecase from '../usecase/driver.usecase'
// import CarrierUsecase from '../usecase/carrier.usecase'

class DriverRoute {
	public prefix_route = '/driver'

	async routes(fastify: FastifyInstance, opts: FastifyPluginOptions, done: any) {
		fastify.post(`/srv/filter`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const { identifier, query } = request.body as filterDriverDTO
				const drivers = await DriverUsecase.queryDriver(identifier, query)
				return drivers
			}, reply)
			await reply
		})

		fastify.put(`/srv/update`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const info: updateDriverDTO = request.body as updateDriverDTO
				const { identifier, ...driver } = info as updateDriverBySrvDTO
				const data = await DriverUsecase.updateDriver(identifier, driver)
				return data
			}, reply)
			await reply
		})

		fastify.get(`/owned`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const { username } = request.user as Payload
				const data = await DriverUsecase.findAllDrivers(username)
				return data
			}, reply)
			await reply
		})

		fastify.post(`/create`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const { username } = request.user as Payload
				const driverinfo: createDriverDTO = request.body as createDriverDTO
				const data = await DriverUsecase.createDriver(username, driverinfo)
				return data
			}, reply)
			await reply
		})

		fastify.put(`/update`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const { username } = request.user as Payload
				const driver: updateDriverDTO = request.body as updateDriverDTO
				const data = await DriverUsecase.updateDriver({ username }, driver)
				return data
			}, reply)
			await reply
		})

		fastify.delete(`/delete`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const { username } = request.user as Payload
				const { driver_id } = request.body as deleteDriverDTO
				const data = await DriverUsecase.deleteDriver(username, driver_id)
				return data
			}, reply)
			await reply
		})

		fastify.post(`/filter`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const { username } = request.user as Payload
				const { query } = request.body as filterDriverDTO
				const drivers = await DriverUsecase.queryDriver({ username }, query)
				return drivers
			}, reply)
			await reply
		})

		done()
	}
}

export default DriverRoute
