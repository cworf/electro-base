import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../core/firestore.service';
import { Observable } from 'rxjs/Observable';
import { Post, PostId } from '../core/post';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css'],
    providers: [FirestoreService]
})
export class PostsComponent implements OnInit {

    posts: any;
    singlePost: any;

    title: string;
    content: string;


    constructor(public fss: FirestoreService) {}

    ngOnInit() {
        this.posts = this.fss.getPosts()
        console.log(this.posts)
    }

    getSinglePost(id) {
        this.singlePost = this.fss.getPost(id)
    }

    doAddPost() {
        console.log(this.fss.authorName)
        this.fss.addPost({ 'title': this.title, 'content': this.content, 'authorName': this.fss.authorName, 'authorId': this.fss.authorId });
    }

}
