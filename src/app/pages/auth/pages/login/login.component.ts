import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '@app/store';
import { authStart } from '@app/store/user';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {

  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['test@test.com', [Validators.required, Validators.email]],
      password: ['User1234!', [Validators.required]],
      checkbox: ['']
    })
  }

  onLogin() {
    console.log(this.formLogin.value);
    if(this.formLogin.invalid) {
      return;
    }
    this.store.dispatch(authStart({email: this.formLogin.get('email').value , password: this.formLogin.get('password').value, rememberMe : this.formLogin.get('checkbox').value  }))
    // this.router.navigate(['home','table']).catch((err) => console.warn(err));

  }

}
