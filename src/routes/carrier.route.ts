import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import CarrierUsecase from '../usecase/carrier.usecase'
import responseHandler from '../helper/response.handler'
import { Payload } from '../entities/dtos/token.dto'
import { createDTO, confirmedEmailDTO,  deleteDTO, identifierDTO , whitelistupdateProfileDTO} from '../entities/dtos/carrier.dto'
import * as Validator from '../helper/validate.helper'

class CarrierRoutes {
  public prefix_route = '/carrier'

  async routes(fastify: FastifyInstance, opts: FastifyPluginOptions, done: any) {

    fastify.get(`/healthcheck`, async (request, reply) => {
      responseHandler(async () => {
        return {healthcheck: "server is alive"}
      }, reply)
      await reply
    })

    fastify.get(`/admin/profile/:username`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
      responseHandler(async () => {
        const param: identifierDTO = request.params as identifierDTO   
        const data = await CarrierUsecase.adminFindCarrierByIdentifier(param)
        return data
      }, reply)
      await reply
    })

    fastify.get(`/profile/:username`, async (request, reply) => {
      responseHandler(async () => {
        const param: identifierDTO = request.params as identifierDTO   
        const data = await CarrierUsecase.findProfileCarrierAccountByUsername(param)
        return data
      }, reply)
      await reply
    })

    fastify.post(`/create`, async (request, reply) => {
      responseHandler(async () => {
        const req: createDTO = request.body as createDTO   
        let { email, ...carrier_account } = req 
        const data = await CarrierUsecase.createCarrierAccount(carrier_account)
        return data

      }, reply)
      await reply
    })
    
    // This route have vulnerability at client, we should use this route service to service for policy.
    fastify.put(`/confirmed_email`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
      responseHandler(async () => {
        const req: confirmedEmailDTO = request.body as confirmedEmailDTO
        let { email, identifier } = req 
        
        if(!email)
          throw new Error(`400 : Invalid input, Please input field email`)  

        if('username' in identifier || 'carrier_id' in identifier){
          const data = await CarrierUsecase.confirmedWithEmail(req)
          return data  
        } else {
          throw new Error(`400 : Invalid input, Please input field username or account id`)  
        }
        
      }, reply)
      await reply
    })

    fastify.delete(`/force_delete`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
      responseHandler(async () => {
        const req: deleteDTO = request.body as deleteDTO
        const { username } = request.user as Payload
        const identifier: identifierDTO  = { username }
        let data

        if(identifier.username || identifier.carrier_id)
          data = await CarrierUsecase.deleteCarrierAccount({ ...req, identifier})
        else 
          throw new Error(`400 : Invalid input, Input not exist account id or password field`)  
        return data

      }, reply)
      await reply
    })

    fastify.put(`/delete`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
      responseHandler(async () => {
        const req: deleteDTO = request.body as deleteDTO
        const { username } = request.user as Payload
        const identifier: identifierDTO  = { username }
        let data

        if(identifier.username || identifier.carrier_id)
          data = await CarrierUsecase.deActivateCarrierAccount({ ...req, identifier })
        else 
          throw new Error(`400 : Invalid input, Input not exist account id or password field`) 
        return data
      }, reply)
      await reply
    })

    fastify.put(`/profile/update`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
      responseHandler(async () => {
        const { username } = request.user as Payload
        const identifier: identifierDTO  = { username }
        const profile: whitelistupdateProfileDTO = request.body as whitelistupdateProfileDTO

        if(identifier.username || identifier.carrier_id){
          const errorFieldsUpdate = Validator.validUpdatedFields(profile, 'carrier')
          if (errorFieldsUpdate.length > 0) 
            throw new Error(`400 : Invalid Fields! ${errorFieldsUpdate.join(', ')}`)
        } else{
          throw new Error(`400 : Invalid input, Input not exist account id or password field`) 
        }

        const data = await CarrierUsecase.updateProfileCarrierAccount({ identifier, profile })
        return data
      }, reply)
      await reply
    })

    done()
  }
}

export default CarrierRoutes
