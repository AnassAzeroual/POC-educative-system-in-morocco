import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  data_session:Array<any>;
  constructor(private http: HttpClient, private session:SessionService) { }

    read_path(path:string){ 
      this.http.post('http://test-angular.e-eduka.com/api/arbo/read_path', {"param": path })
    }

    node_quiz(path:string,id_user:string){
      let data = {"param" : path,"id_user" : id_user};
      this.http.post('http://test-angular.e-eduka.com/api/arbo/node_quiz', {"param": data })
    }

}
