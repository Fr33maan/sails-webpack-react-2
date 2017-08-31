

const users = [
  {
    email : 'jero@nimo.com',
    username: 'jeronimo',
    password : '123123',
    acceptPrivate : true,
    role: 'admin'
  },
  {
    email : 'li@li.li',
    username: 'lilili',
    password : '123123',
    acceptPrivate : true
  },
  {
    email : 'jero@nima.com',
    username: 'jeronima',
    password : '123123',
    acceptPrivate : false
  },
]

const channels = [
  {
    name : 'general',
    type : 'admin'
  },
  {
    name : 'myChannel',
    type : 'private'
  },
  {
    name : 'gamers',
    type : 'community'
  }
]


export default function(sails) {

  // Creating test users
  return Promise.all(users.map(user =>
    sails.models.user.create(user)
  ))

  .then(() => Promise.all(channels.map(channel =>
    sails.models.user.findOne({username : 'jeronima'})
    .then(user => sails.models.channel.create({...channel, owner : user.id}))
  )))

  .then(() => null)
  .catch(console.log)

}
