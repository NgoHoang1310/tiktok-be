"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redis = require("redis");
var client = await (0, _redis.createClient)().on('error', function (err) {
  return console.log('Redis Client Error', err);
}).connect();
var _default = exports["default"] = client;