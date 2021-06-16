import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/Models/tweet';
import { User } from 'src/app/Models/user';
import { UserComment } from 'src/app/Models/user-comment';
import { UserTweets } from 'src/app/Models/user-tweets';
import { TweetappService } from 'src/app/Services/tweetapp.service';


@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css'],
})
export class ViewprofileComponent implements OnInit {
  username:string;
  todaysDateTime:'';
today= new Date();
  id:number;
  commentslist:UserComment[];
  user:User;
  count:Tweet;
  date:string;
  tweetslist:UserTweets[]=[];
  clickedButton : {[key: number] : boolean} ={};
  form:FormGroup
  uname:string
    constructor(private formBuilder:FormBuilder,private route:Router,private service:TweetappService) {
      this.Profile();
    }
  
    ngOnInit() {
      this.form = this.formBuilder.group({
        username:[''],
        comment:['']
      })
    }
    isCommentClicked(index : number){
      console.log(index);
      if(this.clickedButton[index]==false){
      this.clickedButton[index] = true;
    }
      else
      this.clickedButton[index] = false;
    }
    Profile()
    {
      this.id = Number(localStorage.getItem('UserId') || '{}') ;
      this.username = String(localStorage.getItem('Username') || '{}');
      this.service.GetUserProfile(this.username).subscribe(res=>
        {
          this.user=res;
          console.log(this.user);
        },
        err=>{
          console.log(err);
        }
        )
      if(String(localStorage.getItem('Username') || '{}')!=null){
        let username=String(localStorage.getItem('Username'));
      this.service.GetTweetsByUser(username).subscribe(res=>{
        this.tweetslist=res;
        this.tweetslist.forEach(element => {
          this.date=formatDate(this.today,'yyyy/MM/dd','en-US', '+0530')
      localStorage.setItem("Tweetss",element.tweets);
      localStorage.setItem("UserNames",element.userName);
      localStorage.setItem("Imagenames",element.imagename);
      localStorage.setItem("FirstNames",element.firstName);
      localStorage.setItem("LastNames",element.lastName);
      localStorage.setItem("tweetDates",element.tweetDate.toString());
      var created_date=localStorage.getItem('tweetDates');
      var text=this.GetTime(created_date);
      element.datecalculated=String(localStorage.getItem('datecalculated'))
      console.log(element.datecalculated);
         });

     
        console.log(this.tweetslist);
      })
    }
    else
    {
      console.log("Please Login With Credentials...");
    }
  }
    Comments(item:UserTweets)
    {
    this.service.GetAllComments(this.username, item.tweets).subscribe(res=>{
      this.commentslist=res;
      console.log(this.commentslist);
      this.Profile();
    })
  }
  PostComments(item:UserTweets)
  {
    let comment = this.form.value['comment']
    this.service.PostComment(comment,this.username,item.userName, item.tweets).subscribe(res=>{
    alert("replies")
    this.Profile();
  console.log(res)
    },
    err=>{
      alert("Failed")
    });
}
GetLikes(item:UserTweets)
{
  this.count=new Tweet();
  this.service.GetLikes(this.username, item.tweets).subscribe(res=>{
    this.count.likes=res;
    this.Profile();
    console.log(this.count);
  },err=>{
    console.log(err)
  })
}

    Search()
  {
     this.uname = this.form.value["username"]
    localStorage.setItem("uname", this.uname);
    this.Profile();
    this.route.navigateByUrl('/SEARCH TWEET');
  }
  
GetTime(created_date:any)
{
  function getDateDiff(startDate:Date, endDate:Date) {
    var diff = Math.abs(endDate.getTime() - startDate.getTime());
    var days = Math.floor(Math.abs(diff / (60 * 60 * 24 * 1000)));
    var hours = Math.floor(Math.abs(diff / (60 * 60 * 1000)) - (days * 24));
    var minutes = Math.floor(Math.abs(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60)));
    var seconds = Math.floor(Math.abs(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60)));
    
    if(days==0)
    {
      return hours+"h"
    }
    else if(hours==0)
    {
      return minutes+"min"
    }
    else if(minutes==0)
    {
      return seconds+"sec"
    }
    else{
      return days+"days"
    }
    //return { day: days, hour: hours, minute: minutes, second: seconds };
}
var diff = getDateDiff(new Date(created_date),new Date(this.date));
localStorage.setItem("datecalculated",diff);
}

  Delete(item:UserTweets)
    {
      this.service.DeleteTweet(this.username,item.tweets).subscribe(res=>{
        console.log('Deleted');
        alert('Deleted');
        this.Profile();
      })
     
    }
    Logout(){
      localStorage.clear();
      this.route.navigateByUrl('/HOME');
    }
  }
  