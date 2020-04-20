export default class HomeController {
  index (req, res) {
    const { error, code } = req.query

    return res.render('index', {
      error,
      code
    })
  }
}
