import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login } from "../shared/models/login";
import { environment } from "../../environments/environment";
import { User } from "../shared/models/user";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class AuthService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public register(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiServerUrl}/auth/signup`, user, httpOptions);
    }

    public login(login: Login): Observable<any> {
        return this.http.post(`${this.apiServerUrl}/auth/login`, login, httpOptions);
    }

    public logout(): Observable<any> {
        return this.http.post(`${this.apiServerUrl}/auth/signout`, { }, httpOptions);
    }

}