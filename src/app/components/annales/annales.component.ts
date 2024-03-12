import { Component, OnInit } from "@angular/core";
import { AnnalesService } from "../../services/annales-service/annales.service";
import AppError from "../../common/app-error";
import AppNotFoundException from "src/app/common/app-not-found";

@Component({
  selector: "app-annales",
  templateUrl: "./annales.component.html",
  styleUrls: ["./annales.component.css"]
})
export class AnnalesComponent implements OnInit {
  constructor(private annalesService: AnnalesService) {}
  private mat;
  ngOnInit() {
    this.getAnnales();
  }

  getAnnales() {
    this.annalesService.getCoursesAnnales().then(
      response => {
        let matieres = response;
        this.getAnnalesByChemin(matieres);
        this.mat = matieres;
      },
      (error: AppError) => {
        if (error instanceof AppNotFoundException)
          console.log("Not Found Exception");
        else throw error;
      }
    );
  }

  getAnnalesByChemin(target) {
    target.map(matiere => {
      this.annalesService.getAnnalesByCheminArbo(matiere.chemin_arbo).subscribe(
        response => {
          let documentSize = 0;
          for (let data in response["annale_information"]) {
            documentSize += response["annale_information"][data].length;
            Object.assign(matiere, { documentSize: documentSize });
          }
        },
        error => {
          Object.assign(matiere, { documentSize: 0 });
          console.error(error);
        }
      );
    });
    console.log("New Matieres", target);
  }

  /**
   * get all matieres
   * get number annales for each matiere
   * create new data by adding documentSize to it
   */
}
