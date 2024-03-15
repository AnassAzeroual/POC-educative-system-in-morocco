import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AnnalesService } from "src/app/services/annales-service/annales.service";
import { FooterComponent } from "../../ui/footer/footer.component";
import { BoxSidebarComponent } from "../../box-sidebar/box-sidebar.component";
import { BoutonHomeComponent } from "../../ui/bouton-home/bouton-home.component";
import { NavbarComponent } from "../../ui/navbar/navbar.component";

@Component({
    selector: "app-annales-display",
    templateUrl: "./annales-display.component.html",
    styleUrls: ["./annales-display.component.css"],
    standalone: true,
    imports: [NavbarComponent, BoutonHomeComponent, BoxSidebarComponent, FooterComponent]
})
export class AnnalesDisplayComponent implements OnInit {
  chemin;
  constructor(
    private domSanitizer: DomSanitizer,
    private annaleService: AnnalesService
  ) {}

  ngOnInit() {
    this.formatChemin();
  }

  errorHandler($event) {}

  /**
   * Implementing Security Trust to ResourceUrl
   */
  private formatChemin() {
    this.annaleService.observerAnnale.subscribe(
      annale =>
        (this.chemin = this.domSanitizer.bypassSecurityTrustResourceUrl(
          annale["chemin_arbo"]
        ))
    );
  }
}
