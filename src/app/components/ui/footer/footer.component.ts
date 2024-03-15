import { Component, OnInit } from "@angular/core";
import { BugReportComponent } from "../../bug-report/bug-report.component";

declare var $:any;

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.css", "./modal.component.css"],
    standalone: true,
    imports: [BugReportComponent]
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  openModal(idModal) {
    $(`#animate_Style_${idModal}`).removeClass("bounceOutUp");
    $(`#animate_Style_${idModal}`).addClass("bounceInDown");
    $(`#modal_${idModal}`).css("display", "block");
  }

  closeModal(idModal) {
    $(`#animate_Style_${idModal}`).removeClass("bounceOutUp");
    $(`#animate_Style_${idModal}`).addClass("bounceInDown");
    $(`#modal_${idModal}`).css("display", "none");
  }

  signalerReport(data) {
    console.log(data);
  }
}
