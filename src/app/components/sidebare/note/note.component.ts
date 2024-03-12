import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ScoringService } from 'src/app/services/scoring-service/scoring-service.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  constructor(private scoringService:ScoringService,private http: HttpClient, private localStorageService:LocalStorageService,private router: Router) { }

  profile={};

  //@Output() Profile_change= new EventEmitter();

  ngOnInit() {
    let local=this.localStorageService;
    let key= 'profile';

    /*check session*/ 
    const req = this.http.post('../../../sessions/read.php', null)
      .subscribe(
        (response: any[]) => {
          this.getProfileByUserId(response["id_user"],local,key); 
        },
        err => {
          this.localStorageService.destructSession();
          this.router.navigateByUrl('/');
        }
      );
      //end
     this.updatescore();
  }

  updatescore(){
    this.scoringService.observer.subscribe(
      response => {
        console.log("hello")
        console.log(response)
        this.profile["score"]=response;
        //this.Profile_change.emit(this.profile);
        //this.profile["score"]=
        //this.getProfileByUserId(response["id_user"],local,key); 
      },
      err => {
        alert("noo")
        //this.localStorageService.destructSession();
        //this.router.navigateByUrl('/');
      }
    );
    //end
  }

  getProfileByUserId(userId,local,key){
    if(local.getLocalStorage(key)){
      this.profile=local.getLocalStorage(key);
     // this.Profile_change.emit(this.profile);
    }else{
      const reqLogin = this.http.post('../../../api/user/read', {"param":userId})
        .subscribe(
          (response) => {
            local.storeLocalStorage(response["user_information"][0],key);
            this.profile = response["user_information"][0];
            //this.updatescore();
          },
          error => {
            console.log(error);
          }
        );
    }
  }

}
