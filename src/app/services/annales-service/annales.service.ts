import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError, observable, BehaviorSubject } from "rxjs";
import "rxjs/add/operator/catch";

import AppError from "src/app/common/app-error";
import AppNotFoundException from "src/app/common/app-not-found";

import { Observable } from "rxjs/observable";
import { LocalStorageService } from "../LocalStorage/local-storage.service";
@Injectable({
  providedIn: "root"
})
export class AnnalesService {
  private url: string = "http://test-angular.e-eduka.com/api/annales/";
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}
  private data = [
    {
      id: "10",
      code_arbo: "4001",
      libelle_objet: "الرياضيات",
      type_objet: "MA",
      chemin_arbo: "0/13/201/3001/4001/",
      id_arbo_parent: "8",
      ordre_arbo: "1",
      actif: "",
      niveau_objet: "0",
      code_objet: "MATH"
    },
    {
      id: "11",
      code_arbo: "4002",
      libelle_objet: "الفيزياء و الكيمياء",
      type_objet: "MA",
      chemin_arbo: "0/13/201/3001/4002/",
      id_arbo_parent: "8",
      ordre_arbo: "2",
      actif: "",
      niveau_objet: "0",
      code_objet: "PC"
    },
    {
      id: "12",
      code_arbo: "4003",
      libelle_objet: "علوم الحياة و الأرض",
      type_objet: "MA",
      chemin_arbo: "0/13/201/3001/4003/",
      id_arbo_parent: "8",
      ordre_arbo: "3",
      actif: "",
      niveau_objet: "0",
      code_objet: "SVT"
    },
    {
      id: "13",
      code_arbo: "4004",
      libelle_objet: "الإنجليزية",
      type_objet: "MA",
      chemin_arbo: "0/13/201/3001/4004/",
      id_arbo_parent: "8",
      ordre_arbo: "4",
      actif: "",
      niveau_objet: "0",
      code_objet: "ANG"
    },
    {
      id: "14",
      code_arbo: "4005",
      libelle_objet: "الفلسفة",
      type_objet: "MA",
      chemin_arbo: "0/13/201/3001/4005/",
      id_arbo_parent: "8",
      ordre_arbo: "5",
      actif: "",
      niveau_objet: "0",
      code_objet: "PHIL"
    }
  ];
  private observable = Observable.create(response => response.next(this.data));
  private annaleData: BehaviorSubject<Object> = new BehaviorSubject({});
  observerAnnale = this.annaleData.asObservable();

  /**
   * Return All annales from @param url
   */
  getCoursesAnnales() {
    return new Promise<[any]>((resolve, reject) => {
      let matieres = this.localStorage.getLocalStorage("mat");
      if (matieres === undefined) return reject("Matieres not found");
      resolve(matieres);
    });
    // return this.http.get(this.url).catch((error: Response) => {
    //   return this.handle_error_messages(error);
    // });
    // return this.observable;
  }

  getAnnalesByCheminArbo(chemin_arbo) {
    let params = { p1: chemin_arbo };
    return this.http
      .post(this.url.concat("read"), params)
      .catch((error: Response) => this.handle_error_messages(error));
  }

  setMatiereAnnale(annale: Object) {
    this.annaleData.next(annale);
  }

  /**
   * Handle Error Messages with status (404)
   * @param error
   */
  private handle_error_messages(error: Response) {
    if (error.status === 404) {
      return throwError(new AppNotFoundException(error));
    }
    return throwError(new AppError());
  }
}
