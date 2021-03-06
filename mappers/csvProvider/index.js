const { map, pipe, tail } = require('ramda')

const dataSources = require('../../_dataSources')

const sourceMappers = require('./sources')

const csvMapper = (objectType, dataSourceId) => input => {
  const dataSource = dataSources[dataSourceId]
  if (!dataSource) {
    throw new Error(
      `Data Source ID ${dataSourceId} is not defined in CSV provider`
    )
  }

  const sourceMapper = sourceMappers[dataSource]
  if (!sourceMapper) {
    throw new Error(
      `Data Source ID ${dataSourceId} has no mappers in CSV provider`
    )
  }

  const missingFileds = sourceMapper.isInvalid(input[0], objectType.id)
  if (missingFileds) {
    throw new Error(
      'Input file seems invalid, maybe you are uploading a wrong file. Missing fields: ' +
        missingFileds
    )
  }

  return pipe(tail, map(sourceMapper.mapper(objectType.id)))(input)
}

module.exports = csvMapper
