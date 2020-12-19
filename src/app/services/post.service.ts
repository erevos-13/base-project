import { Injectable } from "@angular/core";
import { IPosts } from "@app/models/backend/Posts";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { IPostInput, PostApi } from "./api/postsApi";

@Injectable({
  providedIn: "root"
})
export class PostService {
  constructor(private api: PostApi) {

  }

  public getPostsAll(start: number, limit: number): Observable<IPosts[]> {
    return this.api.getPosts(start, limit).pipe(
      map((res) => {
        return res.body;
      })
    );
  }


  public addInPost(input: IPostInput): Observable<any> {
    return this.api.addPost(input).pipe(
      map((res) => res.body)
    );

  }

  public removePostById(id: number): Observable<any> {
    return this.api.deletePost(id).pipe(
      map((res) => res.body)
    );

  }

  public editPost(input: IPostInput): Observable<any> {
    return this.api.editPost(input).pipe(
      map((res) => res.body)
    );

  }



}
