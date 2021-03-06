/*
============================================
; Title: role-details.component.ts
; Author: Professor Krasso
; Date:   29 April 2021
; Modified by: Karina Alvarez
; Description: Role details
;===========================================
*/

//These are files being imported from external files
import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/shared/services/role.service';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {
  role: Role;
  roleId: string;
  form: FormGroup

  constructor(private route: ActivatedRoute, private roleService: RoleService, private fb: FormBuilder, private router: Router) {
    this.roleId = this.route.snapshot.paramMap.get('roleId');

    /**
     * Finds role by ID and subscribes to it
     */
    this.roleService.findRolesById(this.roleId).subscribe(res => {
      this.role = res['data'];
    }, err => {
      console.log(err);
    }, () => {
      console.log(this.role.text + 'response');
      this.form.controls['text'].setValue(this.role.text);
    });
  }

  /**
   * text represents the role name
   */
  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }

  /**
   * Saves the new updated role
   */
  save() {
    const updateRole = {
      text: this.form.controls['text'].value
    } as Role;
    this.roleService.updateRole(this.roleId, updateRole).subscribe(res => {
      this.router.navigate(['/roles']);
    }, err => {
      console.log(err);
    });
  }

  /**
   * Cancel button
   */
  cancel() {
    this.router.navigate(['/roles']);
  }

}
