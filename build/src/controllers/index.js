"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoControllers = exports.userControllers = exports.searchControllers = exports.reactionControllers = exports.commentControllers = exports.authControllers = void 0;
var _authControllers = _interopRequireWildcard(require("./authControllers"));
exports.authControllers = _authControllers;
var _searchControllers = _interopRequireWildcard(require("./searchControllers"));
exports.searchControllers = _searchControllers;
var _videoControllers = _interopRequireWildcard(require("./videoControllers"));
exports.videoControllers = _videoControllers;
var _userControllers = _interopRequireWildcard(require("./userControllers"));
exports.userControllers = _userControllers;
var _commentControllers = _interopRequireWildcard(require("./commentControllers"));
exports.commentControllers = _commentControllers;
var _reactionControllers = _interopRequireWildcard(require("./reactionControllers"));
exports.reactionControllers = _reactionControllers;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }