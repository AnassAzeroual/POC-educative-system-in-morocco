import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  QueryList,
  ViewChildren
} from "@angular/core";
import {
  NgbDate,
  NgbCalendar,
  NgbDatepickerConfig
} from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { LocalStorageService } from "src/app/services/LocalStorage/local-storage.service";
declare var $:any;

@Component({
  selector: "app-planning",
  templateUrl: "./planning.component.html",
  styleUrls: ["./planning.component.css", "./modal.component.css"]
})
export class PlanningComponent implements OnInit {
  @ViewChildren("listElement") listElement: QueryList<ElementRef>;
  @ViewChildren("checkedItem") checkedItem: QueryList<ElementRef>;
  @ViewChildren("planningDay") planningDay: QueryList<ElementRef>;

  hours_weeks = [];
  matiere: Array<Object>;
  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(
    calendar: NgbCalendar,
    private config: NgbDatepickerConfig,
    private renderer: Renderer2,
    private storage: LocalStorageService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
    this.config.outsideDays = "hidden";
    this.config.markDisabled = (date: NgbDate) => {
      return date.after(this.toDate) && date.before(this.fromDate);
    };
  }
  ngAfterViewInit() {
    this.customizeCalendar();
    this.listElement.map(element =>
      this.renderer.listen(element.nativeElement, "click", () => {
        this.showElement(element.nativeElement);
      })
    );
    this.checkedItem.map(element => {
      this.renderer.listen(element.nativeElement, "click", event => {
        event.stopPropagation();
      });
    });
  }

  ngOnInit() {
    this.loadHoursPlage();
    this.matiere = this.storage.getLocalStorage("mat");
  }

  addDate(date: NgbDate) {}

  onDateSelection(date: NgbDate) {
    if (
      date.equals(this.fromDate) ||
      date.equals(this.toDate) ||
      (date.after(this.fromDate) && date.before(this.toDate))
    )
      console.log(date);
  }
  isHovered(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }
  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      date.equals(this.toDate) ||
      this.isInside(date)
    );
  }

  customizeCalendar() {
    let navigationHeader = Array.from(
      document.querySelectorAll(
        "ngb-datepicker-navigation .ngb-dp-navigation-select .custom-select"
      )
    );
    let arrows = Array.from(
      document.querySelectorAll(
        "ngb-datepicker-navigation .ngb-dp-arrow .ngb-dp-navigation-chevron"
      )
    );
    let headerDay = Array.from(
      document.querySelectorAll(
        "ngb-datepicker ngb-datepicker-month-view .ngb-dp-week .ngb-dp-weekday"
      )
    );
    let bodyDay = Array.from(
      document.querySelectorAll(
        "ngb-datepicker ngb-datepicker-month-view .ngb-dp-week .ngb-dp-day"
      )
    );

    navigationHeader.map(element =>
      element.setAttribute("style", "direction: ltr;margin: 0 5px")
    );

    arrows.map(element => {
      if (
        element.parentElement.parentElement.className === "ngb-dp-arrow right"
      ) {
        element.setAttribute("style", "transform: rotate(225deg)");
      } else element.setAttribute("style", "transform: rotate(50deg)");
    });

    headerDay.map(element => {
      // adding ال to beginning of the day
      element.textContent = "ال" + element.textContent.trim();
      element.setAttribute(
        "style",
        "margin: 0 5px; font-style:normal; font-size:14px"
      );
    });

    bodyDay.map(element => element.setAttribute("style", "margin: 2px 5px"));
  }

  modalPlanningOpen() {
    $("#animate_Style_Planning").removeClass("bounceOutUp");
    $("#animate_Style_Planning").addClass("bounceInDown");
    $("#modalPlanning").css("display", "block");
  }
  modalPlanningClose() {
    $("#animate_Style_Planning").removeClass("bounceInDown");
    $("#animate_Style_Planning").addClass("bounceOutUp");
    setTimeout(function() {
      $("#modalPlanning").css("display", "none");
    }, 800);
  }

  setPlanningHours(index, item, day_name, target) {
    this.planningDay.forEach(element => {
      if (element.nativeElement.getAttribute("index") == index) {
        this.renderer.removeClass(element.nativeElement, "selected");
      }
    });
    this.renderer.addClass(target, "selected");
  }
  // Show element when user click
  showElement(element) {
    console.log(element.children);
    if (element.children.length > 0)
      element.children[1].style.display =
        element.children[1].style.display === "block" ? "none" : "block";
  }

  // Loading Plage hours
  loadHoursPlage() {
    let daysInWeek = 7;
    for (let index = 1; index <= daysInWeek; index++) {
      let week_name = moment()
        .locale("ar-tn")
        .isoWeekday(index)
        .format("dddd");
      let week_object = {
        name: week_name,
        hours: [
          "00h00",
          "00h30",
          "01h00",
          "01h30",
          "02h00",
          "02h30",
          "03h00",
          "03h30",
          "04h00",
          "04h30",
          "05h00"
        ]
      };
      this.hours_weeks.push(week_object);
    }
  }

  savePlanning() {}
}
