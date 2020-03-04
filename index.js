const { map } = require('ramda')
const { findObjectType, deepGetAndConcat } = require('./utils')

const converter = (dataSchema, objectTypeId) => {
  const objectType = findObjectType(dataSchema.objectTypes, objectTypeId)
  if (!objectTypeId || !objectType) {
    throw new Error(
      `Please provide a valid objectTypeId, ${objectTypeId} is not supported`
    )
  }

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

module.exports = { converter }
