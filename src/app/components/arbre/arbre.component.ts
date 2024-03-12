import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import { CookieService } from 'ngx-cookie-service';
declare var $:any;

@Component({
  selector: 'app-arbre',
  templateUrl: './arbre.component.html',
  styleUrls: ['./arbre.component.css', './modal.component.css', './tooltips.modul.css']
})
export class ArbreComponent implements OnInit {

  title_modal:string = "";
  blocCode;
  score;
  level;

  constructor(private router: Router,
              private sessionService: SessionService,
              private localStorageService:LocalStorageService,
              private cookie: CookieService) { }

  ngOnInit() {
      this.checkSession();
      this.blocCode={
        libelle_objet:"اعتني بشجرتك لتنمو بسرع !"
      }
  }

  checkSession(){
    this.sessionService.readSession()
    .subscribe(
      res => {
        this.getScore();
        this.checkLevelTree();
      },
      err => {
        this.localStorageService.destructSession();
        this.router.navigateByUrl("/");
      }
    );
  }

  checkLevelTree(){
    let score = parseInt(this.score);
    let level;
    if(score>0 && score<=1000){
      level=1;
    }
    else if(score>1000 && score<=2000){
      level=2;
    }
    else if(score>2000 && score<=3000){
      level=3;
    }
    else if(score>3000 && score<=4000){
      level=4;
    }
    else if(score>4000 && score<=5000){
      level=5;
    }
    else if(score>5000 && score<=6000){
      level=6;
    }
    else if(score>6000 && score<=7000){
      level=7;
    }
    else if(score>7000 && score<=8000){
      level=8;
    }
    else if(score>8000 && score<=9000){
      level=9;
    }
    else if(score>9000 && score<=10000){
      level=10;
    }
    console.log(level)
    for(var i=1;i<=10;i++){
        if(i!=level){
          console.log(level)
          console.log(i)
          console.log("alert")
          $('.arbre'+i).css('opacity',0.3);
        }
    }
  }

  getScore(){
    this.score=this.cookie.get('score');
  }

  showSubBloc(event){
    this.router.navigateByUrl("/arbre");
  }

  modalArbOpen(title){ /*###### dynamic title of modal ######*/
    this.title_modal = title;
    this.modalArberOpen();
  }

  modalArberOpen() {
    $('#animate_Style_Arber').removeClass('bounceOutUp');
    $('#animate_Style_Arber').addClass('bounceInDown');
    $('#modalArber').css('display', 'block');
  }

  modalArberClose() {
    $('#animate_Style_Arber').removeClass('bounceInDown');
    $('#animate_Style_Arber').addClass('bounceOutUp');
    setTimeout(function() { $('#modalArber').css('display', 'none'); }, 800);
  }

}
