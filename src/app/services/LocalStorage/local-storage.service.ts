import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

// key that is used to access the data in local storage
const TOKEN = 'TOKEN';

@Injectable()
export class LocalStorageService {

  storage = localStorage;
    constructor(private cookieService: CookieService ) { };
    
    public storage2=this.storage;

     storeLocalStorage(table,key){         
      this.storage.setItem(key, table);
    }

    getLocalStorage(key){
      return this.storage.get(key);
    }

    setToken(token: string): void {
      this.storage.setItem(TOKEN, token);
    }

    isLogged() {
      return this.storage.getItem(TOKEN) != null;
    }

    destructSession(){
      var i = sessionStorage.length;
      while(i--) {
        var key = sessionStorage.key(i);
         sessionStorage.removeItem(key);
      }
      //this.storage.remove(TOKEN);
    }
    destructCookies(){
      this.cookieService.deleteAll();
      // console.log('now all cookies removed');
    }


}