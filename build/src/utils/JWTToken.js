"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRefreshToken = exports.generateAccessToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var generateAccessToken = exports.generateAccessToken = function generateAccessToken(user) {
  return _jsonwebtoken["default"].sign(user, process.env.SECRET_TOKEN, {
    expiresIn: '30m'
  });
};
var generateRefreshToken = exports.generateRefreshToken = function generateRefreshToken(user) {
  return _jsonwebtoken["default"].sign(user, process.env.SECRET_REFRESH_TOKEN, {
    expiresIn: '7 days'
  });
};