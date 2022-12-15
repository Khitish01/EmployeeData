import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';
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

  btnUpdate:boolean = false;

  btnSubmit:boolean = true;


  constructor(private formBuilder:FormBuilder, private api:ApiService ) {
    this.employeeForm = this.formBuilder.group({
      fullname:['',[Validators.required,Validators.minLength(3)]],
      phone:['',Validators.required],
      email:['',Validators.required],
      dob:['',Validators.required],
      designation:['',Validators.required],
      gender:['',Validators.required],
      password:['',Validators.required],
      confirmpassword:['',Validators.required]
    })
   }

  ngOnInit(): void {
    
    this.AllEmployee();
  }

  AddEmployee(){
    this.employeeobj.fullname = this.employeeForm.value.fullname;
    this.employeeobj.phone = this.employeeForm.value.phone;
    this.employeeobj.email = this.employeeForm.value.email;
    this.employeeobj.dob = this.employeeForm.value.dob;
    this.employeeobj.designation = this.employeeForm.value.designation;
    this.employeeobj.gender = this.employeeForm.value.gender;
    this.employeeobj.password = this.employeeForm.value.password;
    this.employeeobj.confirmpassword = this.employeeForm.value.confirmpassword;

    this.api.postEmployee(this.employeeobj).subscribe({ next: (res) => {
      console.log(res);
    },
    error: (err) => {
      alert("Error!!")
      console.log(err)
    },
    complete: () => {
      console.log('complete')
      alert("Data Successfully Saved")
      this.AllEmployee();
      this.employeeForm.reset();
    } })

  }

  get validate(){
    return this.employeeForm.controls
  }

  AllEmployee(){
    this.api.getEmployee().subscribe(res => {
      this.employeeData = res;
    })
  }

  EditEmployee(data:any){
    this.employeeForm.controls['fullname'].setValue(data.fullname);
    this.employeeForm.controls['phone'].setValue(data.phone);
    this.employeeForm.controls['email'].setValue(data.email);
    this.employeeForm.controls['dob'].setValue(data.dob);
    this.employeeForm.controls['designation'].setValue(data.designation);
    this.employeeForm.controls['gender'].setValue(data.gender);
    this.employeeForm.controls['password'].setValue(data.password);
    this.employeeForm.controls['confirmpassword'].setValue(data.confirmpassword);
    this.employeeobj.id = data.id;
    this.UpdateShowBtn();
  }

  UpdateEmployee(){
    this.employeeobj.fullname = this.employeeForm.value.fullname;
    this.employeeobj.phone = this.employeeForm.value.phone;
    this.employeeobj.email = this.employeeForm.value.email;
    this.employeeobj.dob = this.employeeForm.value.dob;
    this.employeeobj.designation = this.employeeForm.value.designation;
    this.employeeobj.gender = this.employeeForm.value.gender;
    this.employeeobj.password = this.employeeForm.value.password;
    this.employeeobj.confirmpassword = this.employeeForm.value.confirmpassword;
    this.api.putEmployee(this.employeeobj,this.employeeobj.id).subscribe(res => {
      alert("Data Successfully Updated");
      this.AllEmployee();
      this.SaveShowBtn();
    })


  }


  DeleteEmployee(data:any){
    this.api.deleteEmployee(data.id).subscribe(res => {
      alert("Record Deleted");
      this.AllEmployee();
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
