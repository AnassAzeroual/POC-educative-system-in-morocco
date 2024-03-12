import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControleService {

  object;

  constructor() {
  }

  setObject(object){
    this.object=object;
  }

  getObject(){
    return this.object;
  }
  
}
