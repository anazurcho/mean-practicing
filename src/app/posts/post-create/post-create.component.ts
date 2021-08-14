import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent {
  postTitle: string = "";
  postContent: string = "";

  @Output() postCreated = new EventEmitter<Post>();

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.postTitle, form.value.postContent);
    form.resetForm();
  }
}
