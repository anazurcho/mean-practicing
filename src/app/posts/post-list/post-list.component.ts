import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  pageIndex = 0;
  posts: Post[] = [];
  userId: string | null = "";
  isLoading = false;
  totalPosts = 0; //length
  postsPerPage = 2; //pageSize
  pageSizeOptions = [1, 2, 5, 10]; //pageSizeOptions
  currentPage = 1; //
  private postsSub!: Subscription;

  userIsAuthentificated = false;
  private authStatusSub!: Subscription;

  constructor(
    public postsService: PostsService,
    private authService: AuthService
  ) {}

  IsPostEmpty() {
    return (
      (this.posts?.length <= 0 && this.isLoading) ||
      (this.posts.length > 0 && !this.isLoading)
    );
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.pageIndex = pageData.pageIndex;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.currentPage, this.postsPerPage);
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.currentPage, this.postsPerPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
    this.userIsAuthentificated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthentificated) => {
        this.userId = this.authService.getUserId();
        this.userIsAuthentificated = isAuthentificated;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
