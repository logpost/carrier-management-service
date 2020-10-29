import config from '../config/config'
import { whitelistupdateProfileDTO } from '../entities/dtos/carrier.dto'
import { Whitelist } from '../entities/interfaces/data/whitelist.interface'
import { whitelist } from '../entities/whitelists/whitelist.entity'

const validCheckInput = (task_named: string, task_content: string): boolean | string => {
  return task_named !== null && task_content !== null
}

const validCheckID = (id: string): boolean | string => {
  return id !== null
}

const isNotValidField = (whitelist: Whitelist, fieldList: string): boolean => {
  return !Object.keys(whitelist).includes(fieldList)
}

const validUpdatedFields = (profile: whitelistupdateProfileDTO, whitelist_key: string): string[] => {
  const errorFieldsUpdate: string[] = Object.keys(profile).filter((key) => isNotValidField(whitelist[whitelist_key], key))
  return errorFieldsUpdate
}

export { validCheckInput, validCheckID, isNotValidField, validUpdatedFields  /* , validCountry */}
