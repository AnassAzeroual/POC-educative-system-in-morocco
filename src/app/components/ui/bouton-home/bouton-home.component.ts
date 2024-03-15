import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-bouton-home',
    templateUrl: './bouton-home.component.html',
    styleUrls: ['./bouton-home.component.css'],
    standalone: true,
    imports: [RouterLink, NgFor]
})
export class BoutonHomeComponent implements OnInit {

label;

//  @Input() matiere;
  @Input() blocCode;
  @Output() bloc = new EventEmitter();

  constructor() { }

  ngOnInit() {

   /* if(this.matiere==undefined){
      this.matiere={"libelle_arbo":""};
    }else{
      this.label="/ "+this.matiere["libelle_arbo"];
    }*/

  }

  showSubBloc(subBloc){
        this.bloc.emit(subBloc);
  }

}