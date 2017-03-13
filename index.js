/**
 * Created by chiichuy on 3/10/17.
 */

const firebase = require('firebase')
const FBSDK = require('react-native-fbsdk');
const {
    AccessToken,
    LoginManager
} = FBSDK;

const checkLoginState = function(token) {
    new Promise( function(resolve, reject) {
        if (token) {

        // User is signed-in Facebook.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
            unsubscribe();


            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(token, firebaseUser)) {
                // Build Firebase credential with the Facebook auth token.
                var credential = firebase.auth.FacebookAuthProvider.credential( token.accessToken );


                // Sign in with the credential from the Facebook user.
                firebase.auth().signInWithCredential(credential).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                }).then(()=> resolve({}));
            } else {
                // User is already signed-in Firebase with the correct user.
                resolve({})
            }
        });
    } else {
        // User is signed-out of Facebook.
        firebase.auth().signOut().then(() => resolve({}) );
    }
    })
}

function isUserEqual(facebookAuthResponse, firebaseUser) {
    if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
                providerData[i].uid === facebookAuthResponse.userID) {
                // We don't need to re-auth the Firebase connection.
                return true;
            }
        }
    }
    return false;
}


const logOut = async () => {
    await LoginManager.logOut()
    await firebase.auth().signOut();
}

const checkUser = async () => {
    const token = await AccessToken.getCurrentAccessToken()

    await checkLoginState(token)
}




export default {
    checkUser: checkUser,
    logOut: logOut
}