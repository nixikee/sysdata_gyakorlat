import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "./../../environments/environment";
import { User } from "../shared/models/user";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({providedIn: 'root'})
export class UserService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getUser(): Observable<any> {
        return this.http.get(`${this.apiServerUrl}/user/list_user`);
    }

    public getUserById(id: number): Observable<any>{
      return this.http.get(`${this.apiServerUrl}/user/find/${id}`);
    }

    public updateUser(id: number, user: User): Observable<Object>{
      return this.http.put(`${this.apiServerUrl}/user/update_user/${id}`, user);
    }

    public updatePassword(id: number, password: string): Observable<Object>{
      return this.http.put(`${this.apiServerUrl}/user/update_password/${id}`, password);
    }

    public deleteUser(id: number): Observable<Object> {
      return this.http.delete(`${this.apiServerUrl}/user/find/delete/${id}`, { responseType: 'text' });
    }

}