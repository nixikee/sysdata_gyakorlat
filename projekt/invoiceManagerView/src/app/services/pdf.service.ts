import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "./../../environments/environment";

@Injectable({providedIn: 'root'})
export class PdfService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    upload(file: any): Observable<any> {
        return this.http.post(`${this.apiServerUrl}/upload`, file, {responseType: "text"});
    }

}