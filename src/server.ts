import App from './app'

import AuthPlugin from './plugins/auth.plugin'

import CarrierRoutes from './routes/carrier.route'
import TruckRoute from './routes/truck.route'

const app = new App({
  routes: [CarrierRoutes, TruckRoute],
  plugins: [AuthPlugin],
})

app.listen()
