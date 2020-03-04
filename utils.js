const { find, propEq, isNil, is } = require('ramda')
/*
  Traverses the name via dot notation, while flattening arrays in the process
  E.g. if name is `track.artists.name`, it will go inside prop by prop until it
  reaches an array (artists), and then it will return that array as a string of
  mapped props (name), joined by ;
*/

const deepGetAndConcat = (record, sourceField) => {
  const sourceFields = sourceField.split('.')

  if (sourceFields.length > 1) {
    return sourceFields.reduce((result, field) => {
      if (result) {
        if (is(Array, result)) return result.map(r => r[field]).join('; ')
        if (!isNil(result[field])) return result[field]
      }

      if (!isNil(record[field])) return record[field]
    }, false)
  }

  return record[sourceField]
}

const findObjectType = (dataSchema, id) => find(propEq('id', id))(dataSchema)

module.exports = { deepGetAndConcat, findObjectType }
