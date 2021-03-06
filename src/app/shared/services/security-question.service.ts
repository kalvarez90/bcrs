/*
============================================
; Title: security-question.service.ts
; Author: Professor Krasso
; Date:   16 April 2021
; Modified by: Karina Alvarez
; Description: security question service file
;===========================================
*/

//These are files being imported from external files
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecurityQuestion } from '../interfaces/security-question.interface'

@Injectable({
  providedIn: 'root'
})
export class SecurityQuestionService {

  constructor(private http: HttpClient) { }

  /**
   * @returns Get request to find all security questions.
   */
  findAllSecurityQuestion(): Observable<any> {
    return this.http.get('/api/security-questions');
  }

  /**
   *
   * @param _id
   * @returns Get request to find a security question by ID.
   */
  findSecurityQuestionById(_id: string): Observable<any> {
    return this.http.get(`/api/security-questions/${_id}`);
  }

  /**
   *
   * @param newSecurityQuestion
   * @returns Post request to create a new security question
   */
  createSecurityQuestion(newSecurityQuestion: SecurityQuestion): Observable<any>{
    return this.http.post('/api/security-questions', {
      text: newSecurityQuestion.text
    });
  }
/**
 *
 * @param UpdatedSecurityQuestion
 * @param _id
 * @returns Post request to update a security question.
 */
  updateSecurityQuestion(_id: string, updateSecurityQuestion: SecurityQuestion): Observable<any>{
    return this.http.put(`/api/security-questions/${_id}`, {
      text: updateSecurityQuestion.text
    });
  }

  /**
   *
   * @param _id
   * @return Delete request to delete a security question.
   */
  deleteSecurityQuestion(_id: string):Observable<any>{
    return this.http.delete(`/api/security-questions/${_id}`)
  }

}

