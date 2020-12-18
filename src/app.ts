import fastify, { FastifyInstance } from 'fastify'
import config from './config/config'
import MongoAdapter from './adapters/mongo.adapter'

class App {
	public app: FastifyInstance
	public app_kind: string = config.app.kind
	public app_doamain: string = config.app.domain
	public app_port: number = parseInt(`${config.app.port}`, 10) ?? 8080

	constructor(appInit: { plugins: any; routes: any }) {
		this.app = fastify({ logger: true })
		this.connectDatabase()
		this.pluginsRegister(appInit.plugins)
		this.routes(appInit.routes)
	}

	private async connectDatabase() {
		await new MongoAdapter()
	}

	private pluginsRegister(plugins: { forEach: (arg0: (plugins: any) => void) => void }) {
		plugins.forEach((plugin) => {
			this.app.register(plugin)
		})
	}

	public routes(routes: { forEach: (arg0: (routes: any) => void) => void }) {
		routes.forEach((route) => {
			let router = new route()
			this.app.register(router.routes, { prefix: router.prefix_route })
		})
	}

	public listen() {
		this.app.listen(process.env.PORT || this.app_port, () => {
			console.log(`Carrier Management Service 🚚 `)
			console.log(`Listening on the http://${this.app_doamain}:${this.app_port} 🌟`)
			console.log(`Working on ${this.app_kind.toUpperCase()} ENVIRONMENT 👻`)
		})
	}
}

export default App
