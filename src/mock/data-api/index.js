import App from './app'
import ApiDev from './api-dev'
export default {
    bootstrap (mock) {
        App.bootstrap(mock)
        ApiDev.bootstrap(mock)
    }
}