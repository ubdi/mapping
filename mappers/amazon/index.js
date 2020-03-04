const { map } = require('ramda')

const digimeMapper = objectType => {
  return map(record => ({ haka: 1 }))
}

module.exports = digimeMapper
