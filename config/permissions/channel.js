
/**
 * Configure permissions by


 */


module.exports = {

    find   : {
      invitationToken: false,
      owner:           false,
      usersNames:      true,
      compositionId:   true,
    },
    findOne:  false,
    create:   'user',
    populate: {
      users:    'user', // Will be filtered by user.find policy,
      messages: 'user'
    },
    check_channelname_availability: 'user',
    subscribe_to_channel_id:        'user',
    unsubscribefromchannels:        'user',
    can_create_channel:             'user'
}
