/*
============================================
; Title: user-list.component.ts
; Author: Professor Krasso
; Date:   17 April 2021
; Modified by: Karina Alvarez
; Description: User List component
;===========================================
*/

//These are files being imported from external files
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordDialogComponent } from 'src/app/shared/delete-record-dialog/delete-record-dialog.component';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  displayedColumns = ['username', 'firstname', 'lastname', 'phoneNumber', 'address', 'email', 'functions'];

  constructor(private dialog: MatDialog, private userService: UserService) {

    /**
     * This will find all the users
     */
    this.userService.findAllUsers().subscribe(res => {
      this.users = res['data'];
      console.log(this.users);
    }, err => {
      console.log(err)
    })
  }

  ngOnInit(): void {
  }

/**
 *
 * @param userId
 * @param recordId
 * delete user function
 */
  delete(userId, recordId): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete user ${recordId}?`
      },
      disableClose: true,
      width: '800px'
    });

    /**
     * if the confirm button is clicked, user will be deleted
     */
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.userService.deleteUser(userId).subscribe(res => {
          console.log('User deleted');
          /**
            This will return a new array of users not matching
            the one currently deleted
          */
          this.users = this.users.filter(u => u._id !== userId)
        })
      }
    });
  }
}
