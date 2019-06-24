const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebase = require("react-native-firebase");

admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendWelcomeNotification = functions.auth.user().onCreate(async user => {
  try {
    const uid = user.uid;
    const doc = await firebase
      .firestore()
      .collection("notificationTokens")
      .doc(uid);
    const payload = {
      notification: {
        title: "Hoşgeldiniz",
        body: "Hadimaça uygulamasını kullandığınız için teşekkür ederiz."
      }
    };

    const { token } = doc;
    return admin.messaging().sendToDevice(token, payload);
  } catch (error) {
    console.log("Error while sending welcome notification", error.message);
  }
});