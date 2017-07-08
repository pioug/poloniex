const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');

const TRADING_API = 'https://poloniex.com/tradingApi';
const PUBLIC_API = 'https://poloniex.com/public';
const POLONIEX_KEY = process.env.POLONIEX_KEY;
const POLONIEX_SECRET = process.env.POLONIEX_SECRET;

const publicCommands = [
  'returnTicker',
  'return24hVolume',
  'returnOrderBook',
  'returnTradeHistory',
  'returnChartData',
  'returnCurrencies',
  'returnLoanOrders'
];

const tradingCommands = [
  'returnBalances',
  'returnCompleteBalances',
  'returnDepositAddresses',
  'generateNewAddress',
  'returnDepositsWithdrawals',
  'returnOpenOrders',
  'returnTradeHistory',
  'returnOrderTrades',
  'buy',
  'sell',
  'cancelOrder',
  'moveOrder',
  'withdraw',
  'returnFeeInfo',
  'returnAvailableAccountBalances',
  'returnTradableBalances',
  'transferBalance',
  'returnMarginAccountSummary',
  'marginBuy',
  'marginSell',
  'getMarginPosition',
  'closeMarginPosition',
  'createLoanOffer',
  'cancelLoanOffer',
  'returnOpenLoanOffers',
  'returnActiveLoans',
  'returnLendingHistory',
  'toggleAutoRenew'
];

const publicAPI = publicCommands.reduce(function(res, command) {
  res[command] = params => requestPublicAPI({ command, ...params });
  return res;
}, {});

const tradingAPI = tradingCommands.reduce(function(res, command) {
  res[command] = params => requestTradingAPI({ command, ...params });
  return res;
}, {});

module.exports = {
  ...publicAPI,
  ...tradingAPI
};

function requestPublicAPI(params = {}) {
  return axios.get(PUBLIC_API, { params })
    .then(response => response.data);
}

function requestTradingAPI({
  key = POLONIEX_KEY,
  secret = POLONIEX_SECRET,
  nonce = Date.now(),
  ...params
} = {}) {
  const payload = querystring.stringify({ nonce, ...params });
  return axios.post(TRADING_API, payload, {
    headers: {
      Key: key,
      Sign: crypto.createHmac('sha512', secret).update(payload).digest('hex')
    }
  })
    .then(response => response.data);
}
