const { difference, equals } = require('ramda')
const { parse, getUnixTime } = require('date-fns')

const getExpectedInputKeys = objectTypeId => {
  switch (objectTypeId) {
    // "Professional Resume"
    case 4400: {
      return [
        'First Name',
        'Last Name',
        'Maiden Name',
        'Address',
        'Birth Date',
        'Headline',
        'Summary',
        'Industry',
        'Zip Code',
        'Geo Location',
        'Twitter Handles',
        'Websites',
        'Instant Messengers'
      ]
    }
    // "Professional Connections"
    case 4401: {
      return [
        'First Name',
        'Last Name',
        'Email Address',
        'Company',
        'Position',
        'Connected On'
      ]
    }
  }
}

const isInvalid = (firstRow, objectTypeId) => {
  const expectedInputKeys = getExpectedInputKeys(objectTypeId)

  if (!equals(expectedInputKeys, firstRow)) {
    return difference(expectedInputKeys, firstRow)
  }

  return false
}

const parseLinkedinDate = date =>
  getUnixTime(parse(date, 'dd MMM yyyy', new Date())) * 1000

const mapper = objectTypeId => row => {
  switch (objectTypeId) {
    /*
    "Professional Resume"

        headline -- [5]
        summary -- [6]
        industry -- [7]
        zipCode -- [8]
        location -- [9]
        websites -- [11]  
      */
    case 4400: {
      const headline = row[5]
      const summary = row[6]
      const industry = row[7]
      const zipCode = row[8]
      const location = row[9]
      const websites = row[11]

      return {
        headline,
        summary,
        industry,
        zipCode,
        location,
        websites
      }
    }
    /*
    "Professional Connections"

      company -- [3]
      position -- [4]
      connectedOn -- [5]
    */
    case 4401: {
      const company = row[3]
      const position = row[4]
      const connectedon = row[5]

      return {
        company,
        position,
        connectedon: parseLinkedinDate(connectedon)
      }
    }
    /*
      Professional Positions
    */
    case 4402: {
      const company = row[0]
      const position = row[1]
      const description = row[2]
      const location = row[3]
      const startedon = row[4]
      const finishedon = row[5]

      return {
        company,
        position,
        description,
        location,
        startedon: parseLinkedinDate(startedon),
        finishedon: parseLinkedinDate(finishedon)
      }
    }

    /*
      Education Degree
    */
    case 4403: {
      const schoolname = row[0]
      const startedon = row[1]
      const endedon = row[2]
      const degree = row[4]
      const activities = row[5]

      return {
        schoolname,
        startedon: parseLinkedinDate(startedon),
        endedon: parseLinkedinDate(endedon),
        degree,
        activities
      }
    }
  }
}

module.exports = {
  isInvalid,
  mapper
}
