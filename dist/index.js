'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return async function _time(ctx, next, start = Date.now()) {
        await next();
        ctx.set('X-Response-Time', `${Math.ceil(Date.now() - start)}ms`);
    };
};