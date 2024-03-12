import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import { ScoringService } from 'src/app/services/scoring-service/scoring-service.service';

declare var $:any;
@Component({
  selector: 'app-exercice-video',
  templateUrl: './exercice-video.component.html',
  styleUrls: ['./exercice-video.component.css']
})
export class ExerciceVideoComponent implements OnInit,AfterViewInit {
  
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
   chemin_exercice;
   chemin_corrige;
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
      let chemin_exercice;let chemin_corrige;let blocs;
      let coursVideosTitle;
      if(local.getLocalStorage(name)){
        local.getLocalStorage(name).forEach(function(value,key){  
          if(value["code_arbo"]==id){
            chemin_exercice = value["chemin_arbo"];
            chemin_corrige  = value["chemin_arbo"];
            if ( chemin_exercice == "" || chemin_exercice == null || chemin_exercice == undefined) {
              // console.log(chemin_exercice);
              chemin_exercice="./assets/files/404-Page.html";
              chemin_corrige="./assets/files/404-Page.html";
            }else{
              chemin_exercice ='../../../../../'+ chemin_exercice +'exercice.html';
              chemin_corrige  ='../../../../../'+ chemin_corrige  +'corrige.html';
              coursVideosTitle=value["libelle_objet"];
              // console.log('chemin_corrige !!!!!!!!!!!');
              // console.log(chemin_corrige);
            }
          }
        });
        // console.log(chemin_exercice)
        this.chemin_exercice = this.domSanitizer.bypassSecurityTrustResourceUrl(chemin_exercice);
        this.chemin_corrige  = this.domSanitizer.bypassSecurityTrustResourceUrl(chemin_corrige);
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

  fuc_watch_corrige(){
      $( "#corrig_video" ).slideToggle( "slow", function() {
        // stop video au debut
        $('#btn_cours_corrige').text(function(y, x){
          return x === 'إخفاء التصحيح بالفيديو' ? 'إظهار التصحيح بالفيديو' : 'إخفاء التصحيح بالفيديو'
       });
       //$('#iframeCoureVideo')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
      });
  }
  fuc_show_solution(){
    
    $( "#exer_solution" ).slideToggle( "slow", function() {
      // Animation complete.
      $('#btn_show_solution').text(function(i, v){
        return v === 'إخفاء الحل' ? 'إظهار الحل' : 'إخفاء الحل'
     })
    });
}

}
