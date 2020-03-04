const { map } = require('ramda')
const { deepGetAndConcat } = require('./utils')

const digimeMapper = objectType => {
  return map(record =>
    objectType.fieldMappings.reduce(
      (acc, { sourceField, name }) => ({
        ...acc,
        [name]: deepGetAndConcat(record, sourceField)
      }),
      {}
    )
  )
}

module.exports = digimeMapper
