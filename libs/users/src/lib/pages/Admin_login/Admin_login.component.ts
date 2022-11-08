import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'users-Admin_login',
  templateUrl: './Admin_login.component.html',
  styles: []
})
export class Admin_LoginComponent implements OnInit {
  Admin_LoginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.Admin_LoginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.Admin_LoginFormGroup.invalid) return;
    this.auth.login(this.loginForm['email'].value, this.loginForm['password'].value).subscribe((user) => {this.authError = false;this.router.navigate(['/']);},
      (error: HttpErrorResponse) => {this.authError = true;if (error.status !== 400) {this.authMessage = 'Error in the Server, please try again later!';}}
    );
  }

  get loginForm() {
    return this.Admin_LoginFormGroup.controls;
  }

  Register() {
    this.router.navigate(['/register']);
  }
}

