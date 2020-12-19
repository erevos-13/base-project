import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '@app/store';
import { Component, Input, OnInit } from '@angular/core';
import { IPosts } from '@app/models/backend/Posts';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { postEditStart, postRemoveStart } from '@app/store/posts';

export enum IModelType {
  info = 0,
  delete = 1,
  edit = 2
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() data: IPosts;
  @Input() deleteModal: boolean = false;
  @Input() state: IModelType;
  STATE = IModelType;
  formEdit: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.formEdit = this.fb.group({
      title: [this.data.title, [Validators.required]],
      body: [this.data.body, [Validators.required]],
      userId: [1]
    })
  }

  onClose() {
    if (this.state === IModelType.delete) {
      this.store.dispatch(postRemoveStart({ postId: this.data.id }))

    }
    this.modal.close('Ok click');
  }

  onSubmit() {
    this.store.dispatch(postEditStart({post: {
      title: this.formEdit.get('title').value,
      body: this.formEdit.get('body').value,
      id: this.data.id,
      userId: this.data.userId
    }}))
  }

}
