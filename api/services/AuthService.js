

module.exports = {

  // subscribe to personnal messages
  createUserChannelSocket : function(req, user){
    const sock = sails.sockets
    const socketId = sock.getId(req)
    sock.join(socketId, user.id)

    if(req.options.action === 'sign_in' || req.options.action === 'refresh_token'){
      sock.blast('userJoin', {
        id : user.id,
        username: user.username,
        gender: user.gender,
        profilePicture: user.profilePicture,
        acceptPrivate : user.acceptPrivate,
        status: 'online'
      })
    }
  },

  // Store lastLogin and socketId in db
  updateLastLoginAndUserSocket : function(req, user){
    const socketId = sails.sockets.getId(req)
    user.lastLogin = new Date()
    user.status    = 'online'
    user.socketId  = socketId
    user.save()
  }

}
