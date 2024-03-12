import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlocService {

  private matiere;

  constructor() { }

  setMatiere(matiere) {
    console.log(matiere)
      this.matiere=matiere;
  }

  getMatiere() {
    return this.matiere;
  }
}
