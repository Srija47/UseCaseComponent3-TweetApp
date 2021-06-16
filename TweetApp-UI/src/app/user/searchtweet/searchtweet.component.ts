import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/Models/tweet';
import { User } from 'src/app/Models/user';
import { TweetappService } from 'src/app/Services/tweetapp.service';


@Component({
  selector: 'app-searchtweet',
  templateUrl: './searchtweet.component.html',
  styleUrls: ['./searchtweet.component.css']
})
export class SearchtweetComponent implements OnInit {
form:FormGroup;
user:User;
count:Tweet;
list:Tweet[];
clickedButton : {[key: number] : boolean} ={};
result:number;
username:string;
uname:string;
  constructor(private frombuilder:FormBuilder,private service:TweetappService,private route:Router) {
    this.GetUserProfile();
   }

  ngOnInit(){
    this.form = this.frombuilder.group({
      username:['']
    })
  }

  GetUserProfile()
  {
    this.username = localStorage.getItem("uname")!
    this.service.GetUserProfile(this.username).subscribe(res=>
      {
        
       this.user=res;
       localStorage.setItem("name",this.user.username);
        console.log(this.user);
        this.UserTweets();
      },
      err=>{
        console.log(err);
      }
      )
  }
  isCommentClicked(index : number){
    console.log(index);
    if(this.clickedButton[index]==false){
    this.clickedButton[index] = true;
  }
    else
    this.clickedButton[index] = false;
  }
  UserTweets()
  {
    //let username = String(localStorage.getItem('name'))
    this.service.GetTweetsByUser(this.username).subscribe(res=>{
      this.list=res;
      console.log(this.list);
    },err=>{
      console.log(err)
    })
  }
  GetLikes(tweet:Tweet)
{
  this.count=new Tweet();
  this.service.GetLikes(this.username, tweet.tweets).subscribe(res=>{
    this.count.likes=res;
    console.log(this.count);
  },err=>{
    console.log(err)
  })
}
  Comments(tweet:Tweet)
  {
    this.service.GetAllComments(this.username, tweet.tweets).subscribe(res=>{
      this.list=res;
      console.log(this.list);
    })
  }
  PostComments(tweet:Tweet)
  {
    let comment = this.form.value['comment']
    this.service.PostComment(comment,this.username,tweet.username, tweet.tweets).subscribe(res=>{console.log(this.result)
    if(this.result > 0)
    {
  console.log(this.result)
  this.route.navigateByUrl('SEARCHTWEET')
    }
    else{
      alert("Failed")
      this.onReset();
    }
  });
}
Search()
  {
     this.uname = this.form.value["username"]
    localStorage.setItem("uname", this.uname);
    this.GetUserProfile();
  }
onReset()
{
  this.form.reset();
}
Logout(){
  localStorage.clear();
  this.route.navigateByUrl('/home');
}
}
