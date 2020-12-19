import { IModelType, ModalComponent } from './../../../../components/modal/modal.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPosts } from '@app/models/backend/Posts';
import { PostService } from '@app/services/post.service';
import { AppState } from '@app/store';
import { postAddStart, postStart } from '@app/store/posts';
import { getLoadingPosts, getPosts } from '@app/store/posts/post.selector';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators"

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
   allPosts$: Observable<IPosts[]>;
   totalPostsPages: number = 0;
   loading$: Observable<boolean>;
   formAdd: FormGroup;
   displayForm: boolean = false;
   state_ = IModelType;


  constructor(
    private postSrv: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private _modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.formAdd = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      userId: [1]
    })
    this.loading$ = this.store.pipe(select(getLoadingPosts));
    this.allPosts$ = this.store.pipe(select(getPosts), map((posts_) => {
      if (posts_.length > 0) {
        this.totalPostsPages = posts_['total'];
        return posts_;
      }

    }));
    this.store.dispatch(postStart({ start: 0, limit: 5 }))
  }

  pagination(start: number, limit: number) {
    if (start < 0 || limit > this.totalPostsPages) {
      return;
    }
    if (start === 1) {
      start = 0;
    }


    this.store.dispatch(postStart({ start: start, limit: (limit) ? limit : 5 }));
  }

  onSubmit() {
    if (this.formAdd.invalid) {
      return;
    }
    this.store.dispatch(postAddStart({
      post: {
        body: this.formAdd.get('body').value,
        title: this.formAdd.get('title').value,
        userId: this.formAdd.get('userId').value,
      }
    }));
    this.formAdd.reset();
  }

  onDisplayForm() {
    this.displayForm = !this.displayForm;
  }

  onView(item: IPosts, stateModal: IModelType) {
   const modalRef = this._modalService.open(ModalComponent);
   modalRef.componentInstance.data = item;
   modalRef.componentInstance.state = stateModal;



  }

}
