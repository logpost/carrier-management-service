import { model, Model } from 'mongoose'
import config from '../config/config'
import { CarrierInterface } from '../entities/interfaces/data/carrier.interface'
import { TruckInterface } from '../entities/interfaces/data/truck.interface'
import { DriverInterface } from '../entities/interfaces/data/driver.interface'
import { JobInterface } from '../entities/interfaces/data/job.interface'
import { CarrierSchema } from '../entities/schemas/carrier.schema'
import { createTruckDTO } from '../entities/dtos/truck.dto'
import { createDriverDTO } from 'src/entities/dtos/driver.dto'
import { createDTO, identifierDTO, whitelistupdateProfileDTO } from '../entities/dtos/carrier.dto'

class AccountRepository {
	private static instance: AccountRepository
	private _model: Model<CarrierInterface>
	private _collection: string

	constructor() {
		this._collection = config.db.mongo.collection!
		this._model = model<CarrierInterface>(this._collection, CarrierSchema)
	}

	public static getInstance(): AccountRepository {
		if (!AccountRepository.instance) {
			AccountRepository.instance = new AccountRepository()
		}
		return AccountRepository.instance
	}

	// ##### SERVICE REPOSITORY

	public async srvFindCarrierByIdentifier(identifier: identifierDTO): Promise<CarrierInterface | null> {
		const result: CarrierInterface | null = await this._model.findOne(identifier)
		return result
	}

	// public async srvFindDriverByIdentifier(identifier: identifierDTO): Promise<CarrierInterface | null> {
	// 	const result: CarrierInterface | null = await this._model.findOne(identifier)
	// 	return result
	// }

	// ##### CARRIER REPOSITORY

	public async findCarrierByIdentifier(identifier: identifierDTO): Promise<CarrierInterface | null> {
		const result: CarrierInterface | null = await this._model.findOne(identifier, {
			_id: 0,
			password: 0,
			created_at: 0,
			updated_at: 0,
		})
		return result
	}

	public async findPasswordHashedByIdentifier(identifier: identifierDTO): Promise<string | null> {
		const { password: hashed } = (await this._model.findOne(identifier)) as CarrierInterface
		return hashed
	}

	public async createCarrierAccount(carrier_account: createDTO): Promise<string> {
		const mongooseModel = new this._model(carrier_account)
		const { carrier_id } = await mongooseModel.save()
		return carrier_id as string
	}

	public async updateEmailByIdentifier(identifier: identifierDTO, email: string): Promise<string> {
		const { carrier_id } = await this._model.updateOne(identifier, { $set: { email } })
		return carrier_id as string
	}

	public async updateProfileCarrierAccountByIdentifier(
		identifier: identifierDTO,
		profile: whitelistupdateProfileDTO,
	): Promise<string> {
		const { carrier_id } = await this._model.updateOne(identifier, { $set: profile })
		return carrier_id as string
	}

	public async deleteCarrierAccount(identifier: identifierDTO): Promise<number> {
		const result = await this._model.deleteOne(identifier)
		return result.deletedCount as number
	}

	public async deActivateCarrierAccount(identifier: identifierDTO, username: string, bias: string): Promise<number> {
		const result = await this._model.updateOne(identifier, { $set: { username: bias + username } })
		return result.nModified as number
	}

	// ##### JOB HISTORY REPOSITORY

	public async addJobHistory(identifier: identifierDTO, job: JobInterface): Promise<number> {
		const result = await this._model.updateOne(identifier, { $push: { job_history: job as JobInterface } })
		return result.n
	}

	public async deleteJobHistory(identifier: identifierDTO, job_id: string): Promise<number> {
		const result = await this._model.update(identifier, { $pull: { job_history: { job_id: job_id } as any } })
		return result.n
	}

	public async getJobHistory(identifier: identifierDTO): Promise<JobInterface[]> {
		const { job_history } = (await this._model.findOne(identifier)) as CarrierInterface
		return job_history || []
	}

	// ##### TRUCK REPOSITORY

	public async findTruckExistOnUsernameByLicenseNumber(
		username: string,
		license_number: string,
	): Promise<CarrierInterface | null> {
		const result = (await this._model.findOne({
			username,
			'trucks.license_number': license_number,
		})) as CarrierInterface
		return result
	}

	public async createTruckByUsername(username: string, truckinfo: createTruckDTO): Promise<string> {
		const { truck_id } = await this._model.update({ username }, { $push: { trucks: truckinfo as any } })
		return truck_id
	}

	public async updateTruckByTruckIdAndUsername(
		identifier: identifierDTO,
		truck_id: string,
		query: any,
	): Promise<string> {
		const { carrier_id } = await this._model.update({ ...identifier, 'trucks.truck_id': truck_id }, { $set: query })
		return carrier_id as string
	}

	public async deleteTruckByTruckIdAndUsername(username: string, truck_id: string): Promise<string> {
		const { carrier_id } = await this._model.update(
			{ username },
			{ $pull: { trucks: { truck_id: truck_id } as any } },
		)
		return carrier_id as string
	}

	public async findTrucksByIdentifier(identifier: identifierDTO): Promise<TruckInterface[]> {
		const { trucks } = (await this._model.findOne(identifier)) as CarrierInterface
		return trucks
	}

	// ##### DRIVER REPOSITORY

	public async findDriverExistOnUsernameByLicenseNumber(
		username: string,
		driver_license: string,
	): Promise<CarrierInterface | null> {
		const result = (await this._model.findOne({
			username,
			'drivers.driver_license': driver_license,
		})) as CarrierInterface
		return result
	}

	public async createDriverByUsername(username: string, driverinfo: createDriverDTO): Promise<string> {
		const { driver_id } = await this._model.update({ username }, { $push: { drivers: driverinfo as any } })
		return driver_id
	}

	public async updateDriverByDriverIdAndUsername(
		identifier: identifierDTO,
		driver_id: string,
		query: any,
	): Promise<string> {
		const { carrier_id } = await this._model.update(
			{ ...identifier, 'drivers.driver_id': driver_id },
			{ $set: query },
		)
		return carrier_id as string
	}

	public async deleteDriverByDriverIdAndUsername(username: string, driver_id: string): Promise<string> {
		const { carrier_id } = await this._model.update(
			{ username },
			{ $pull: { drivers: { driver_id: driver_id } as any } },
		)
		return carrier_id as string
	}

	public async findDriversByIdentifier(identifier: identifierDTO): Promise<DriverInterface[]> {
		const { drivers } = (await this._model.findOne(identifier)) as CarrierInterface
		return drivers
	}
}

export default AccountRepository
