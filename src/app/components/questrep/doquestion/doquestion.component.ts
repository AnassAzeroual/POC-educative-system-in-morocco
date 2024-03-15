import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-doquestion',
    templateUrl: './doquestion.component.html',
    styleUrls: ['./doquestion.component.css'],
    standalone: true,
    imports: [NgIf]
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
