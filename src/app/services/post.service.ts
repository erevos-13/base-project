import { Injectable } from "@angular/core";
import { IPosts } from "@app/models/backend/Posts";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { PostApi } from "./api/postsApi";

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


}
