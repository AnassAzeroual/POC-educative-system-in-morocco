import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import { ScoringService } from 'src/app/services/scoring-service/scoring-service.service';

declare var $:any;
@Component({
  selector: 'app-cours-video',
  templateUrl: './cours-video.component.html',
  styleUrls: ['./cours-video.component.css']
})
export class CoursVideoComponent implements OnInit,AfterViewInit {
  
  coursVideosTitle: string;
  questions: string[];
  video: string;
  videoFunctions: string;
  @ViewChild('iframe') iframe:ElementRef;

  constructor(public sanitizer: DomSanitizer,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService:LocalStorageService,
    private domSanitizer : DomSanitizer,
    private scoringService:ScoringService) { 
      this.video = "https://www.youtube.com/embed/HndV87XpkWg"
      this.video +="?enablejsapi=1&version=3&playerapiid=ytplayer";
  }

   //parameters
   chemin;
   blocCode=[];

   ngAfterViewInit() {
    this.iframe.nativeElement.style.height=this.iframe.nativeElement.contentWindow.document.body.scrollHeight+20 + 'px';
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

    this.checkSession();
    this.findexosById(local,name,id);

    $('#corrig_video').addClass('display--none');
    $('#exer_solution').addClass('display--none');
 
  }

    //function find cours
  findexosById(local,name,id){
      let chemin;let blocs;
      let coursVideosTitle;
      if(local.getLocalStorage(name)){
        local.getLocalStorage(name).forEach(function(value,key){  
          if(value["code_arbo"]==id){
            chemin =value["chemin_arbo"];
            if ( chemin == "" || chemin == null || chemin == undefined) {
              console.log(chemin);
              chemin="./assets/files/404-Page.html";
            }else{
              chemin = "https://www.youtube.com/embed/HndV87XpkWg";
              chemin +="?enablejsapi=1&version=3&playerapiid=ytplayer";
              coursVideosTitle=value["libelle_objet"];
            }
          }
        });
        console.log(chemin)
        this.chemin=this.domSanitizer.bypassSecurityTrustResourceUrl(chemin);
        this.coursVideosTitle=coursVideosTitle;
      }else{
        this.localStorageService.destructSession();
        this.router.navigateByUrl('/');
      }
  }

    //function check session
    checkSession(){
      this.http.post('../../../sessions/read.php', null)
              .subscribe(
                (res: any[]) => {
                },
                err => {
                  this.localStorageService.destructSession();
                  this.router.navigateByUrl('/');
                }
             );
    }



}
