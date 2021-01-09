import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import fastifyCors from 'fastify-cors'

const corsPlugin = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: any) => {
	fastify.register(fastifyCors, {
		origin: (origin, cb) => {
			const whitelistDomain = [/localhost/, /127.0.0.1/]
			if (whitelistDomain.some((domain) => domain.test(origin))) {
				//  Request from localhost will pass
				cb(null, true)
				return
			}
			// Generate an error on other origins, disabling access
			cb(new Error('Not allowed'), false)
		},
	})

	done()
}

export default fastifyPlugin(corsPlugin)
