
/**
 * isAuthenticated
 * @description :: Policy that inject user in `req` via JSON Web Token
 */

module.exports = (req, res, next) => {

  if(!req.body.recaptchaKey || req.body.recaptchaKey === '') return res.forbidden()

  var https = require('https')

  const secret = sails.config.recaptcha.secretKey
  const recaptchaKey = req.body.recaptchaKey

  https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + secret + "&response=" + recaptchaKey, function(httpsRes) {
      var data = ""

      httpsRes.on('data', function (chunk) {
        data += chunk.toString()
      })

      httpsRes.on('end', function() {
          try {
              var parsedData = JSON.parse(data)

              if(!parsedData.success) return res.forbidden()
              delete req.body.recaptchaKey
              return next()

          } catch (e) {
              return res.forbidden(e)
          }
      })
  })
};
