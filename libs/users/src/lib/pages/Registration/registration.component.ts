import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { UsersService} from '../../services/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'users-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {
  RegistrationFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password is wrong';

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.RegistrationFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_: ['', Validators.required]
    });
  }

  onSubmit() {

    if(this.registrationForm['password_'].value == this.registrationForm['password'].value){ 
      this.isSubmitted = true;
    if (this.RegistrationFormGroup.invalid) {return;}
    const user: User = {name: this.registrationForm['name'].value,surname: this.registrationForm['surname'].value,email: this.registrationForm['email'].value,password: this.registrationForm['password'].value};
    this._addUser(user);
    }else{console.log("the don't match brodie")} 


    

    // this.isSubmitted = true;
    // if (this.RegistrationFormGroup.invalid) return; // loginForm
    // //    this.auth.register(this.registrationForm['email'].value, this.registrationForm['password'].value, this.registrationForm['password_'].value).subscribe(
    // this.auth.login(this.registrationForm['email'].value, this.registrationForm['password'].value).subscribe(
    //   (user) => {
    //     this.authError = false;
    //     this.localstorageService.setToken(user.token);
    //     this.router.navigate(['/']);
    //   },
    //   (error: HttpErrorResponse) => {
    //     this.authError = true;
    //     if (error.status !== 400) {
    //       this.authMessage = 'Error in the Server, please try again later!';
    //     }
    //   }
    // );
  }

  get registrationForm() {
    return this.RegistrationFormGroup.controls;
  }

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe((user: User) => {console.log(`User ${user.name}has been created`);})

    this.auth.login(this.registrationForm['email'].value, this.registrationForm['password'].value).subscribe((user) => {this.authError = false;this.localstorageService.setToken(user.token);console.log(user.token);this.router.navigate(['/']);},
      (error: HttpErrorResponse) => {this.authError = true;if (error.status !== 400) {this.authMessage = 'Error in the Server, please try again later!';}}
    );

  }

  login(){
    this.router.navigate(['/login']);
  }



}

