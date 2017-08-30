# Fire-Face
(React Native + Firebase auth + Facebook Login)



    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
        async (result) => {
            if (result.isCancelled) {
                console.log('Login cancelled');
            } else {
                console.log('checkUser', await FireFace.checkUser())
            }
        },
        (error) => {
            console.log('Login failed with error: ' + error);
        }
    );


