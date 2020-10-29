import AccountRepository from '../repositories/account.repository'
import { queryUpdateItemInArray } from '../helper/query.handler'
import {
  createDriverDTO,
  updateDriverDTO,
} from '../entities/dtos/driver.dto'

async function createDriver(username: string, driverinfo: createDriverDTO): Promise<string> {
  const accountRepository = AccountRepository.getInstance()
  const { driver_license } = driverinfo 
  const drivers = await accountRepository.findDriverExistOnUsernameByLicenseNumber(username, driver_license)

  if(!drivers){
    try {
      await accountRepository.createDriverByUsername(username, driverinfo)
      return `201 : Create driver is successfully`
    } catch (err) {
        console.log(err)
      throw new Error(`400 : Save data is not successfully`)
    } 
  }
  throw new Error(`400 : Driver is existing, create driver didn't successfully`)
}

async function updateDriver(username: string, driver: updateDriverDTO): Promise<string> {
    const accountRepository = AccountRepository.getInstance()
    const { driver_id , driverinfo} = driver
    const query = queryUpdateItemInArray(driverinfo)
    
    try {
        await accountRepository.updateDriverByDriverIdAndUsername(username, driver_id, query)
        return `200 : Update driver info is successfully`
    } catch (err) {
        console.log(err)
        throw new Error(`400 : Update driver info is not successfully`)
    } 
}

async function deleteDriver(username: string, driver_id: string): Promise<string> {
    const accountRepository = AccountRepository.getInstance()
    try {
        await accountRepository.deleteDriverByDriverIdAndUsername(username, driver_id)
        return `200 : Delete driver is successfully`
    } catch (err) {
        console.log(err)
        throw new Error(`400 : Delete driver is not successfully`)
    } 
}

export default {
    createDriver,
    updateDriver,
    deleteDriver
}
