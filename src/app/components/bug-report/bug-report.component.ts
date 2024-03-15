import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "bug-report",
    templateUrl: "./bug-report.component.html",
    styleUrls: ["./bug-report.component.css"],
    standalone: true,
    imports: [FormsModule]
})
export class BugReportComponent implements OnInit {
  @Input() title?: String = "Default Title";
  @Output("send-data") send = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  /**
   * Submit and send data to parent via @Output
   * @param bugMessage
   */
  sendBug(bugMessage) {
    if (bugMessage.valid) {
      let { userEmail: user_email, userBug: user_message } = bugMessage.value;
      let data = { user_email, user_message };
      this.send.emit(data);
    }
  }
}
