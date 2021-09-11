import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
OtpValue
loginObject:any
  constructor(private service:SharedService,private toaster:ToastrService,private router:Router) {
    this.loginObject = this.service.HoldLoginObject 
   }

  ngOnInit(): void {
  }
  onOtpChange(e) {
    console.log(e);
    this.OtpValue = e
  }
 SendOtp(obj){
    this.service.post(environment.OTPUrl,obj).subscribe((res:any)=>{
      if(res.response===2000){
       this.toaster.success('Otp verified successfully')
       this.router.navigate(['/'])
       sessionStorage.setItem(environment.TempStorage,JSON.stringify(this.loginObject));
        }
    })
  }
  VerifyOtp(){
    console.log('OBJ',this.loginObject);
    if(this.loginObject===undefined){
      this.router.navigate(['/login'])
      this.toaster.error('Please login','Time out')
    }else{
      if(this.OtpValue && this.OtpValue.length===5){
        let formData = new FormData()
       formData.append('token','e090c25187ee2b3f9f1f8a02747356641')
       formData.append('authToken',this.loginObject.authToken)
       formData.append('otp',this.OtpValue)
       this.SendOtp(formData)
        }  else{
          this.toaster.error('Please enter 5 digit valid otp')
        }
    }
    
}
}

