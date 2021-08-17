import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  pageIndex = 0;
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0; //length
  postsPerPage = 2; //pageSize
  pageSizeOptions = [1, 2, 5, 10]; //pageSizeOptions
  currentPage = 1; //
  private postsSub!: Subscription;

  constructor(public postsService: PostsService) {}

  IsPostEmpty() {
    return (
      (this.posts?.length <= 0 && this.isLoading) ||
      (this.posts.length > 0 && !this.isLoading)
    );
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId);
    // this.postsService.getPosts(this.postsPerPage, this.currentPage);
    // this.postsService.deletePost(postId).subscribe(() => {
    //   this.postsService.getPosts(this.postsPerPage, this.currentPage);
    // });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    console.log(pageData);
    this.pageIndex = pageData.pageIndex;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    console.log("this.pageIndex, this.currentPage, this.postsPerPage");
    console.log(this.pageIndex, this.currentPage, this.postsPerPage);
    this.postsService.getPosts(this.currentPage, this.postsPerPage);
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.currentPage, this.postsPerPage);
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });

    console.log("this.pageIndex, this.currentPage, this.postsPerPage");
    console.log(this.pageIndex, this.currentPage, this.postsPerPage);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
