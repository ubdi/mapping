const { difference, equals, replace } = require('ramda')
const { getUnixTime } = require('date-fns')

const getExpectedInputKeys = objectTypeId => {
  switch (objectTypeId) {
    // Watch History
    case 4311: {
      return ['header', 'title', 'titleUrl', 'subtitles', 'time', 'products']
    }
    // Search History
    case 4312: {
      return ['header', 'title', 'titleUrl', 'time', 'products']
    }
  }
}

const isInvalid = (keys, objectTypeId) => {
  const expectedInputKeys = getExpectedInputKeys(objectTypeId)

  if (!equals(expectedInputKeys, keys)) {
    return difference(expectedInputKeys, keys)
  }

  return false
}

const parseDate = date => getUnixTime(new Date(date)) * 1000

const mapper = objectTypeId => row => {
  switch (objectTypeId) {
    // Watch History
    case 4311: {
      const { title, titleUrl, time } = row

      return {
        createddate: parseDate(time),
        name: replace('Watched ', '', title),
        url: decodeURIComponent(titleUrl)
      }
    }
    // Search History
    case 4312: {
      const { title, titleUrl, time } = row

      return {
        createddate: parseDate(time),
        keyword: replace('Searched for ', '', title),
        url: decodeURIComponent(titleUrl)
      }
    }
  }
}

module.exports = {
  isInvalid,
  mapper
}
