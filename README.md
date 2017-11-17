# @pioug/poloniex

> A tiny Node.js wrapper for Poloniex API.

I created this module because I believe that simple and readable code matters for code audit since [Poloniex API](https://poloniex.com/) can be used for trading real money.

## Features

- Complete implementation of Poloniex HTTP API
- About 100 lines on code
- One dependency ([axios](https://github.com/mzabriskie/axios))
- Promise-based
- Environment variables for API key and secret

## Setup

### Requirements

- Node 8 (for **object rest and spread properties** support)
- npm 5.1.0 (for **npm lockfiles** support)

### Installation

```sh
npm install --save @pioug/poloniex
```

## Usage

It is recommended to use environment variables for `POLONIEX_KEY` and `POLONIEX_SECRET`:

```sh
POLONIEX_KEY=my_api_key POLONIEX_SECRET=my_secret node app.js
```

The wrapper API is following this format:

```
Poloniex.<command>(<Object with query strings or POST parameters>)
```

For authenticated requests (_trading API_), additional parameters can be passed:

- **nonce**: An integer which must always be greater than the previous nonce used
  - Optional
  - Default is `Date.now()`
- **key**: Your Poloniex API key
  - Optional
  - Default is `process.env.POLONIEX_KEY`
- **secret**: Your Poloniex key secret
  - Optional
  - Default is `process.env.POLONIEX_SECRET`

Every method returns a promise.

## Code example

### Public request

```js
const Poloniex = require('@pioug/poloniex');

Poloniex.returnLoanOrders({
  currency: 'BTC'
})
  .then(console.log);
```

### Authenticated request

```js
const Poloniex = require('@pioug/poloniex');

Poloniex.buy({
  amount: '338.8732',
  currencyPair: 'BTC_XVC',
  rate: '0.00000173',

  nonce: 1
  key: 'my_api_key',
  secret: 'my_secret'
})
  .then(console.log);
```

## API Reference

See the full documentation of Poloniex API: https://poloniex.com/support/api/.
