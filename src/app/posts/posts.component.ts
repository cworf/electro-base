import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; //RxJS or Reactive Extensions for JavaScript is a library for transforming, composing, and querying streams of all kinds of data, from simple arrays of values, to series of events, to complex flows of data
import { AuthService } from '../core/auth.service';
import { Post, PostId } from '../core/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [AuthService]
})
export class PostsComponent implements OnInit {

	postsCollection: AngularFirestoreCollection<Post>;
	posts: any;

	title: string;
	content: string;
	authorName: string;
	authorId: string;

	postDoc: AngularFirestoreDocument<Post>
	singlePost: Observable<Post>;

  constructor(private afs: AngularFirestore, private auth : AuthService){}

  ngOnInit(){
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

  addPost(){

	  this.postsCollection.add({'title': this.title, 'content': this.content, 'authorName': this.authorName, 'authorId': this.authorId});
	  // this.postsCollection.doc('my-custom-id').set({'title': this.title, 'content': this.content}) //this is how you make a custom id if needed

  }

  getPost(id){
	  this.postDoc = this.afs.doc('posts/' + id); //this gets the specific post (or "document" in firestore) from firestore based on the id of clicked element
	  this.singlePost = this.postDoc.valueChanges(); //this records the post into singlePost
	  console.log(this.singlePost)
  }

  deletePost(id){
	  console.log(id)
	  this.afs.doc('posts/' + id).delete();
  }

}
