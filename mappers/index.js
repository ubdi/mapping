const serviceProviders = require('../_serviceProviders')

const digimeMapper = require('./digime')
const csvProvider = require('./csvProvider')

module.exports = {
  [serviceProviders.digime]: digimeMapper,
  [serviceProviders.csvProvider]: csvProvider
}
