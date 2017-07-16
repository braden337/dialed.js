let Dialed = require('./Dialed')

let dollarsInCents =
  dollars => Math.round(dollars*10000)/100

let centsInDollars =
  cents => cents/6

new Dialed(
  dollarsInCents,
  Dialed.assert(150, 1.50),
  Dialed.assert(9437, 94.37),
  Dialed.assert(40, 0.40),
  Dialed.assert(50310, 503.1),
  Dialed.assert(2800, 28)
)

new Dialed(
  centsInDollars,
  Dialed.assert(1.50, 150),
  Dialed.assert(94.37, 9437),
  Dialed.assert(0.40, 40),
  Dialed.assert(503.10, 50310),
  Dialed.assert(28.00, 2800)
)
