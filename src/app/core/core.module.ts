import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthService, AuthGuard, FirestoreService]
})
export class CoreModule { }
