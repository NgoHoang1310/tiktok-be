"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _controllers = require("../../controllers");
var jwt = _interopRequireWildcard(require("../../middlewares/authorizationJWTMiddleWare"));
var _multer = _interopRequireDefault(require("multer"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var upload = (0, _multer["default"])({
  storage: _multer["default"].memoryStorage(),
  limits: {
    fieldSize: 1 * 1024 * 1024 * 1024
  }
});
var router = _express["default"].Router();
router.route('/').get(_controllers.videoControllers.getVideos);
router.route('/foryou').get(jwt.verifyAssessToken, _controllers.videoControllers.getVideosForyou);
router.route('/:id/profile').get(_controllers.videoControllers.getVideosProfile);
router.route('/following/:userId').get(_controllers.videoControllers.getFollowingVideos);
router.route('/upload').post(jwt.verifyAssessToken, upload.single('filePath'), _controllers.videoControllers.uploadVideo);
router.route('/:id/views').patch(_controllers.videoControllers.countingView);
var videoRoutes = exports.videoRoutes = router;