import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { Payload } from '../entities/dtos/token.dto'
import { createDriverDTO, updateDriverDTO, deleteDriverDTO, QueryReqDriverDTO } from '../entities/dtos/driver.dto'
import responseHandler from '../helper/response.handler'
import DriverUsecase from '../usecase/driver.usecase'
// import * as Validator from '../helper/validate.helper'

class DriverRoute {
	public prefix_route = '/driver'

	async routes(fastify: FastifyInstance, opts: FastifyPluginOptions, done: any) {
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
				const data = await DriverUsecase.updateDriver(username, driver)
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

		// /all or /all?status=100
		fastify.get(`/all`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
			responseHandler(async () => {
				const { username } = request.user as Payload
				const { status } = request.query as QueryReqDriverDTO
				const data = await DriverUsecase.findDrivers(username, status)
				return data
			}, reply)
			await reply
		})

		done()
	}
}

export default DriverRoute
