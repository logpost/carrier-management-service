import App from './app'
import CarrierRoutes from './routes/carrier.route'
import AuthPlugin from './plugins/auth.plugin'

const app = new App({
  routes: [CarrierRoutes],
  plugins: [AuthPlugin],
})

app.listen()
