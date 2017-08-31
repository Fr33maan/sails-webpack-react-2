"use strict";

/**
 * isAuthenticated
 * @description :: Policy that inject user in `req` via JSON Web Token
 */

const passport = require('passport');

module.exports = (req, res, next) => {

  if(!req.headers.authorization) return next()

  passport.authenticate('jwt', (error, user, info) => {

    if(user) req.user = user
    next()

  })(req, res)
};
