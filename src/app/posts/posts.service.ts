import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Post } from "./post.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}
  // return [...this.posts];
  // "http://localhost:9999/api/posts"

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(environment.apiURL + "/posts")
      .pipe(
        map((postData) => {
          return postData.posts.map(
            (post: { title: any; content: any; _id: any }) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
              };
            }
          );
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id: string | null) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      environment.apiURL + "/posts/" + id
    );
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  // this.posts.push(post);
  // this.postsUpdated.next([...this.posts]);

  addPost(title: string, content: string) {
    const post: Post = { id: "id", title: title, content: content };
    this.http
      .post<{ message: string; postId: string }>(
        environment.apiURL + "/posts",
        post
      )
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/posts/posts"]);
      });
  }

  updatePost(id: any, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.http
      .put(environment.apiURL + "/posts/" + id, post)
      .subscribe((response) => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((p) => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/posts/posts"]);
      });
  }

  deletePost(postId: string) {
    this.http.delete(environment.apiURL + "/posts/" + postId).subscribe(() => {
      const updatedPosts = this.posts.filter((post) => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}
