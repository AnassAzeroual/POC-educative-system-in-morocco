import { Component, OnInit } from '@angular/core';
import { NotifierModule } from 'angular-notifier';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterOutlet, NotifierModule]
})
export class AppComponent  implements OnInit {

  ngOnInit () {

  }
}
