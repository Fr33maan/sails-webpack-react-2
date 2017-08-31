/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  const s = FixtureService
  const env = process.env.NODE_ENV

  if(env === 'development'){
    s.adminUser()
    .then(none => undefined) // Or crash the bootstrap
    .then(cb)
    .catch(console.log)

  }else{
    cb()
  }


};
