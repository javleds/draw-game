import express from 'express'
import http from 'http'
import socketIo from 'socket.io'

// Models
import Game from './models/game'

// Middlewares
import ValidateGameRequest from './middlewares/validate-game-request'

// Controllers
import GameController from './controllers/game-controller'
import HomeController from './controllers/home-controller'

class App {
  constructor () {
    this.port = 3000
    this.app = express()
    this.server = http.Server(this.app)
    this.io = socketIo(this.server)

    this.instantiateMiddlewares()
    this.instantiateModels()
    this.instantiateControllers()
  }

  instantiateMiddlewares () {
    this.middlewares = {
      validateGameRequest: new ValidateGameRequest()
    }
  }

  instantiateModels () {
    this.models = {
      game: new Game()
    }
  }

  instantiateControllers () {
    this.controllers = {
      gameController: new GameController(),
      homeController: new HomeController()
    }
  }

  start (message = 'Example app listening on http://localhost:3000') {
    this.server.listen(this.port, () => {
      console.log(message)
    })
  }
}

const theApp = new App()

export const app = theApp.app
export const io = theApp.io
export const models = theApp.models
export const controllers = theApp.controllers
export const middlewares = theApp.middlewares

export default theApp
