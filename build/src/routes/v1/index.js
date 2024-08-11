"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APIs_V1 = void 0;
var _express = _interopRequireDefault(require("express"));
var _authRoutes = require("./authRoutes.js");
var _videoRoutes = require("./videoRoutes");
var _userRoutes = require("./userRoutes.js");
var _commentRoutes = require("./commentRoutes.js");
var _reactionRoutes = require("./reactionRoutes.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.use('/auth', _authRoutes.authRoutes);
router.use('/users', _userRoutes.userRoutes);
router.use('/videos', _videoRoutes.videoRoutes);
router.use('/comments', _commentRoutes.commentRoutes);
router.use('/reactions', _reactionRoutes.reactionRoutes);
var APIs_V1 = exports.APIs_V1 = router;