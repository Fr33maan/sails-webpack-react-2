
/**
 * Configure permissions by


 */


module.exports = {

    '*' : false,
    find : {
      firstName     : false,
      lastName      : false,
      email         : false,
      updatedAt     : false,
      password      : false,
      socialProfiles: false,
      channels      : false,
      messages      : false,
      socketId      : false
    },
    findOne: {
      firstName     : 'private',
      lastName      : 'private',
      email         : 'private',
      updatedAt     : 'private',
      password      : false,
      socialProfiles: false,
      channels      : false,
      messages      : false,
      socketId      : false,
    },
    populate : {
      channels : 'private',
      messages : 'private'
    },
    check_email_availability : 'guest',
    check_username_availability : 'guest',
    update: 'private'
}
