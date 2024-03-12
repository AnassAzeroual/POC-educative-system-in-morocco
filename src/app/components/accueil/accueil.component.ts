import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BlocService } from 'src/app/services/blocService/bloc.service';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  private readonly notifier: NotifierService;

  constructor(private notifierService: NotifierService ,private http: HttpClient, private localStorageService:LocalStorageService,private blocService:BlocService,private router: Router) {
    this.notifier = notifierService;
  }
  
  matieres=[];
  objectsMat=[];
  idUser;  

ngOnInit () {    
          /*check session*/ 
          this.checkSession();
          this.hovermatiere();
          
}

checkSession(){
  const req = this.http.post('../../../sessions/read.php', null)
          .subscribe(
            (res: any[]) => {
              console.log(res);
              this.idUser=res["id_user"];
              this.getMatiere(res["chemin_classe"]);
            },
            err => {
              this.localStorageService.destructSession();
              this.router.navigateByUrl('/');
            }
         );
}

hovermatiere(){
     $(document).on('mouseenter', '.title-matiere', function () {
        $(this).next('div').stop(true).slideDown('fast', 'linear');
    });
    $(document).on('mouseenter', '.res-mat', function () {
        $(this).stop(true).slideDown('fast', 'linear');
    });
    $(document).on('mouseleave', '.res-mat', function () {
        $(this).stop(true).slideUp(300);
    });
    $(document).on('mouseleave', '.title-matiere', function () {
        $(this).next('div').stop(true).slideUp(300);
    });
}

// get  matieres
getMatiere(chemin){
    let local=this.localStorageService;
    let key= 'mat';

    if(local.getLocalStorage(key)){
      this.matieres=local.getLocalStorage(key);
      this.getQuiz(this.matieres);
      
    }
    else{
      let senddata={"param":chemin};
      this.http.post('../../../api/arbo/read_path', senddata)
        .subscribe(
          (res: any[]) => {
            let matieres = [];
            res["records"].forEach(function(value) {
              if(value["type_objet"]=="MA"){
                 matieres.push(value);
              }
            });
            this.matieres=matieres;
            local.storeLocalStorage(this.matieres,key);
            this.getQuiz(this.matieres);
            
          },
          err => { }
      );
      
    }
  }

  getprogress(pourcentage){
    return pourcentage+'%';
  }

getQuiz(matieres){
  let objectMat=[];
  for(let i=0;i<matieres.length;i++){
    let senddata={"param":matieres[i]["chemin_arbo"],"id_user":this.idUser};
    console.log(senddata)
    this.http.post('../../../api/arbo/node_quiz', senddata)
      .subscribe(
        (response:any) => {
          this.objectsMat[i]=
            {
              "code":matieres[i]["code_objet"],
              "quiz":response["informations_des_quiz_du_noeud"]
            }
            console.log(this.objectsMat)

        }
        ,
        err =>{ }

    )
  }
}

  //fonction lorsqu'on clique sur une matiere
  getMatiere_click(matiere) {
    let key1='blocs';
    this.localStorageService.storeLocalStorage([""],key1);
  }

}
