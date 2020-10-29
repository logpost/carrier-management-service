import { model, Model } from 'mongoose'
import { CarrierInterface } from '../entities/interfaces/data/carrier.interface'
import { CarrierSchema } from '../entities/schemas/carrier.schema'
import { createDTO, identifierDTO ,updateProfileDTO, whitelistupdateProfileDTO } from '../entities/dtos/carrier.dto'

import config from '../config/config'

class CarrierRepository {
  private static instance: CarrierRepository
  private _model: Model<CarrierInterface>
  private _collection: string

  constructor() {
    this._collection = config.db.mongo.collection!
    this._model = model<CarrierInterface>(this._collection, CarrierSchema)
  }

  public static getInstance(): CarrierRepository {
    if (!CarrierRepository.instance) {
      CarrierRepository.instance = new CarrierRepository()
    }
    return CarrierRepository.instance
  }

  public async adminFindCarrierByIdentifier(identifier: identifierDTO): Promise<CarrierInterface | null> {
    const result: CarrierInterface | null = await this._model.findOne(identifier)
    return result 
  }

  public async findCarrierByIdentifier(identifier: identifierDTO): Promise<CarrierInterface | null> {
    const result: CarrierInterface | null = await this._model.findOne(identifier, { _id: 0, password: 0, created_at: 0, updated_at: 0})
    return result 
  }

  public async findPasswordHashedByIdentifier(identifier: identifierDTO): Promise<string | null> {
    const { password : hashed }  = await this._model.findOne(identifier) as CarrierInterface
    return hashed 
  }

  public async createCarrierAccount(carrier_account: createDTO): Promise<string> {
    const mongooseModel = new this._model(carrier_account)
    const { _id: carrier_id } = await mongooseModel.save()
    return carrier_id as string
  }
  
  public async updateEmailByIdentifier(identifier: identifierDTO, email: string): Promise<string> {
    const { _id: carrier_id } = await this._model.updateOne(identifier, { $set: { email }})
    return carrier_id as string
  }

  public async updateProfileCarrierAccountByIdentifier(identifier: identifierDTO, profile: whitelistupdateProfileDTO): Promise<string> {
    const { _id: carrier_id } = await this._model.updateOne(identifier, { $set: profile })
    return carrier_id as string
  }


  // public async findAllCarrier(): Promise<CarrierInterface[]> {
  //   const result = await this._model.find({})
  //   return result as CarrierInterface[]
  

  // public async findAllCarriersInChannel(channel: { [key: string]: string }): Promise<CarrierInterface[]> {
  //   const result = await this._model.find(channel)
  //   return result as CarrierInterface[]
  // }


  // public async updateCarrier(_id: string, dataUpdate: whitelistUpdateFieldDTO): Promise<number> {
  //   const result = await this._model.updateOne({ _id }, {
  //     $set: {
  //       ...dataUpdate,
  //     },
  //   })
  //   return result.n as number
  // }

  public async deleteCarrierAccount(identifier: identifierDTO): Promise<number> {
    const result = await this._model.deleteOne(identifier)
    return result.deletedCount as number
  }

  public async deActivateCarrierAccount(identifier: identifierDTO, username: string, bias: string): Promise<number> {
    const result = await this._model.updateOne(identifier, { $set: { username : bias + username }})
    return result.nModified as number
  }

}

export default CarrierRepository
