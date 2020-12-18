import { connect, connection, Connection } from 'mongoose'
import config from '../config/config'
class MongoAdapter {
	private _database: Connection
	private _URI: string

	private _required = {
		isAuth: config.db.required.isAuth,
	}

	private _info = {
		protocal: config.db.mongo.protocal!,
		username: config.db.mongo.username!,
		password: config.db.mongo.password!,
		host: config.db.mongo.host!,
		database: config.db.mongo.database!,
		options: config.db.mongo.options!,
	}

	constructor() {
		this._URI = this.createURI()

		connect(this._URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		this._database = connection
		this._database.on('open', this.connected)
		this._database.on('error', this.error)
	}

	private connected() {
		console.log('Mongoose has connected 🎉')
	}

	private error(error: Error) {
		console.log('**** error [mongodb] : ', error)
		throw error
	}

	private createURI() {
		const { protocal, username, password, host, database, options } = this._info
		if (this._required.isAuth) {
			return `${protocal}://${username}:${password}@${host}/${database}${options}`
		} else {
			return `${protocal}://${host}/${database}${options}`
		}
	}
}

export default MongoAdapter
