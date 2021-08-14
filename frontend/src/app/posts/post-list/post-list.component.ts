import { Component, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
    // posts = [
    //     { title: 'First Post', content: 'First Post Content' },
    //     { title: 'Second Post', content: 'Second Post Content' },
    //     { title: 'Third Post', content: 'Third Post Content' },
    // ];

    // @Input() posts: Array<Object> = [];

    @Input() posts: Post[] = [];

    IsPostEmpty() {
        return this.posts?.length > 0;
    }
}
