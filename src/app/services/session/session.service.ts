import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  readSession(){
    return this.http.post('../../../sessions/read.php', null);
  }

  createSession(){
    
  }
}
