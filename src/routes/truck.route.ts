import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { Payload } from '../entities/dtos/token.dto'
import { createTruckDTO, updateTruckDTO, deleteTruckDTO } from '../entities/dtos/truck.dto'
import responseHandler from '../helper/response.handler'
import TruckUsecase from '../usecase/truck.usecase'
// import * as Validator from '../helper/validate.helper'

class TruckRoute {    
    public prefix_route = '/truck'

    async routes(fastify: FastifyInstance, opts: FastifyPluginOptions, done: any) {

        fastify.post(`/create`, { preValidation: [(fastify as any).authenticate] }, async (request, reply) => {
            responseHandler(async () => {
              const { username } = request.user as Payload
              const truckinfo : createTruckDTO = request.body as createTruckDTO   
              const data = await TruckUsecase.createTruck(username, truckinfo)
              return data
            }, reply)
            await reply
          })
          
        fastify.put(`/update`, { preValidation: [(fastify as any).authenticate] }, async (request, reply) => {
        responseHandler(async () => {
            const { username } = request.user as Payload
            const truck : updateTruckDTO = request.body as updateTruckDTO   
            const data = await TruckUsecase.updateTruck(username, truck)
            return data
        }, reply)
        await reply
        })

        fastify.delete(`/delete`, { preValidation: [(fastify as any).authenticate] }, async (request, reply) => {
            responseHandler(async () => {
                const { username } = request.user as Payload
                const { truck_id }  = request.body as deleteTruckDTO
                const data = await TruckUsecase.deleteTruck(username, truck_id)
                return data
            }, reply)
            await reply
        })
        
        done()
    }
}

export default TruckRoute 