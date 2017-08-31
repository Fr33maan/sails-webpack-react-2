
const fs = require('fs')

const permissions = {
  debug : {
    filters : false,
    message : false,
    stack   : false,
  },
  '*' : false
}

// Config files by model
const models = fs.readdirSync('config/permissions')
.filter(file => file != 'index.js')
.map(file => ({
  file : file,
  name : file.toLowerCase().replace('.js', '')
}))

// Build config object
for(let model of models){
  permissions[model.name] = require(`./${model.file}`)
}


// Export config object
module.exports.permissions = permissions
