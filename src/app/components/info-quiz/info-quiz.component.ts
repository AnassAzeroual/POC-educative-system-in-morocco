import { Component, OnInit, DoCheck,ViewChild,ElementRef, OnChanges, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators" // RxJS v6
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import { QuizServiceService } from 'src/app/services/quizService/quiz-service.service';
import { NotifierService } from 'angular-notifier';
import { ScoringService } from 'src/app/services/scoring-service/scoring-service.service';
import { CookieService } from 'ngx-cookie-service';
import { FooterComponent } from '../ui/footer/footer.component';
import { BoxSidebarComponent } from '../box-sidebar/box-sidebar.component';
import { NgIf } from '@angular/common';
import { BoutonHomeComponent } from '../ui/bouton-home/bouton-home.component';
import { NavbarComponent } from '../ui/navbar/navbar.component';

declare var $:any;
@Component({
    selector: 'app-info-quiz',
    templateUrl: './info-quiz.component.html',
    styleUrls: ['./info-quiz.component.css'],
    standalone: true,
    imports: [NavbarComponent, BoutonHomeComponent, NgIf, BoxSidebarComponent, FooterComponent]
})
export class InfoQuizComponent implements OnInit,OnChanges,DoCheck,AfterViewInit {

  private readonly notifier: NotifierService;

  private quest: ElementRef;
  private opt1: ElementRef;
  private opt2: ElementRef;
  private opt3: ElementRef;
  private co1: ElementRef;
  private co2: ElementRef;
  private co3: ElementRef;

  @ViewChildren('iframe') iframecontent:QueryList<ElementRef>;
  @ViewChild('quest') set content(content: ElementRef) {
     this.quest = content;
     console.log(this.quest)
  }
  /*@ViewChild('opt1') set content1(content1: ElementRef) {
    this.opt1 = content1;
    console.log(this.opt1)
 }
 @ViewChild('opt2') set content2(content2: ElementRef) {
  this.opt2 = content2;
  console.log(this.opt2)
 }
 @ViewChild('opt3') set content3(content3: ElementRef) {
  this.opt3 = content3;
  console.log(this.opt3)
}
@ViewChild('co1') set content4(content4: ElementRef) {
  this.co1 = content4;
  console.log(this.co1)
}
@ViewChild('co2') set content5(content5: ElementRef) {
  this.co2 = content5;
  console.log(this.co2)
}
@ViewChild('co3') set content6(content6: ElementRef) {
  this.co3 = content6;
  console.log(this.co3)
}*/

  constructor(private scoringService:ScoringService,
    private cookie:CookieService,
    private domsanitizer : DomSanitizer,
    private notifierService: NotifierService ,
    private router: Router,
    private domSanitizer : DomSanitizer,
    private http: HttpClient,
    private route: ActivatedRoute,private localStorageService:LocalStorageService,private quizService:QuizServiceService) { 
    this.notifier = notifierService
    }

  id ;
  code :string;
  numberQuestions:number;
  numberQuestion;
  etatquiz;
  question;
  matiere;nosanitable;
  allquiz=[];
  quizchemin;
  quiz;option1;option2;option3;
  comv1;comf1;comv2;comf2;comv3;comf3;
  validopt1;validopt2;validopt3;c1;c2;c3;nn;
  nextboutton;pointreussi;alert;
  choisedrep;
  secondes = 0; 
  minutes = 0; 
  hours=0;
  on = false; 
  reset = false; 
  timerID;
  userID;
  firstdate;
  profile={};
  idClasse;

  ngAfterViewInit() {
    console.log(this.iframecontent.toArray())
    this.iframecontent.toArray().forEach(element => {
      console.log(element.nativeElement.contentWindow.document.body.offsetHeight)
        element.nativeElement.style.height=element.nativeElement.contentWindow.document.body.offsetHeight-50+'px';
    });
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
   /* if(this.iframe!=undefined){
      this.iframe.nativeElement.style.height=this.iframe.nativeElement.contentWindow.document.body.scrollHeight+2+ 'px';
    }*/
  }

  ngOnChanges(){
if (this.quest != undefined) {
            console.log(this.quest);
            var el1 = this.quest.nativeElement.contentWindow.document.getElementsByTagName("body")[0];
        el1.style.direction = "rtl";
        el1.style.height = "30%";
        el1.style.overflow = 'hidden';
            console.log(this.quest.nativeElement.contentWindow);
            this.quest.nativeElement.style.height = this.quest.nativeElement.contentWindow.document.body.scrollHeight + 2 + 'px';
        }
       

  }
   
 ngDoCheck(){
  if (this.quest != undefined) {
    console.log(this.quest);
    var el1 = this.quest.nativeElement.contentWindow.document.getElementsByTagName("body")[0];
el1.style.direction = "rtl";
el1.style.height = "30%";
el1.style.overflow = 'hidden';
    console.log(this.quest.nativeElement.contentWindow);
    this.quest.nativeElement.style.height = this.quest.nativeElement.contentWindow.document.body.scrollHeight + 2 + 'px';
}

if (this.co1 != undefined) {
    var el5 = this.co1.nativeElement.contentWindow.document.getElementsByTagName("body")[0];
    el5.style.direction = "rtl";
    el5.style.height = "30%";
    el5.style.overflow = 'hidden';
    this.co1.nativeElement.style.height = 50+ 'px';
}
if (this.co2 != undefined) {
    var el6 = this.co2.nativeElement.contentWindow.document.getElementsByTagName("body")[0];
    el6.style.direction = "rtl";
    el6.style.height = "30%";
    el6.style.overflow = 'hidden';
    this.co2.nativeElement.style.height = 50 + 'px';
}
if (this.co3 != undefined) {
    var el7 = this.co3.nativeElement.contentWindow.document.getElementsByTagName("body")[0];
    el7.style.direction = "rtl";
    el7.style.height = "30%";
    el7.style.overflow = 'hidden';
    this.co3.nativeElement.style.height = 50 + 'px';
}
}
  ngOnInit() {

    /*this.quest.nativeElement.style.height=50+'px';
    this.opt1.nativeElement.style.height=50+'px';
    this.opt2.nativeElement.style.height=50+'px';
    this.opt3.nativeElement.style.height=50+'px';
    this.c1.nativeElement.style.height=50+'px';
    this.c2.nativeElement.style.height=50+'px';
    this.c3.nativeElement.style.height=50+'px';*/

    
    this.route.paramMap.subscribe(params => {
      this.etatquiz=params.get("id");
    });
    /*check session*/ 
    this.checkSession();
    this.nextboutton="السؤال التالي";
    this.id=0;
   
  }

  getQuiz(iduser){
// questions
   let local=this.localStorageService;
   let code;
   let cc;
   let question;
   let option1;
   let option2;
   let option3;
   let name1="option_1";
   let name2="option_2";
   let name3="option_3";
   let quizchemin;
   
   let chemin = this.quizService.getNoeud()["chemin_arbo"];

   let sentData={"param":chemin,
                 "uid":iduser
                 }

   const req = this.http.post('../../../../../api/quiz/read.php',sentData)
               .subscribe(
                 (res: any[]) => {
                   //this.allquiz=res;
                  console.log(res);
                  let table=[];
                  if(this.etatquiz=='0'){
                    table=res["quiz_information"];
                    this.allquiz=table;
                    this.numberQuestions=this.allquiz.length;
                  }
                  else if(this.etatquiz=='1'){
                    for(let i=0;i<res["quiz_information"].length;i++){
                      if(res["quiz_information"][i]["reponse_act_quiz"]=="1"){
                          table.push(res["quiz_information"][i]);
                      }
                    }
                  }
                  else if(this.etatquiz=='2'){
                    for(let i=0;i<res["quiz_information"].length;i++){
                      if(res["quiz_information"][i]["reponse_act_quiz"]=="0"){
                        table.push(res["quiz_information"][i]);
                      }
                    }
                  }
                  else if(this.etatquiz=='3'){
                    for(let i=0;i<res["quiz_information"].length;i++){
                      if(res["quiz_information"][i]["reponse_act_quiz"]==null){
                        table.push(res["quiz_information"][i]);
                      }
                    }
                  }
                  this.allquiz=table;
                  if(this.allquiz.length<10){
                    this.numberQuestions=this.allquiz.length;
                  }else{
                    this.numberQuestions=10;
                  }
                });
  }

  get_random_quiz(allquiz){
    let rand = allquiz[Math.floor(Math.random() * allquiz.length)];
    return rand;
  }

    
checkSession(){
  const req = this.http.post('../../../sessions/read.php', null)
          .subscribe(
            (res: any[]) => {
              console.log(res);
              this.userID=res["id_user"];
              this.idClasse=res["id_classe"];
              this.getQuiz(res["id_user"]);
            },
            err => {
              this.localStorageService.destructSession();
              this.router.navigateByUrl('/');
            }
         );
}


  choixrep(repid){

    if($('.rep').prop('disabled')==false){
      if(document.getElementsByClassName("focus1")[0]!=undefined){
        $('.rep').removeClass("focus1 animated pulse");
      }
      $('#'+repid).addClass('focus1 animated pulse');
      $('.btnvalid').removeClass("nondisplay").addClass('display');
      //var name =$('.pulse').attr('name');
      this.choisedrep=repid;
    }

  }



  beginQuiz(){ 

    let rand;
    let question;
    let option1;
    let option2;
    let option3;

    this.id='1';

    this.numberQuestion=1;

    this.quiz=rand=this.get_random_quiz(this.allquiz);

    question="../../../../../"+rand["chemin_arbo"]+"question_quiz"+".html";
    option1="../../../../../"+rand["chemin_arbo"]+"option1"+".html";
    option2="../../../../../"+rand["chemin_arbo"]+"option2"+".html";
    option3="../../../../../"+rand["chemin_arbo"]+"option3"+".html";

    this.question=this.domSanitizer.bypassSecurityTrustResourceUrl(question);
    this.option1=this.domSanitizer.bypassSecurityTrustResourceUrl(option1);
    this.option2=this.domSanitizer.bypassSecurityTrustResourceUrl(option2);
    this.option3=this.domSanitizer.bypassSecurityTrustResourceUrl(option3);

    /*
    $(document).ready(function(){
      $('#quiz').load(question);
      $('#option1').load(option1);
      $('#option2').load(option2);
      $('#option3').load(option3);
    })*/
 
    this.firstdate=Date.now();
  }

  valider(){

      let duration_mills=Date.now()-this.firstdate;
      let duration_sec=Math.floor(duration_mills/1000);
     // console.log("seconds elapsed = " + Math.floor(duration/1000));
      let c1=""; let c2=""; let c3="";
      let repID;
      let type_activite;
      let score_activite;
      if(this.pointreussi==undefined){
        this.pointreussi=0;
      }
      
      if(this.choisedrep=='rep1'){
        repID="1";
        if(this.quiz["reponse_1_valide"]=="1"){
          type_activite="QUVR";
          console.log("juste1")
          this.pointreussi=this.pointreussi+1;
          c1="../../../../../"+this.quiz["chemin_arbo"]+"comment_vrai_option_1"+'.html';
          document.getElementById('alerte1').innerHTML ='برافوووو';
          $('#alerte1').addClass('display').removeClass('nondisplay');
          $('#alerte1').addClass('successalert');
          $('.rep1').addClass('responsejuste');
        }else{
          type_activite="QUFA";
          console.log("fs1")
          c1="../../../../../"+this.quiz["chemin_arbo"]+"comment_faux_option_1"+'.html';
          document.getElementById('alerte1').innerHTML ='ليست الصحيحة';
          $('#alerte1').addClass('display').removeClass('nondisplay');
          $('#alerte1').addClass('erroralert');
          $('.rep1').addClass('responsefausse');

          if(this.quiz["reponse_2_valide"]=="1"){
            $('.rep2').addClass('responsejuste');
            c2="../../../../../"+this.quiz["chemin_arbo"]+"comment_faux_option_2"+'.html';
          }
          else{
            $('.rep3').addClass('responsejuste');
              c3="../../../../../"+this.quiz["chemin_arbo"]+"comment_faux_option_3"+'.html';
          }

        }
     }
     else if(this.choisedrep=='rep2'){
      repID="2";
      if(this.quiz["reponse_2_valide"]=="1"){
        type_activite="QUVR";
        console.log("juste2")
        this.pointreussi=this.pointreussi+1;
        c2="../../../../../"+this.quiz["chemin_arbo"]+"comment_vrai_option_2"+'.html';
        document.getElementById('alerte2').innerHTML ='برافوووو';
        $('#alerte2').addClass('display').removeClass('nondisplay');
        $('#alerte2').addClass('successalert');
        $('.rep2').addClass('responsejuste');
      }
      else{
        type_activite="QUFA";
        console.log("fs2")
        c2="../../../../../"+this.quiz["chemin_arbo"]+"comment_faux_option_2"+'.html';
        document.getElementById('alerte2').innerHTML ='ليست الصحيحة';
        $('#alerte2').addClass('display').removeClass('nondisplay');
        $('#alerte2').addClass('erroralert');
        $('.rep2').addClass('responsefausse');

        if(this.quiz["reponse_1_valide"]=="1"){
          $('.rep1').addClass('responsejuste');
          c1="../../../../../"+this.quiz["chemin_arbo"]+"comment_faux_option_1"+'.html';
        }
        else{
          $('.rep3').addClass('responsejuste');
            c3="../../../../../"+this.quiz["chemin_arbo"]+"comment_faux_option_3"+'.html';
        }

      }
   }
   else if(this.choisedrep=='rep3'){
    repID="3";
    if(this.quiz["reponse_3_valide"]=="1"){
      type_activite="QUVR";
      console.log("juste3")
      this.pointreussi=this.pointreussi+1;
      c3="../../../../../"+this.quiz["chemin_arbo"]+"comment_vrai_option_3"+'.html';
      document.getElementById('alerte3').innerHTML ='برافوووو';
      $('#alerte3').addClass('display').removeClass('nondisplay');
      $('#alerte3').addClass('successalert');
      $('.rep3').addClass('responsejuste');
    }
    else{
      type_activite="QUFA";
      console.log("fs3")
      c3="../../../../../"+this.quiz["chemin_arbo"]+"comment_faux_option_3"+'.html';
      document.getElementById('alerte3').innerHTML ='ليست الصحيحة';
      $('#alerte3').addClass('display').removeClass('nondisplay');
      $('#alerte3').addClass('erroralert');
      $('.rep3').addClass('responsefausse');

      if(this.quiz["reponse_2_valide"]=="1"){
        $('.rep2').addClass('responsejuste');
        c2="../../../../../"+this.quiz["chemin_arbo"]+"comment_faux_option_2"+'.html';
      }
      else{
        $('.rep1').addClass('responsejuste');
          c1="../../../../../"+this.quiz["chemin_arbo"]+"comment_faux_option_1"+'.html';
      }

     }
   }
   if(type_activite=="QUVR"){
      score_activite="20";
   }
   else{
     score_activite="5";
   }
   $('#commentaire1').removeClass("nondisplay").addClass('display');
   $('#commentaire2').removeClass("nondisplay").addClass('display');
   $('#commentaire3').removeClass("nondisplay").addClass('display');
   $('.btnnext').removeClass("nondisplay").addClass('display');
   $('.boutton').removeClass("nondisplay").addClass('display');
     $('.btnvalid').removeClass("display").addClass('nondisplay');
     $('.reussite').removeClass("display").addClass('nondisplay');
     $('.rep').prop('disabled', true);

     /*$(document).ready(function(){
    
      $('#c1').load(c1);
      $('#c2').load(c2);
      $('#c3').load(c3);
    })*/
    this.c1=this.domSanitizer.bypassSecurityTrustResourceUrl(c1);
    this.c2=this.domSanitizer.bypassSecurityTrustResourceUrl(c2);
    this.c3=this.domSanitizer.bypassSecurityTrustResourceUrl(c3);

   let num_valid_rep=this.getCorrectResponse();
   this.insertActivite(repID,type_activite,duration_sec,num_valid_rep,score_activite);
    
  }

  getCorrectResponse(){
    if(this.quiz["reponse_1_valide"]=="1"){
         return "1"
    }
    else if(this.quiz["reponse_2_valide"]=="1"){
      return "2"
    }
    else if(this.quiz["reponse_3_valide"]=="1"){
      return "3"
    }
     
  }

 /* profile_event(event){

    console.log(event)
    this.profile["score"]=event["score"];
  }*/

  insertActivite(repID,type_activite,duration_sec,num_valid_rep,score_activite){
    let chemin = this.quizService.getNoeud()["chemin_arbo"];
    let chemin_arbo = chemin.split('/')[4];
    let id_matiere;
    console.log(chemin_arbo)
    let  matieres=this.localStorageService.getLocalStorage('mat')
    matieres.forEach(element => {
        if(element["code_arbo"]==chemin_arbo){
            id_matiere=element['id_objet'];
        }
    });
    let sentdata={
      "id_classe":this.idClasse,
      "id_arbo":this.quiz["id_arbo"],
      "id_user":this.userID,
      "id_matiere":id_matiere,
      "num_reponse_act_quiz":num_valid_rep,
      "reponse_act_quiz":repID,
      "score_act_quiz":score_activite,
      "duree_act_quiz":duration_sec,
      "type_activite":type_activite,
      "id_quiz":this.quiz["id_objet"]
    }
    console.log(sentdata)
    this.http.put('../../../../../api/activite/insert_quiz',sentdata)
      .subscribe(
        (res: any[]) => {
          console.log(res);
          this.profile["score"]=this.cookie.get('score');
          if(type_activite=="QUVR"){
            console.log(this.profile["score"])
            this.scoringService.updateScore(sentdata["score_act_quiz"],this.profile["score"]);
            this.notifier.notify( 'success', '+ 20 نقطة' );
          }
          else{
            this.scoringService.minus_score(sentdata["score_act_quiz"],this.profile["score"]);
            this.notifier.notify( 'warning', '- 5 نقط' );
          }
          console.log(this.notifier)
        },
        err => {
          alert('wrong');
        }
      );
  }

  nextQuestion(numberquiz){
  
    this.firstdate=Date.now();

    let option,option1,option2,option3;let comment;
    let name1="option_1";
    let name2="option_2";
    let name3="option_3";

    if(this.nextboutton=="انتهى الامتحان"){
      this.router.navigateByUrl('/blocs#'+this.quizService.getChemin());
    }
    if(this.numberQuestions>numberquiz){
      $(function () {
        $('.alerte').removeClass('successalert');
        $('.alerte').removeClass('erroralert');
        $('.display').removeClass("display").addClass('nondisplay');
        $('.rep').prop('disabled', false);
         console.log("remove")
         $('.rep1').removeClass('responsejuste');
         $('.rep2').removeClass('responsejuste');
         $('.rep3').removeClass('responsejuste');
         $('.rep1').removeClass('responsefausse');
         $('.rep2').removeClass('responsefausse');
         $('.rep3').removeClass('responsefausse');
         $('.rep1').removeClass('focus1');
         $('.rep2').removeClass('focus1');
         $('.rep3').removeClass('focus1');
      });
      this.option1=this.domSanitizer.bypassSecurityTrustResourceUrl("");
      this.option2=this.domSanitizer.bypassSecurityTrustResourceUrl("");
      this.option3=this.domSanitizer.bypassSecurityTrustResourceUrl("");

  
      this.numberQuestion=numberquiz+1;
      this.next_rand_quiz();


    }
    else{
       $(function () {
        $('.questiontxt').addClass('nondisplay');
        $('.rep').addClass('nondisplay');
        $('.reussite').removeClass("nondisplay").addClass('reussitedisplay');
        $('.boutton').removeClass("nondisplay").addClass('display');
        $('.btnvalid').removeClass("display").addClass('nondisplay');
        $('.rep').prop('disabled', false);
      });

      this.nextboutton="انتهى الامتحان";
     
    }


    }

    next_rand_quiz(){          
      let rand;
      let question;
      let option1;
      let option2;
      let option3;
      let index;
  
      this.id='1';
  
      for(let i=0;i<this.allquiz.length;i++){
        if(this.quiz["id_arbo"]==this.allquiz[i]["id_arbo"]){
             index=i;
        }
      }

      this.allquiz.splice(index,1);
      console.log(this.allquiz.length)
      this.quiz=rand=this.get_random_quiz(this.allquiz);
  
      question="../../../../../"+rand["chemin_arbo"]+"question_quiz"+".html";
      option1="../../../../../"+rand["chemin_arbo"]+"option1"+".html";
      option2="../../../../../"+rand["chemin_arbo"]+"option2"+".html";
      option3="../../../../../"+rand["chemin_arbo"]+"option3"+".html";
      console.log(this.allquiz.length)
      console.log(this.allquiz.length)
      console.log(this.allquiz.length)
      
      this.question=this.domSanitizer.bypassSecurityTrustResourceUrl(question);
      this.option1=this.domSanitizer.bypassSecurityTrustResourceUrl(option1);
      this.option2=this.domSanitizer.bypassSecurityTrustResourceUrl(option2);
      this.option3=this.domSanitizer.bypassSecurityTrustResourceUrl(option3);
  
      /*$(document).ready(function(){
        $('#quiz').load(question);
        $('#option1').load(option1);
        $('#option2').load(option2);
        $('#option3').load(option3);
      })*/

    }

    
  Start(){ 
    if(this.on===false){ 
      this.timerID = setInterval(this.chrono, 1000); 
      alert(this.timerID)
      this.on = true; 
      this.reset = false; 
    } 
  } 
  
  Stop(){ 
    if(this.on===true){ 
      this.on = false; 
      clearTimeout(this.timerID); 
    } 
  } 

  chrono(){ 
    this.secondes += 1; 
    
    if(this.secondes>59){ 
      this.minutes += 1; 
      this.secondes = 0; 
    } 
    if(this.minutes>59){ 
      this.hours += 1; 
      this.minutes = 0; 
    }
     return this.hours+":"+this.minutes+":"+this.secondes
  }

  
  

}
