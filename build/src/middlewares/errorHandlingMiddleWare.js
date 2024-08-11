"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _httpStatusCodes = require("http-status-codes");
var errorHandler = function errorHandler(err, req, res, next) {
  if (!err.statusCode) {
    err.statusCode = _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
  }
  var responseError = {
    statusCode: err.statusCode,
    message: err.message || _httpStatusCodes.StatusCodes[err.statusCode],
    stack: err.stack
  };
  res.status(err.statusCode).json(responseError);
};
var _default = exports["default"] = errorHandler;