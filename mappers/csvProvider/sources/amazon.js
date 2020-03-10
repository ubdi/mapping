const { difference, equals } = require('ramda')
const { parse, getUnixTime } = require('date-fns')

const isInvalid = firstRow => {
  const expectedInput = [
    'Order Date',
    'Order ID',
    'Title',
    'Category',
    'ASIN/ISBN',
    'UNSPSC Code',
    'Website',
    'Release Date',
    'Condition',
    'Seller',
    'Seller Credentials',
    'List Price Per Unit',
    'Purchase Price Per Unit',
    'Quantity',
    'Payment Instrument Type',
    'Purchase Order Number',
    'PO Line Number',
    'Ordering Customer Email',
    'Shipment Date',
    'Shipping Address Name',
    'Shipping Address Street 1',
    'Shipping Address Street 2',
    'Shipping Address City',
    'Shipping Address State',
    'Shipping Address Zip',
    'Order Status',
    'Carrier Name & Tracking Number',
    'Item Subtotal',
    'Item Subtotal Tax',
    'Item Total',
    'Tax Exemption Applied',
    'Tax Exemption Type',
    'Exemption Opt-Out',
    'Buyer Name',
    'Currency',
    'Group Name'
  ]

  if (!equals(expectedInput, firstRow)) {
    return difference(expectedInput, firstRow)
  }

  return false
}

const parseAmazonDate = date =>
  getUnixTime(parse(date, 'MM/dd/yy', new Date())) * 1000

const mapper = row => {
  /*
      4321 Purchase History
  
      createddate -- [0]
      productname -- [2]
      category -- [3]
      asinisbn -- [4]
      unspsc -- [5]
      website -- [6]
      condition -- [8]
      seller -- [9]
      listpriceunit -- [11]
      purchasepriceunit -- [12]
      quantity -- [13]
      paymentinstrument -- [14]
      shipmentdate -- [18]
      shippingcity -- [22]
      shippingstate -- [23]
      shippingzip -- [24]
      itemtotal -- [28]
      currency -- [33]
    */

  const createddate = row[0]
  const productname = row[2]
  const category = row[3]
  const asinisbn = row[4]
  const unspsc = row[5]
  const website = row[6]
  const condition = row[8]
  const seller = row[9]
  const listpriceunit = row[11]
  const purchasepriceunit = row[12]
  const quantity = row[13]
  const paymentinstrument = row[14]
  const shipmentdate = row[18]
  const shippingcity = row[22]
  const shippingstate = row[23]
  const shippingzip = row[24]
  const itemtotal = row[29]
  const currency = row[34]

  return {
    createddate: parseAmazonDate(createddate),
    productname,
    category,
    asinisbn,
    unspsc,
    website,
    condition,
    seller,
    listpriceunit: parseFloat(listpriceunit),
    purchasepriceunit: parseFloat(purchasepriceunit),
    quantity: parseInt(quantity),
    paymentinstrument,
    shipmentdate: parseAmazonDate(shipmentdate),
    shippingcity,
    shippingstate,
    shippingzip,
    itemtotal: parseFloat(itemtotal),
    currency
  }
}

module.exports = {
  isInvalid,
  mapper
}
