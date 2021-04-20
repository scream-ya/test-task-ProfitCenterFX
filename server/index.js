const { Router } = require('express');
const Koa = require('koa');
const koaRouter = require('@koa/router');
const axios = require('axios');
const cors = require('koa-cors');
const ping = require('ping');
const app = new Koa();

app.use(cors());

const routes = koaRouter();

routes.get('/ping', async (ctx) => {
  const { url } = ctx.request.query;

  try {
    const res = await ping.promise.probe(url);
    ctx.body = res;
  } catch(err) {
    ctx.body = err;
  }  
});

app.use(routes.routes());

app.listen(3001);