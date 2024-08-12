// import admin from 'firebase-admin';
// import serviceAccount from './serviceAccount.json' assert { type: 'json' };

// // Đặt địa chỉ của emulators trong biến môi trường
// process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
// process.env.FIREBASE_DATABASE_EMULATOR_HOST = '127.0.0.1:9000';
// process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';

// // Khởi tạo Firebase Admin SDK với cấu hình của emulators
// const firebaseConfig = {
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: 'gs://tiktok-77077.appspot.com',

//     // databaseURL: `http://${process.env.FIREBASE_DATABASE_EMULATOR_HOST}?ns=your-app-namespace`,
// };

// admin.initializeApp(firebaseConfig);

// // Lấy cấu hình của emulators
// const emulatorConfig = {
//     firestoreHost: process.env.FIRESTORE_EMULATOR_HOST,
//     databaseURL: process.env.FIREBASE_DATABASE_EMULATOR_HOST,
//     authHost: process.env.FIREBASE_AUTH_EMULATOR_HOST,
// };

// const db = admin.firestore();

// export { db };

// export default admin;
