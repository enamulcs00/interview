import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PipeTestComponent } from './pipe-test/pipe-test.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { LoginComponent } from './screens/login/login.component';
import { OtpComponent } from './screens/otp/otp.component';
import { AuthGuard } from './services/auth.guard';
const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'pipe-test', component: PipeTestComponent },

  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
