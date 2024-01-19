// firebaseMessaging.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://train-info-1ffe6-default-rtdb.firebaseio.com/', // Replace with your Firebase project URL
});

module.exports = {
  sendPushNotification: (registrationToken, title, body) => {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: registrationToken,
    };

    return admin.messaging().send(message);
  },
};
