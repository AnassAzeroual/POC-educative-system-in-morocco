import { Component, OnInit, ViewChild } from "@angular/core";
import { CalendarComponent } from "ng-fullcalendar";
import "fullcalendar/dist/locale/ar-tn.js";
import * as moment from "moment";
import { AgendaService } from "src/app/services/agenda-service/agenda.service";
import { SessionService } from "src/app/services/session/session.service";
import { LocalStorageService } from "src/app/services/LocalStorage/local-storage.service";
import { Router } from "@angular/router";

declare var $: any;
@Component({
  selector: "app-agenda",
  templateUrl: "./agenda.component.html",
  styleUrls: ["./agenda.component.css","./modal.component.css"]
})
export class AgendaComponent implements OnInit {

  calendarOptions: any;
  displayEvent: any;
  selectedmatiere="الرياضيات";
  selectedcolor="lightblue";
  description="";
  choisedel;
  eventclickbol=false;
  idData;
  finished;
  startDate;
  endDate;
  titleModal;
  DeleteEvent;
  data: any = [];
  idUser;

  constructor(private router: Router,private serviceAgenda:AgendaService, private sessionService:SessionService, private localStorageService:LocalStorageService) {}

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  initialLocaleCode: string = "ar-ma";

  modal = { start_date: null,
            start_hour:null,
            start_minute:null,
            end_date:null,
            end_hour:null,
            end_minute:null             
  };

  ngOnInit() {

    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      showNonCurrentDates: false,
      header: {
        left: "next,prev today",
        center: "title",
        right: "month,agendaWeek,agendaDay,listMonth"
      },
      locale: this.initialLocaleCode,
      events: this.data,
      defaultView: "month",
      selectable: true,
      selectHelper:true,
      nowIndicator: true,
      firstDay:1,
    };

    this.checkSession();

    this.change_color();

  }

  checkSession(){
    this.sessionService.readSession()
      .subscribe(
        (res: any[]) => {
          this.idUser=res["id_user"];
          console.log(this.idUser)
          this.getEvents();
        },
        err => {
          this.localStorageService.destructSession();
          this.router.navigateByUrl('/');
        }
      );
  }

  getEvents(){
    let sentData={
      "id_user":this.idUser
    }
    console.log(sentData)
    this.serviceAgenda.getEventsAgenda(sentData)
      .subscribe(
        (res: any[]) =>{
          let data=res;
          this.changeAttribute(data);
        },
        err =>{
          alert("an error in request");
        }
      );
  }

  changeAttribute(data){
    console.log(data)
    let changedData=[];
    for(let i=0;i<data.length;i++) {
      let date=data[i]["start"].split(" ");
      //console.log(date[0])
      console.log(data[i]["start"].split(" ")[0])

      changedData[i]={
          id:data[i]["id"],
          title: data[i]["matiere"],
          date:data[i]["start"].split(" ")[0],
          start:data[i]["start"].split(" ")[0] + 'T'+data[i]["start"].split(" ")[1],
          end:data[i]["end"].split(" ")[0] + 'T'+data[i]["end"].split(" ")[1],
          color:data[i]["color"],
          idcheck:data[i]["title"],
          description:data[i]["description"],
          finished:data[i]["finished"]
        }
   }
   console.log(changedData)
   this.ucCalendar.fullCalendar('removeEvents'); 
   this.ucCalendar.fullCalendar('addEventSource', changedData);
   this.ucCalendar.fullCalendar('refetchEvents');
   this.data=changedData;
  }

  viewRender(data) {
    let { view } = data;
    console.log(view)
    var title = document.querySelectorAll(
      ".fc-header-toolbar .fc-center h2"
    )[0];
    if (view.name === "agendaWeek") {
      let { start, end } = view;
      if (start.format("YYYY") !== end.format("YYYY")) {
        title.innerHTML = `${start.format("DD MMMM YYYY")} – ${end.format(
          "DD MMMM YYYY"
        )}`;
      } else if (start.format("MMMM") !== end.format("MMMM")) {
        title.innerHTML = `${start.format("DD MMMM")} – ${end.format(
          "DD MMMM YYYY"
        )}`;
      } else {
        title.innerHTML = `${start.format("DD")} – ${end.format(
          "DD MMMM YYYY"
        )}`;
      }
    }
  }

  change_color(){

    $('document').ready(function(){

      $("#controle").prop("checked",true);

      $( ".mcolor2" ).change(function() {
      switch ($(".mcolor2").prop("selectedIndex")) {
      case 0:
          $(".mcolor2").css("background-color","lightblue");
          break;
      case 1:
           $(".mcolor2").css("background-color","orange");
          break;
      case 2:
           $(".mcolor2").css("background-color","skyblue");
          break;
      case 3:
           $(".mcolor2").css("background-color","pink");
          break;
      case 4:
           $(".mcolor2").css("background-color","yellow");
          break;
      case 5:
           $(".mcolor2").css("background-color","coral");
          break;
      case 6:
           $(".mcolor2").css("background-color","lightgreen");
          break;
      case 7:
           $(".mcolor2").css("background-color","chocolate");
          break;
    }
   });

  });

  }


  //+++++++++++ Functions Modal Open and Close with animations
  Close_modal_agenda() {

    $("#animate_Style_agenda").removeClass("bounceInDown");
    $("#animate_Style_agenda").addClass("bounceOutUp");
    setTimeout(function() {
      $("#calendarModal").css("display", "none");
    }, 100);

  }



  savedata(){
    this.modal.end_date.set({h: Number(this.modal.end_hour), m: Number(this.modal.end_minute)});
    this.modal.start_date.set({h: Number(this.modal.start_hour), m: Number(this.modal.start_minute)});

    let diff=this.modal.end_date.diff(this.modal.start_date, 'minutes')
    console.log('diff')
    console.log(diff)
    if(diff<=0){
        alert("يرجى إدخال الوقت المناسب");
    }
    else{
      this.saveRenderEvent();
    }
  }


  defineIdEvent(){
    let arr=[];
    let max;
    for(let i=0;i<this.data.length;i++) {
      arr.push(Number(this.data[i]["id"]));
    }
    console.log(arr)
    if(this.data.length==0){
      return max=0;
    }
    return max = Math.max(...arr)+1;
  }

  changeIdFinished(){
    if(this.finished==false){
      this.finished="0"
    }
    else{
      this.finished="1"
    }
  }

  saveRenderEvent(){
    let id=$('input[name=radioTitle]:checked').val();
  console.log("data")
  console.log(this.modal.end_date)

  let max=this.defineIdEvent();

  this.changeIdFinished();


  if(this.eventclickbol==false){
    let sentData={
      id_user:this.idUser,
      matiere: this.selectedmatiere,
      title:id,
      start: this.modal.start_date.format('YYYY-MM-DD') + ' '+this.modal.start_date.format("HH")+':'+this.modal.start_date.format("mm")+':00',
      end:  this.modal.end_date.format('YYYY-MM-DD') + ' '+this.modal.end_date.format("HH")+':'+this.modal.end_date.format("mm")+':00',
      color:this.selectedcolor,
      description:this.description,
      finished:this.finished
    }
    console.log(sentData)
    this.serviceAgenda.insert(sentData)
    .subscribe(
      res=>{
        this.data.push({
          id:max.toString(),
          title: this.selectedmatiere,
          date:this.modal.start_date,
          start: this.modal.start_date.format('YYYY-MM-DD') + 'T'+this.modal.start_date.format("HH")+':'+this.modal.start_date.format("mm")+':00',
          end:  this.modal.end_date.format('YYYY-MM-DD') + 'T'+this.modal.end_date.format("HH")+':'+this.modal.end_date.format("mm")+':00',
          color:this.selectedcolor,
          idcheck:id,
          description:this.description,
          finished:this.finished
        });
        console.log(this.data)
        //this.idData=this.data.length-1;
        this.ucCalendar.fullCalendar('renderEvent',
        {
          id:max.toString(),
          title:this.selectedmatiere,
          date:this.modal.start_date,
          start: this.modal.start_date.format('YYYY-MM-DD') + 'T'+this.modal.start_date.format("HH")+':'+this.modal.start_date.format("mm")+':00',
          end:  this.modal.end_date.format('YYYY-MM-DD') + 'T'+this.modal.end_date.format("HH")+':'+this.modal.end_date.format("mm")+':00',
          color:this.selectedcolor,
          idcheck:id,
          description:this.description,
          finished:this.finished
        },
        true);  
      },
      err=>{

      }
    )
  }
  else{
  console.log(this.idData)

     for(let i=0;i<this.data.length;i++) {
        if(this.data[i]['id']==this.idData){
          let sentData={
            id:this.data[i]['id'],
            title:id ,
            matiere:this.selectedmatiere,
            start: this.modal.start_date.format('YYYY-MM-DD') + ' '+this.modal.start_date.format("HH")+':'+this.modal.start_date.format("mm")+':00',
            end:  this.modal.end_date.format('YYYY-MM-DD') + ' '+this.modal.end_date.format("HH")+':'+this.modal.end_date.format("mm")+':00',
            color:this.selectedcolor,
            description:this.description,
            finished:this.finished,
            id_user:this.idUser
          }
          this.serviceAgenda.update(sentData)
               .subscribe(
                 res=>{
                  this.data[i]={
                    id:this.data[i]['id'],
                    title: this.selectedmatiere,
                    date:this.modal.start_date,
                    start: this.modal.start_date.format('YYYY-MM-DD') + 'T'+this.modal.start_date.format("HH")+':'+this.modal.start_date.format("mm")+':00',
                    end:  this.modal.end_date.format('YYYY-MM-DD') + 'T'+this.modal.end_date.format("HH")+':'+this.modal.end_date.format("mm")+':00',
                    color:this.selectedcolor,
                    idcheck:id,
                    description:this.description,
                    finished:this.finished
                  };
                  this.ucCalendar.fullCalendar('removeEvents'); 
                  this.ucCalendar.fullCalendar('addEventSource', this.data);
                  this.ucCalendar.fullCalendar('refetchEvents');

                    console.log(res)
                 },
                 err=>{
                  console.log(err)
                 }
               );

        }
     }

  }
  setTimeout(function() {
    $("#calendarModal").css("display", "none");
  }, 100);
  }



  deletedata(){
    console.log(this.idData)

    for(let i=0;i<this.data.length;i++) {
      if(this.data[i]['id']==this.idData){
        console.log("del");
        this.serviceAgenda.delete({"id":this.idData})
            .subscribe(
              res=>{
                this.data.splice(this.data.indexOf(this.data[i]),1);
                this.ucCalendar.fullCalendar('removeEvents'); 
                console.log(this.data)
                this.ucCalendar.fullCalendar('addEventSource', this.data);
                this.ucCalendar.fullCalendar('refetchEvents');  
                setTimeout(function() {
                  $("#calendarModal").css("display", "none");
                }, 100);
              },
              err=>{
                alert("erreur de suppression")
              }
            );
      }
    }
    console.log(this.data)

  }



  //update event
  eventClick(model: any) {
    console.log(model.event)
    this.eventclickbol=true;
    console.log(model.event);
    this.DeleteEvent=true;
    //console.log(this.DeleteEvent);
    this.titleModal="تغيير الحدث";
    this.Open_modal_event(model.event);
  }


  Open_modal_event(event) {
    $("#calendarModal").css("z-index", "99999");
    $("#calendarModal").css("display", "block");
    this.modal.start_date=event.start;
    
    this.modal.end_date=event.end;
    this.modal.start_hour = event.start.format("HH");
    this.modal.start_minute = event.start.format("mm");
    this.modal.end_hour = event.end.format("HH");
    this.modal.end_minute = event.end.format("mm");
    this.selectedcolor=event.color;
    this.selectedmatiere=event.title;
    this.description=event.description;
    this.idData=event.id;
    console.log(this.idData)
    if(event.finished=="1"){
      this.finished=true;
    }else{
      this.finished=false;
    }
    let idcheck=this.getIdCheck(event.idcheck);
    $("#"+idcheck).prop("checked",true);
    $(".mcolor2").css("background-color",this.selectedcolor);
    console.log(this.modal);
  }

  getIdCheck(idcheck){
    switch(idcheck){
      case 'فرض': return 'controle';
      break;
      case 'واجبات': return 'devoir';
      break;
      case 'دروس': return 'cours';
      break;
      case 'عطلة': return 'vacance';
      break;
      case 'انشطة متنوعة': return 'autre';
      break;
    }
  }

  Open_modal_agenda(day) {
    $("#calendarModal").css("z-index", "99999");
    $("#calendarModal").css("display", "block");
    this.modal.start_date=day.start;
    if(day.view.name=="month"){
      this.modal.end_date=day.end.subtract(1,'days');
    }else{
      this.modal.end_date=day.end;
    }
    this.modal.start_hour = day.start.format("HH");
    console.log(day.start);
    this.modal.start_minute = day.start.format("mm");
    let endDate=day.end.add(0,'m');
    //this.startDate=day.end.format('HH:mm:ss');
    //this.endDate=endDate.format('HH:mm:ss');
    console.log(endDate)
    this.modal.end_hour = endDate.format("HH");
    this.modal.end_minute = endDate.format("mm");
  }


  dropEvent(model: any) {

    console.log("drop");
    console.log(model.event.id);
    for(var i=0;i<this.data.length;i++){
      if(model.event.id==this.data[i]["id"]){
        this.data[i]["date"]=model.event.start.format('YYYY-MM-DD');
          this.data[i]["start"]=model.event.start.format('YYYY-MM-DD') + 'T'+model.event.start.format("HH")+':'+model.event.start.format("mm")+':00';
          this.data[i]["end"]=model.event.end.format('YYYY-MM-DD') + 'T'+model.event.end.format("HH")+':'+model.event.end.format("mm")+':00';
      }
    }
    //this.displayEvent = model;
  }

  resizeEvent(model: any) {

    console.log("resize");
    console.log(model.event);
    //this.displayEvent = model;
    for(var i=0;i<this.data.length;i++){
      if(model.event.id==this.data[i]["id"]){
        this.data[i]["date"]=model.event.start.format('YYYY-MM-DD');
          this.data[i]["start"]=model.event.start.format('YYYY-MM-DD') + 'T'+model.event.start.format("HH")+':'+model.event.start.format("mm")+':00';
          this.data[i]["end"]=model.event.end.format('YYYY-MM-DD') + 'T'+model.event.end.format("HH")+':'+model.event.end.format("mm")+':00';
      }
    }
  }

  selectEvent(model: any) {
    console.log("select");
    console.log(model);
    this.dayEvent(model)
    //this.displayEvent = model;
  }


  render(event){

    console.log("render")
    console.log(event)
    event.element.find('.fc-title').remove();
    event.element.find('.fc-time').remove();
    event.element.find('.fc-content').append("<div class='fc-time'>"+event.event.end.format('HH:mm')+"-"+event.event.start.format('HH:mm')+"</div>");
    event.element.find('.fc-content').append("<span class='fc-title'>"+event.event.idcheck+"</span>");
    if (moment(new Date(), 'DD.mm.YYYY').format('YYYY-MM-DD:HH:mm:ss') > moment(event.event.end, 'DD.MM.YYYY').format('YYYY-MM-DD:HH:mm:ss') && event.event.finished == false) {
      event.element.find('.fc-time').append("<span><i class='fa fa-exclamation-triangle' style='font-size:150%;color:red;margin-top:1%;'></i></span>");
    }
    if (event.event.description) {
      event.element.find('.fc-title').append("<br/> <span class='descSpan'>" + event.event.description + "<span>");
      }
    if (event.event.title) {
      event.element.find('.fc-title').append("<br/><b>" + event.event.title + "<b>");
  }
  if (event.event.finished == "1") {
      event.element.find('.fc-title').css('text-decoration', 'line-through');
      event.element.find('.fc-content').css('background', 'lightgreen').css('border', 'none');

  }
  }

  //when we click on a division
  dayEvent(model: any) {
    console.log("click")
    console.log(model)
    this.eventclickbol=false;
    this.selectedmatiere="الرياضيات";
    this.selectedcolor="lightblue";
    this.description="";
    this.finished=false;
    $("#controle").prop("checked",true);
    $(".mcolor2").css("background-color","lightblue");
    //console.log(model.date);
    // console.log("yoyoyo")
    this.titleModal="إنشاء حدث جديد";
    this.DeleteEvent=false;
    this.Open_modal_agenda(model);
  }

}
