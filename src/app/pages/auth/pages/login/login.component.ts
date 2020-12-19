import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  protected formLogin: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
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
    this.router.navigate(['home','table']).catch((err) => console.warn(err))

  }

}
