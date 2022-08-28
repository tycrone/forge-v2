import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
	apiKey: "AIzaSyCTni-xjcGc7-PtuUlJdEuZ5g-ytgI7Wls",
	authDomain: "forge-e9fef.firebaseapp.com",
	databaseURL: "https://forge-e9fef.firebaseio.com",
	projectId: "forge-e9fef",
	storageBucket: "forge-e9fef.appspot.com",
	messagingSenderId: "157967972791",
	appId: "1:157967972791:web:76d869140a892ac3ad1032"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  // ***AUTH API***
  doCreateUserWithEmailAndPassword = (email, password) =>
  	this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
  	this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
  	this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });


  // Merge AUTH and DB USER API
   onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }
 
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };
 
            next(authUser);
          });
      } else {
        fallback();
      }
    });


  // ***DATABASE***
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
  database = () => this.db.ref('data/widgets');
}
 
export default Firebase;