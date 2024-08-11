"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _controllers = require("../../controllers");
var _validations = require("../../validations");
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
router.route('/').get(jwt.verifyAssessToken, _controllers.userControllers.getAUser);
router.route('/:id').patch(jwt.verifyAssessToken, upload.single('file'), _validations.updateValidation.updateProfile, _controllers.userControllers.updateUser);
router.route('/:id/following/').get(jwt.verifyAssessToken, _controllers.userControllers.getFollowingUsers);
router.route('/:tiktokID/profile').get(_controllers.userControllers.getUserProfile);
router.route('/:id/follow/').post(jwt.verifyAssessToken, _controllers.userControllers.followAUser);
router.route('/:id/unfollow/')["delete"](jwt.verifyAssessToken, _controllers.userControllers.unfollowAUser);
router.route('/search').get(_controllers.searchControllers.search);
var userRoutes = exports.userRoutes = router;