const serviceProviders = require('../_serviceProviders')

const digimeMapper = require('./digime')
const csvProvider = require('./csvProvider')
const jsonProvider = require('./jsonProvider')

module.exports = {
  [serviceProviders.digime]: digimeMapper,
  [serviceProviders.csvProvider]: csvProvider,
  [serviceProviders.jsonProvider]: jsonProvider
}
