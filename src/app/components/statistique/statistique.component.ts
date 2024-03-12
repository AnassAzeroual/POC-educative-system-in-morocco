import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import { Router } from '@angular/router';
import { StatistiqueService } from 'src/app/services/statistiques/statistique.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css', './tooltips.modul.css', './progresses-bar.modul.css']
})
export class StatistiqueComponent implements OnInit {

  dataSession :any;
  chartjs     :any;
  user_data   :any;
  constructor(
              private http: HttpClient,
              private localStorageService: LocalStorageService,
              private HomemRoute: Router,
              private srv:StatistiqueService,
              private session:SessionService
          ) { }

  ngOnInit() {
    this.init();
    this.setHeight();
    this.func_get_session_path();// Function Get Path of Classe ex: '0/13/201/3001/'
    this.dataSession = this.session.readSession();
  }

func_get_session_path(){
  this.http.post('../../../sessions/read.php', null)
  .subscribe(
    (res_data_user: any[]) => {
      this.user_data = res_data_user;
    },
    err => {
      this.localStorageService.destructSession();
      this.HomemRoute.navigateByUrl('/');
    }
  );
}

init() {
      this.setHeight();
    }
    
setHeight() {
      var $tabPane = $('.tab-pane'),
          tabsHeight = $('.nav-tabs').height();
      
      $tabPane.css({
        height: tabsHeight
      });
    }
}
