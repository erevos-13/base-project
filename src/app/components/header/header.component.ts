import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/store';
import { authLogout } from '@app/store/user';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.store.dispatch(authLogout())

  }

}
