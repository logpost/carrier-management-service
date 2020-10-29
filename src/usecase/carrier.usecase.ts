import { CarrierInterface } from '../entities/interfaces/data/carrier.interface'
import CarrierRepository from '../repositories/carrier.repository'
import { hashing, compareHashed } from '../helper/hashing.handler'
import {
  createDTO,
  confirmedEmailDTO,
  identifierDTO,
  updateProfileDTO,
  deleteDTO
} from '../entities/dtos/carrier.dto'

async function adminFindCarrierByIdentifier(identifier: identifierDTO): Promise<CarrierInterface> {
  try {
    const carrierRepository = CarrierRepository.getInstance()
    const data = await carrierRepository.adminFindCarrierByIdentifier(identifier)  
    if(data)
      return data
  } catch (error) {
    throw new Error(`400 : Save data is not successfully`)
  }
  throw new Error(`404 : username is not exist in database`)
}

async function findProfileCarrierAccountByUsername(identifier: identifierDTO): Promise<CarrierInterface> {
  try {
    const carrierRepository = CarrierRepository.getInstance()
    const data = await carrierRepository.findCarrierByIdentifier(identifier)  
    if(data)
      return data
  } catch (error) {
    throw new Error(`400 : Save data is not successfully`)
  }
  throw new Error(`404 : username is not exist in database`)
}

async function createCarrierAccount(carrier_account: createDTO): Promise<string> {
  const carrierRepository = CarrierRepository.getInstance()
  let { username, password } = carrier_account
  const account = await carrierRepository.findCarrierByIdentifier({ username })

  if(!account){
    if(password)
      carrier_account.password = await hashing(password)
    else
      throw new Error(`400 : Invalid input, Please input field password`)
    try {
      const carrier_id = await carrierRepository.createCarrierAccount(carrier_account)
      console.log("Create carrier account success: carrier_id is", carrier_id)
      return `201 : Create carrier account is successfully`
    } catch (err) {
      console.error(err)
      throw new Error(`400 : Save data is not successfully`)
    } 
  }
  throw new Error(`400 : Account is existing, create account didn't successfully`)
}

async function confirmedWithEmail(req: confirmedEmailDTO): Promise<string> {
  const carrierRepository = CarrierRepository.getInstance()
  let { identifier, email } =  req
  const account = await carrierRepository.findCarrierByIdentifier(identifier)

  if(account){
    try {
      await carrierRepository.updateEmailByIdentifier(identifier, email)
      return `200 : Comfirmed, Email is update successfully`
    } catch (err) {
      console.error(err)
      throw new Error(`400 : Save data is not successfully`)
    }
  }
  throw new Error(`404 : your username is not exist in database.`)
}

async function updateProfileCarrierAccount(req: updateProfileDTO): Promise<string> {
  const carrierRepository = CarrierRepository.getInstance()
  const { identifier, profile } = req

  try {
    await carrierRepository.updateProfileCarrierAccountByIdentifier(identifier, profile)
    return `200 : Updated, Profile is update successfully`
  } catch (err) {
    console.error(err)
    throw new Error(`400 : Save data is not successfully`)
  }
}

async function deleteCarrierAccount(req: deleteDTO): Promise<string> {
  const carrierRepository = CarrierRepository.getInstance()
  let { identifier , password } =  req
  let hash: string | null

  try {
    hash = await carrierRepository.findPasswordHashedByIdentifier(identifier)
  } catch (error) {
    console.log(error)
    throw new Error(`404 : Invalid input, Your identifier is not exist`)  
  }

  if(hash){
    const match = await compareHashed(password, hash)
    if(match){
        const deleteResult: number = await carrierRepository.deleteCarrierAccount(identifier)
        if (deleteResult) 
          return `200 : Delete account is successfully`
        throw new Error(`404 : Delete data is not successfully, don't have data in Database`)
    }
    throw new Error(`400 : Invalid input, Your password is not match`)
  }  
  throw new Error(`404 : Invalid input, Your identifier is not exist`)  
}

async function deActivateCarrierAccount(req: deleteDTO): Promise<string> {
  const bias: string = "_deactivete"
  const carrierRepository = CarrierRepository.getInstance()
  let { identifier , password } =  req
  let hash: string | null

  try {
    hash = await carrierRepository.findPasswordHashedByIdentifier(identifier)
  } catch (error) {
    console.log(error)
    throw new Error(`404 : Invalid input, Your identifier is not exist`)  
  }

  if(hash){
    const match = await compareHashed(password, hash)
    if(match){
      try {
        const shipprt_account = await carrierRepository.findCarrierByIdentifier(identifier) as CarrierInterface
        const { username } = shipprt_account
        const nModified = await carrierRepository.deActivateCarrierAccount(identifier, username, bias)
        if(nModified >= 1)
              return `200 : DeActivate account is successfully`
      } catch (err) {
        throw new Error(`400 : DeActivate account is not successfully`)
      }
      throw new Error(`404 : Some profile information is not exist in database`)
    }
    throw new Error(`400 : Invalid input, Your password is not match`)
  }  
  throw new Error(`404 : Invalid input, Your identifier is not exist`)  
}

export default {
  adminFindCarrierByIdentifier,
  updateProfileCarrierAccount,
  findProfileCarrierAccountByUsername,
  createCarrierAccount,
  confirmedWithEmail,
  deleteCarrierAccount,
  deActivateCarrierAccount
}
