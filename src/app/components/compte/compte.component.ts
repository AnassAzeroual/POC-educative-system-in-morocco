import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router , ActivatedRoute } from "@angular/router";
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import { CookieService } from 'ngx-cookie-service';

declare var $: any;
@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css', './modal.component.css', './spinner.module.css']
})
export class CompteComponent implements OnInit {
  newLoginName: any;
  propositionLogin: any;
  showProposition: boolean;
  msgSuccessName: boolean;
  msgExistName: boolean;
  LoginName: string;
  profile = [];
  avatar_src_img: any;
  newPropositionLogin: string;
  msgSuccessPwd: boolean;
  msgSuccessemail: boolean;
  oldPassword: string;
  id_user: string;
  emailsended: string;
  emailUser: string;

  constructor(private http: HttpClient, 
              private route: ActivatedRoute ,
              private HomemRoute: Router ,
              private cookieService: CookieService, 
              private localStorageService : LocalStorageService){ }

  ngOnInit() {
    /*check session*/
    const req = this.http.post('../../../sessions/read.php', null)
    .subscribe(
      (res: any[]) => {
        // console.log(res["id_user"]);
        // console.table(res);
        // console.log(res["id_user"]);
        // alert(res["id_user"]);
        this.id_user = res["id_user"];
        this.oldPassword = res['password'];
        this.func_getProfile_info(res);
      },
      err => {
        this.localStorageService.destructSession();
        this.localStorageService.destructCookies();
        this.HomemRoute.navigateByUrl('/');
      }
    );
    //end
    this.route.fragment.subscribe((fragment:string) => {
      // console.log(fragment);
      this.toggle_open_accordion(fragment);
    })
         
    // console.log('issss here');
    // const session = this.http.post('../../../../../sessions/read.php', null )
    //   .subscribe(
    //     (read_session: any[]) => {
    //       console.log(read_session['password']);
    //       console.table(read_session);
    //       this.oldPassword = read_session['password'];
    //     },
    //     error => {
    //       console.log('Error ------- : ' + error);
    //     }
    //   );
  }
  func_getProfile_info(profile_user){
       // get user profile
       const reqLogin = this.http.post('../../../api/user/read', {'param': profile_user["id_user"] })
       .subscribe(
         (responses: any[]) => {
          this.profile = responses["user_information"][0];
           this.avatar_src_img = this.profile['avatar_user'];
           this.LoginName = this.profile['login_user'];
           this.emailUser = this.profile['email_user'];
          //  alert(this.LoginName);
              // console.table(this.profile);
           if (this.profile['type_user'] === 'E') {
             //  console.log('تلميذ');
             this.profile['type_user'] = 'تلميذ';
             }
         },
         error => {
           console.table(error);
         }
       );
  }
  toggle_open_accordion(target?:string) {
        if ($('.' + target).hasClass('activeSidebar')) {
          $('.' + target).removeClass('activeSidebar');
        }else {
          $('.' + target).addClass('activeSidebar');
        }
        $('.' + target).toggleClass('activeSidebar');
        // Remove activeSidebar class from other rows
        $('tr').not($('.' + target)).removeClass('activeSidebar');
        // Adds active class
        $('#' + target).toggleClass('active');
        // Expand or collapse this panel
        $('#' + target).next().slideToggle('fast');
        // Hide the other panels 
        $('.accordion__content').not($('#' + target).next()).slideUp('fast');
        // Removes active class from other titles
        $('.accordion__title').not($('#' + target)).removeClass('active');
  }
  // functions Modal open and close 
  Close_modal_change_user_name() {
    $('#animate_Style_User').removeClass('bounceInDown');
    $('#animate_Style_User').addClass('bounceOutUp');
    setTimeout(function() { $('#modal_change_user_name').css('display', 'none'); }, 800);
  }
  Open_modal_change_user_name() {
    this.msgExistName    = false;
    this.msgSuccessName  = false;
    this.showProposition = false;
    $('#animate_Style_User').removeClass('bounceOutUp');
    $('#animate_Style_User').addClass('bounceInDown');
    $('#modal_change_user_name').css('display', 'block');
  }
  Close_modal_change_user_password() {
    $('#animate_Style_User_Password').removeClass('bounceInDown');
    $('#animate_Style_User_Password').addClass('bounceOutUp');
    setTimeout(function() { $('#modal_change_user_password').css('display', 'none'); }, 800);
  }
  Open_modal_change_user_password() {
    $('#animate_Style_User_Password').removeClass('bounceOutUp');
    $('#animate_Style_User_Password').addClass('bounceInDown');
    $('#modal_change_user_password').css('display', 'block');
  }
  Close_modal_change_user_email() {
    $('#animate_Style_User_email').removeClass('bounceInDown');
    $('#animate_Style_User_email').addClass('bounceOutUp');
    setTimeout(function() { $('#modal_change_user_email').css('display', 'none'); }, 800);
  }
  Open_modal_change_user_email() {
    this.msgSuccessemail = false;
    $('#animate_Style_User_email').removeClass('bounceOutUp');
    $('#animate_Style_User_email').addClass('bounceInDown');
    $('#modal_change_user_email').css('display', 'block');
  }


  // partie user change login name

  change_login_name(newLoginName) {
    //console.log(newLoginName);
    if(newLoginName !== ''){
      // this.youCanChangeLoginName = false;
      this.newLoginName = newLoginName;
      // console.log('login name etap 1 :' + newLoginName + 'id:' + this.id_user);

      this.check_response(this.newLoginName);
      // console.log('login name etap 2 :' + newLoginName + 'id:' + this.id_user);
    }else
      alert('المرجوالتأكد من صحة المعلومات');

  }

  check_response(check_this_name_pls) {
    // console.log('is in check_response' + check_this_name_pls);
    // console.log(check_this_name_pls);
    // tslint:disable-next-line:max-line-length
    // alert('check this login : ' + check_this_name_pls);
    const check_loginName = this.http.post('../../../api/user/check_login', {'param': check_this_name_pls })
    .subscribe(
      (responses_check_login: any[]) => {
        // console.log("responses_check_login : ");
        // console.table(responses_check_login);        
        this.fun_applay_new_name(responses_check_login,check_this_name_pls);
      },
      error => {
    // console.log('is in check_response subscribe error');

        console.table(error);
      }
    );
  }
  fun_applay_new_name(resp_login_name_login, check_this_name_pls) {
    // console.log("info profile this.Profile  : ");
    // console.table(this.profile);
    if (resp_login_name_login['return values'][0]['p_retour'] !== '1') {
      // console.log('is in check_response if respo_newLoginName[0][p_retour] !== 1 ');
        // console.log('is not accepted name :/ , Promosition :' + resp_login_name_login['return values'][0]['p_login_out']);
        this.propositionLogin = resp_login_name_login['return values'][0]['p_login_out'];
        this.showProposition = true;
        this.msgSuccessName = false;
        if (resp_login_name_login['return values'][0]['p_login_out'] === null) {
        // console.log('is in respo_newLoginName = null');
          this.showProposition = false;
          this.msgExistName = true;
        }
      } else {
        // console.log('All is good');
        this.fun_All_isGood_YouCan_ChangeName(check_this_name_pls);
        this.showProposition = false;
        this.msgExistName = false;
        this.msgSuccessName = true;
        // -------------- this.modalsClose();
        // this.newPropositionLogin = respo_change_log[0]['p_login_out'];
      }
    }
  fun_All_isGood_YouCan_ChangeName(newLoginName) {
      // console.log(newLoginName);
      // tslint:disable-next-line:max-line-length
      const reqLogin = this.http.patch('../../../api/user/update_login', {'param1': this.id_user , 'param2': newLoginName } )
      .subscribe(
        (responses: any[]) => {
          this.LoginName = newLoginName;
          // console.log(responses);
          this.Close_modal_change_user_name();
        },
        error => {
          // console.log('Error ------- : ' + error);
        }
      );
  }
  doProposition(proposi: string) {
    // console.log('doProposition event is :' + proposi);
    this.newPropositionLogin = proposi;
  }
  /*=============================== Partie change user password ===============================*/
  checkpassword(old:string,new1:string,new2:string){
    // console.log(old);
    // console.log(new1);
    // console.log(new2);
    
      /*======================== Api rep password ========================*/
    if (new1.localeCompare(new2)==0 && this.oldPassword == old) {
      const reqLogin = this.http.patch('../../../api/user/update_password', {'param1':this.id_user ,'param2':new1} )
      .subscribe(
        (responses: any[]) => {
          console.table(responses);
          if (responses['http_code']== 200) {
            // console.log('success update password');
            this.msgSuccessPwd = true;
            this.Close_modal_change_user_password();
            this.destroyAllLogout();
          } else {
            // console.log('not success update password');
            this.msgSuccessPwd = false;
          }
        },
        error => {
          console.log(error);
        }
      );
    }else{
      alert('المرجوالتأكد من صحة المعلومات');
    }
    
  }
  checkemail(email1:string,email2:string){
    /*================ check if match email and confermation email ================*/
    if (  email1.localeCompare(email2) == 0 ) {
      /*================ check if empty email ================*/
      if ( email1.localeCompare("") == 0 || email2.localeCompare("") == 0 ) {
        $('#animate_Style_User_email').removeClass('bounceInDown');
        $('#animate_Style_User_email').addClass('shake');
        setTimeout(() =>{
          $('#animate_Style_User_email').removeClass('shake');
        }, 3000);
        return false;
      }
      /*================ check if new email ================*/
      if (email1.localeCompare(this.emailUser) == 0 || email2.localeCompare(this.emailUser) == 0 ) {
        alert('أدخل بارداً إلكترونياً جديداً' + this.emailUser);
        return false;
      }
        
      this.emailsended      = email1;
      $('#sendMsg').removeClass('pulse');
      $('#spenner').removeClass('rollOut');
      $('#spenner').addClass('loader rollIn');
      let token:string;
      token = Math.random().toString(36).slice(2);
      this.cookieService.set( 'Token_user', token );
      this.cookieService.set( 'ID_user', this.id_user );
      this.cookieService.set( 'User_email', this.emailsended );
      let dataSend = {
        "mail_to"     :  this.emailsended,
        "id"          :  this.id_user,
        "random"      :  token,
        "transmitter" : "eeduca.contact@gmail.com",
        "password"    : "educa2019"
      }
      const send = this.http.patch('../../../send/validate_email.php', dataSend )
      .subscribe(
        (responses: any[]) => {
        $('#spenner').addClass('rollOut');
        $('#spenner').removeClass('loader rollIn');
        this.msgSuccessemail  = true;
        $('#sendMsg').addClass('pulse');
        setTimeout(()=>{
          this.Close_modal_change_user_email();
        }, 4000);
          //console.table(responses);
          //this.Close_modal_change_user_email();
        },
        error => {
          $('#spenner').removeClass('loader');
          console.log(error);
        }
      );
    } else {
      alert('غير متطابق');
    }
  }
  destroyAllLogout(){
    const reqLogin = this.http.post('../../../../sessions/destroy.php', null)
        .subscribe(
          (response: any[]) => {
            this.localStorageService.destructSession();
            this.localStorageService.destructCookies();
            this.HomemRoute.navigateByUrl('/');
          },
          error => {
            console.log(error);
          }
        );
    
  }
}
