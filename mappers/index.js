const serviceProviders = require('../_serviceProviders')

const amazonMapper = require('./amazon')
const digimeMapper = require('./digime')

module.exports = {
  [serviceProviders.digime]: digimeMapper,
  [serviceProviders.amazon]: amazonMapper
}
