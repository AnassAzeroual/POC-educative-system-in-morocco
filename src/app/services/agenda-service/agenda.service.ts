import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private httpClient: HttpClient) { }


  getEventsAgenda(data){
     return this.httpClient.post("../../../api/events/load",data);
  }

  insert(data){
    return this.httpClient.post("../../../api/events/insert",data);
  }

  update(data){
    return this.httpClient.post("../../../api/events/update",data);
  }

  delete(data){
    return this.httpClient.post("../../../api/events/delete",data);
  }

}
