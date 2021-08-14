import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
    constructor() {}
    postTitle: string = '';
    postContent: string = '';

    ngOnInit(): void {}

    @Output() postCreated = new EventEmitter<Post>();
    onAddPost() {
        // create post object to store title and content
        const post: Post = { title: this.postTitle, content: this.postContent };
        // emit the post object
        this.postCreated.emit(post);
    }
}
