import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import { CookieService } from 'ngx-cookie-service';
import { ScoringService } from 'src/app/services/scoring-service/scoring-service.service';
import { ProfileService } from 'src/app/services/profile-service/profile.service';
import { NotifierService } from 'angular-notifier';

declare var $ :any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    @ViewChild('customNotificationLogin') customNotificationTmpl;

    private readonly notifier: NotifierService;
    username ;
    password ;

    constructor(private notifierService: NotifierService ,private profileService:ProfileService,private scoringService:ScoringService,private http: HttpClient,private router: Router,private localStorageService:LocalStorageService,private cookie:CookieService) {
        this.notifier = notifierService;
    }

  ngOnInit() {
      
    let local=this.localStorageService;

    //this.notifier['config']['position']['horizontal']['position']="right";
    //this.notifier['config']['position']['horizontal']['distance']=200;
          /*check session*/ 
          const req = this.http.post('../../../sessions/read.php', null)
          .subscribe(
            (res: any[]) => {
                this.router.navigateByUrl('/home');
            },
            err => {
              this.localStorageService.destructSession();
              this.router.navigateByUrl('/');
            }
          );
          //end

         /*authentication*/

            if(this.cookie.get('1')){
                this.username=this.cookie.get('1');
                this.password=this.cookie.get('11');
                $('#rememberCheck').prop('checked', true);
            }
            // Animate loader off screen
                
            $(document).find(".se-pre-con").fadeOut(2000);
            $(function () {
                if($('#pin').val().length != undefined){
                  if ($('#pin').val().length == 5) {
                      $('#pincheck').removeClass('yellow').addClass('green');
                      $('.im').each(function(){
                          $(this).attr('src', './assets/img/images/blue.png');
                      });
                  }
                }
            });

            $(function () {
          
                $('#pin').keypress(function (event) {
                    event.preventDefault();
                    return false;
                });
            });
          
            var input = $('.validate-input .input100');
          
          /*  $('#form-login').on('submit', function () {
             
          
            });*/
          
            //template functions
            $('.validate-form').on('submit', function () {
                var check = true;
          
                for (var i = 0; i < input.length; i++) {
                    if (validate(input[i]) == false) {
                        showValidate(input[i]);
                        check = false;
                    }
                }
          
                return check;
            });
            $('.validate-form .input100').each(function () {
                $(this).focus(function () {
                    hideValidate(this);
                });
            });
            //PIN buttons
            $(".num").click(function () {
                if ($('#pin').val().length !== 5) {
                    $('#pin').val($('#pin').val() + parseInt($(this).attr('num')));
                    this.password=$('#pin').val();
                    
                    console.log(this.password)
                    console.log($('#pin').val())
                }
                if ($('#pin').val().length == 5) {
                    $('#pincheck').removeClass('yellow').addClass('green');
                }
            });
          
            $('.close').click(function () {
                $('#pin').val('');
                $('img').attr('src', './assets/img/images/grey.png');
                $('#pincheck').removeClass('green').addClass('yellow');
          
            });
            $("#pincheck").click(function () {
                if ($('#pin').val().length != 5)
                    alert('المرجو التأكد من صحة المعلومات');
                
            });
          
            $("#pinback").click(function () {
                $('#pin').val($('#pin').val().slice(0, -1));
                if ($('#pin').val().length == 4)
                    $('#pincheck').removeClass('green').addClass('yellow');
                switch ($('#pin').val().length) {
                    case 0:
                        $('#i1').attr('src', './assets/img/images/grey.png');
                        $('#i2').attr('src', './assets/img/images/grey.png');
                        $('#i3').attr('src', './assets/img/images/grey.png');
                        $('#i4').attr('src', './assets/img/images/grey.png');
                        $('#i5').attr('src', './assets/img/images/grey.png');
                        break;
                    case 1:
                        $('#i1').attr('src', './assets/img/images/blue.png');
                        $('#i2').attr('src', './assets/img/images/grey.png');
                        $('#i3').attr('src', './assets/img/images/grey.png');
                        $('#i4').attr('src', './assets/img/images/grey.png');
                        $('#i5').attr('src', './assets/img/images/grey.png');
                        break;
                    case 2:
                        $('#i1').attr('src', './assets/img/images/blue.png');
                        $('#i2').attr('src', './assets/img/images/blue.png');
                        $('#i3').attr('src', './assets/img/images/grey.png');
                        $('#i4').attr('src', './assets/img/images/grey.png');
                        $('#i5').attr('src', './assets/img/images/grey.png');
                        break;
                    case 3:
                        $('#i1').attr('src', './assets/img/images/blue.png');
                        $('#i2').attr('src', './assets/img/images/blue.png');
                        $('#i3').attr('src', './assets/img/images/blue.png');
                        $('#i4').attr('src', './assets/img/images/grey.png');
                        $('#i5').attr('src', './assets/img/images/grey.png');
                        break;
                    case 4:
                        $('#i1').attr('src', './assets/img/images/blue.png');
                        $('#i2').attr('src', './assets/img/images/blue.png');
                        $('#i3').attr('src', './assets/img/images/blue.png');
                        $('#i4').attr('src', './assets/img/images/blue.png');
                        $('#i5').attr('src', './assets/img/images/grey.png');
                        break;
                }
            });
          
            //allow submit from username
            $('#username').keypress(function (e) {
                if (e.which == 13) {
                    event.preventDefault;
                    $('.login100-form').submit();
                }
            });
          
            //compte types click
            $('#famille').click(function () {
                $('#loading-div').load('form_user.html');
                $('#type-compte').val('famille');
                $('#defaut-titre').hide();
          
            });
            $('#etablissement').click(function () {
                $('#type-compte').val('etablissement');
                $('#defaut-titre').hide();
                $('#etablissement-titre').removeClass('form-hidden');
          
            });
            $('#individu').click(function () {
                $('#loading-div').load('form_individu.html');
                $('#type-compte').val('individu');
                $('#defaut-titre').hide();
                $('#individu-titre').removeClass('form-hidden');
            });
            $('.num').click(function () {
          
                switch ($('#pin').val().length) {
                    case 1:
                        $('#i1').attr('src', './assets/img/images/blue.png');
                        $('#i2').attr('src', './assets/img/images/grey.png');
                        $('#i3').attr('src', './assets/img/images/grey.png');
                        $('#i4').attr('src', './assets/img/images/grey.png');
                        $('#i5').attr('src', './assets/img/images/grey.png');
                        break;
                    case 2:
                        $('#i1').attr('src', './assets/img/images/blue.png');
                        $('#i2').attr('src', './assets/img/images/blue.png');
                        $('#i3').attr('src', './assets/img/images/grey.png');
                        $('#i4').attr('src', './assets/img/images/grey.png');
                        $('#i5').attr('src', './assets/img/images/grey.png');
                        break;
                    case 3:
                        $('#i1').attr('src', './assets/img/images/blue.png');
                        $('#i2').attr('src', './assets/img/images/blue.png');
                        $('#i3').attr('src', './assets/img/images/blue.png');
                        $('#i4').attr('src', './assets/img/images/grey.png');
                        $('#i5').attr('src', './assets/img/images/grey.png');
                        break;
                    case 4:
                        $('#i1').attr('src', './assets/img/images/blue.png');
                        $('#i2').attr('src', './assets/img/images/blue.png');
                        $('#i3').attr('src', './assets/img/images/blue.png');
                        $('#i4').attr('src', './assets/img/images/blue.png');
                        $('#i5').attr('src', './assets/img/images/grey.png');
                        break;
                    case 5:
                        $('#i1').attr('src', './assets/img/images/blue.png');
                        $('#i2').attr('src', './assets/img/images/blue.png');
                        $('#i3').attr('src', './assets/img/images/blue.png');
                        $('#i4').attr('src', './assets/img/images/blue.png');
                        $('#i5').attr('src', './assets/img/images/blue.png');
                        break;
                    default:
                        $('img').attr('src', './assets/img/images/grey.png');
                        break;
                }         
            });
        

  //template functions
  function validate(input) {
      if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
          if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
              return false;
          }
      } else {
          if ($(input).val().trim() == '') {
              return false;
          }
      }
  }

  function showValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).addClass('alert-validate');
  }

  function hideValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).removeClass('alert-validate');
  }

}

  getprofile(userId,score_act){
      console.log(userId)
        this.profileService.getProfile(userId).subscribe(
            response=>{
                this.localStorageService.storeLocalStorage(response["user_information"][0],"profile");
                console.log("cv")
                console.log(response["user_information"][0]["score"])
                this.scoringService.updateScore(score_act,response["user_information"][0]["score"]);
                let msg = {
                    message: '+ 5 نقطة',
                    type: 'info'
                };
            
                this.notifier.show({
                    message: msg.message,
                    type: msg.type,
                    template: this.customNotificationTmpl
                 });
                 this.notifier['config']['behaviour']['autoHide']=1200;
            
                 console.log(this.notifier['config'])
                //this.notifier['config']['position']['horizontal']['position']="right";
                //this.notifier['config']['position']['horizontal']['distance']=200;
            },
            error=>{
                console.log("error")
            }
        ) 
  }

  insert_to_histo(userId,idClasse){
    let sentdata={
        "p1" : userId,
        "p2" : "CONN",
        "p3" : "5",//to be updated
        "p4" : "web",
        "p5" : idClasse
        }      
      console.log(sentdata)            
     this.http.put('../../../api/activite/insert_conn',sentdata)
      .subscribe(
        (response: any[]) => {
           console.log(response);
           this.router.navigateByUrl('/home');
           console.log("true")
           this.getprofile(userId,sentdata["p3"]);
        },
        err => {
          alert(err['message']);
      });
  }

  checked(){
    var rememberCheck = $('#rememberCheck').is(':checked'); // check if checkbox remember me is checked (true/false)!
    var var_this = $(this);
    this.password=$('#pin').val();
    let data = {"username":this.username,"password":this.password};
    console.log(data);
    const req = this.http.post('../../../api/user/authenticate', data)
     .subscribe(
      (response1: any[]) => {
        console.log("authenticate  ",response1);
        if(rememberCheck){
            this.cookie.set('1',this.username);
            this.cookie.set('11',this.password);
        }
        this.localStorageService.setToken("1");
        this.http.post('../../../sessions/create.php',response1['user_information'][0])
        .subscribe(
          (response2: any[]) => {
            console.log(response2);

            //send auth activity to table histo
            this.insert_to_histo(response1['user_information'][0]["id_user"],response1['user_information'][0]["id_classe"]);
          },
          err => {
            alert(err['message']);
      });
    },
      err => {
        alert('المرجو التأكد من صحة المعلومات');
        $('#pin').val('');
      }
    );
  }

}
