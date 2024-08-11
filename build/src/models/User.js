"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _Schema;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Schema = _mongoose["default"].Schema;
var User = new Schema((_Schema = {
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_Schema, "lastName", {
  type: String
}), "tiktokID", {
  type: String
}), "email", {
  type: String,
  require: true
}), "password", {
  type: String,
  min: 6,
  require: true
}), "nickName", {
  type: String
}), "avatar", {
  type: String
}), "bio", {
  type: String
}), "tick", {
  type: Boolean,
  "default": false
}), "followingsCount", {
  type: Number,
  "default": 0
}), "followersCount", {
  type: Number,
  "default": 0
}), _defineProperty(_defineProperty(_defineProperty(_Schema, "likesCount", {
  type: Number,
  "default": 0
}), "websiteUrl", {
  type: String
}), "_destroy", {
  type: Boolean,
  "default": false
})), {
  timestamps: true,
  versionKey: false
});
var _default = exports["default"] = _mongoose["default"].model('User', User);