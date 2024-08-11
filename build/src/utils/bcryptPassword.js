"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPassword = exports.comparePassword = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var saltRounds = 10;
var hashPassword = exports.hashPassword = function hashPassword(plainTextPassword) {
  var encodedPassword = _bcrypt["default"].hashSync(plainTextPassword, saltRounds);
  return encodedPassword;
};
var comparePassword = exports.comparePassword = function comparePassword(plainTextPassword, hash) {
  return _bcrypt["default"].compareSync(plainTextPassword, hash);
};