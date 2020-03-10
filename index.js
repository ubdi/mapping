const { findObjectType } = require('./utils')

const serviceProviders = require('./_serviceProviders')
const mappers = require('./mappers')

const converter = (
  dataSchema,
  objectTypeId,
  provider = serviceProviders.digime,
  dataSourceId
) => {
  const objectType = findObjectType(dataSchema.objectTypes, objectTypeId)
  if (!objectTypeId || !objectType) {
    throw new Error(
      `Please provide a valid objectTypeId, ${objectTypeId} is not supported`
    )
  }

  if (!provider || !serviceProviders[provider]) {
    throw new Error(
      `Please provide a valid provider, ${provider} is not supported`
    )
  }

  return mappers[provider](objectType, dataSourceId)
}

module.exports = { converter }
