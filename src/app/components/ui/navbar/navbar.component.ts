import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import { ScoringService } from 'src/app/services/scoring-service/scoring-service.service';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var $: any;

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: true,
    imports: [FormsModule, RouterLink, NgStyle]
})
export class NavbarComponent implements OnInit {

  @Input() profile;
  constructor(private scoringService: ScoringService, private http: HttpClient, private localStorageService: LocalStorageService, private router: Router) { }

  result;
  userId;
  idClass;

  ngOnInit() {

    this.result = {
      nombre_quiz_reponses_fausses: 8,
      nombre_quiz_reponses_justes: "5",
      nombre_quiz_total: "13",
      nombre_quiz_traités: "13",
      note_noeud: 8,
      pourcentage_reponses_fausses: 62,
      pourcentage_reponses_justes: 38,
    }

    let local = this.localStorageService;
    let key = 'profile';
    //hover on navbar 
    this.onHover();

    /*check session*/
    const req = this.http.post('../../../sessions/read.php', null)
      .subscribe(
        (response: any[]) => {
          this.userId = response["id_user"];
          this.idClass = response["id_classe"]
          this.getProfileByUserId(response["id_user"], local, key);
          this.getQuiz(response["chemin_classe"]);
        },
        err => {
          this.localStorageService.destructSession();
          this.router.navigateByUrl('/');
        }
      );
    //end
  }

  onHover() {
    $('.dmenu').hover(function () {
      $(this).find('.sm-menu').first().slideDown(500);
    }, function () {
      $(this).find('.sm-menu').first().stop(true, true).slideUp(300)
    });
  }

  getQuiz(chemin) {
    let senddata = { "param": chemin, "id_user": this.userId };
    console.log(senddata)
    this.http.post('../../../api/arbo/node_quiz', senddata)
      .subscribe(
        (response: any) => {
          console.log(response)
          this.result = response["informations_des_quiz_du_noeud"];

        }
        ,
        err => { }

      )
  }

  getprogress(pourcentage) {
    return pourcentage + '%';
  }

  destroyAllLogout() {
    const reqLogin = this.http.post('../../../../sessions/destroy.php', null)
      .subscribe(
        (response: any[]) => {
          this.insert_to_histo();
          this.localStorageService.destructSession();
        },
        error => {
          this.localStorageService.destructSession();
          this.router.navigateByUrl('/');
        }
      );
  }

  insert_to_histo() {
    let sentdata = {
      "p1": this.userId,
      "p2": "DECO",
      "p3": "5",//to be updated
      "p4": "web",
      "p5": this.idClass
    }
    console.log(sentdata)
    this.http.put('../../../api/activite/insert_conn', sentdata)
      .subscribe(
        (response: any[]) => {
          console.log(response);
          this.router.navigateByUrl('/');
          //this.scoringService.updateScore(sentdata["p3"],this.profile["score"]);
        },
        err => {
          this.router.navigateByUrl('/');
          alert(err['message']);
        });
  }

  getProfileByUserId(userId, local, key) {
    if (local.getLocalStorage(key)) {
      this.profile = local.getLocalStorage(key);
    } else {
      const reqLogin = this.http.post('../../../api/user/read', { "param": userId })
        .subscribe(
          (response: any[]) => {
            local.storeLocalStorage(response["user_information"][0], key);
            this.profile = response["user_information"][0];
          },
          error => {
            this.profile = [];
            /*{
              "message": "No user found.",
              "error_code": "404"
            }*/
          }
        );
    }
  }

}
