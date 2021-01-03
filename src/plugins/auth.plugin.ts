import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import fastifyJwt from 'fastify-jwt'
import config from '../config/config'
import { responseSender } from '../helper/response.handler'
import parseResponse from '../helper/response.parser'

const authPlugin = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: any) => {
	fastify.register(fastifyJwt, {
		secret: config.jwt.private_route.secret.jwt_secret,
	})

	fastify.decorate('verifyAuth', async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const auth: string | undefined = request.headers.authorization
			const token = auth!.split(' ')[1]
			if (token) {
				const decodedToken: any = fastify.jwt.decode(token)
				const { isConfirmEmail, role } = decodedToken
				if (role === 'carrier' || role === 'srv') {
					if (!isConfirmEmail) throw { statusCode: 403, message: "your email haven't confirmed." }
				} else {
					throw { statusCode: 401, message: "your role can't use the api." }
				}
			}
			await request.jwtVerify()
		} catch (err) {
			responseSender(parseResponse(new Error(`${err.statusCode}: Unauthorize, ${err.message}`)), reply)
		}
	})

	done()
}

export default fastifyPlugin(authPlugin)
