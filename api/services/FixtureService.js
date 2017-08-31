"use strict";

module.exports = {

  adminUser : async function(){

    await User.findOrCreate({username : 'jeronimo'}, {
      username : 'jeronimo',
      gender : 'male',
      email : 'jero@nimo.com',
      password : 123123,
      role : 'admin'
    })

    await User.findOrCreate({username : 'jeronima'}, {
      username : 'jeronima',
      email : 'jero@nima.com',
      password : 123123,
      role : 'user'
    })

    await User.findOrCreate({username : 'libre'}, {
      username : 'libre',
      email : 'libre@fr.fr',
      password : 123123,
      role : 'user'
    })

    return null
  }
}
