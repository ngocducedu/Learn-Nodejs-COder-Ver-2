const low = require('lowdb')
const FileSyns = require('lowdb/adapters/FileSync')
const adapter = new FileSyns('db.json')


db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()

module.exports = db