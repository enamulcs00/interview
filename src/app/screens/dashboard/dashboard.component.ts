import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
loginInfo = JSON.parse(sessionStorage.getItem(environment.TempStorage));
  ICICIFORM:FormGroup
  constructor(private router:Router,private formBuilder:FormBuilder,private service:SharedService,private toaster:ToastrService) {
    this.ICICIFORM = this.formBuilder.group({
      specification: this.formBuilder.array([], [Validators.required]),
    })
  
   }

  ngOnInit(): void {
    this.GetICICIDATA()
  }
  logout() {
    sessionStorage.removeItem(environment.TempStorage)
    this.router.navigate(['/login']);
}
setSpecifications(item) {
  const formArray = new FormArray([]);
  for (let x of item) {
    console.log(x)
    formArray.push(this.formBuilder.group({
      Address: [x.Address,[Validators.required]],
      accountnumber: [x.accountnumber,[Validators.required]],
      balance: [x.balance,[Validators.required]],
      bankname: [x.bankname,[Validators.required]],
      ifsccode: [x.ifsccode,[Validators.required]],
      accountholder: [x.accountholder,[Validators.required]],
      
    }));
  }
  this.ICICIFORM.setControl('specification',formArray)
}
GetICICIDATA(){ 
  let formData = new FormData()
  formData.append('token',environment.Token)
  formData.append('authToken',this.loginInfo.authToken)
  this.service.post(environment.GetDataUrl,formData).subscribe((res:any)=>
  {
    console.log(" Get icc",res.data);
   
    this.setSpecifications(res.data[0].rnfi)
  })
} 
specification(): FormArray {
  return this.ICICIFORM.get('specification') as FormArray;
}

Update(){
  if(this.ICICIFORM.valid){
    let formData = new FormData()
  formData.append('token',environment.Token)
  formData.append('authToken',this.loginInfo.authToken)
    formData.append('json',JSON.stringify(this.ICICIFORM.get('specification').value))
    this.service.post(environment.UpdateUrl,formData).subscribe((res:any)=>{
      if(res.statuscode===200){
        this.GetICICIDATA()
        this.toaster.success('Data updated')
      }
    })
  }else{
    this.ICICIFORM.markAllAsTouched()
    this.toaster.error('Please fill all field')
  }
}
}
