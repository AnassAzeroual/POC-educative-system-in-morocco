import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-questions-reponses',
  templateUrl: './questions-reponses.component.html',
  styleUrls: ['./questions-reponses.component.css']
})
export class QuestionsReponsesComponent implements OnInit {

  constructor(private http: HttpClient, private localStorageService:LocalStorageService,private router: Router) { }

  profile=[];
  themes=[];
  niveaux=[];
  statuts=[];
  classes=[];
  matieres=[];
  parties=[];
  trier_table=[];
  class_exist=false;
  matiere_exist=false;
  partie_programme=false;
  first_content=true;
  seconde_content=false;//false
  three_content=false;
  four_content=false;
  five_content=false;
  showquestiondiv=false;
  niveau;
  classe;
  noms=[];

  return(){
    this.first_content=true;
    this.seconde_content=false;
    this.three_content=false;
     this.four_content=false;
     this.five_content=false;
     this.showquestiondiv=false;
  }

  onhoverDropdown(){
    $(document).ready(function(){
      $(".dropdown").hover(function(){
        $(this).css("border-radius", "59px 5px 0px 0");
        }, function(){
        $(this).css("border-radius", "59px 5px 59px 0");
      });
    });
  }

  showquestion(){
    this.first_content=false;
    this.seconde_content=false;
    this.three_content=false;
     this.four_content=false;
     this.five_content=false;
     this.showquestiondiv=true;
  }

  ngOnInit() {
    this.onhoverDropdown();
    /*check session*/ 
    this.check_session();
    this.on_active();
    this.themes=["--اختر الموضوع--","فهم فكرة","بحث عن معلومة","الإبلاغ عن مشكلة"];
    this.niveaux=["--اختر المستوى--","ابتدائي","اعدادي","ثانوي"];
    this.statuts=["جميع الاسئلة","الاسئلة المحلولة","الاسئلة الحالية"];
    this.classes=["--اختر القسم--","CP","CE1","CE3","السنة الثانية باكلوريا علوم رياضية - أ ـ"];
    this.matieres=["--اختر المادة--","العربية","الفرنسية","الرياضيات"];
    this.parties=["--اختر جزء من البرنامج--","التحليل","الهندسة"];
    this.trier_table=["آخر الأسئلة","الأسئلة مع معظم الأصوات"];
  
  }

  check_session(){ 
    let local=this.localStorageService;
    let key= 'profile';
    const req = this.http.post('../../../sessions/read.php', null)
    .subscribe(
      (response: any[]) => {
        //this.userId=response["id_user"];
        this.getProfileByUserId(response["id_user"],local,key); 
      },
      err => {
       // this.localStorageService.destructSession();
        //this.router.navigateByUrl('/');
      }
    );
  }

  on_active(){
    let header = document.getElementById("tabs");
    let btns = header.getElementsByClassName("tab");
    let id_tab;
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
      let current = document.getElementsByClassName("activ");
      for (var i = 0; i < current.length; i++) {
        $('.tab').removeClass('activ');
      }
      this.className += " activ";
      console.log(document.getElementsByClassName("activ")[1]);
      //id_tab =$(this).attr("id");
      });
    }
  }

  getProfileByUserId(userId,local,key){
    if(local.getLocalStorage(key)){
      this.profile=local.getLocalStorage(key);
    }else{
      const reqLogin = this.http.post('../../../api/user/read', {"param":userId})
        .subscribe(
          (response: any[]) => {
            local.storeLocalStorage(response["user_information"][0],key);
            this.profile = response["user_information"][0];
            this.niveau = this.profile["libelle_type_ecole"];
            this.classe = this.profile["nom_classe"];
          },
          error => {
            this.profile=[];
            /*{
              "message": "No user found.",
              "error_code": "404"
            }*/
          }
        );
    }
  }

  change_content(id_tab){
    ///id_tab =$(event).attr("id");
     if(id_tab=="tab1"){
       this.first_content=true;
       this.seconde_content=false;
       this.three_content=false;
       this.five_content=false;
       this.four_content=false;
       this.showquestiondiv=false;

     }
     else if(id_tab=="tab2"){
      this.first_content=false;
      this.seconde_content=true;
      this.three_content=false;
      this.five_content=false;
      this.four_content=false;
      this.showquestiondiv=false;

     }
     else if(id_tab=="tab3"){
      this.first_content=false;
      this.seconde_content=false;
      this.three_content=true;
      this.five_content=false;
      this.four_content=false;
      this.showquestiondiv=false;

     }
  }

  change_content_service(link){
     if(link=="1"){
      this.first_content=false;
      this.seconde_content=false;
      this.three_content=false;
       this.four_content=true;
       this.five_content=false;
       this.showquestiondiv=false;

     }
     else if(link=="2"){
      this.first_content=false;
      this.seconde_content=false;
      this.three_content=false;
       this.four_content=false;
       this.five_content=true;
       this.showquestiondiv=false;

     }
  }

  slidetoggle(slide){
        $(document).ready(function(){
        console.log($(this).next())
        $("."+slide).next().slideToggle("slow");
    });
  }

}
