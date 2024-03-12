import { Component, OnInit, DoCheck} from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import { HttpClient } from '@angular/common/http';

declare var $:any;

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css']
})
export class ClassementComponent implements OnInit,DoCheck {

  constructor(private http: HttpClient, private localStorageService:LocalStorageService,private router: Router) { }
  
  profile=[];
  users=[];
  loginUser;
  classUser;
  showfirstbutton;
  textfirstclass="";

  ngDoCheck(){
    let elem=document.getElementById(this.loginUser);
    if(elem!=undefined){
      elem.style.backgroundColor = 'greenyellow';
    }
  }

  ngOnInit() {
    let local=this.localStorageService;
    this.showfirstbutton=true;
    /*check session*/ 
    const req = this.http.post('../../../sessions/read.php', null)
      .subscribe(
        (response: any[]) => {
          this.loginUser=response["login_user"];
          this.classUser=response["id_classe"];
          this.getProfileByUserId(response["id_user"],local); 
          this.getScoreByClasseUser(this.classUser);
        },
        err => {
          this.localStorageService.destructSession();
          this.router.navigateByUrl('/');
        }
      );
  }

  focusOnThisUser(login_user){
   $(document).ready(function(){
    $("#"+login_user).addClass("focususer");
   });
  }

  getProfileByUserId(userId,local){
    // get user profile
    let key= 'profile';
    if(local.getLocalStorage(key)){
      this.profile=local.getLocalStorage(key);
    }else{
      const reqLogin = this.http.post('../../../api/user/read', {"param":userId})
        .subscribe(
          (response: any[]) => {
            local.storeLocalStorage(response["user_information"][0],key);
            this.profile = response["user_information"][0];
          },
          error => {
            console.log(error);
          }
        );
    }
  }

  getScoreByClasseUser(classUser){
        const reqLogin = this.http.post('../../../api/classement/ranking', {"param":classUser})
          .subscribe(
            (response: any[]) => {
              let key;
              let users=[];
              let filtredUsers=[];
              let numberClassUser;
              for (key in response["ranking_information"][0]) {
                users.push(response["ranking_information"][0][key]);
              }

              for(let i=0;i<users.length;i++){
                if(users[i][0]['login_user']==this.loginUser){
                  numberClassUser=i;
               }
              }

              //filter first 10 before and 10 after user
              if(numberClassUser<=10){
                for(let i=0;i<=numberClassUser;i++){
                  filtredUsers.push(users[i]);
                }
                for(let i=numberClassUser+1;i<numberClassUser+11;i++){
                  filtredUsers.push(users[i]);
                }
              }else{
                for(let i=numberClassUser-10;i<=numberClassUser;i++){
                  filtredUsers.push(users[i]);
                }
                for(let i=numberClassUser+1;i<numberClassUser+11;i++){
                  filtredUsers.push(users[i]);
                }
              }

              this.users=filtredUsers;

              console.log(filtredUsers)
              this.focusOnThisUser(this.loginUser);
            },
            error => {
              console.log(error);
            }
          ); 
  }

  getFirstClass(){
    $('document').ready(function(){
      $('th').addClass('firstcolor');
    })
    this.textfirstclass="الاوائل";
    this.showfirstbutton=false;
    let users=[];
    for(let i =0 ; i<10; i++){
       users.push(this.users[i]);
    }
    this.users=users;
  }

  return(){
    $('document').ready(function(){
      $('th').removeClass('firstcolor');
    })
    this.textfirstclass="";
    this.showfirstbutton=true;
    this.getScoreByClasseUser(this.classUser);
  }

}
