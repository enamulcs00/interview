import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
     constructor(private formBuilder: FormBuilder,private router: Router,private service: SharedService,private toaster:ToastrService) {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
      }

    ngOnInit() {
    sessionStorage.removeItem(environment.TempStorage)
    }
onSubmit() {
    if(this.loginForm.valid){
      
      this.CallLoginFunc()
    }else{
      this.loginForm.markAllAsTouched()
    }
 }
 CallLoginFunc(){
   let formData = new FormData()
   formData.append('token','e090c25187ee2b3f9f1f8a02747356641')
   formData.append('username',this.loginForm.value.username)
   formData.append('password',this.loginForm.value.password)
   this.service.post(environment.LoginUrl,formData).subscribe((res:any)=>{
     
     if(res.response===2000){
      if(res.twostep==1){
        this.service.HoldLoginObject = res
        this.router.navigate(['/otp'])
       this.toaster.success('Otp sent','SUCCESS')
      }else{
        this.router.navigate(['/'])
       sessionStorage.setItem(environment.TempStorage,JSON.stringify(res));
       this.toaster.success('You logged in','SUCCESS')
      }
       
     }
   })
 }
}
