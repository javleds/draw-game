import { app, controllers, middlewares } from './app'

app.get('/', controllers.homeController.index)
app.get('/create', middlewares.validateGameRequest.createRequest, controllers.gameController.create)
app.get('/game', middlewares.validateGameRequest.showRequest, controllers.gameController.show)
