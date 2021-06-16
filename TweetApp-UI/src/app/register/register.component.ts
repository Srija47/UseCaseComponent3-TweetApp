import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { TweetappService } from '../Services/tweetapp.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  list:User[]=[];
  user:User;
  submitted=false;
  userForm:FormGroup;
  img:string;
  selectedFile : File;
  message:string;
  constructor(private frombuilder:FormBuilder,private service:TweetappService,private route:Router) { }

  ngOnInit() {
    this.userForm=this.frombuilder.group({
      firstname:['',[Validators.required,Validators.pattern("^[A-Za-z]{0,}$")]],
      username:['',Validators.required],
      emailid:['',Validators.required],
      password:['',[Validators.required,Validators.pattern("^[A-Za-z]{7,}[!@#$%^&*]")]],
      confirmpassword:['',Validators.required],
      contactnumber:['',[Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]],
      lastname:[''],
      imagename:['',Validators.required],
      validator: ConfirmPasswordValidator("password", "confirmPassword")});
  }
  onSubmitUser(){
    this.submitted=true;
    if(this.userForm.invalid){
     return;
    }
      else{
        this.user=new User();
      this.user.firstName=this.userForm.value["firstname"];
      this.user.lastName=this.userForm.value["lastname"];
      this.user.username=this.userForm.value["username"];
      this.user.contactNumber=this.userForm.value["contactnumber"];
      this.user.emailId=this.userForm.value["emailid"];
      this.user.password=this.userForm.value["password"];
      this.user.imageName=this.userForm.value["imagename"];
      console.log(this.user)
     this.service.Register(this.user).subscribe(res=>{
        alert("Successfully registered");
        console.log(res);
        this.route.navigateByUrl('HOME');
      },
      err=>{
        alert("Failed to Register! Try again")
        console.log(err);
        this.onReset();
      }
  );
      }
    }
    get f(){return this.userForm.controls;}
    onReset()
    {
      this.submitted=false;
      this.userForm.reset();
    }
    fileEvent(event :any){
      this.img= event.target.files[0].name;
    }
}

