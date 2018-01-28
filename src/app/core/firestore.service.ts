import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Post, PostId } from './post';
import { AuthService } from './auth.service';

@Injectable()
export class FirestoreService {

	postsCollection: AngularFirestoreCollection<Post>;
	posts: any;

	authorName: string;
	authorId: string;

	postDoc: AngularFirestoreDocument<Post>
	singlePost: Observable<Post>;

	constructor(public afs: AngularFirestore, private auth: AuthService){
		this.postsCollection = this.afs.collection('posts');
  	  // this.posts = this.postsCollection.valueChanges();  //this code gets all of the values defined above
  	  this.posts = this.postsCollection.snapshotChanges()  //this code gets all values inside the firestore object and allows you to map the unique post id into the returned object
  	  	.map(actions => { //actions represents the loop through each post
  			return actions.map(a => { //a represents a loop through the properties of each post
  				const data = a.payload.doc.data() as Post; //note that the returned post properties(title and content) or whatever gets added down the road will be mapped into the data object
  				const id = a.payload.doc.id;
  				console.log({id, data});
  				return { id, data }; //this is the new object given to each post
  			});
  		}); console.log(this.auth.user);

  		if (this.auth.user){
  			this.auth.user.subscribe(data => {
  	  		  console.log(data);
  	  	  		this.authorName = data.displayName;
  				this.authorId = data.uid;
  			});
  		}
	}

	getPosts(){
		return this.posts
	}

	addPost(post){
  	  this.postsCollection.add(post);

  	  // this.postsCollection.doc('my-custom-id').set({'title': this.title, 'content': this.content}) //this is how you make a custom id if needed

    }

    getPost(id){
  	  this.postDoc = this.afs.doc('posts/' + id); //this gets the specific post (or "document" in firestore) from firestore based on the id of clicked element
  	  return this.postDoc.valueChanges(); //this returns the requested post
    }

    deletePost(id){
  	  console.log(id)
  	  this.afs.doc('posts/' + id).delete();
    }
}
