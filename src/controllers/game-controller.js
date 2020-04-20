import Game from '../models/game'

export default class GameController {
  constructor () {
    this.game = new Game()
  }

  create (req, res) {
    const { nik } = req.query
    const randomCode = Math.random().toString(36).substring(2, 7)
    return res.redirect(`/game?code=${randomCode}&nik=${nik}`)
  }

  show (req, res) {
    const { code, nik } = req.query
    return res.render('game', {
      code,
      nik
    })
  }
}
