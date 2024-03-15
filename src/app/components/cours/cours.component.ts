import { Component, OnInit, DoCheck,ViewChild,ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import {DomSanitizer} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ScoringService } from 'src/app/services/scoring-service/scoring-service.service';
import { ActivityService } from 'src/app/services/activity-service/activity.service';
import { NotifierService } from 'angular-notifier';
import { CookieService } from 'ngx-cookie-service';
import { FooterComponent } from '../ui/footer/footer.component';
import { BoxSidebarComponent } from '../box-sidebar/box-sidebar.component';
import { NgIf } from '@angular/common';
import { BoutonHomeComponent } from '../ui/bouton-home/bouton-home.component';
import { NavbarComponent } from '../ui/navbar/navbar.component';

declare var $: any;
@Component({
    selector: 'app-cours',
    templateUrl: './cours.component.html',
    styleUrls: ['./cours.component.css'],
    standalone: true,
    imports: [NavbarComponent, BoutonHomeComponent, NgIf, BoxSidebarComponent, FooterComponent]
})
export class CoursComponent implements OnInit,AfterViewInit {

  @ViewChild('iframe') iframe:ElementRef;
  private readonly notifier: NotifierService;

  constructor(public sanitizer: DomSanitizer,
     private http: HttpClient,
     private router: Router,
     private route: ActivatedRoute,
     private notifierService: NotifierService ,
    private localStorageService:LocalStorageService,
    private domSanitizer : DomSanitizer,
    private scoringService:ScoringService,
    private activityService:ActivityService,
    private cookie:CookieService,
     )
     {    this.notifier = notifierService;
     }

  //parameters
  chemin;
  fileNotFound;
  blocCode=[];
  userID;
  idClasse;
  

  ngAfterViewInit() {
    this.iframe.nativeElement.style.height=this.iframe.nativeElement.contentWindow.document.body.scrollHeight+20 + 'px';
  }

  print(){
    this.iframe.nativeElement.contentWindow.print();
  }

  ngOnInit() {
    let local=this.localStorageService;
    let id;
    let name;
    //this.scoringService.updateScore("10","56");

     this.route.fragment.subscribe(
       (fragments) => {
        let routesTable=fragments.split("/");
        name=routesTable[0];
        id=routesTable[routesTable.length-1];

        for(let i=0;i<routesTable.length-1;i++){
          this.blocCode.push({"libelle_objet":routesTable[i]});
        }
      }
    );
    this.fileNotFound=0;
    this.checkSession(local,name,id);
    //this.fuc_check_chemin('');
  }

  showSubBloc(event){
    let routefragment="";
    for(let i=0;i<=this.blocCode.length-1;i++){
      if(this.blocCode[i]["libelle_objet"]==event["libelle_objet"]){
        routefragment=routefragment+this.blocCode[i]["libelle_objet"];
        this.router.navigateByUrl('/blocs#'+routefragment);
        return false;
      }else{
          routefragment=routefragment+this.blocCode[i]["libelle_objet"]+'/';
      }
    }
    //routefragment=routefragment+this.blocCode[this.blocCode.length-1];
  }

  fuc_check_chemin(chemins){
    if ( chemins == "" || chemins == null || chemins == undefined) {
      //this.chemin = "./assets/files/404-Page.html";
      return false;
    }
  }

  //function find cours
  findCoursById(local,name,id){
    let chemin;let blocs;
    if(local.getLocalStorage(name)){
      for(var i=0;i<local.getLocalStorage(name).length;i++){
        let value=local.getLocalStorage(name)[i];
        console.log(value)
        if(value["code_arbo"]==id){
          chemin =value["chemin_arbo"];
          if ( chemin == "" || chemin == null || chemin == undefined) {
            console.log(chemin);

            chemin="./assets/files/404-Page.html";
          }else{
            chemin='../../../../../'+chemin+'cours.html';
            let matiere=local.getLocalStorage('mat').find(element=> element.libelle_objet === name);
            console.log(matiere)
            let sentData={
              "id_classe":this.idClasse,
              "id_arbo":value["id_arbo"],
              "id_user":this.userID,
              "id_matiere":matiere.id_objet,
              "type_activite":"VICO",
              "score_activite":"10",
              "id_cours":value["id_objet"]
            }
            console.log(sentData)
            this.activityService.sendActivity('../../../../../api/activite/insert_vico',sentData).subscribe(
              res=>{
               let profile=[];
                profile["score"]=this.cookie.get('score');
                this.scoringService.updateScore(sentData["score_activite"],profile["score"]);
                this.notifier.notify( 'info', '+ 10 نقطة' );
              },
              err=>{
                alert("wrong")
              }
            )
          }
        }
      }
      console.log(chemin)
      this.chemin=this.domSanitizer.bypassSecurityTrustResourceUrl(chemin);
    }else{
      this.localStorageService.destructSession();
      this.router.navigateByUrl('/');
    }
  }

  el: HTMLFrameElement;

  resizeIframe(ev:Event) {
    console.log(ev)
    //ev.style.height = ev.contentWindow.document.body.scrollHeight + 'px';
  }

  //function check session
  checkSession(local,name,id){
    this.http.post('../../../sessions/read.php', null)
            .subscribe(
              (res: any[]) => {
                this.userID=res["id_user"];
                this.idClasse=res["id_classe"];
                this.findCoursById(local,name,id);
              },
              err => {
                this.localStorageService.destructSession();
                this.router.navigateByUrl('/');
              }
           );
  }

error(){
  this.fileNotFound=1;
} 

errorHandler(event) {
  console.debug(event);
  this.fileNotFound=1;
  event.target.src = "https://cdn.browshot.com/static/images/not-found.png";
}

}
