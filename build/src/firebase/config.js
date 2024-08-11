"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.db = void 0;
var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));
var _serviceAccount = _interopRequireDefault(require("./serviceAccount.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Đặt địa chỉ của emulators trong biến môi trường
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
process.env.FIREBASE_DATABASE_EMULATOR_HOST = '127.0.0.1:9000';
process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';

// Khởi tạo Firebase Admin SDK với cấu hình của emulators
var firebaseConfig = {
  credential: _firebaseAdmin["default"].credential.cert(_serviceAccount["default"]),
  storageBucket: 'gs://tiktok-77077.appspot.com'

  // databaseURL: `http://${process.env.FIREBASE_DATABASE_EMULATOR_HOST}?ns=your-app-namespace`,
};
_firebaseAdmin["default"].initializeApp(firebaseConfig);

// Lấy cấu hình của emulators
var emulatorConfig = {
  firestoreHost: process.env.FIRESTORE_EMULATOR_HOST,
  databaseURL: process.env.FIREBASE_DATABASE_EMULATOR_HOST,
  authHost: process.env.FIREBASE_AUTH_EMULATOR_HOST
};
var db = exports.db = _firebaseAdmin["default"].firestore();
var _default = exports["default"] = _firebaseAdmin["default"];