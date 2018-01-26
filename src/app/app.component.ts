import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; //RxJS or Reactive Extensions for JavaScript is a library for transforming, composing, and querying streams of all kinds of data, from simple arrays of values, to series of events, to complex flows of data

interface Post{
	title: string;
	content: string;
}

interface PostId

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	postsCollection: AngularFirestoreCollection<post>;
	posts: Observable<post[]>;

	title: string;
	content: string;

  constructor(private afs: AngularFirestore){}

  ngOnInit(){
	  this.postsCollection = this.afs.collection('posts');
	  this.posts = this.postsCollection.valueChanges();
  }

  addPost(){
	  this.postsCollection.add({'title': this.title, 'content': this.content})
	  // this.postsCollection.doc('my-custom-id').set({'title': this.title, 'content': this.content}) //this is how you make a custom id
  }
}
