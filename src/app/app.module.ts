import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

var firebaseConfig = {
	apiKey: "AIzaSyAAavzU127vTBhpDUsb7ohOMQO5Y30AP3I",
    authDomain: "electro-base.firebaseapp.com",
    databaseURL: "https://electro-base.firebaseio.com",
    projectId: "electro-base",
    storageBucket: "electro-base.appspot.com",
    messagingSenderId: "435821102298"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
	CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
