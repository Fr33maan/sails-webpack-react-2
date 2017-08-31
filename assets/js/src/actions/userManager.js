function userSocketListen() {
  return dispatch => {

    io.socket.on('userLeft', userId => {
      dispatch({
        type : 'USER_LEFT',
        userId
      })
    })

    io.socket.on('userJoin', user => {
      dispatch({
        type : 'USER_JOIN',
        user
      })
    })

    io.socket.on('userLeftFromChannel', data => {
      dispatch({
        type : 'USER_LEFT_CHANNEL',
        ...data
      })
    })

    io.socket.on('userJoinChannel', data => {
      dispatch({
        type : 'USER_JOIN_CHANNEL',
        ...data
      })
    })
  }
}

export default {
  userSocketListen
}
