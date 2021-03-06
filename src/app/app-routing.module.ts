/*
============================================
; Title: security-question.service.ts
; Author: Professor Krasso
; Date:   16 April 2021
; Modified by: Karina Alvarez, Douglas Jenkins, Arlix Sorto
; Description:
;===========================================
*/

//These are files being imported from external files
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { VerifyUsernameComponent } from './pages/verify-username/verify-username.component';
import { VerifySecurityQuestionsComponent } from './pages/verify-security-questions/verify-security-questions.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { InternalServerErrorComponent } from './pages/internal-server-error/internal-server-error.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { RoleDetailsComponent } from './pages/role-details/role-details.component';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { RoleGuard } from './shared/guards/role.guard';
import { InvoiceSummaryDialogComponent } from './dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
import { PurchasesByServiceGraphComponent } from './pages/purchases-by-service-graph/purchases-by-service-graph.component';

// These are the paths added to the routes array
// Each of these path will take you to the designated component
//RoleGuard only allows admins to see page
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [RoleGuard] 
      },
      {
        path: 'users/:userId',
        component: UserDetailsComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'users/create/new',
        component: UserCreateComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'security-questions',
        component: SecurityQuestionListComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'security-questions/:questionId',
        component: SecurityQuestionDetailsComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'security-questions/create/new',
        component: SecurityQuestionCreateComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'roles',
        component: RoleListComponent,
        canActivate: [RoleGuard]
        
      },
      {
        path: 'roles/:roleId',
        component: RoleDetailsComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'roles/create/new',
        component: RoleCreateComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'invoice',
        component: InvoiceSummaryDialogComponent
      },
      {
        path: 'purchases-by-service-graph',
        component: PurchasesByServiceGraphComponent,
        canActivate: [RoleGuard]
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'session',
    component:AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'forgot',
        component: VerifyUsernameComponent
      },
      {
        path: 'verify-security-questions',
        component: VerifySecurityQuestionsComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: '404',
        component: NotFoundComponent
      },
      {
        path: '500',
        component: InternalServerErrorComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
