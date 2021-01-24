import * as Profiler from '@google-cloud/profiler'
import App from './app'

import AuthPlugin from './plugins/auth.plugin'
import CorsPlugin from './plugins/cors.plugin'

import CarrierRoute from './routes/carrier.route'
import TruckRoute from './routes/truck.route'
import DriverRoute from './routes/driver.route'
import JobRoute from './routes/job.route'

if (process.env.NODE_ENV === 'staging') {
	Profiler.start({
		projectId: 'logpost-298506',
		serviceContext: {
			service: 'carrier-management-service',
			version: '1.0.0',
		},
	})
}

const app = new App({
	routes: [CarrierRoute, TruckRoute, DriverRoute, JobRoute],
	plugins: [AuthPlugin, CorsPlugin],
})

app.listen()
