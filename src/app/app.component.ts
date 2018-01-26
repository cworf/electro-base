import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; //RxJS or Reactive Extensions for JavaScript is a library for transforming, composing, and querying streams of all kinds of data, from simple arrays of values, to series of events, to complex flows of data

interface Post{
	title: string;
	content: string;
}

interface PostId extends Post{
	id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	postsCollection: AngularFirestoreCollection<Post>;
	posts: any;

	title: string;
	content: string;

  constructor(private afs: AngularFirestore){}

  ngOnInit(){
	  this.postsCollection = this.afs.collection('posts');
	  // this.posts = this.postsCollection.valueChanges();  //this code gets all of the values defined above
	  this.posts = this.postsCollection.snapshotChanges()  //this code gets all values inside the firestore object and allows you to map the unique post id into the returned object
	  	.map(actions => { //actions represents the loop through each post
			return actions.map(a => { //a represents a loop through the parameters of each post
				const data = a.payload.doc.data() as Post; //note that the returned post parameters(title and content) or whatever gets added down the road will be mapped into the data object
				const id = a.payload.doc.id;
				console.log({id, data});
				return { id, data }; //this is the new object given to each post
			});
		}); console.log(this.posts)
  }

  addPost(){
	  this.postsCollection.add({'title': this.title, 'content': this.content})
	  // this.postsCollection.doc('my-custom-id').set({'title': this.title, 'content': this.content}) //this is how you make a custom id if needed
  }
}
