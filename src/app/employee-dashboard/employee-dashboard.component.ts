import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder , FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { EmployeeModel } from './employee.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  employeeForm!: FormGroup; 

  employeeobj: EmployeeModel = new EmployeeModel;

  employeeData: any;

  submitted:boolean=false;

  btnUpdate:boolean = false;

  btnSubmit:boolean = true;

  

  constructor(private formBuilder:FormBuilder, private api:ApiService) {
    
   }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      fullname:['',[Validators.required,Validators.minLength(4)]],
      phone:['',[Validators.required,Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')]],
      email:['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      dob:['',[Validators.required]],
      designation:['',Validators.required],
      gender:['',Validators.required],
      password:['',Validators.required],
      confirmpassword:['',Validators.required]
    })
    
    this.showEmployee();
  }

  
  AddEmployee(){
    // this.submitted=false;
    if(this.employeeForm.valid){    
      this.api.postEmployee(this.employeeForm.value).subscribe({ next: (res) => {
        console.log(res);
      },
      error: (err) => {
        alert("Error!!");
        // console.log(err);
      },
      complete: () => {
        // console.log('complete');
        alert("Data Successfully Saved");
        this.showEmployee();
        this.employeeForm.reset();
      } })
      }
    else{
        this.submitted=true;
        if(this.employeeForm.invalid){
          return;
        }
    }
    

  }

  ResetForm(){
    this.employeeForm.reset();
  }

  getcontrol(name:any): AbstractControl |null{
    return this.employeeForm.get(name)
  }

  get validate(){
    return this.employeeForm.controls;
  }

  showEmployee(){
    this.api.getEmployee().subscribe(res => {
      this.employeeData = res;
    })
  }

  EditEmployee(data:any){
    this.employeeForm.patchValue({
      fullname: data.fullname,
      phone:data.phone,
      email:data.email,
      dob:data.dob,
      designation:data.designation,
      gender:data.gender,
      password:data.password,
      confirmpassword:data.confirmpassword
    })
    this.employeeobj.id = data.id;
    this.UpdateShowBtn();
  }

  UpdateEmployee(){
    this.api.putEmployee(this.employeeForm.value,this.employeeobj.id).subscribe(res => {
      alert("Data Successfully Updated");
      this.showEmployee();
      this.SaveShowBtn();
    })


  }


  DeleteEmployee(data:any){
    this.api.deleteEmployee(data.id).subscribe(res => {
      alert("Record Deleted");
      this.showEmployee();
    })

  }

  UpdateShowBtn()
  {
    this.btnUpdate = true;
    this.btnSubmit = false;
  }
  SaveShowBtn()
  {
    this.btnUpdate = false;
    this.btnSubmit = true;
  }



}
