import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

declare var $:any;
@Component({
  selector: 'app-email-validate',
  templateUrl: './email-validate.component.html',
  styleUrls: ['./email-validate.component.css', './modal.component.css']
})
export class EmailValidateComponent implements OnInit {
  msgSuccessemail: boolean;
  sub: any;
  Param_id_user: string;
  Param_token_user: string;
  Param_email_user: string;
  localToken: string;
  localID: string;
  email: string;
  token: string;
  localEmail: string;

  constructor(private http: HttpClient,private compteRoute: Router ,private route: ActivatedRoute,private cookieService: CookieService) { }

  ngOnInit() {
    this.Open_modal_change_user_email();
    this.sub = this.route.params.subscribe(params => {
      //----------- get paramétres from url
      this.Param_id_user    = params['id'];
      this.Param_token_user = params['token'];
      this.Param_email_user = params['email'];
      //----------- get loal token and id of user
      this.localToken = this.cookieService.get('Token_user');
      this.localID    = this.cookieService.get('ID_user');
      this.localEmail = this.cookieService.get('User_email');
      //----------- check if match token and id user
      if (this.localToken != this.Param_token_user || this.localID != this.Param_id_user) {
        alert('المرجو إعادة المحاولة لاحقاً');
        this.compteRoute.navigateByUrl('/compte#info_perso');
      }
    });
  }
  // security
  func_check_login(user,password){
    // get user profile
    var data = {"username":user,"password":password};
    const req = this.http.post('../../../../api/user/authenticate', data)
    .subscribe(
      (userdataserv: any[]) => {
        // console.log(userdataserv);
        // console.log(userdataserv['user_information'][0]['id_user']);
        if ( this.localID == userdataserv['user_information'][0]['id_user'] ) {
          this.func_save_new_email(this.Param_id_user,this.localEmail)
        } else {
          alert('أعد المحاولة')
        }
     },
     error => {
      $('#animate_Style_User_email').removeClass('bounceInDown');
      $('#animate_Style_User_email').addClass('shake');
      setTimeout(() =>{
       $('#animate_Style_User_email').removeClass('shake');
      }, 3000);
      // alert('إسم المستعمل أو رمز المستعمل خاطئ');
      // console.warn(error);
    });
    }
 
  func_save_new_email(id_user:string,newEmail:string){
    // console.log(id_user +" | "+ newEmail);
    const emails = this.http.patch('../../../../api/user/change_mail', {'param1': id_user ,'param2':newEmail} )
      .subscribe(
        (email_response: any[]) => {
          // console.table(email_response);
          this.msgSuccessemail = true;
          $('#animate_Style_User_email').removeClass('bounceInDown');
          setTimeout(() =>{
            $('#animate_Style_User_email').addClass('flipOutY');
          }, 2000);
          this.cookieService.delete('Token_user');
          this.cookieService.delete('ID_user');
          this.cookieService.delete('User_email');
          this.compteRoute.navigateByUrl('/compte#info_perso');
        },
        error => {
          alert('المرجو إعادة المحاولة لاحقاً');
          this.compteRoute.navigateByUrl('/compte#info_perso');
          console.warn(error);
        }
      );
  }

  goback(){
    this.compteRoute.navigateByUrl('/compte#info_perso');
  }
  Open_modal_change_user_email() {
    this.msgSuccessemail = false;
    $('#animate_Style_User_email').removeClass('bounceOutUp');
    $('#animate_Style_User_email').addClass('bounceInDown');
    $('#modal_change_user_email').css('display', 'block');
  }
  Close_modal_change_user_email() {
    this.msgSuccessemail = false;
    $('#animate_Style_User_email').removeClass('bounceOutUp');
    $('#animate_Style_User_email').addClass('bounceInDown');
    $('#modal_change_user_email').css('display', 'none');
  }

  toggle_open_accordion(str){

  }
}
