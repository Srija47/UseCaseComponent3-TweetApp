import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import { TweetappService } from './Services/tweetapp.service';
import { UserLandingPageComponent } from './user/user-landing-page/user-landing-page.component';
import { PosttweetComponent } from './user/posttweet/posttweet.component';
import { SearchtweetComponent } from './user/searchtweet/searchtweet.component';
import { ViewtweetsComponent } from './user/viewtweets/viewtweets.component';
import { ChangepasswordComponent } from './user/changepassword/changepassword.component';
import { ForgotpasswordComponent } from './user/forgotpassword/forgotpassword.component';
import { ViewprofileComponent } from './user/viewprofile/viewprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    UserLandingPageComponent,
    PosttweetComponent,
    SearchtweetComponent,
    ViewtweetsComponent,
    ChangepasswordComponent,
    ForgotpasswordComponent,
    ViewprofileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TweetappService],
  bootstrap: [AppComponent]
})
export class AppModule { }
