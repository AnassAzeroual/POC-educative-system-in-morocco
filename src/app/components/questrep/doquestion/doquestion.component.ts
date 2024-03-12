import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doquestion',
  templateUrl: './doquestion.component.html',
  styleUrls: ['./doquestion.component.css']
})
export class DoquestionComponent implements OnInit {

  constructor() { }
  showedform=false;

  ngOnInit() {

  }

  showformrep(){
    this.showedform=true;
  }
  return(){
    this.showedform=false;
  }

}
