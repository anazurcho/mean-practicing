import { Injectable } from '@angular/core';
import { Post } from './post.model';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    constructor() {}
    // create a private property of type Post array
    private posts: Post[] = [];
    getPosts() {
        // return copy of post array, use spread operator, so changes only affected on its copy, not the original array
        return [...this.posts];
    }
    // adding new post
    addPost(post: Post) {
        this.posts.push(post);
    }
}
