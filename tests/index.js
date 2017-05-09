import koa from 'koa'
import test from 'ava'
import time from '../src'
import request from 'request'
import mount from 'koa-mount'

const req = request.defaults({
    json: true,
    baseUrl: 'http://localhost:3000'
})

test.before.cb((t) => {
    let app = new koa()
    
    app.use(time())
    app.use(mount('/time', async function(ctx, next) {
        async function wait() {
            return new Promise((resolve, reject) => setTimeout(resolve, 200))
        }

        await wait()
        ctx.body = {}
    }))
    app.listen(3000, t.end)
})

test.cb('is mounted', (t) => {
    req.get('/', (err, res, body) => {
        t.true('x-response-time' in res.headers)
        t.end()
    })
})

test.cb('wait 200 ms, x-response-time value >= 200', (t) => {
    req.get('/time', (err, res, body) => {
        t.true('x-response-time' in res.headers)
        t.true(parseInt(res.headers['x-response-time'], 10) >= 200)
        t.end()
    })
})