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
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  // private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}
  // return [...this.posts];
  // "http://localhost:9999/api/posts"

  getPosts(currentPage: number, postsPerPage: number) {
    const queryParams = `?page=${currentPage}&pageSize=${postsPerPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        environment.apiURL + "/posts" + queryParams
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map(
              (post: {
                title: any;
                content: any;
                _id: any;
                imagePath: any;
                creator: any;
              }) => {
                return {
                  title: post.title,
                  content: post.content,
                  imagePath: post.imagePath,
                  id: post._id,
                  creator: post.creator,
                };
              }
            ),
            maxPosts: postData.maxPosts,
          };
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPosts.maxPosts,
        });
        // this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id: string | null) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
    }>(environment.apiURL + "/posts/" + id);
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  // this.posts.push(post);
  // this.postsUpdated.next([...this.posts]);

  addPost(title: string, content: string, image: File) {
    // const post: Post = { id: "id", title: title, content: content };
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http
      .post<{ message: string; post: Post }>(
        environment.apiURL + "/posts",
        postData
      )
      .subscribe((responseData) => {
        this.router.navigate(["/posts/posts"]);
      });
  }

  // updatePost(id: any, title: string, content: string, image: any) {
  updatePost(id: any, title: string, content: string, image: any) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
      };
    }
    this.http
      .put(environment.apiURL + "/posts/" + id, postData)
      .subscribe((responseData) => {
        this.router.navigate(["/posts/posts"]);
        this.router.navigate(["/posts/posts"]);
      });
  }

  deletePost(postId: string) {
    return this.http.delete(environment.apiURL + "/posts/" + postId);
  }
}
