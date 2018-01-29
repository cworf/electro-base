import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../core/firestore.service';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs/Observable';
import { Post, PostId } from '../core/post';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
    selector: 'app-my-posts',
    templateUrl: './my-posts.component.html',
    styleUrls: ['./my-posts.component.css'],
    providers: [FirestoreService, AuthService]
})
export class MyPostsComponent implements OnInit {

    myPostsCollection: AngularFirestoreCollection < Post > ;
    myPosts: any;
    singlePost: any;

    title: string;
    content: string;


    constructor(public afs: AngularFirestore, public fss: FirestoreService, private auth: AuthService) {}

    ngOnInit() {
        this.auth.user.subscribe(author => {
            this.myPostsCollection = this.afs.collection('posts', ref => ref.where('authorId', '==', `${author.uid}`));
            this.myPosts = this.myPostsCollection.valueChanges()
        });
    }

    getSinglePost(id) {
        this.singlePost = this.fss.getPost(id)
    }

    doAddPost() {
        this.fss.addPost({ 'title': this.title, 'content': this.content, 'authorName': this.fss.authorName, 'authorId': this.fss.authorId });
    }

}
