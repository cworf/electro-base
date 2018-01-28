import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../core/firestore.service';
import { Observable } from 'rxjs/Observable';
import { Post, PostId } from '../core/post';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css'],
  providers: [FirestoreService]
})
export class MyPostsComponent implements OnInit {

	posts:any;
	singlePost:any;

	title: string;
	content: string;


  constructor(public fss: FirestoreService) { }

  ngOnInit() {
	  this.posts = this.fss.getPosts()
	  console.log("this ran")
  }

  getSinglePost(id){
	  this.singlePost = this.fss.getPost(id)
  }

  doAddPost(){
	  this.fss.addPost({'title': this.title, 'content': this.content, 'authorName': this.fss.authorName, 'authorId': this.fss.authorId});
  }

}
