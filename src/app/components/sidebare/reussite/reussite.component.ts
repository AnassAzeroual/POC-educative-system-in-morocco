import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-reussite',
    templateUrl: './reussite.component.html',
    styleUrls: ['./reussite.component.css'],
    standalone: true,
    imports: [RouterLink]
})
export class ReussiteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
