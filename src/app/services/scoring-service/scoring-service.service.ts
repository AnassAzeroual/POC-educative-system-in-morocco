import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "../LocalStorage/local-storage.service";
import { ProfileService } from "../profile-service/profile.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ScoringService {
  private url = "";
  private score_message: BehaviorSubject<string> = new BehaviorSubject("");
  observer = this.score_message.asObservable();

  constructor(private profileService:ProfileService,private cookie:CookieService,private http: HttpClient,private session_storage: LocalStorageService) 
  {
   // this.getDataScores();
  }

 /* private getDataScores() {
    this.http
      .get(this.url)
      .subscribe(
        response =>
          this.session_storage.storeLocalStorage(response, "score-table"),
        error => console.error(error)
      );
  }*/

  updateScore(score_activity,score_profile) {

    let score_counting = parseInt(score_profile) + parseInt(score_activity);
    this.score_message.next(score_counting.toString());
    if(this.session_storage.getLocalStorage("profile")){
      let profile=this.session_storage.getLocalStorage("profile");
      profile["score"]=score_counting.toString();
      this.session_storage.storeLocalStorage(profile,"profile");
      this.cookie.set('score',score_counting.toString());
    }
    console.log(score_profile)
    console.log(score_activity)

    console.log(score_counting)
    console.log(this.score_message)

    /*let body = {};
    this.http.put(this.url, body).catch((error: Response) => {
      if (error.status === 404)
        return throwError(new AppNotFoundException(error));
      else return throwError(new AppError());
    });*/
  }

  minus_score(score_activity,score_profile){
    let score_counting = parseInt(score_profile) - parseInt(score_activity);
    this.score_message.next(score_counting.toString());
    if(this.session_storage.getLocalStorage("profile")){
      let profile=this.session_storage.getLocalStorage("profile");
      profile["score"]=score_counting.toString();
      this.session_storage.storeLocalStorage(profile,"profile");
      this.cookie.set('score',score_counting.toString());
    }
  }
}
