import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-qr',
    templateUrl: './qr.component.html',
    styleUrls: ['./qr.component.css'],
    standalone: true,
    imports: [RouterLink]
})
export class QrComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
