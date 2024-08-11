"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongodb = require("mongodb");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongooseAggregatePaginateV = _interopRequireDefault(require("mongoose-aggregate-paginate-v2"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Schema = _mongoose["default"].Schema;
var Video = new Schema({
  userId: {
    type: _mongodb.ObjectId
  },
  filePath: {
    type: String
  },
  thumbPath: {
    type: String
  },
  description: {
    type: String
  },
  music: {
    type: String
  },
  allows: {
    type: Array
  },
  viewable: {
    type: String
  },
  viewsCount: {
    type: Number,
    "default": 0
  },
  commentsCount: {
    type: Number,
    "default": 0
  },
  likesCount: {
    type: Number,
    "default": 0
  },
  sharesCount: {
    type: Number,
    "default": 0
  },
  favouritesCount: {
    type: Number,
    "default": 0
  },
  _destroy: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true,
  versionKey: false
});
Video.plugin(_mongoosePaginateV["default"]);
Video.plugin(_mongooseAggregatePaginateV["default"], _mongoosePaginateV["default"]);
var _default = exports["default"] = _mongoose["default"].model('Video', Video);