import { ErrorHandler } from "@angular/core";

export default class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error("External error occured !");
  }
}
