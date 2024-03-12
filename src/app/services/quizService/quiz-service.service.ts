import { Injectable } from '@angular/core';

@Injectable()
export class QuizServiceService {

  noeud_of_quiz:Object;
  chemin:string;

  constructor() { }

  getNoeud(){
    return this.noeud_of_quiz;
  }
  setNoeud(noeud){
    this.noeud_of_quiz=noeud;
  }
  setChemin(chemin){
    this.chemin=chemin;
  }
  getChemin(){
    return this.chemin;
  }

  
}
