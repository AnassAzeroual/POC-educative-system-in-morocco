import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import AppError from "src/app/common/app-error";
import AppNotFoundException from "src/app/common/app-not-found";

@Injectable({
  providedIn: "root"
})
export class HistoriqueServiceService {
  constructor(private http: HttpClient) {}

  private url =
    "http://test-angular.e-eduka.com/api/histo_activite/read_selected";

  icons_list = [
    {
      types: ["CONN", "DECO", "MOLO"],
      icon: "unlock-alt"
    },
    {
      types: ["QUFA", "QUVR"],
      icon: "tasks"
    },
    {
      types: ["VICO", "VIEX", "VIVE", "VIVP"],
      icon: "book-open"
    },
    {
      types: ["NOCR"],
      icon: "book-open"
    }
  ];
  getHistorique(startDate, endDate, idUser, idClass) {
    const params = { p1: idUser, p2: idClass, p3: startDate, p4: endDate };
    return this.http
      .post(this.url, params)
      .catch((error: Response) => this.handle_error_messages(error));
  }

  getHistoriqueIconsByActityType(activity: string) {
    let icons;
    for (let item of this.icons_list) {
      item.types.find(element => element === activity)
        ? (icons = item.icon)
        : "";
    }
    return icons;
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
