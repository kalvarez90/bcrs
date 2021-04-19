/*
============================================
<<<<<<< HEAD
; Title:  base.response.js
; Author: Professor Krasso
; Date:   17 April 2021
; Modified by: Douglas Jenkins
; Description: User Create
;===========================================
*/

=======
; Title:
; Author: Professor Krasso
; Date:   18 April 2021
; Modified by:
; Description:
;===========================================
*/

//These are files being imported from external files
>>>>>>> 6ed4496f7e8ee63148b91f31ba81c9763aaf09af
import { Component, OnInit } from '@angular/core';
import { User } from './../../shared/user.interface';
import { UserService } from './../../shared/user.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User;
  userId: string;
  form: FormGroup;
  roles: any;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

// required fields that need a value
  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      firstname: [null, Validators.compose([Validators.required])],
      lastname: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],

    })
  }

  createUser() {
    const newUser = {} as User;
    newUser.username = this.form.controls.username.value,
    newUser.password = this.form.controls.password.value,
    newUser.firstname = this.form.controls.firstname.value,
    newUser.lastname = this.form.controls.lastname.value,
    newUser.phoneNumber = this.form.controls.phoneNumber.value,
    newUser.address = this.form.controls.address.value,
    newUser.email = this.form.controls.email.value,

    this.userService.createUser(newUser).subscribe(res => {
      this.router.navigate(['/users'])
    }, err => {
      console.log(err);
    })
  }

  // sends you out of the user create
  cancel(){
    this.router.navigate(['/users']);
  }

}
