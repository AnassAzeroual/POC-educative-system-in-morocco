import { Injectable } from '@angular/core';
import { LocalStorageService } from '../LocalStorage/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient,
    private sessionsrv: SessionService)
     { }

     
     getProfile(userId){
      return this.http.post('../../../api/user/read', {"param":userId})
      }
     
}
