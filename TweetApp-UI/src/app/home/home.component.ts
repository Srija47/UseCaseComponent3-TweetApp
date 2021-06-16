import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from '../Models/token';
import { User } from '../Models/user';
import { TweetappService } from '../Services/tweetapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:User;
  submitted=false;
  token:Token;
  userForm:FormGroup;
  form:FormGroup;
  message:string;
  constructor(private frombuilder:FormBuilder,private service:TweetappService,private route:Router) { }

  ngOnInit() {
    this.userForm=this.frombuilder.group({
      emailid:['',Validators.required],
      password:['',[Validators.required,Validators.pattern("^[A-Za-z]{7,}[!@#$%^&*]")]],
    }),
    this.form=this.frombuilder.group({
      emailid:['',Validators.required],
      password:['',Validators.required],
      confirmpassword:['',Validators.required]
    },{ 
      validator : this.ConfirmedValidator('password', 'confirmpassword')
    });
  }
  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
    forgot()
    {
      this.user=new User();
      this.user.emailId=this.form.value["emailid"],
      this.user.password=this.form.value["password"],
      this.service.ForgotPassword(this.user.emailId, this.user.password).subscribe(res=>{console.log(this.message),alert("updated succesfully"), this.route.navigateByUrl('HOME')},err=>{
        console.log(err)
      })
    }

  onSubmitLogin(){
    this.submitted=true;
      
    if(this.userForm.invalid){
     return;
    }
      else {
        this.user=new User();
        this.token = new Token();
        let emailid=this.userForm.value['emailid']
        let password=this.userForm.value['password']
      console.log(this.user)
      this.service.Login(emailid,password).subscribe(res=>{this.token=res,console.log(this.token)
      });
      }
    }
     public Validate()
      {
        let emailid=this.userForm.value['emailid']
        let password=this.userForm.value['password']
          let token=new Token()
          this.service.Login(emailid,password).subscribe(res=>{this.token=res,console.log(this.token)
            if(this.token.message=="Success")
            {
              alert("welcome")
       console.log(this.token)
          localStorage.setItem("token",this.token.tokens);
          localStorage.setItem("UserId",this.token.userId.toString());
          localStorage.setItem("Username",this.token.username.toString());
          this.route.navigateByUrl('USER')
            }
            else{
              alert("invalid username or password")
              this.onReset();
            }
        });
      }
    get f(){return this.userForm.controls;}
    onReset()
    {
      this.submitted=false;
      this.userForm.reset();
    }
}