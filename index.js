const admin = require("firebase-admin");
const {initializeApp, applicationDefault} = require("firebase-admin/app");
const {getMessaging} = require("firebase-admin/messaging");
import express, {json, response} from "express";
const cors = require("cors");
const port = 3000;

process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "*"
    })
);

app.use(
    cors({
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'UPDATE', 'DELETE']
    })
);

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});

initializeApp({
    credential: applicationDefault(),
    projectId: 'train-info-1ffe6',
});

app.post("/send", async(req, res) => {
    const receivedToken = req.body.fcmToken;
    const message = {
        notification: {
            title: "test",
            body: "test notification"
        },
        token: "token"
    };

    getMessaging().send(message).then((response) => {
        res.status(200).send({
            message: "Message sent successfully!",
            token: receivedToken
        });

        console.log("Message sent successfully:", response);
    })
    .catch((error) => {
        res.status(400);
        res.send(error);
        console.log("Error sending message:", error);
    });

});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

// -------

// const express = require('express');
// const port = 3000;
// const app = express();
// const { sendPushNotification } = require('./firebaseMessaging');
// const registrationToken = 'BASrQkK7_wi3XoCcb7HXtBf3BM7WNwXXXv5fILi7jU7cm4SLDQTyEN1CTrvTAw9cJfvi3KC27O1OWEbVbfp_Pp8'; // Replace with the actual device token
// const notificationTitle = 'Your Notification Title';
// const notificationBody = 'Your Notification Body';
// app.use(express.json());
// // BASrQkK7_wi3XoCcb7HXtBf3BM7WNwXXXv5fILi7jU7cm4SLDQTyEN1CTrvTAw9cJfvi3KC27O1OWEbVbfp_Pp8


// sendPushNotification(registrationToken, notificationTitle, notificationBody)
//   .then((response) => {
//     console.log('Successfully sent message:', response);
//   })
//   .catch((error) => {
//     console.error('Error sending message:', error);
//   });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });