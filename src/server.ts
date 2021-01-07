import App from './app'

import AuthPlugin from './plugins/auth.plugin'

import CarrierRoute from './routes/carrier.route'
import TruckRoute from './routes/truck.route'
import DriverRoute from './routes/driver.route'
import JobRoute from './routes/job.route'

const app = new App({
	routes: [CarrierRoute, TruckRoute, DriverRoute, JobRoute],
	plugins: [AuthPlugin],
})

app.listen()
