import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "./../../environments/environment";
import { Invoice } from "../shared/models/invoice";
import { User } from "../shared/models/user";

@Injectable({providedIn: 'root'})
export class InvoiceService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getInvoices(): Observable<Invoice[]> {
      return this.http.get<Invoice[]>(`${this.apiServerUrl}/invoice/list_invoice`);
    }

    public getInvoiceById(id: number): Observable<Invoice>{
      return this.http.get<Invoice>(`${this.apiServerUrl}/invoice/find/${id}`);
    }

    public addInvoice(invoice: Invoice): Observable<any> {
      return this.http.post(`${this.apiServerUrl}/invoice/add_invoice`, invoice, {responseType: "text"});
    }

    public updateInvoice(id: number, invoice: Invoice): Observable<Object>{
      return this.http.put(`${this.apiServerUrl}/invoice/update_invoice/${id}`, invoice);
    }

    public updateStatus(id: number, click: string, user: User): Observable<Object>{
      return this.http.put(`${this.apiServerUrl}/invoice/update_status/${id}`, {click, user});
    }

    public deleteInvoice(id: number): Observable<Object>{
      return this.http.delete(`${this.apiServerUrl}/invoice/find/delete/${id}`);
    }

}