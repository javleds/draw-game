class HomeController {
  index(req, res) {
    const error = req.query.error
    const code = req.query.code

    return res.render('index', {
      error: error,
      code: code,
    })
  }
}

module.exports = new HomeController()
