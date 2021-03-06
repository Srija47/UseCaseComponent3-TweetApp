import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { Guardservice } from './Services/guardservice.service';
import { ChangepasswordComponent } from './user/changepassword/changepassword.component';
import { ForgotpasswordComponent } from './user/forgotpassword/forgotpassword.component';
import { PosttweetComponent } from './user/posttweet/posttweet.component';
import { SearchtweetComponent } from './user/searchtweet/searchtweet.component';
import { UserLandingPageComponent } from './user/user-landing-page/user-landing-page.component';
import { ViewprofileComponent } from './user/viewprofile/viewprofile.component';
import { ViewtweetsComponent } from './user/viewtweets/viewtweets.component';

const routes: Routes = [
  {path:'REGISTER',component:RegisterComponent},
  {path:'HOME',component:HomeComponent},
  {path:'USER',component:UserLandingPageComponent,canActivate:[Guardservice]},
    {path:'VIEW-TWEETS',component:ViewtweetsComponent,canActivate:[Guardservice]},
    {path:'POST TWEET',component:PosttweetComponent,canActivate:[Guardservice]},
    {path:'CHANGEPASSWORD',component:ChangepasswordComponent,canActivate:[Guardservice]},
    {path:'FORGOTPASSWORD',component:ForgotpasswordComponent},
    {path:'SEARCH TWEET',component:SearchtweetComponent,canActivate:[Guardservice]},
    {path:'VIEW PROFILE',component:ViewprofileComponent,canActivate:[Guardservice]},
  {path:'',redirectTo:'HOME',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
