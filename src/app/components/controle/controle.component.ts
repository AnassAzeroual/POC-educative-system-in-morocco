import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import { ControleService } from 'src/app/services/controleService/controle.service';

declare var $: any;
@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class ControleComponent implements OnInit {
  commentaires:string;
  notes="";
  id_user: any;
  controleTitle:string;
  sjt_content:string;
  crg_content:string;
  down_sjt:string;
  down_crg:string;
  data_comment:any;
  data_read_comment:any;
  controlObjectData:any;
  object_comment = [];
  name_djt: string;
  name_crg: string;
  constructor(private http:HttpClient,
              private cookieService: CookieService,
              private localStorageService : LocalStorageService,
              private HomemRoute: Router,
              private objectControle: ControleService ) { }

  ngOnInit() {
    this.fun_Read_session_user();
    this.fun_check_dataControle();
    this.controleTitle = this.controlObjectData["object"]["libelle_objet"];
    this.sjt_content = "التركيز وقراءة جميع التعليمات قبل البدء";
    this.crg_content = "!هل انتهيت؟ ، اقرأ دائمًا مهمتك مرة واحدة على الأقل قبل أن تنتهي. يمكن أن تكسب لك النقاط";
    this.down_sjt = "../../../" + this.controlObjectData["object"]["chemin_arbo"] + "Sujet.html";
    this.down_crg = "../../../" + this.controlObjectData["object"]["chemin_arbo"] + "Corrige.html";
    this.name_djt = this.controlObjectData["object"]["libelle_objet"] + "Sujet";
    this.name_crg = this.controlObjectData["object"]["libelle_objet"] + "Corrige";
  }
  fun_check_dataControle(){
    if (this.objectControle.getObject() == undefined) {
      if (this.cookieService.check('chemin_arbo')) {
        this.controlObjectData = {
          object: {
            chemin_arbo: this.fun_getObjectFromCookie("chemin_arbo"),
            code_arbo: this.fun_getObjectFromCookie("code_arbo"),
            code_objet: this.fun_getObjectFromCookie("code_objet"),
            id_arbo: this.fun_getObjectFromCookie("id_arbo"),
            id_arbo_parent: this.fun_getObjectFromCookie("id_arbo_parent"),
            id_objet: this.fun_getObjectFromCookie("id_objet"),
            libelle_objet: this.fun_getObjectFromCookie("libelle_objet"),
            ordre_arbo: this.fun_getObjectFromCookie("ordre_arbo"),
            type_objet: this.fun_getObjectFromCookie("type_objet")
          },
          id_matiere: this.fun_getObjectFromCookie("id_matiere")
        }
        console.table(this.controlObjectData);
      }else{
        console.warn('cookies & services are empty!!!');
        this.HomemRoute.navigateByUrl('/home');
      }
    } else {
      this.controlObjectData = this.objectControle.getObject();
      this.fun_setObjectToCookie(this.controlObjectData);
    }
  }
  fun_getObjectFromCookie(name){
    return this.cookieService.get(name);
  };
  fun_setObjectToCookie(object){
    this.cookieService.set( 'chemin_arbo', object["object"]["chemin_arbo"]);
    this.cookieService.set( 'code_arbo', object["object"]["code_arbo"]);
    this.cookieService.set( 'code_objet', object["object"]["code_objet"]);
    this.cookieService.set( 'id_arbo', object["object"]["id_arbo"]);
    this.cookieService.set( 'id_arbo_parent', object["object"]["id_arbo_parent"]);
    this.cookieService.set( 'id_objet', object["object"]["id_objet"]);
    this.cookieService.set( 'libelle_objet', object["object"]["libelle_objet"]);
    this.cookieService.set( 'ordre_arbo', object["object"]["ordre_arbo"]);
    this.cookieService.set( 'type_objet', object["object"]["type_objet"]);
    this.cookieService.set( 'id_matiere', object["id_matiere"]);
  };
  fun_Read_session_user(){
    const req = this.http.post('../../../sessions/read.php', null)
    .subscribe(
      (res_read_session: any[]) => {
        this.id_user = res_read_session["id_user"];
        this.fun_Read_Comments( res_read_session["id_user"]);
      },
      err => {
        this.localStorageService.destructSession();
        this.HomemRoute.navigateByUrl('/');
      }
    );
  }

  fun_Read_Comments(id_user){
    this.data_read_comment = {
      "p1" : this.controlObjectData["object"]["id_arbo"] ,
      "p2" : id_user ,
      "p3" : this.controlObjectData["object"]["id_objet"],
      "p4" : this.controlObjectData["id_matiere"]
    }
    const serverRreadComment = this.http.post('http://test-angular.e-eduka.com/api/activite/read_ctrl', this.data_read_comment )
    .subscribe(
      (res_comment: any[]) => {
        for (let ObjI = 1; ObjI <= Object.keys(res_comment["ctrl_information"]).length; ObjI++) {
            this.object_comment.push({
              "date" : res_comment["ctrl_information"]["value_" + ObjI]["0"]["date_activite"],
              "note" : res_comment["ctrl_information"]["value_" + ObjI]["0"]["note_act_controle"],
              "comments" : res_comment["ctrl_information"]["value_" + ObjI]["0"]["comment_act_controle"]
            })
          }
      },
      error => {
        console.warn(error);
      }
    );
  }

  
  fun_insert_comment_notes(note:number,comment:string){
    this.data_comment = {
      "p1" : this.controlObjectData["object"]["id_arbo"] ,
      "p2" : this.id_user ,
      "p3" : this.controlObjectData["object"]["id_objet"],
      "p4" : this.controlObjectData["id_matiere"],
      "p5" : "NO" + this.controlObjectData["object"]["type_objet"],
      "p6" : note,
      "p7" : comment
      }
      let dateTime =  new Date().toLocaleString();
      this.object_comment.unshift({"date" : dateTime,"note" : note,"comments" : comment})
      console.table(this.data_comment);
      const reqLogin = this.http.put('http://test-angular.e-eduka.com/api/activite/insert_ctrl', this.data_comment )
       .subscribe(
         (res_comment: any[]) => {
          //  if (res_comment['http_code'] == 200 ) {
          //    console.log('comment inserted ');
          //  }else{
          //   console.warn('Not comment inserted ');
          //  }
         },
         error => {
           console.warn(error);
         }
       );
  }

  func_get_note_comment(note,comment:string) {

    if (note > 20 || note < 0 || note == "") {
      alert('المرجو إدخال رقماً مابين 0 و 20');
      return 0;
    }
    if (!$('#input_note').val().trim().match(/^[0-9]*$/)) {
      alert('أدخل عدداً صحيحاً');
      return false;
    }
    this.fun_insert_comment_notes(note,comment);

  }
  clear(){
    this.commentaires = "";
    this.notes = "";
  }
}
