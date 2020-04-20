export default class ValidateGameRequest {
  showRequest (req, res, next) {
    const { code, nik } = req.query

    if (!code || code.trim() === '') {
      return res.redirect('/?error=emptyCode')
    }

    if (!code || code.trim().length !== 5) {
      return res.redirect(`/?code=${code}&error=invalidCode`)
    }

    if (!nik || nik.trim() === '') {
      return res.redirect('/?error=emptyNik')
    }

    next()
  }

  createRequest (req, res, next) {
    const { nik } = req.query

    if (!nik || nik.trim() === '') {
      return res.redirect('/?error=emptyNik')
    }

    next()
  }
}
