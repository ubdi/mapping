const { map, keys } = require('ramda')

const dataSources = require('../../_dataSources')

const sourceMappers = require('./sources')

const jsonMapper = (objectType, dataSourceId) => input => {
  const dataSource = dataSources[dataSourceId]
  if (!dataSource) {
    throw new Error(
      `Data Source ID ${dataSourceId} is not defined in JSON provider`
    )
  }

  const sourceMapper = sourceMappers[dataSource]
  if (!sourceMapper) {
    throw new Error(
      `Data Source ID ${dataSourceId} has no mappers in JSON provider`
    )
  }

  const missingFileds = sourceMapper.isInvalid(keys(input[0]), objectType.id)
  if (missingFileds) {
    throw new Error(
      'Input file seems invalid, maybe you are uploading a wrong file. Missing fields: ' +
        missingFileds
    )
  }

  return map(row => sourceMapper.mapper(objectType.id)(row))(input)
}

module.exports = jsonMapper
