const functions = require("firebase-functions");
const admin = require("firebase-admin");
//const firebase = require("react-native-firebase");

admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.sendPushNotification = functions.firestore
  .document("notificationTokens")
  .onCreate(event => {
    // gets standard JavaScript object from the new write
    const writeData = event.data.data();
    // access data necessary for push notification
    const sender = writeData.uid;
    const senderName = writeData.name;
    const recipient = writeData.recipient;
    // the payload is what will be delivered to the device(s)
    let payload = {
      notification: {
        title: "Başlık",
        body: "Mesaj"
      }
    };
    // either store the recepient tokens in the document write
    const tokens = writeData.tokens;
    
    // or collect them by accessing your database
    var pushToken = "";
    return functions.auth.user().onCreate(user => {
      const uid = user.uid;
      return functions.firestore
        .collection("notificationTokens/" + uid)
        .get()
        .then(doc => {
          pushToken = doc.data().token;
          // sendToDevice can also accept an array of push tokens
          return admin.messaging().sendToDevice(pushToken, payload);
        });
    });
  });
