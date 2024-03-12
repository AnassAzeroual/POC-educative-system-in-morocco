import { Component, OnInit, Input, EventEmitter, Output,} from '@angular/core';

@Component({
  selector: 'box-sidebar',
  templateUrl: './box-sidebar.component.html',
  styleUrls: ['./box-sidebar.component.css','./accueil.sticky.css']
})
export class BoxSidebarComponent implements OnInit {
  @Input('template') page: string;
  //@Output() Profile_change_score= new EventEmitter();

  Object_sidebar = {
      show_sidebar_reussite : false,
      show_sidebar_outile   : false,
      show_sidebar_note     : false,
      show_sidebar_qr       : false,
      show_sidebar_applique : false,
      show_sidebar_apprends : false,
      show_sidebar_parcours : false,
      show_sidebar_concours : false
  };
  constructor() { }

 /* profile_event(event){
    alert("2")
    console.log(event)
     this.Profile_change_score=event;
  }*/

  ngOnInit() {
    this.fun_sidebar_template(this.page)
  }

  fun_sidebar_template(sidebarTemplate:string){

    switch (sidebarTemplate) {

      case 'accueil'    : this.template_Accueil()                 ;break;
      case 'calendar'   : this.template_Calendar()                ;break;
      case 'annales'    : this.template_Annales()                 ;break;
      case 'annales-dis': this.template_Annales_Display()         ;break;
      case 'annales-m-d': this.template_Annales_Matiere_Details() ;break;
      case 'arbre'      : this.template_Arbre()                   ;break;
      case 'classement' : this.template_Classement()              ;break;
      case 'cours'      : this.template_Cours()                   ;break;
      case 'coursvideo' : this.template_CoursVideo()              ;break;
      case 'expazapa'   : this.template_ExPazapa()                ;break;
      case 'exvideo'    : this.template_ExVideo()                 ;break;
      case 'historique' : this.template_Historique()              ;break;
      case 'infoquiz'   : this.template_InfoQuiz()                ;break;
      case 'planning'   : this.template_Planning()                ;break;
      case 'b-matiere'  : this.template_block_matiere()           ;break;
      case 'controle'   : this.template_controle()                ;break;
    
      default:console.log(" Maybe it's login page ")              ;break;
    }
  }

  template_Accueil(){
    this.Object_sidebar = {
      show_sidebar_outile   : true,
      show_sidebar_note     : true,
      show_sidebar_qr       : true,
      show_sidebar_reussite : true,
      show_sidebar_applique : false,
      show_sidebar_apprends : false,
      show_sidebar_parcours : false,
      show_sidebar_concours : false
    }
  }
  template_Calendar(){
    this.Object_sidebar = {
      show_sidebar_outile   : true,
      show_sidebar_note     : true,
      show_sidebar_qr       : false,
      show_sidebar_reussite : true,
      show_sidebar_applique : false,
      show_sidebar_apprends : false,
      show_sidebar_parcours : false,
      show_sidebar_concours : false
    }
  }
  template_Annales(){
    this.Object_sidebar = {
      show_sidebar_outile   : true,
      show_sidebar_note     : true,
      show_sidebar_qr       : true,
      show_sidebar_reussite : true,
      show_sidebar_applique : false,
      show_sidebar_apprends : false,
      show_sidebar_parcours : false,
      show_sidebar_concours : false
    }
  }
  template_Annales_Display(){
    this.Object_sidebar = {
      show_sidebar_outile   : true,
      show_sidebar_note     : true,
      show_sidebar_qr       : true,
      show_sidebar_reussite : true,
      show_sidebar_applique : true,
      show_sidebar_apprends : true,
      show_sidebar_parcours : true,
      show_sidebar_concours : true
    }
  }
  template_Annales_Matiere_Details(){
    this.Object_sidebar = {
      show_sidebar_outile   : true,
      show_sidebar_note     : true,
      show_sidebar_qr       : true,
      show_sidebar_reussite : true,
      show_sidebar_applique : true,
      show_sidebar_apprends : true,
      show_sidebar_parcours : true,
      show_sidebar_concours : true
    }
  }
  template_Arbre(){
    this.Object_sidebar = {
      show_sidebar_outile   : true,
      show_sidebar_note     : true,
      show_sidebar_qr       : true,
      show_sidebar_reussite : true,
      show_sidebar_applique : false,
      show_sidebar_apprends : false,
      show_sidebar_parcours : false,
      show_sidebar_concours : false
    }
  }
  template_Classement(){
    this.Object_sidebar = {
      show_sidebar_outile   : true,
      show_sidebar_note     : true,
      show_sidebar_qr       : true,
      show_sidebar_reussite : true,
      show_sidebar_applique : false,
      show_sidebar_apprends : false,
      show_sidebar_parcours : false,
      show_sidebar_concours : false
    }
  }
  template_Cours(){
    this.Object_sidebar = {
      show_sidebar_outile   : true,
      show_sidebar_note     : true,
      show_sidebar_qr       : true,
      show_sidebar_reussite : true,
      show_sidebar_applique : true,
      show_sidebar_apprends : true,
      show_sidebar_parcours : true,
      show_sidebar_concours : true
    }
  }
  template_CoursVideo(){
    this.Object_sidebar = {
      show_sidebar_outile   : true,
      show_sidebar_note     : true,
      show_sidebar_qr       : true,
      show_sidebar_reussite : true,
      show_sidebar_applique : false,
      show_sidebar_apprends : false,
      show_sidebar_parcours : false,
      show_sidebar_concours : false
    }
  }
  template_ExPazapa(){
    this.Object_sidebar = {
      show_sidebar_outile   : true,
      show_sidebar_note     : true,
      show_sidebar_qr       : true,
      show_sidebar_reussite : true,
      show_sidebar_applique : false,
      show_sidebar_apprends : false,
      show_sidebar_parcours : false,
      show_sidebar_concours : false
    }
  }
  template_ExVideo(){
    this.Object_sidebar = {
      show_sidebar_outile   : true,
      show_sidebar_note     : true,
      show_sidebar_qr       : true,
      show_sidebar_reussite : true,
      show_sidebar_applique : false,
      show_sidebar_apprends : false,
      show_sidebar_parcours : false,
      show_sidebar_concours : false
    }
  }
  template_Historique(){
    this.Object_sidebar = {
      show_sidebar_outile   : true,
      show_sidebar_note     : true,
      show_sidebar_qr       : true,
      show_sidebar_reussite : true,
      show_sidebar_applique : false,
      show_sidebar_apprends : false,
      show_sidebar_parcours : false,
      show_sidebar_concours : false
    }
  }
  template_InfoQuiz(){
    this.Object_sidebar = {
      show_sidebar_outile   : true,
      show_sidebar_note     : true,
      show_sidebar_qr       : true,
      show_sidebar_reussite : true,
      show_sidebar_applique : false,
      show_sidebar_apprends : false,
      show_sidebar_parcours : false,
      show_sidebar_concours : false
    }
  }
  template_Planning(){
    this.Object_sidebar = {
      show_sidebar_outile   : true,
      show_sidebar_note     : true,
      show_sidebar_qr       : true,
      show_sidebar_reussite : true,
      show_sidebar_applique : false,
      show_sidebar_apprends : false,
      show_sidebar_parcours : false,
      show_sidebar_concours : false
    }
  }
  template_block_matiere(){
    this.Object_sidebar = {
      show_sidebar_outile   : true,
      show_sidebar_note     : true,
      show_sidebar_qr       : true,
      show_sidebar_reussite : true,
      show_sidebar_applique : false,
      show_sidebar_apprends : false,
      show_sidebar_parcours : false,
      show_sidebar_concours : false
    }
  }
  template_controle(){
    this.Object_sidebar = {
      show_sidebar_outile   : true,
      show_sidebar_note     : true,
      show_sidebar_qr       : true,
      show_sidebar_reussite : true,
      show_sidebar_applique : false,
      show_sidebar_apprends : false,
      show_sidebar_parcours : false,
      show_sidebar_concours : false
    }
  }

}
