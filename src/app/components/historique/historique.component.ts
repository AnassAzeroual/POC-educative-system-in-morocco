import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  Renderer2,
  Inject,
  ChangeDetectorRef
} from "@angular/core";
import * as moment from "moment";
import { ActivatedRoute } from "@angular/router";
import { HistoriqueServiceService } from "src/app/services/historique-service/historique-service.service";
import { DOCUMENT } from "@angular/common";
import { LocalStorageService } from "src/app/services/LocalStorage/local-storage.service";

declare var $: any;

@Component({
  selector: "app-historique",
  templateUrl: "./historique.component.html",
  styleUrls: ["./historique.component.css"]
})
export class HistoriqueComponent implements OnInit {
  ngAfterViewInit() {
    this.toogleSpecificNode();
    // get Data from API
    const startDay = moment()
      .year(this.year)
      .startOf("month")
      .startOf("isoWeek")
      .format("YYYY-MM-DD");
    const endDay = moment()
      .year(this.year)
      .endOf("month")
      .endOf("isoWeek")
      .format("YYYY-MM-DD");
    this.getAllHistorique(startDay.toString(), endDay.toString());
  }
  getAllHistorique(startDate, endDate): any {
    const { id_user, id_classe } = this.localStorage.getLocalStorage("profile");
    this.histo_srv
      .getHistorique(startDate, endDate, id_user, id_classe)
      .subscribe(data => {
        this.activities = data["information"];
        // Loop for each data
        this.createCustomLiBasedOnActivity(this.activities);
      });
  }

  /**
   * Create Custom element
   * @param activities
   */
  createCustomLiBasedOnActivity(activities: any[]): any {
    activities.map(historiqueItem => {
      let itemDate = moment(historiqueItem.date_activite)
        .format("DD-MM-YYYY")
        .split("-")
        .map(item => Number(item));
      // Loop for each child ul
      this.childLI.forEach(item => {
        // get day attribute
        let { day } = item.nativeElement.dataset;
        // format date to xx,xx,xxxx
        let dateItem = `${itemDate[2]},${this.getMonthFromArToNumber(
          itemDate[1]
        )},${("0" + itemDate[0]).slice(-2)}`;

        // check if date in database equals the attribute
        if (dateItem === day) {

          // Create custom li element
          let ListChild = document.createElement("li");

          let liImgContent = document.createElement("i");
          let icon = this.histo_srv.getHistoriqueIconsByActityType(
            historiqueItem.type_activite
          );
          liImgContent.className = `fas fa-${icon}`;

          let liParagraphContent = document.createElement("span");
          liParagraphContent.textContent = historiqueItem.libelle_histo;
          liParagraphContent.style.marginRight = "5px";
          liParagraphContent.style.verticalAlign = "text-bottom";
          liParagraphContent.style.fontSize = "16px";

          ListChild.appendChild(liImgContent);
          ListChild.appendChild(liParagraphContent);

          // ListChild.textContent = activity;
          ListChild.style.direction = "rtl";
          ListChild.style.color = "gray";
          ListChild.style.marginRight = "10px";
          this.renderer.appendChild(item.nativeElement, ListChild);
          return;
        }
      });
    });
  }

  constructor(
    private routerActivated: ActivatedRoute,
    private histo_srv: HistoriqueServiceService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private changeDetector: ChangeDetectorRef,
    private localStorage: LocalStorageService
  ) {}

  @ViewChildren("lichild") childLI: QueryList<any>;
  selectedGroup = 2;
  data;
  year;
  dates;
  week_end_name: any;
  week_end_number: any;
  week_end_month: any;
  week_end_year: any;
  week_start_name: any;
  week_start_number: any;
  week_start_month: any;
  week_start_year: any;
  weeksday: any;
  weeksmonth: any;
  previousmonths: any;

  datesmonth = [
    { id: 0, name: "يناير" },
    { id: 1, name: "فبراير" },
    { id: 2, name: "مارس" },
    { id: 3, name: "أبريل" },
    { id: 4, name: "مايو" },
    { id: 5, name: "يونيو" },
    { id: 6, name: "يوليو" },
    { id: 7, name: "أغسطس" },
    { id: 8, name: "سبتمبر" },
    { id: 9, name: "أكتوبر" },
    { id: 10, name: "نوفمبر" },
    { id: 11, name: "ديسمبر" }
  ];

  datesday = [
    { id: 1, name: "الاثنين" },
    { id: 2, name: "الثلاثاء" },
    { id: 3, name: "الاربعاء" },
    { id: 4, name: "الخميس" },
    { id: 5, name: "الجمعة" },
    { id: 6, name: "السبت" },
    { id: 7, name: "الاحد" }
  ];
  dateToFetch: string;
  activities = [];
  ngOnInit() {
    var month_name;
    var d = new Date();
    var month = d.getMonth();
    var month_id = month;
    var y = d.getFullYear();
    this.year = y;

    this.previousmonths = this.getMonthsBefore(month.toString(), this.year);

    month_name = moment()
      .locale("ar_SA")
      .month(month)
      .format("MMMM");

    this.selectedGroup = month_name;

    this.calcul_week_day_by_id(month_id, this.year);

    this.toggle();
  }
  changedValue(t) {
    let month_id;
    this.year = parseInt(t.target.selectedOptions[0].attributes.year.value);
    this.datesmonth.forEach(
      function(value) {
        if (value["name"] == t.target.value) {
          month_id = value["id"];
        }
      }.bind(this)
    );
    const startDay = moment()
      .year(this.year)
      .month(month_id)
      .startOf("month")
      .startOf("isoWeek")
      .format("YYYY-MM-DD");
    const endDay = moment()
      .year(this.year)
      .month(month_id)
      .endOf("month")
      .endOf("isoWeek")
      .format("YYYY-MM-DD");
    this.getAllHistorique(startDay.toString(), endDay.toString());
    this.calcul_week_day_by_id(month_id, this.year);
    this.changeDetector.detectChanges();
    this.createCustomLiBasedOnActivity(this.activities);
  }

  calcul_week_day_by_id(month_id, year) {
    let week_data = this.getAllWeekForMonth(month_id, year);
    this.week_end_name = week_data.week_end_day_name;
    this.week_end_number = week_data.week_end_day_number;
    this.week_end_month = week_data.week_end_day_month;
    this.week_end_year = week_data.week_end_day_year;
    this.week_start_name = week_data.week_start_day_name;
    this.week_start_number = week_data.week_start_day_number;
    this.week_start_month = week_data.week_start_day_month;
    this.week_start_year = week_data.week_start_day_year;
    this.weeksday = week_data.weeksday;
    this.weeksmonth = week_data.weeksmonth;
  }

  getMonthsBefore(month: string, year: number, substractBy = 12) {
    let months: Array<string> = [];
    let years: Array<string> = [];
    for (let index = 0; index < substractBy; index++) {
      let month_item = moment()
        .year(year)
        .month(month)
        .subtract(index, "months")
        .locale("ar-SA")
        .format("MMMM");
      let year_item = moment()
        .year(year)
        .month(month)
        .subtract(index, "months")
        .locale("en")
        .format("YYYY");

      months.push(month_item);
      years.push(year_item);
    }
    return { months, years };
  }

  //fonction toggle lorsq'on clique sur un element
  toggle() {
    $(document).on("click", ".titre1", function() {
      this.querySelector(".nested").classList.toggle("active");
      this.querySelector(".caret").classList.toggle("caret-down");
    });

    $(document).on("click", ".titre2", function(event) {
      event.stopPropagation();
      this.querySelector(".nested-child").classList.toggle("active");
      this.querySelector(".caret-child").classList.toggle("caret-down");
    });
  }

  getMonthFromArToNumber(month: number) {
    let value = this.datesmonth.filter(item => item.id == month - 1)[0].name;
    return value;
  }

  toogleSpecificNode() {
    this.routerActivated.queryParamMap.subscribe();
    this.dateToFetch = this.routerActivated.snapshot.queryParamMap.get("date");
    let dateToGo = "03-12-2018";
    if (dateToGo) {
      let testDate: any[] = dateToGo.split("-");
      let dateItem = `${testDate[2]},${this.getMonthFromArToNumber(
        testDate[1]
      )},${testDate[0]}`;
      let element = document.querySelectorAll(".nested li");
      let array_list = Array.from(element);
      array_list.forEach(function(elem) {
        if (elem["dataset"].day === dateItem) {
          elem.parentElement.setAttribute("class", "nested active");
          elem.parentElement.parentElement.children[0].setAttribute(
            "class",
            "caret caret-down"
          );
          elem.children[0].setAttribute("class", "caret-child caret-down");
          elem.children[1].setAttribute("class", "nested-child active");
          return;
        }
      });
    }
  }

  //get days start /end  of the week
  getAllWeekForMonth(month: number, year: number) {
    let week_start_day_number = [];
    let week_start_day_month = [];
    let week_start_day_name = [];
    let week_start_day_year = [];
    let week_end_day_number = [];
    let week_end_day_month = [];
    let week_end_day_name = [];
    let week_end_day_year = [];
    let startOfWeek;
    let endOfWeek;
    let weeksday = [];
    let weeksmonth = [];
    var days = [];
    var months = [];

    startOfWeek = moment()
      .month(month)
      .year(this.year)
      .startOf("month")
      .startOf("isoWeek");
    endOfWeek = moment()
      .year(this.year)
      .startOf("month")
      .endOf("isoWeek")
      .add(0, "week");

    // var day = startOfWeek;

    // while (day <= endOfWeek) {
    //   days.push(day.locale("en").format("DD"));
    //   months.push(day.locale("ar_SA").format("MMMM"));
    //   day = day.clone().add(1, "d");
    // }

    // weeksday[0] = days;
    // weeksmonth[0] = months;

    let index = moment().month() === month ? -1 : 0;
    /**
     * First day for the first Week of the month
     */
    // week_start_day_name.push(
    //   moment()
    //     .locale("ar_SA")
    //     .month(month)
    //     .startOf("month")
    //     .startOf("isoWeek")
    //     .format("dddd")
    // );
    // week_start_day_number.push(
    //   Number(
    //     moment()
    //       .month(month)
    //       .startOf("month")
    //       .startOf("isoWeek")
    //       .format("DD")
    //   )
    // );
    // week_start_day_month.push(
    //   moment()
    //     .locale("ar_SA")
    //     .month(month)
    //     .startOf("month")
    //     .startOf("isoWeek")
    //     .format("MMMM")
    // );
    // week_start_day_year.push(
    //   moment()
    //     .locale("en")
    //     .month(month)
    //     .startOf("month")
    //     .startOf("isoWeek")
    //     .format("YYYY")
    // );
    // /**
    //  * Last Day of the first week
    //  */
    // week_end_day_name.push(
    //   moment()
    //     .locale("ar_SA")
    //     .month(month)
    //     .startOf("month")
    //     .endOf("isoWeek")
    //     .add(0, "week")
    //     .format("dddd")
    // );
    // week_end_day_number.push(
    //   Number(
    //     moment()
    //       .month(month)
    //       .startOf("month")
    //       .endOf("isoWeek")
    //       .add(0, "week")
    //       .format("DD")
    //   )
    // );
    // week_end_day_month.push(
    //   moment()
    //     .locale("ar_SA")
    //     .month(month)
    //     .startOf("month")
    //     .endOf("isoWeek")
    //     .add(0, "week")
    //     .format("MMMM")
    // );
    // week_end_day_year.push(
    //   moment()
    //     .locale("en")
    //     .month(month)
    //     .startOf("month")
    //     .endOf("isoWeek")
    //     .add(0, "week")
    //     .format("YYYY")
    // );
    console.log(year);
    // Get Week number of a month
    let weekOfMonth = (
      moment()
        .month(month)
        .daysInMonth() / 7
    ).toFixed();

    // Iterator for the next Weeks
    for (let index = 0; index <= parseInt(weekOfMonth); index++) {
      startOfWeek = moment()
        .month(month)
        .year(this.year)
        .startOf("month")
        .startOf("isoWeek")
        .add(index, "weeks");
      endOfWeek = moment()
        .month(month)
        .year(this.year)
        .startOf("month")
        .endOf("isoWeek")
        .add(index, "weeks");

      var days = [];
      var months = [];
      let day = startOfWeek;
      while (day <= endOfWeek) {
        if (
          moment()
            .year(this.year)
            .format("MM") == day.locale("en").format("MM") &&
          moment()
            .year(this.year)
            .format("DD-MM-YYYY") < day.locale("en").format("DD-MM-YYYY")
        ) {
          break;
        } else {
          days.push(day.locale("en").format("DD"));
          months.push(day.locale("ar_SA").format("MMMM"));
          day = day.clone().add(1, "d");
        }
      }
      weeksday.push(days);
      weeksmonth.push(months);
      // if (
      //   (moment().format("MM") >= startOfWeek.locale("en").format("MM") &&
      //     moment().format("DD") > startOfWeek.locale("en").format("DD")) ||
      //   index == 0
      // ) {
      //   // if () {
      //   //   console.log("grand");
      //   // } else
      //   console.log(index, startOfWeek.toDate(), endOfWeek.toDate());
      // } else {
      //   console.log("moins", index);
      // }

      // if (
      //   (moment().format("MM") >= startOfWeek.locale("en").format("MM") &&
      //     moment().format("DD") > startOfWeek.locale("en").format("DD")) ||
      //   index == 0
      // ) {
      if (
        moment()
          .year(this.year)
          .format("MM") === endOfWeek.locale("en").format("MM") &&
        moment()
          .year(this.year)
          .format("MM") >= startOfWeek.locale("en").format("MM") &&
        moment()
          .year(this.year)
          .format("DD") >= startOfWeek.locale("en").format("DD")
      ) {
        week_start_day_name.push(
          moment()
            .locale("ar_SA")
            .month(month)
            .year(this.year)
            .startOf("month")
            .add(index, "weeks")
            .startOf("isoWeek")
            .format("dddd")
        );
        week_start_day_number.push(
          moment()
            .month(month)
            .year(this.year)
            .startOf("month")
            .add(index, "weeks")
            .startOf("isoWeek")
            .format("DD")
        );
        week_start_day_month.push(
          moment()
            .locale("ar_SA")
            .month(month)
            .year(this.year)
            .startOf("month")
            .add(index, "weeks")
            .startOf("isoWeek")
            .format("MMMM")
        );
        week_start_day_year.push(
          moment()
            .locale("en")
            .year(this.year)
            .month(month)
            .startOf("month")
            .add(index, "weeks")
            .startOf("isoWeek")
            .format("YYYY")
        );
        //end day
        if (
          moment()
            .year(this.year)
            .format("DD") >
          moment()
            .month(month)
            .year(this.year)
            .startOf("month")
            .add(index, "weeks")
            .endOf("isoWeek")
            .format("DD")
        ) {
          week_end_day_name.push(
            moment()
              .locale("ar_SA")
              .month(month)
              .year(this.year)
              .startOf("month")
              .add(index, "weeks")
              .endOf("isoWeek")
              .format("dddd")
          );
          week_end_day_number.push(
            moment()
              .month(month)
              .year(this.year)
              .startOf("month")
              .add(index, "weeks")
              .endOf("isoWeek")
              .format("DD")
          );
        } else {
          week_end_day_name.push(moment().format("dddd"));
          week_end_day_number.push(moment().format("DD"));
        }
        week_end_day_month.push(
          moment()
            .locale("ar_SA")
            .month(month)
            .year(this.year)
            .startOf("month")
            .add(index, "weeks")
            .endOf("isoWeek")
            .format("MMMM")
        );
        week_end_day_year.push(
          moment()
            .locale("en")
            .month(month)
            .year(this.year)
            .startOf("month")
            .add(index, "weeks")
            .endOf("isoWeek")
            .format("YYYY")
        );
      } else if (
        moment()
          .year(this.year)
          .format("MM") !== startOfWeek.locale("en").format("MM")
      ) {
        console.log("here");
        week_start_day_name.push(
          moment()
            .locale("ar_SA")
            .month(month)
            .year(this.year)
            .startOf("month")
            .add(index, "weeks")
            .startOf("isoWeek")
            .format("dddd")
        );
        week_start_day_number.push(
          moment()
            .month(month)
            .year(this.year)
            .startOf("month")
            .add(index, "weeks")
            .startOf("isoWeek")
            .format("DD")
        );
        week_start_day_month.push(
          moment()
            .locale("ar_SA")
            .month(month)
            .year(this.year)
            .startOf("month")
            .add(index, "weeks")
            .startOf("isoWeek")
            .format("MMMM")
        );
        week_start_day_year.push(
          moment()
            .locale("en")
            .month(month)
            .year(this.year)
            .startOf("month")
            .add(index, "weeks")
            .startOf("isoWeek")
            .format("YYYY")
        );
        //end day
        week_end_day_name.push(
          moment()
            .locale("ar_SA")
            .month(month)
            .year(this.year)
            .startOf("month")
            .add(index, "weeks")
            .endOf("isoWeek")
            .format("dddd")
        );
        week_end_day_number.push(
          moment()
            .month(month)
            .year(this.year)
            .startOf("month")
            .add(index, "weeks")
            .endOf("isoWeek")
            .format("DD")
        );
        week_end_day_month.push(
          moment()
            .locale("ar_SA")
            .month(month)
            .year(this.year)
            .startOf("month")
            .add(index, "weeks")
            .endOf("isoWeek")
            .format("MMMM")
        );
        week_end_day_year.push(
          moment()
            .locale("en")
            .month(month)
            .year(this.year)
            .startOf("month")
            .add(index, "weeks")
            .endOf("isoWeek")
            .format("YYYY")
        );
      }
    }
    return {
      weeksmonth,
      weeksday,
      week_start_day_name,
      week_start_day_number,
      week_start_day_month,
      week_start_day_year,
      week_end_day_name,
      week_end_day_number,
      week_end_day_month,
      week_end_day_year
    };
  }

  showDay(day) {
    console.log(day);
  }
}
