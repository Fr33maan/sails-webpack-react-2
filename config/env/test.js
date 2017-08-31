


module.exports = {

  models : {
    connection : 'mongoTest',
    migrate : 'drop'
  },

  log : {
    level : 'error'
  },

  debug : {
    stackInResponse : false
  },

  permissions : {
    debug : {
      message: false,
      filters: false,
      stack : false
    }
  },

  hooks : {
    webpack : false,
    grunt: false,
    pubsub : false,
    autoreload: false,
    sockets : false
  }
}
