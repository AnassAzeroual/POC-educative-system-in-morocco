import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import { Router } from '@angular/router';
// import { arr } from './avatar.module';
// import { from } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-profil',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css', './modal.component.css' ]
})
export class ProfilComponent implements OnInit {
  // avatars: Avatar =  [];
  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router) { }
  profile = [];
  girl_Avatars;
  id;
  respo;
  avatar_src_img;
  newLoginName;
  showProposition = false;
  msgExistName = false;
  msgSuccessName = false;
  propositionLogin: string;
  newPropositionLogin: string;
  id_avatar_selected;
  respo_newLoginName;
  LoginName;
  modalClose;
  user_data;

 
  ngOnInit() {
     /*check session*/
     const req = this.http.post('../../../sessions/read.php', null)
     .subscribe(
       (res: any[]) => {
         this.user_data = res;
         this.fun_getProfile(res);
       },
       err => {
         this.localStorageService.destructSession();
         this.router.navigateByUrl('/');
       }
     );

   this.girl_Avatars = [
    { id: '002-girl',     src: './assets/img/Avatar/002-girl.png',    name: '002-girl' },
    { id: '003-girl',     src: './assets/img/Avatar/003-girl.png',    name: '003-girl' },
    { id: '004-girl',     src: './assets/img/Avatar/004-girl.png',    name: '004-girl' },
    { id: '005-girl',     src: './assets/img/Avatar/005-girl.png',    name: '005-girl' },
    { id: '006-girl',     src: './assets/img/Avatar/006-girl.png',    name: '006-girl' },
    { id: '007-girl',     src: './assets/img/Avatar/007-girl.png',    name: '007-girl' },
    { id: '008-girl',     src: './assets/img/Avatar/008-girl.png',    name: '008-girl' },
    { id: '009-girl',     src: './assets/img/Avatar/009-girl.png',    name: '009-girl' },
    { id: '010-girl',     src: './assets/img/Avatar/010-girl.png',    name: '010-girl' },
    { id: '011-girl',     src: './assets/img/Avatar/011-girl.png',    name: '011-girl' },
    { id: '012-girl',     src: './assets/img/Avatar/012-girl.png',    name: '012-girl' },
    { id: '013-girl',     src: './assets/img/Avatar/013-girl.png',    name: '013-girl' },
    { id: '014-girl',     src: './assets/img/Avatar/014-girl.png',    name: '014-girl' },
    { id: '015-girl',     src: './assets/img/Avatar/015-girl.png',    name: '015-girl' },
    { id: '016-girl',     src: './assets/img/Avatar/016-girl.png',    name: '016-girl' },
    { id: '017-girl',     src: './assets/img/Avatar/017-girl.png',    name: '017-girl' },
    { id: '018-girl',     src: './assets/img/Avatar/018-girl.png',    name: '018-girl' },
    { id: '019-man',      src: './assets/img/Avatar/019-man.png',     name: '019-man' },
    { id: '020-boy',      src: './assets/img/Avatar/020-boy.png',     name: '020-boy' },
    { id: '021-punk',     src: './assets/img/Avatar/021-punk.png',    name: '021-punk' },
    { id: '022-man-1',    src: './assets/img/Avatar/022-man-1.png',   name: '022-man-1' },
    { id: '024-boy-1',    src: './assets/img/Avatar/024-boy-1.png',   name: '024-boy-1' },
    { id: '025-boy-2',    src: './assets/img/Avatar/025-boy-2.png',   name: '025-boy-2' },
    { id: '026-man-2',    src: './assets/img/Avatar/026-man-2.png',   name: '026-man-2' },
    { id: '027-man-3',    src: './assets/img/Avatar/027-man-3.png',   name: '027-man-3' },
    { id: '028-boy-3',    src: './assets/img/Avatar/028-boy-3.png',   name: '028-boy-3' },
    { id: '029-man-4',    src: './assets/img/Avatar/029-man-4.png',   name: '029-man-4' },
    { id: '030-girl-19',  src: './assets/img/Avatar/030-girl-19.png', name: '030-girl-19' },
    { id: '031-girl-20',  src: './assets/img/Avatar/031-girl-20.png', name: '031-girl-20' },
    { id: '032-boy-4',    src: './assets/img/Avatar/032-boy-4.png',   name: '032-boy-4' },
    { id: '033-man-5',    src: './assets/img/Avatar/033-man-5.png',   name: '033-man-5' },
    { id: '034-girl-21',  src: './assets/img/Avatar/034-girl-21.png', name: '034-girl-21' },
    { id: '035-boy-5',    src: './assets/img/Avatar/035-boy-5.png',   name: '035-boy-5' },
    { id: '036-person',   src: './assets/img/Avatar/036-person.png',  name: '/036-person' },
    { id: '037-boy-6',    src: './assets/img/Avatar/037-boy-6.png',   name: '037-boy-6' },
    { id: '038-man-6',    src: './assets/img/Avatar/038-man-6.png',   name: '038-man-6' },
    { id: '039-man-7',    src: './assets/img/Avatar/039-man-7.png',   name: '039-man-7' },
    { id: '040-boy-7',    src: './assets/img/Avatar/040-boy-7.png',   name: '040-boy-7' },
    { id: '041-man-8',    src: './assets/img/Avatar/041-man-8.png',   name: '041-man-8' },
    { id: '042-man-9',    src: './assets/img/Avatar/042-man-9.png',   name: '042-man-9' },
    { id: '043-man-10',   src: './assets/img/Avatar/043-man-10.png',  name: '/043-man-10' },
    { id: '044-boy-8',    src: './assets/img/Avatar/044-boy-8.png',   name: '044-boy-8' },
    { id: '045-girl-22',  src: './assets/img/Avatar/045-girl-22.png', name: '045-girl-22' },
    { id: '046-boy-9',    src: './assets/img/Avatar/046-boy-9.png',   name: '046-boy-9' },
    { id: '047-girl-23',  src: './assets/img/Avatar/047-girl-23.png', name: '047-girl-23' },
    { id: '048-girl-24',  src: './assets/img/Avatar/048-girl-24.png', name: '048-girl-24' },
    { id: '049-girl-25',  src: './assets/img/Avatar/049-girl-25.png', name: '049-girl-25' },
    { id: '050-girl-26',  src: './assets/img/Avatar/050-girl-26.png', name: '050-girl-26' },
    { id: 'boy',          src: './assets/img/Avatar/boy.png',         name: 'boy' },
    { id: 'boy-1',        src: './assets/img/Avatar/boy-1.png',       name: 'boy-1' },
    { id: 'girl',         src: './assets/img/Avatar/girl.png',        name: 'girl' },
    { id: 'girl-1',       src: './assets/img/Avatar/girl-1.png',      name: 'girl-1' },
    { id: 'man',          src: './assets/img/Avatar/man.png',         name: 'man' },
    { id: 'man-1',        src: './assets/img/Avatar/man-1.png',       name: 'man-1' },
    { id: 'man-2',        src: './assets/img/Avatar/man-2.png',       name: 'man-2' },
    { id: 'man-3',        src: './assets/img/Avatar/man-3.png',       name: 'man-3' },
    { id: 'man-4',        src: './assets/img/Avatar/man-4.png',       name: 'man-4' }
  ];
  }
  fun_getProfile(data_user_param){
    // get user profile
    const local = this.localStorageService;
    const key = 'profile';
    const reqLogin = this.http.post('../../../api/user/read', {'param': data_user_param["id_user"]})
    .subscribe(
      (responses: any[]) => {
      local.storeLocalStorage(responses["user_information"][0], key);
        this.profile = responses["user_information"][0];
        this.avatar_src_img = this.profile['avatar_user'];
        this.LoginName = this.profile['login_user'];
      //  console.table(this.profile);
        if (this.profile['type_user'] === 'E') {
          // console.log('تلميذ');
          this.profile['type_user'] = 'تلميذ';
          }
      },
      error => {
        console.table(error);
      }
    );
  }


  avatarSelected(id_img) {
    // const target = event.target || event.srcElement || event.currentTarget;
    // const idAttr = target.attributes.id;
    // const id_img = idAttr.nodeValue;
    this.id = id_img;
  }
  saveNewAvatar() {
    this.avatar_src_img = this.id;
    // console.log('save is clicked : ', this.id);
    // insert profile avatar
    let key='profile';
    this.profile['avatar_user']=this.avatar_src_img;
    this.localStorageService.storeLocalStorage(this.profile,key);
    // tslint:disable-next-line:max-line-length
    const reqLogin = this.http.patch('../../../api/user/update_avatar', {'param1': this.user_data["id_user"] , 'param2': this.id})
    .subscribe(
      (responses: any[]) => {
        this.respo = responses;
        this.modalProfileClose();
        // console.table(this.respo);
        // tslint:disable-next-line:no-shadowed-variable
      },
      error => {
        console.table('Error ------- : ' + error);
      }
    );
  }
  change_login_name(newLoginName) {
    if(newLoginName !== ''){
      // alert(newLoginName);
      // this.youCanChangeLoginName = false;
      this.newLoginName = newLoginName;
      // console.log('login name etap 1 :' + newLoginName + 'id:' + this.user_data["id_user"]);

      this.check_response(this.newLoginName);
      // console.log('login name etap 2 :' + newLoginName + 'id:' + this.user_data["id_user"]);
    }
  }

  check_response(check_this_name_pls) {
    // console.log('is in check_response' + check_this_name_pls);
    // alert(check_this_name_pls);
    // tslint:disable-next-line:max-line-length
    const check_loginName = this.http.post('../../../api/user/check_login', {'param': check_this_name_pls })
    .subscribe(
      (responses_check_login: any[]) => {
        // console.log('is in check_response subscribe');
        this.fun_applay_new_name(responses_check_login,check_this_name_pls);
        // console.log(responses);
      },
      error => {
    // console.log('is in check_response subscribe error');

        console.table(error);
      }
    );
  }
  fun_applay_new_name(resp_login_name_login, check_this_name_pls) {
    // console.log(resp_login_name_login);
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
        this.modalsClose();
        // this.newPropositionLogin = respo_change_log[0]['p_login_out'];
      }
    }
  fun_All_isGood_YouCan_ChangeName(newLoginName) {
      // console.log(newLoginName);
      // tslint:disable-next-line:max-line-length
      const reqLogin = this.http.patch('../../../api/user/update_login', {'param1': this.user_data["id_user"] , 'param2':newLoginName  } )
      .subscribe(
        (responses: any[]) => {
          this.LoginName = newLoginName;
          // console.log(responses);
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

  // function on click botton تغير
  inits() {
    this.modalOpen();
    this.msgExistName = false;
    this.msgSuccessName = false;
    this.showProposition = false;
    // console.log('respooooooo  : ' + this.profile['prenom_user']);
    this.newPropositionLogin = this.profile['prenom_user'];
  }
  addClass(id_avatar_selected: any) {
    this.id_avatar_selected = id_avatar_selected;
}
  modalsClose() {
    $('#animate_Style_User').removeClass('bounceInDown');
    $('#animate_Style_User').addClass('bounceOutUp');
    setTimeout(function() { $('#myModal').css('display', 'none'); }, 800);
  }
  modalOpen() {
    $('#animate_Style_User').removeClass('bounceOutUp');
    $('#animate_Style_User').addClass('bounceInDown');
    $('#myModal').css('display', 'block');
  }
  modalProfileOpen() {
    $('#animate_Style_Profile').removeClass('bounceOutUp');
    $('#animate_Style_Profile').addClass('bounceInDown');
    $('#modalProfile').css('display', 'block');
  }
  modalProfileClose() {
    $('#animate_Style_Profile').removeClass('bounceInDown');
    $('#animate_Style_Profile').addClass('bounceOutUp');
    setTimeout(function() { $('#modalProfile').css('display', 'none'); }, 800);
  }
}
