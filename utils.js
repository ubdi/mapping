const { find, propEq } = require('ramda')

const findObjectType = (dataSchema, id) => find(propEq('id', id))(dataSchema)

module.exports = { findObjectType }
