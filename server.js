/* eslint-disable max-len */
const express = require('express');
const Poloniex = require('poloniex-api-node');
const API_KEY = '7Z8IL96F-5TXIWVSL-K9W99BFI-7S4JF2MC';
const API_SECRET = 'xxxx';
const poloniex = new Poloniex(API_KEY, API_SECRET);
const app = express();

app.get('/api/balance', (req, res) =>
  poloniex.returnCompleteBalances(null, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    const balance = Object.keys(data).map(key => ({
      [key]: parseFloat(data[key].available) + parseFloat(data[key].onOrders),
    })).filter(obj => obj[Object.keys(obj).pop()] > 0.0);
    return res.status(200).send(balance);
  })
);

app.get('/api/history', (req, res) =>
  poloniex.returnMyTradeHistory('all', null, null, (err2, history) => {
    if (err2) {
      return res.status(500).send(err2);
    }
    return res.status(200).send(history);
  })
);

app.use(express.static('./'));
app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app listening on', port);
});
