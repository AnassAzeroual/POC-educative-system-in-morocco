import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";
import AppError from "src/app/common/app-error";
import AppNotFoundException from "src/app/common/app-not-found";

@Injectable({
  providedIn: "root"
})
export class ActivityService {
  constructor(private httpClient: HttpClient) {}
  
 // private url = "";


  sendActivity(url,data) {
    return this.httpClient.put(url,data)
     .catch((error: Response) => this.handle_error_messages(error));
  }

   /**
   * Handle Error Messages with status (404)
   * @param error
   */
  private handle_error_messages(error: Response) {
 
    return throwError(new AppError());
  }
}
