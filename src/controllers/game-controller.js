import Game from '../models/game'

class GameController {
  constructor () {
    this.game = new Game()
  }

  create(req, res) {
    const nik = req.query.nik

    if (!nik || nik.trim() === '') {
      return res.redirect('/?error=emptyNik')
    }
    const randomCode = Math.random().toString(36).substring(2, 7);
    return res.redirect('/game?code=' + randomCode + '&nik=' + nik)
  }

  show(req, res) {
    const code = req.query.code
    const nik = req.query.nik

    if (!code || code.trim() === '') {
      return res.redirect('/?error=emptyCode')
    }

    if (!code || code.trim() === '') {
      return res.redirect('/?code=' + code + '&error=invalidCode')
    }

    if (!nik || nik.trim() === '') {
      return res.redirect('/?error=emptyNik')
    }

    return res.render('game', {
      code: code,
      nik: nik,
    })
  }
}

export default new GameController()
