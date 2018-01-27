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
	  this.user = this.afAuth.authState.switchMap(user => {
		  if (user) {
		      return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
		  }
	  })
  }

}
