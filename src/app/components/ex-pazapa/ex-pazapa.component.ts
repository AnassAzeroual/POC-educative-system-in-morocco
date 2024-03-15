import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { LocalStorageService } from "src/app/services/LocalStorage/local-storage.service";
import { ScoringService } from "src/app/services/scoring-service/scoring-service.service";
import { FooterComponent } from "../ui/footer/footer.component";
import { BoxSidebarComponent } from "../box-sidebar/box-sidebar.component";
import { NgIf } from "@angular/common";
import { BoutonHomeComponent } from "../ui/bouton-home/bouton-home.component";
import { NavbarComponent } from "../ui/navbar/navbar.component";

@Component({
    selector: "app-ex-pazapa",
    templateUrl: "./ex-pazapa.component.html",
    styleUrls: ["./ex-pazapa.component.css"],
    standalone: true,
    imports: [NavbarComponent, BoutonHomeComponent, NgIf, BoxSidebarComponent, FooterComponent]
})
export class ExPazapaComponent implements OnInit {
  @ViewChild("iframe") iframe: ElementRef;

  constructor(
    public sanitizer: DomSanitizer,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private domSanitizer: DomSanitizer,
    private scoringService: ScoringService
  ) {}

  //parameters
  chemin;
  fileNotFound;
  blocCode = [];

  ngAfterViewInit() {
    this.iframe.nativeElement.style.height =
      this.iframe.nativeElement.contentWindow.document.body.scrollHeight +
      20 +
      "px";
  }

  print() {
    this.iframe.nativeElement.contentWindow.print();
  }

  ngOnInit() {
    let local = this.localStorageService;
    let id;
    let name;
    //this.scoringService.updateScore("10","56");

    this.route.fragment.subscribe(fragments => {
      let routesTable = fragments.split("/");
      name = routesTable[0];
      id = routesTable[routesTable.length - 1];

      for (let i = 0; i < routesTable.length - 1; i++) {
        this.blocCode.push({ libelle_objet: routesTable[i] });
      }
    });
    this.fileNotFound = 0;
    this.checkSession();
    this.findCoursById(local, name, id);
    this.fuc_check_chemin("");
  }

  showSubBloc(event) {
    let routefragment = "";
    for (let i = 0; i <= this.blocCode.length - 1; i++) {
      if (this.blocCode[i]["libelle_objet"] == event["libelle_objet"]) {
        routefragment = routefragment + this.blocCode[i];
        this.router.navigateByUrl("/blocs#" + routefragment);
        return false;
      } else {
        routefragment = routefragment + this.blocCode[i] + "/";
      }
    }
    //routefragment=routefragment+this.blocCode[this.blocCode.length-1];
  }

  fuc_check_chemin(chemins) {
    if (chemins == "" || chemins == null || chemins == undefined) {
      //this.chemin = "./assets/files/404-Page.html";
      return false;
    }
  }

  //function find cours
  findCoursById(local, name, id) {
    let chemin;
    let blocs;
    if (local.getLocalStorage(name)) {
      local.getLocalStorage(name).forEach(function(value, key) {
        if (value["code_arbo"] == id) {
          chemin = value["chemin_arbo"];
          if (chemin == "" || chemin == null || chemin == undefined) {
            console.log(chemin);
            chemin = "./assets/files/404-Page.html";
          } else {
            chemin = "../../../../../" + chemin + "ex-pazapa.html";
          }
        }
      });
      console.log(chemin);
      this.chemin = this.domSanitizer.bypassSecurityTrustResourceUrl(chemin);
    } else {
      this.localStorageService.destructSession();
      this.router.navigateByUrl("/");
    }
  }

  el: HTMLFrameElement;

  resizeIframe(ev: Event) {
    console.log(ev);
    //ev.style.height = ev.contentWindow.document.body.scrollHeight + 'px';
  }

  //function check session
  checkSession() {
    this.http.post("../../../sessions/read.php", null).subscribe(
      (res: any[]) => {},
      err => {
        this.localStorageService.destructSession();
        this.router.navigateByUrl("/");
      }
    );
  }

  error() {
    this.fileNotFound = 1;
  }

  errorHandler(event) {
    console.debug(event);
    this.fileNotFound = 1;
    event.target.src = "https://cdn.browshot.com/static/images/not-found.png";
  }
}
