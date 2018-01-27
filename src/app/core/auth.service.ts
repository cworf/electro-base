import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/switchMap';

interface User { //this will be the structure of the user collection
	uid: string;
	email: string;
	photoURL?: string; //      )
	displayName?: string;//    >  custom attributes have the ? mark
	favoriteColor?: string;//  )
}

@Injectable()
export class AuthService {

	user: Observable<User>;

  constructor(private afAuth : AngularFireAuth, private afs : AngularFirestore, private router: Router) {
	  this.user = this.afAuth.authState.switchMap(user => { //will determine if a user is currently authenticated and return their user information into this.user as an observable
		  if (user) {
		      return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
		  } else {
			  return Observable.of(null)
		  }
	  });
  }

  normalLogin(email, pw){
	  firebase.auth().createUserWithEmailAndPassword(email, pw)
	  	.then((user) => {
			this.updateUserData(user);
		})
	  	.catch(function(error){
			console.log(error.message)
		});
  }

  googleLogin() { //this function is activated when google login is selected and sends the google auth provider into the oAuth function
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }


  private oAuthLogin(provider) { //this function can be used to log in with many providers by creating other login methods which send the provider into this parameter
    return this.afAuth.auth.signInWithPopup(provider) //the successful sign in returns an object containing the user data which will be sent into "credential" parameter after it is received
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName ? user.displayName : user.email,
      photoURL: user.photoURL
    }
    return userRef.set(data)
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }
}
