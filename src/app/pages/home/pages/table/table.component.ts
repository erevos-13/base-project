import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPosts } from '@app/models/backend/Posts';
import { PostService } from '@app/services/post.service';
import { AppState } from '@app/store';
import { postStart } from '@app/store/posts';
import { getPosts } from '@app/store/posts/post.selector';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators"

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  protected allPosts$: Observable<IPosts[]>;
  protected totalPostsPages: number[] = [];


  constructor(
    private postSrv: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.allPosts$ = this.store.pipe(select(getPosts),map((posts_) => {
      if(posts_.length > 0) {
        const total = (posts_['total'] / 5);
        this.totalPostsPages = Array.from(Array(total).keys());
        return posts_;
      }

    }));
    this.store.dispatch(postStart({ start: 0, limit: 5 }))
  }

  pagination(start: number, limit: number) {
    this.store.dispatch(postStart({ start: start, limit: limit }));
  }

}
